import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function AddImageBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [content, setContent] = useState("Add Image Board");
  const [hasUserModifiedContent, setHasUserModifiedContent] = useState(false);

  const handleContentChange = (event) => {
    setContent(event.target.textContent);
    setHasUserModifiedContent(true);
  };


  const handleUpload = () => {
    const dataImage = localStorage.getItem("UserId");
    const combinedData = {
      user_id: dataImage,
      images: selectedImages,
      title: content,
    };
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/creatmoodboard/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("createMoodboard", data);
          if (data.status === "success") {
          toast.success("Upload successful!"); // Display success toast
           setIsModalOpen(false);
        } else if (data.status === "error") {
          toast.error(data.error); // Display error toast
        } else {
          toast.error("Sorry, something went wrong"); // Display generic error toast
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    const maxImages = 4; // Maximum number of images allowed

    if (files.length > maxImages) {
      // Handle case when more than four images are selected
      alert("Only up to four images can be uploaded");
      return;
    }

    const filePromises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((base64Images) => {
      setSelectedImages(base64Images);
      setSelectedFiles(Array.from(files)); // Store the selected files in the state
      setProgress(0);

      // Start progress for each image
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 15);

      return () => {
        clearInterval(interval);
      };
    });
  };
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
  // console.log(filename);
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
            <div
              class="searchbar"
              contentEditable={!hasUserModifiedContent}
              onInput={handleContentChange}
            >
              <div class="untitleboard">
                <span>{content}</span>
              </div>
            </div>
            <div class="start-adding-grid">
              <div class="popupbox adpop">
                <p className="fontsize">
                  Start adding some images to this board
                </p>
                <button
                  class="btn btn-primary width"
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
                        <img src={"assests/close.png"} alt="Close" />
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
                              selectedImages.map((image, index) => (
                                <img
                                  key={index}
                                  src={image ? image : "assests/UploadArea.png"}
                                  alt={`Image ${index}`}
                                />
                              ))
                            ) : (
                              <img
                                src={"assests/UploadArea.png"}
                                alt="Upload Area"
                              />
                            )}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="randomeimgbox">
                            {selectedImages.map((image, index) => (
                              <div className="progresss" key={index}>
                                <p>{selectedFiles[index].name}</p>
                                <ProgressBar
                                  now={progress}
                                  style={progressBarStyle}
                                  label={`${progress}%`}
                                  visuallyHidden
                                />
                              </div>
                            ))}
                            <br />
                            <button
                              class="btn btn-primary width"
                              style={{ padding: "10px", marginTop: "5px" }}
                              onClick={handleUpload}
                            >
                              Upload Images
                            </button>
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
      <ToastContainer />
    </div>
  );
}

export default AddImageBoard;
