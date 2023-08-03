import React from "react";
import "./Style.css";
import { useNavigate } from "react-router";

function Cancel() {
  const navigate = useNavigate();

  const handlePageCancel = () => {
    navigate("/subscription");
  };

  return (
    <div>
      <div class="payment-success">
        <div id="upper-side" style={{ backgroundColor: "red" }}>
          <svg
            version="1.1"
            id="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            xmlSpace="preserve"
          >
            <path
              d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65
                c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382
                c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209
                c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091
                c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027
                c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865
                C131.967,94.755,132.296,93.271,131.583,92.152z"
            />
            <circle
              fill="none"
              stroke="#ffffff"
              stroke-width="5"
              stroke-miterlimit="10"
              cx="109.486"
              cy="104.353"
              r="32.53"
            />
          </svg>
          <h3 id="status">Payment Cancel</h3>
        </div>
        <div class="header"></div>
        <div class="body">
          <h2 class="title"></h2>
          <img
            class="main-img mb-4"
            src="data:image/jpeg;base64,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"
            alt=""
          />

          <p>
            Your payment was unsuccessful! Please do
            <br /> the subscription process again.
          </p>
          <button
            class="btn btn-primary payment"
            style={{ color: "white", backgroundColor: "red" }}
            onClick={handlePageCancel}
          >
            Please Payment again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
