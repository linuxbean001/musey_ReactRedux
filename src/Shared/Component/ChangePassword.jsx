import React, { useState, useContext, useEffect } from "react";
import "../../Style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../MuseyScreens/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  Cpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function ChangePassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessTokenFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("password")) {
        handleForgot();
      }
    };
    getAccessTokenFromURL();
  }, []);

  const handleForgot = (values) => {
    console.log("values", values);
    if (values != undefined) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("password");
      console.log("token", token);
      if (token) {
        const combinedData = {
          password: values.password,
          token: token,
        };
        const BASE_URL = "http://www.musey.ai/api";
        const url = `${BASE_URL}/changepassword/`;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            if (data.status === "success") {
              toast.success(data.message);
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      Cpassword: "",
    },
    validationSchema,
    onSubmit: handleForgot,
  });

  return (
    <>
      <div className="container1">
        {/* Rest of the form */}
        <form onSubmit={formik.handleSubmit} className="centered-content">
          <h1 style={{ color: "white" }}>Password Change</h1>
          <div className="row">
            <div className="col justify-center">
              <input
                type="password"
                className="form-control text-center"
                placeholder="Enter Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="error white" style={{ color: "red" }}>
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col justify-center">
              <input
                type="password"
                className="form-control text-center"
                placeholder="Enter Confirm Password"
                name="Cpassword"
                value={formik.values.Cpassword}
                onChange={formik.handleChange}
              />
              {formik.touched.Cpassword && formik.errors.Cpassword && (
                <span className="error white" style={{ color: "red" }}>
                  {formik.errors.Cpassword}
                </span>
              )}
            </div>
          </div>

          <div className="row mt-3">
            <button type="submit" className="btn btn-primary">
              Forgot Password
            </button>
          </div>
        </form>
        {/* Rest of the form */}
      </div>
      <ToastContainer />
    </>
  );
}

export default ChangePassword;
