import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

function AddImageBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [filename, setFilename] = useState([]);

  console.log(selectedImages);
  const handleImageChange = (event) => {
    const files = event.target.files;
    setFilename(files);
    const imagesArray = [];
    const fileName = [];
    // console.log("fileName",fileName)

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imagesArray.push(URL.createObjectURL(file));
    }
    fileName.push(files);
    console.log("fileName",fileName)

    console.log("element ============-=-> " + fileName);

    // files.forEach(element => {
    // console.log("element ============-=-> "+element)
    // });

    setSelectedImages(imagesArray);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 15);

    return () => {
      clearInterval(interval);
    };
  };
  // useEffect(() => {

  // }, [selectedImages]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/testrender");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(filename);
  const [progress, setProgress] = useState(0);

  const progressBarStyle = {
    height: "10px",
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
                <button
                  class="btn btn-primary"
                  onClick={handleOpenModal}
                  style={{ padding: "10px", marginTop: "5px" }}
                >
                  Click to add images
                </button>
                {/* <a
                  href
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Click to add images
                </a> */}
                <button
                  class="btn btn-primary"
                  onClick={handleClick}
                  style={{ padding: "10px", marginTop: "5px" }}
                >
                  Next Page
                </button>
              </div>

              {/*  modal */}
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isModalOpen}
                className="modal open addImage"
              >
                {/* <div class="modal" id="myModal"> */}
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Upload files</h4>
                      {/* <a href="" class="" data-bs-dismiss="modal"> */}
                      <span
                        onClick={handleCloseModal}
                        className=""
                        data-bs-dismiss="modal"
                      >
                        <img src={"assests/close.png"} />
                      </span>
                      {/* </a> */}
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
                              onChange={handleImageChange}
                              name="files[]"
                              id="filer_input2"
                              multiple="multiple"
                              type="file"
                            />
                            {selectedImages.length > 0 ? (
                              selectedImages.length > 0 &&
                              selectedImages.map((image, index) => (
                                <img
                                  src={image ? image : "assests/UploadArea.png"}
                                />
                              ))
                            ) : (
                              <img src={"assests/UploadArea.png"} />
                            )}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="randomeimgbox">
                            <div className="progresss">
                              <p>randomimagename.jpg</p>
                              <ProgressBar
                                now={progress}
                                style={progressBarStyle}
                                label={`${progress}%`}
                                visuallyHidden
                              />
                              <p>randomimagename.jpg</p>
                              <ProgressBar
                                now={progress}
                                style={progressBarStyle}
                                label={`${progress}%`}
                                visuallyHidden
                              />
                              <p>randomimagename.jpg</p>
                              <ProgressBar
                                now={progress}
                                style={progressBarStyle}
                                label={`${progress}%`}
                                visuallyHidden
                              />
                            </div>
                            {/* <div class="progress" style={{ height: "10px" }}>
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div> */}

                            {/* <div class="progress" style={{ height: "10px" }}>
                                
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div> */}

                            {/* <div class="progress" style={{ height: "10px" }}>
                                <div
                                  class="progress-bar"
                                  style={{ width: "40%", height: "10px" }}
                                ></div>
                              </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </Modal>
              {/* modal close */}
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
