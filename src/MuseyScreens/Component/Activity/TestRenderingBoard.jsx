import React from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";

function TestRenderingBoard() {
  return (
    <div>
      <div class="mainWraper">
        <BannerImage />
        <section class="rendering-board-section">
          <div class="container">
            <h2>Test renderings board</h2>
            <div class="row">
              <div class="col-md-8">
                <p class="imagemsg">7 images in this board</p>
              </div>
              <div class="col-md-4">
                <div class="trbwrap">
                  <a href class="btn btn-primary">
                    Add more images
                  </a>
                  <div class="dropdown">
                    <a
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={"assests/OptionsMenu.png"} />
                    </a>

                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li class="moreoption">More options</li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Delete board
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Share
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4 redboarbtm">
              <div class="col-md-6">
                <div class="sag-top">
                  <div class="sagimagetp">
                    <img src={"assests/random01.png"} />
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-5 mt-lg-0">
                <div class="sag-top">
                  <div class="sagimagetpRgt">
                    <img src={"assests/random02.png"} />
                    <div class="r-b-delete-box">
                      <a href>
                        <img src={"assests/DeleteIcon.png"} />
                      </a>
                    </div>
                  </div>
                  <div class="sagimagebtmRgt">
                    <span>
                      <img src={"assests/random03.png"} />
                    </span>
                    <span>
                      <img src={"assests/random04.png"} />
                    </span>
                  </div>
                </div>
              </div>
              <div class="vision-bar">
                <img src={"assests/MLogoIcon.png"} />
                <span>What is your vision for this?</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TestRenderingBoard;
