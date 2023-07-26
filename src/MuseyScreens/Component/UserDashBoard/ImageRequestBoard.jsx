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
                <p>In the meantime, a word from our sponsors</p>
                <div class="processbox">Image</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ImageRequestBoard;
