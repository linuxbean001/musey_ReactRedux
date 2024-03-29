import React, { useState, useContext } from "react";
import "../../Style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../MuseyScreens/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

function Forgot() {
  const navigate = useNavigate();
  const { forgot } = useContext(AuthContext);


  const handleForgot = (values) => {
    forgot(values);
    navigate("/")
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgot,
  });

  return (
    <>
    <div className="container1">
      {/* Rest of the form */}
      <form onSubmit={formik.handleSubmit} className="centered-content">
      <h1 style={{color:"white"}}>Email Sent</h1>
        <div className="row">
          <div className="col justify-center">
            <input
              type="email"
              className="form-control text-center"
              placeholder="Enter Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error white" style={{ color: "red" }}>
                {formik.errors.email}
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
    <NotificationContainer />
    </>
  );
}

export default Forgot;
