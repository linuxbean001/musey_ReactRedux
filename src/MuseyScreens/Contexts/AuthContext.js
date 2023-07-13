import React, { createContext, useState } from "react";
import { Register, loginData, ForgotData } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignup = (values) => {
    Register(values)
      .then((data) => {
        if (data.detail !== "Email already registered") {
          setIsLoggedIn(true);
          setUser(data.user); // Assuming the API returns the user object
        } else {
          console.log("API response:", data.detail);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const handleLogin = (values) => {
    loginData(values)
      .then((data) => {
        console.log("login", data);
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
            .then((response) => response.text())
            .then((result) => {
              console.log("resultAccess_token",result);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const handlePassword = (values) => {
    ForgotData(values)
      .then((data) => {
        console.log("forgot", data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  

  const authContextValue = {
    isLoggedIn,
    user,
    signup: handleSignup,
    loginItem: handleLogin,
    forgot: handlePassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
