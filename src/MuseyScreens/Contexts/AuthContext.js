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
          localStorage.setItem("user_role",data.role)
          setIsLoggedIn(true);
          toast.success("Please check your email and verify to use musey AI services");
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
      //  console.log("login", data);
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
            //  console.log("resultAccess_token", result);
              toast.success("Login successful!");
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
        //console.log("forgot", data);
        toast.success(data);
        if(data === "password reset email sent"){
          window.location.href = "/passwordchange";
        }
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
