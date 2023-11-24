import React, { createContext, useState, useEffect } from "react";
import { Register, loginData, ForgotData } from "../utils/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("UserId")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAccessTokenFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("accesstoken")) {
        handleGoogleLogin();
      }
    };
    getAccessTokenFromURL();
  }, []);

  const handleGoogleLogin = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accesstoken");

    localStorage.setItem("LoginToken", accessToken);
    if (!urlParams.get("accesstoken")) {
      window.open("https://musey.ai/api/logingoogle/", "_self");
    }

    try {
      // Fetch user data from your backend using the access token
      const BASE_URL = "https://musey.ai/api";
      const apiUrl = `${BASE_URL}/user/?token=${encodeURIComponent(
        accessToken
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (accessToken !== undefined) {
        setUser(data);
        setIsLoggedIn(true);

        // Store user data in local storage or state as needed
        localStorage.setItem("LoginToken", accessToken);
        localStorage.setItem("UserId", data.UserId);
        localStorage.setItem("UserName", data.userName);
        localStorage.setItem("UserEmail", data.userEmail);
        localStorage.setItem("UserRole", data.userRole);
        localStorage.setItem("UserActive", data.useractive);
      }

      return true; // Login successful
    } catch (error) {
      console.error("Google login error:", error);
      return false; // Login failed
    }
  };

  const handleSignup = (values) => {
    Register(values)
      .then((data) => {
        if (data.detail !== "Email already registered") {
          localStorage.setItem("user_role", data.role);
          NotificationManager.success(
            "Please check your email and verify to use musey AI services",
            "",
            2000
          );
          setUser(data.user); // Assuming the API returns the user object
        } else {
          NotificationManager.error(data.detail, "",2000);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        NotificationManager.error("Error occurred during sign up", "",2000);
      });
  };

  const handleLogin = (values) => {
    loginData(values)
      .then((data) => {
        if (data.access_token !== "") {
          const params = data.access_token;
          const BASE_URL = "https://musey.ai/api";
          const url = `${BASE_URL}/user/?token=${encodeURIComponent(params)}`;
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              NotificationManager.success("Login successful!", "",2000);
              setIsLoggedIn(true);
              localStorage.setItem("UserId", result.UserId);
              localStorage.setItem("UserName", result.userName);
              localStorage.setItem("UserEmail", result.userEmail);
              localStorage.setItem("UserRole", result.userRole);
              localStorage.setItem("UserActive", result.useractive);
            })
            .catch((error) => {
              console.log("error", error);
            });
        } else {
          NotificationManager.error(data.detail, "",2000);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        NotificationManager.error("Incorrect email or password", "",2000);
      });
  };

  const handlePassword = (values) => {
    ForgotData(values)
      .then((data) => {
        NotificationManager.success(data, "",2000);
        // if (data === "password reset email sent") {
        //   window.location.href = "/passwordchange";
        // }
      })
      .catch((error) => {
        console.error("API error:", error);
        NotificationManager.error(
          "Error occurred during password reset",
          "",2000
        );
      });
  };

  const authContextValue = {
    isLoggedIn,
    user,
    handleGoogleLogin,
    signup: handleSignup,
    loginItem: handleLogin,
    forgot: handlePassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NotificationContainer />
      {children}
    </AuthContext.Provider>
  );
};
