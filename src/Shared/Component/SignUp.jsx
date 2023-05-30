import React, { useState } from "react";
import "../../Style.css";

function SignUp({ onClose }) {
  return (
    <div className="modal open">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h4 className="modal-title">Create an account</h4>
            <span onClick={onClose} className="" data-bs-dismiss="modal">
              <img src={"../../../public/assests/close.png"} alt="Close" />
            </span>
          </div>

          {/* Modal content */}
          <div className="formwrap">
            <div className="fromhd">Tell us about yourself</div>
            {/* Rest of the form */}
          </div>
        </div>
       <div>
        Today is worked 
       </div>
      </div>
    </div>
  );
}

export default SignUp;
