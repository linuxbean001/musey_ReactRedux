import React from "react";
import BannerImage from "../../../Shared/Component/BannerImage";
import "../../../Style.css";
import { useNavigate } from "react-router-dom";

function YourBoard() {
   const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/UploadBoard")
  }

  return (
    <div class="bgin">
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

            <div class="searchbox">
              <h3>Your boards</h3>
              <div class="row">
                <div class="popupbox">
                  <p>Looks like you don’t have any boards</p>
                  <button onClick={handleClick} class="btn btn-primary">
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
