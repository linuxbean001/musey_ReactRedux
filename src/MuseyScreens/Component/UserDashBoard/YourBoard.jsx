import React from "react";
import BannerImage from "../../../Shared/Component/BannerImage";
import "../../../Style.css";
import { useNavigate } from "react-router-dom";

function YourBoard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/uploadboard");
  };

  return (
    <div className="bgin">
      <div className="mainWraper">
        <BannerImage />
        <section className="searchsection">
          <div className="container-fluid">
            <div className="searchbar"></div>

            <div className="searchbox">
              <h3>Start Image boards</h3>
              <div className="row">
                <div className="popupbox">
                  <p className="fontsize">
                    Looks like you don’t have any boards
                  </p>
                  <button
                    onClick={handleClick}
                    className="btn btn-primary width"
                  >
                    Go to MoodBoard Now, click here
                  </button>
                </div>
                <div className="col-sm-12 col-lg-3">
                  <div className="your-board-body">
                    <div className="ybgleft"></div>
                    <div className="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="your-board-footer"></div>
                </div>
                <div className="col-sm-12 col-lg-3">
                  <div className="your-board-body">
                    <div className="ybgleft"></div>
                    <div className="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="your-board-footer"></div>
                </div>
                <div className="col-sm-12 col-lg-3">
                  <div className="your-board-body">
                    <div className="ybgleft"></div>
                    <div className="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="your-board-footer"></div>
                </div>
                <div className="col-sm-12 col-lg-3">
                  <div className="your-board-body">
                    <div className="ybgleft"></div>
                    <div className="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="your-board-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default YourBoard;
