import React, { useState, useContext, useRef,useEffect } from "react";
import "../../Style.css";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../MuseyScreens/Contexts/AuthContext";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("FirstName is required"),
  lname: Yup.string().required("LastName is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  hashed_password: Yup.string()
    .min(6, "Password should be at least 6 characters long")
    .required("Password is required"),
  is_active: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

  function SignUp({ isModalOpen, handleCloseModal }) {
  const [roleUser, setRoleUser] = useState("free");
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const isMountedRef = useRef(true);
  

  

  const handleSubmit = (values) => {
    const formData = {
      name : values.name,
      email: values.email,
      hashed_password: values.hashed_password,
      is_active: false,
      role: values.role,
    };
    signup(formData);
    handleCloseModal();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      hashed_password: "",
      is_active: false,
      role: roleUser,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const curser = {
    cursor: "pointer",
  };

    const handleGoogle = () => {
    // Call the function from the AuthContext to handle Google login
    authContext.handleGoogleLogin()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          // NotificationManager.success("Login successful!","",3000);
        } else {
          NotificationManager.error("Login failed. Please try again.","",2000);
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        NotificationManager.error("An error occurred during login.","",2000);
      });
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isModalOpen}
        className="modal open signinmd"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h4 className="modal-title">Create an account</h4>
              <span
                onClick={handleCloseModal}
                className=""
                data-bs-dismiss="modal"
              >
                <img src={"assests/close.png"} alt="Close" style={curser} />
              </span>
            </div>
            {/* Modal content */}
            <div className="formwrap">
              <div className="fromhd">Tell us about yourself</div>
              {/* Rest of the form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FirstName"
                      name="fname"
                      value={formik.values.fname}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue(
                          "name",
                          e.target.value + " " + formik.values.lname
                        );
                      }}
                    />
                    {formik.touched.fname && formik.errors.fname && (
                      <span className="error white" style={{ color: "red" }}>
                        {formik.errors.fname}
                      </span>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="LastName"
                      name="lname"
                      value={formik.values.lname}
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue(
                          "name",
                          formik.values.fname + " " + e.target.value
                        );
                      }}
                    />
                    {formik.touched.lname && formik.errors.lname && (
                      <span className="error white" style={{ color: "red" }}>
                        {formik.errors.lname}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email@isp.com"
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
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                      name="hashed_password"
                      value={formik.values.hashed_password}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.hashed_password &&
                      formik.errors.hashed_password && (
                        <span className="error white" style={{ color: "red" }}>
                          {formik.errors.hashed_password}
                        </span>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="checkedfrm">
                    <label className="containercb">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formik.values.is_active}
                        onChange={formik.handleChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <span className="termstext">
                      I agree to the <a href="#">Terms & Conditions</a>
                    </span>
                    {formik.touched.is_active && formik.errors.is_active && (
                      <span className="error white" style={{ color: "red" }}>
                        {formik.errors.is_active}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={formik.handleSubmit}
                  >
                    SignUp
                  </button>
                </div>
                <span className="hrline"></span>
                <div className="row">
                  <p>Or sign up with</p>
                  <div className="socialbtnWrap">
                    <a
                      className="btn btn-primary-white"
                      href=""
                      onClick={handleGoogle}
                      target="_blank"
                    >
                      <img src="assests/googleIcon.png" /> Continue with Google
                    </a>
                  </div>
                </div>
              </form>
              {/* Rest of the form */}
            </div>
          </div>
        </div>
      </Modal>
      <NotificationContainer />
    </>
  );
}

export default SignUp;
