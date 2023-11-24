import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AdvanceRender() {
  const [uploadImagesData, setUploadImagesData] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/requestboard");
  };

  useEffect(() => {
    const uploadedImagesDatas = location.state?.uploadedImages;
    if (uploadedImagesDatas) {
      setUploadImagesData(uploadedImagesDatas);
    }
  }, [location.state]);

  return (
    <div style={{marginBottom : "5rem"}}>
      <div className="mainWraper">
        <section className="rendering-board-section">
          <div className="container-fluid">
            <h2>Test renderings board</h2>
            <div className="row">
              <div className="col-md-8">
                <p className="imagemsg">7 images in this board</p>
              </div>
              <div className="col-md-4">
                <div className="trbwrap">
                  <button onClick={handleClick} className="btn btn-primary">
                    Add more images
                  </button>
                  <div className="dropdown">
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
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li className="moreoption">More options</li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Delete board
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Share
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 redboarbtm">
              {/* Image New Board */}
              {/* Render uploaded images */}
              {uploadImagesData.map((image, index) => (
                <div className="col-md-6" key={index}>
                  <div className="sag-top">
                    <div className="sagimagetp">
                      <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                  </div>
                </div>
              ))}
              {/* Image New Board */}

              <div className="vision-bar generaterbimg">
                <img src={"assests/MLogoIcon.png"} />
                <span>Mountain landscape</span>
                <a href className="btn btn-secondary">
                  Generate
                </a>
              </div>

              <div className="advanced-option-bar">
                <div className="dropdown">
                  <button
                    className="btn btn-adoption dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Advanced options
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                      <button className="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> Landscape size only
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> Portrait size only
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        <img src={"assests/Delete.png"} /> High resolution
                        (+2880px)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
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
