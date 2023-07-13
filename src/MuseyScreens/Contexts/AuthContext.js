import React, { createContext, useState } from "react";
import { Register, loginData, ForgotData } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignup = (values) => {
    Register(values)
      .then((data) => {
        if (data.detail !== "Email already registered") {
          setIsLoggedIn(true);
          toast.success("Sign up successful!");
          setUser(data.user); // Assuming the API returns the user object
        } else {
          // console.log("API response:", data.detail);
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
            .then((response) => response.json())
            .then((result) => {
              // console.log("resultAccess_token", result.UserId);
              toast.success("Login successful!");
              localStorage.setItem("UserId", result.UserId);
              const handleLogin = (values) => {
                loginData(values)
                  .then((data) => {
                    console.log("login", data);
                    if (data.access_token !== "") {
                      const params = data.access_token;
                      const BASE_URL = "http://localhost:8000";
                      const url = `${BASE_URL}/user/?token=${encodeURIComponent(
                        params
                      )}`;
                      fetch(url, {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then((response) => response.json())
                        .then((result) => {
                          // console.log("resultAccess_token", result.UserId);
                          toast.success("Login successful!");
                          localStorage.setItem("UserId", result.UserId);
                        setTimeout(() => {
                          window.location.href = "/yourboard";
                        }, 2000);
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
                    toast.error("Error occurred during login");
                  });
              };
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
        //console.log("forgot", data);
        toast.success(data);
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Error occurred during password reset");
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
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
