import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactEasyEdit from "react-easy-edit";

function AddImageBoard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [value, setValue] = useState("Untitled Image");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isButtonCSSClicked, setIsButtonCSSClicked] = useState(false);
  

  const handleSave = (value) => {
    setValue(value);
  };

  const handleCancel = () => {
    // Handle cancel event if needed
  };

  const handleValidate = (value) => {
    return true; // Return true if value is valid, false otherwise
  };

  const handleUpload = () => {
    const dataImage = localStorage.getItem("UserId");
    const combinedData = {
      user_id: dataImage,
      images: selectedImages,
      title: value,
    };
    const BASE_URL = "http://www.musey.ai/api";
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
        if (data.status === "success") {
          localStorage.setItem(
            "uploadedImages",
            JSON.stringify(selectedImages)
          );
          localStorage.setItem("moodid", data.moodid);
          localStorage.setItem(
            "uploadedimagesdata",
            JSON.stringify(data.uploadedimages.images)
          );
          setUploadedImages(selectedImages);
          toast.success("Upload successful!"); // Display success toast
          setIsModalOpen(false);
          setTimeout(() => {
            toast.success("Wait to move Next Page!"); // Display success toast
          }, 4000);
          setTimeout(() => {
            navigate("/feedbackboard", {
              state: { uploadedImages: selectedImages },
            });
          }, 9000);
        } else if (data.status === "error") {
          toast.error(data.error); 
          navigate("/subscription")

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
    const maxImages = 4; 

    if (files.length > maxImages) {
      // Handle case when more than four images are selected
      toast.error("Only up to four images can be uploaded");
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

  const handleClick = () => {
    navigate("/advancerender");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsButtonCSSClicked(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsButtonCSSClicked(false);
  };
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
              <p className="edittitle">Click & Edit the title</p>
              <div class="untitleboard">
                <ReactEasyEdit
                  type="text"
                  onSave={handleSave}
                  onValidate={handleValidate}
                  value={value}
                  saveButtonLabel="Save"
                  attributes={{ placeholder: "Click to edit" }}
                />
              </div>
            </div>
            <div class="start-adding-grid">
              <div class="popupbox adpop">
                <div style={{ marginTop: isButtonCSSClicked ? "-55rem" : "" }}>
                  <p className="fontsize">
                    Start adding some images to this board
                  </p>
                  <button
                    class="btn btn-primary width"
                    onClick={handleOpenModal}
                    style={{
                      padding: "10px",
                      marginTop: "-5px",
                      boxShadow: "0px 0px 4px 0px",
                    }}
                  >
                    Click to add images
                  </button>
                </div>
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
                              accept="image/*"
                            />
                            {selectedImages.length > 0 ? (
                              selectedImages.map((image, index) => (
                                <img
                                  key={index}
                                  src={image ? image : "assests/UploadArea.png"}
                                  alt={`Image ${index}`}
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    display: "block",
                                    marginBottom: "10px",
                                  }}
                                />
                              ))
                            ) : (
                              <img
                                src={"assests/UploadArea.png"}
                                alt="Upload Area"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                }}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </Modal>
              {/* modal close */}

              {/* Image Show on moodboard */}
              <div className="row">
                {uploadedImages.map((image, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="sag-top">
                      <div className="sagimagetp">
                        <img
                          src={image}
                          alt={`Image ${index}`}
                          className="fixed-size-image"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Image Show on moodboard */}
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddImageBoard;
