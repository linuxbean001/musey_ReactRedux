import React, { createContext, useState, useEffect } from "react";
import { Register, loginData, ForgotData } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        handleGoogle();
      }
    };
    getAccessTokenFromURL();
  }, []);

  const handleGoogleLogin = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accesstoken");

    localStorage.setItem("LoginToken", accessToken);
    if (!urlParams.get("accesstoken")) {
      window.open("http://localhost:8000/logingoogle/", "_self");
    }

    try {
      // Fetch user data from your backend using the access token
      const BASE_URL = "http://localhost:8000";
      const apiUrl = `${BASE_URL}/user/?token=${encodeURIComponent(
        accessToken
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setUser(data);
      setIsLoggedIn(true);

      // Store user data in local storage or state as needed
      localStorage.setItem("LoginToken", accessToken);
      localStorage.setItem("UserId", data.UserId);
      localStorage.setItem("UserName", data.userName);
      localStorage.setItem("UserEmail", data.userEmail);
      localStorage.setItem("UserRole", data.userRole);
      localStorage.setItem("UserActive", data.useractive);

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
          toast.success(
            "Please check your email and verify to use musey AI services"
          );
          setUser(data.user); // Assuming the API returns the user object
        } else {
          toast.error(data.detail);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Error occurred during sign up");
      });
  };

  const handleLogin = (values) => {
    loginData(values)
      .then((data) => {
        if (data.access_token !== "") {
          const params = data.access_token;
          const BASE_URL = "http://localhost:8000";
          const url = `${BASE_URL}/user/?token=${encodeURIComponent(params)}`;
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              toast.success("Login successful!");
              setIsLoggedIn(true);
              setTimeout(() => {
                window.location.href = "/yourboard";
              }, 5000);
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
          toast.error(data.detail);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Incorrect email or password");
      });
  };

  const handlePassword = (values) => {
    ForgotData(values)
      .then((data) => {
        toast.success(data);
        // if (data === "password reset email sent") {
        //   window.location.href = "/passwordchange";
        // }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Error occurred during password reset");
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
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
