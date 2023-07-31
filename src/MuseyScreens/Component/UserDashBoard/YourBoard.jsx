import React from "react";
import BannerImage from "../../../Shared/Component/BannerImage";
import "../../../Style.css";
import { useNavigate } from "react-router-dom";

function YourBoard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/UploadBoard");
  };

  return (
    <div class="bgin">
      <div class="mainWraper">
        <BannerImage />
        <section class="searchsection">
          <div class="container">
            <div class="searchbar">
             
            </div>

            <div class="searchbox">
              <h3>Start Image boards</h3>
              <div class="row">
                <div class="popupbox">
                  <p className="fontsize">
                    Looks like you don’t have any boards
                  </p>
                  <button onClick={handleClick} class="btn btn-primary width">
                    Start a board now, click here
                  </button>
                </div>
                <div class="col-sm-12 col-lg-3">
                  <div class="your-board-body">
                    <div class="ybgleft"></div>
                    <div class="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <h4>Board Title</h4>
                    <p>
                      <span>0 images </span>•<span> 0 renders</span>
                    </p>
                  </div>
                </div>
                <div class="col-sm-12 col-lg-3">
                  <div class="your-board-body">
                    <div class="ybgleft"></div>
                    <div class="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <h4>Board Title</h4>
                    <p>
                      <span>0 images </span>•<span> 0 renders</span>
                    </p>
                  </div>
                </div>
                <div class="col-sm-12 col-lg-3">
                  <div class="your-board-body">
                    <div class="ybgleft"></div>
                    <div class="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <h4>Board Title</h4>
                    <p>
                      <span>0 images </span>•<span> 0 renders</span>
                    </p>
                  </div>
                </div>
                <div class="col-sm-12 col-lg-3">
                  <div class="your-board-body">
                    <div class="ybgleft"></div>
                    <div class="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <h4>Board Title</h4>
                    <p>
                      <span>0 images </span>•<span> 0 renders</span>
                    </p>
                  </div>
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
