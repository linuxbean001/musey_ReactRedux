import React from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { Link } from "react-router-dom";

function UploadBoard() {
  return (
    <div>
      <div class="mainWraper">
        <BannerImage />
        <section class="searchsection">
          <div class="container">
            <div class="searchbar">
              <form action="">
                <div class="formContrl">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button
                        id=""
                        type="submit"
                        class="btn btn-link text-warning"
                      >
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                    <input
                      type="search"
                      placeholder="Search your boards"
                      aria-describedby="button-addon2"
                      class="form-control border-0 bg-light"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div class="searchbox yb-active">
              <h3>Your boards</h3>
              <div class="row">
                <div class="col-sm-6 col-lg-3">
                  <div class="your-board-body">
                    <div class="ybgleft">
                      <img src={"assests/yourboard01.png"} />
                    </div>
                    <div class="ybgright">
                      <span>
                        <img src={"assests/yourboard02.png"} />
                      </span>
                      <span>
                        <img src={"assests/yourboard03.png"} />
                      </span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <a href="/yourboard" style={{textDecoration:"none"}}>
                    <h4>Click to move board page</h4>
                    <p>
                      <span>----- </span>•<span> ------</span>
                    </p>
                    </a>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-3">
                  <div class="your-board-body">
                    <div class="addboard-button">
                      <Link to="/addimage">
                        <img src={" "} />
                      </Link>
                    </div>
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

export default UploadBoard;
