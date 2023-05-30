import React from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { useNavigate } from "react-router-dom";

function AddImageBoard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/testrender");
  };

  return (
    <div>
      <div class="mainWraper">
        <BannerImage />
        <section class="searchsection">
          <div class="container">
            <div class="searchbar">
              <div class="untitleboard">
                <span>Untitled board 1</span>
              </div>
            </div>
            <div class="start-adding-grid">
              <div class="popupbox adpop">
                <p>Start adding some images to this board</p>
                <a
                  href
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Click to add images
                </a>
                <button
                  class="btn btn-primary"
                  onClick={handleClick}
                  style={{ padding: "10px", marginTop: "5px" }}
                >
                  Next Page
                </button>
              </div>
              <div class="modal" id="myModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Upload files</h4>
                      <a href="" class="" data-bs-dismiss="modal">
                        <img src={"assests/close.png"} />
                      </a>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="NeonUpload Neon-upload-theme-dragdropbox">
                            <input
                              style={{
                                cursor: "pointer",
                                zIndex: 999,
                                opacity: 0,
                                width: "320px",
                                height: "200px",
                                position: "absolute",
                                right: "0px",
                                left: "0px",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                              name="files[]"
                              id="filer_input2"
                              multiple="multiple"
                              type="file"
                            />
                            <img src={"assests/UploadArea.png"} />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="randomeimgbox">
                            <div>
                              <p>randomimagename.jpg</p>
                              <div class="progress" style={{ height: "10px" }}>
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div>
                              <p>randomimagename.jpg</p>
                              <div class="progress" style={{ height: "10px" }}>
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div>
                              <p>randomimagename.jpg</p>
                              <div class="progress" style={{ height: "10px" }}>
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="sag-top">
                    <div class="sagimagetp">
                      <img src={"assests/randombox-default.png"} />
                    </div>
                    <div class="sagimagebtm">
                      <span>
                        <img src={"assests/randombox-default.png"} />
                      </span>
                      <span>
                        <img src={"assests/randombox-default.png"} />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-5 mt-lg-0">
                  <div class="sag-top">
                    <div class="sagimagetpRgt">
                      <img src={"assests/randombox-default.png"} />
                    </div>
                    <div class="sagimagebtmRgt">
                      <span>
                        <img src={"assests/randombox-default.png"} />
                      </span>
                      <span>
                        <img src={"assests/randombox-default.png"} />
                      </span>
                    </div>
                  </div>
                  <div class="sag-botm">
                    <div class="sagimagetpRgt">
                      <img src={"assests/randombox-default.png"} />
                    </div>
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

export default AddImageBoard;
