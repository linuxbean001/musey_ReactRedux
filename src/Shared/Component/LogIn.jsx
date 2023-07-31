import React, { useState, useContext } from "react";
import "../../Style.css";
import { Modal, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../MuseyScreens/Contexts/AuthContext";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters long")
    .required("Password is required"),
});

function LogIn({ isModalOpen, handleCloseModal }) {
  const navigate = useNavigate();
  const { loginItem } = useContext(AuthContext);

  const handleSubmit = (values) => {
    loginItem(values);
    handleCloseModal();
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const curser = {
    cursor: "pointer",
  };

  return (
    <>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isModalOpen}
        className="modal open signinmds container-fluid"
      >
        <div className="container-fluid">
          <div className="modal-contents">
            <div className="modal-header border-bottom-0">
              <h4 className="modal-title">LogIn an account</h4>
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
              {/* Rest of the form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <span className="error white" style={{ color: "red" }}>
                        {formik.errors.username}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
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
                <div>
                  <a
                   href="/forgetpassword"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginBottom: "-10px",
                      float:"right",
                      cursor:"pointer"
                    }}
                  >
                    forgot password?
                  </a>
                </div>
                <br />
                <br/>
                <div className="row">
                  <button type="submit" className="btn btn-primary">
                    LogIn
                  </button>
                </div>
              </form>
              {/* Rest of the form */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LogIn;
