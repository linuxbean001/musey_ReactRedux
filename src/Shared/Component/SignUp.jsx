import React, { useState } from "react";
import "../../Style.css";
import { Modal } from "react-bootstrap";

function SignUp({ isModalOpen, handleCloseModal }) {
  return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered  show={isModalOpen} className="modal open">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h4 className="modal-title">Create an account</h4>
              <span
                onClick={handleCloseModal}
                className=""
                data-bs-dismiss="modal"
              >
                <img src={"assests/close.png"} alt="Close" />
              </span>
            </div>

            {/* Modal content */}
            <div className="formwrap">
              <div className="fromhd">Tell us about yourself</div>
              {/* Rest of the form */}
              <form>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name|"
                      name="name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Eemail@isp.com"
                      name="email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="*******"
                      name="pswd"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Confirm Password"
                      name="cpswd"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="checkedfrm">
                    <label class="containercb">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                    <span class="termstext">
                      I agree to the <a href="#">Terms & Conditions</a>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <a href="" class="btn btn-primary downloadbtn">
                    Get Started
                  </a>
                </div>
                <span class="hrline"></span>
                <div class="row">
                  <p>Or sign up with</p>
                  <div class="socialbtnWrap">
                    <a class="btn btn-primary-white" href="">
                      <img src="assests/googleIcon.png" /> Continue with Google
                    </a>
                    <a class="btn btn-primary-white" href="">
                      <img src="assests/appleIcon.png" /> Continue with Google
                    </a>
                  </div>
                </div>
              </form>
              {/* Rest of the form */}
            </div>
          </div>
        </div>
      </Modal>
  );
}

export default SignUp;
