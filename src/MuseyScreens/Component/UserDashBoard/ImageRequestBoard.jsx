import React from "react";

function ImageRequestBoard() {
  return (
    <div>
      <div className="mainWraper">
        <section className="procesSection">
          <div className="container">
            <div className="processbox-row">
              <div>
                <img src={"assests/MLogoIcon-process.png"} alt="" />
                <h3>Processing your request</h3>
                <div class="processbox"><div className="loadermain"></div></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ImageRequestBoard;
