import React from "react";

function ImageRequestBoard() {
  return (
    <div style={{marginBottom:"10rem"}}>
      <div className="mainWraper">
        <section className="procesSection">
          <div className="container-fluid">
            <div className="processbox-row">
              <div style={{marginTop:"142px"}}>
                <h3>Processing your request</h3>
                <div className="processbox">
                  <div className="loadermain"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ImageRequestBoard;
