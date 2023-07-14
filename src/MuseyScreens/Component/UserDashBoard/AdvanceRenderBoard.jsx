import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdvanceRender() {
  const [uploadImagesData, setUploadImagesData] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/requestboard");
    console.log("pppppppp")
  };

  useEffect(() => {
    const uploadedImagesData = JSON.parse(localStorage.getItem("uploadedImages"));
     if (uploadedImagesData) {
      setUploadImagesData(uploadedImagesData);
    }
  }, []);

  return (
    <div>
      <div class="mainWraper">
        <section class="rendering-board-section">
          <div class="container">
            <h2>Test renderings board</h2>
            <div class="row">
              <div class="col-md-8">
                <p class="imagemsg">7 images in this board</p>
              </div>
              <div class="col-md-4">
                <div class="trbwrap">
                  <button onClick={handleClick} class="btn btn-primary">
                    Add more images
                  </button>
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
              
              {/* Image New Board */}
              <div class="col-md-6">
                <div class="sag-top">
                  <div class="sagimagetp">
                  <img src={uploadImagesData[0]} alt="Image 1" />
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-5 mt-lg-0">
                <div class="sag-top">
                  <div class="sagimagetpRgt">
                  <img src={uploadImagesData[1]} alt="Image 2" />
                  </div>
                  <div class="sagimagebtmRgt">
                    <span>
                    <img src={uploadImagesData[2]} alt="Image 3" />
                    </span>
                    <span>
                    <img src={uploadImagesData[3]} alt="Image 4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Image New Board */}

              <div class="vision-bar generaterbimg">
                <img src={"assests/MLogoIcon.png"} />
                <span>Mountain landscape</span>
                <a href class="btn btn-secondary">
                  Generate
                </a>
              </div>

              <div class="advanced-option-bar">
                <div class="dropdown">
                  <button
                    class="btn btn-adoption dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Advanced options
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> Landscape size only
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> Portrait size only
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> High resolution
                        (+2880px)
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> Mixed ratios
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdvanceRender;
