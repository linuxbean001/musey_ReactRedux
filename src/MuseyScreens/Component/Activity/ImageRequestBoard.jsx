import React from "react";
import { useNavigate } from "react-router-dom";

function RequestBoard() {

  const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/feedback_board")
  }

  return (
    <div>
      <div class="mainWraper">
        <section class="procesSection">
          <div class="container">
            <div class="processbox-row">
              <div class="">
                <img src={"assests/MLogoIcon-process.png"}  />
                <h3>Processing your request</h3>
                <p>In the meantime, a word from our sponsors</p>
                <div class="processbox" onClick={handleClick}>Image</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RequestBoard;
