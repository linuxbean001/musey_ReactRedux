import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BannerImage from "../../../Shared/Component/BannerImage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageRequestBoard from "./ImageRequestBoard";
import { Modal } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

function FeedBackBoard() {
  const [uploadImagesData, setUploadImagesData] = useState([]);
  const [promtValue, setPromtValue] = useState("");
  const [renderdimages, setRenderdImage] = useState([]);
  const [reRenderdImages, setReRenderdImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showExtraComponent, setShowExtraComponent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageObject, setImageObject] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkedObjects, setCheckedObjects] = useState([]);
  const [finalSelectedObjects, setFinalSelectedObjects] = useState([]);
  const [showSadEmojiComponent, setShowSadEmojiComponent] = useState(false);
  const [addMoreComponent, setAddMoreComponent] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  //console.log("uploadImagesData", uploadImagesData);

  const baseUrl = "http://localhost:8000/static/moodimages/";

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageObject.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCheckboxChange = (object) => {
    // Clone the current checked objects array
    const updatedCheckedObjects = [...checkedObjects];

    // Toggle the selected object for the current image
    if (!updatedCheckedObjects[currentImageIndex]) {
      updatedCheckedObjects[currentImageIndex] = [object];
    } else {
      const index = updatedCheckedObjects[currentImageIndex].indexOf(object);
      if (index === -1) {
        updatedCheckedObjects[currentImageIndex].push(object);
      } else {
        updatedCheckedObjects[currentImageIndex].splice(index, 1);
      }
    }

    // Update the state with the new checked objects array
    setCheckedObjects(updatedCheckedObjects);
  };

  const handleDoneClick = () => {
    setIsLoading(true);
    setIsModalOpen(false);
    toast.success("Re-Render image response is processing...");
    // Collect all the selected objects from all images and store them in finalSelectedObjects state
    const allSelectedObjects = checkedObjects.flat();
    setFinalSelectedObjects(allSelectedObjects);
    // Optionally, you can reset the state after storing the finalSelectedObjects
    setCheckedObjects([]);
    setCurrentImageIndex(0);

    // re-render API
    const dataImage = localStorage.getItem("UserId");
    const MoodID = localStorage.getItem("moodid");
    const userRole = localStorage.getItem("user_role");
    const imageData = imageObject.map((image, index) => {
      const imageID = image.image_id;
      const imageURL = image.imageurl;
      const objects = image.imgobjects.filter((object) =>
        checkedObjects[index]?.includes(object)
      );

      // If no objects are selected, show default text
      const selectedObjects =
        objects.length > 0 ? objects : ["No objects selected"];

      return {
        image_id: imageID,
        image_url: imageURL,
        image_objects: selectedObjects,
      };
    });

    const combinedData = {
      userid: Number(dataImage),
      moodid: Number(MoodID),
      userrole: userRole,
      prompt: promtValue,
      images: Array.isArray(imageData) ? imageData : [],
    };
    // console.log("Re-rendercombinedData:::--", combinedData);
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/renderimages/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("re-renderAPIdata", data);
        if (data.status === "success") {
          setIsLoading(false);
          toast.success("Re-Render image Succesfully");
          setReRenderdImage(data.generatedimages);
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
        //  setIsLoading(false);
      });
  };

  const currentImage = imageObject[currentImageIndex];
  const isLastImage = currentImageIndex === imageObject.length - 1;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUnsatisfyClick = () => {
    setShowExtraComponent(true);
    setShowSadEmojiComponent(true);
  };

  const handleShow = (image) => {
    setSelectedImage(image);
    setShow(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setShow(false);
  };

  const shareImage = (image) => {
    const shareData = {
      title: "Image",
      text: "Check out this image",
      url: image,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error in sharing:", error);
        });
    } else {
      console.log("Sharing is not supported in this browser");
    }
  };

  // console.log("renderdimages", renderdimages);

  const handleChange = (event) => {
    setPromtValue(event.target.value);
  };

  //console.log("uploadImagesData :-", uploadImagesData);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRenderImage = () => {
    setIsLoading(true);
    toast.success("Render image response is processing...");

    const dataImage = localStorage.getItem("UserId");
    const MoodID = localStorage.getItem("moodid");
    const userRole = localStorage.getItem("user_role");
    let imagesData = localStorage.getItem("uploadedimagesdata");
    let imageShow = JSON.parse(imagesData); // Parse as array, default to empty array if null
    // console.log("imageShow:", imageShow);

    const combinedData = {
      userid: Number(dataImage),
      moodid: Number(MoodID),
      userrole: userRole,
      prompt: promtValue,
      images: Array.isArray(imageShow) ? imageShow : [],
    };
    //  console.log("combinedData:::--", combinedData);
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/renderimages/`;
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
          setIsLoading(false);
          toast.success("Render image Succesfully");
          //console.log("imgobjects:", data.imageswithobjects[0].imgobjects);
          setRenderdImage(data.generatedimages);
          // setImageObject(data.imageswithobjects[0].imgobjects);
          setImageObject(data.imageswithobjects);
        } else {
          setIsLoading(false);
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    setAddMoreComponent(true);
  };

  const CloseModal = () => {
    setAddMoreComponent(false);
  };

  const handleAddMoreImageChange = (event) => {
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

  const progressBarStyle = {
    height: "10px",
  };

  const handleUpload = () => {
    // console.log(selectedImages)

    toast.success("Upload image response is processing...");
    const dataImage = localStorage.getItem("UserId");
    const MoodID = localStorage.getItem("moodid");
    const combinedData = {
      image_url: selectedImages,
      userid: dataImage,
      moodboard_id: MoodID,
    };
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/moodboardmoreimages/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add more", data.uploadedimages);
        toast.success("Image Upload Successful");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    const uploadedImagesDatas = location.state?.uploadedImages;
    if (uploadedImagesDatas) {
      setUploadImagesData(uploadedImagesDatas);
    }
  }, [location.state]);


  return (
    <div>
      {isLoading ? (
        <ImageRequestBoard />
      ) : (
        <div class="mainWraper">
          <BannerImage />
          <section class="rendering-board-section">
            <div class="container">
              <h2>Test renderings board</h2>
              <div class="row mt-4">
                <div class="col-md-12">
                  {/* <small class="show-results">Showing results for:</small> */}
                  {/* <p class="imagemsg">Mountain landscape</p> */}
                </div>
                {/* Conditionally render renderdimages section */}
                {reRenderdImages.length > 0
                  ? // Re-rendered image
                    reRenderdImages.map((image, index) => (
                      <div class="col-6 col-xl-3" key={index}>
                        <div class="showreslutboximg">
                          <img src={image} alt="" />
                          <a
                            onClick={() => handleShow(image)}
                            href
                            class="onovrshow"
                          >
                            <img src={"assests/download.png"} alt="" />
                          </a>
                        </div>
                      </div>
                    ))
                  : // Render image section
                    renderdimages.length > 0 &&
                    renderdimages.map((image, index) => (
                      <div class="col-6 col-xl-3" key={index}>
                        <div class="showreslutboximg">
                          <img src={image} alt="" />
                          <a
                            onClick={() => handleShow(image)}
                            href
                            class="onovrshow"
                          >
                            <img src={"assests/download.png"} alt="" />
                          </a>
                        </div>
                      </div>
                    ))}
                {/* End of conditionally render renderdimages section */}

                <div class="col-md-12">
                  <div class="satisfybox">
                    <p>Are you satisfied with these results?</p>
                    <div class="satisfyicon">
                      <a href>
                        <img src={"assests/satisfy.png"} alt="" />
                      </a>
                      <a href onClick={handleUnsatisfyClick}>
                        <img src={"assests/Unsatisfy.png"} alt="" />
                      </a>
                    </div>
                    {/* Conditionally render the extra component */}
                    {showExtraComponent && (
                      <div>
                        <p className="mt-4">
                          Sorry to hear that. Let’s see if we can improve those
                          results.
                        </p>
                        <button
                          className="btn btn-primary mt-3"
                          onClick={handleOpenModal}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/*<!-- The Modal Image Url section -->*/}
                <Modal
                  show={isModalOpen}
                  className="modal continueEditImg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      {/*<!-- Modal Header -->*/}
                      <div class="modal-header border-bottom-0">
                        <h4 class="modal-title">
                          What did you like about this image?
                        </h4>
                        <span
                          onClick={handleCloseModal}
                          className=""
                          data-bs-dismiss="modal"
                        >
                          <img src={"assests/close.png"} alt="Close" />
                        </span>
                      </div>
                      {/*<!-- Modal Header -->*/}

                      {/* <!-- Modal body -->*/}
                      {imageObject.length > 0 && (
                        <>
                          <div key={currentImage.image_id} class="modal-body">
                            <div class="row">
                              {/* image_id */}
                              <small class="show-results mb-3">
                                Image Id : {currentImage.image_id}
                              </small>
                              {/* image_id */}
                              <div class="col-md-6">
                                {/* imageurl  */}
                                <div class="continuemodalboximg">
                                  <img
                                    src={baseUrl + currentImage.imageurl}
                                    alt={`Image ${currentImage.image_id}`}
                                  />
                                </div>
                                {/* imageurl  */}
                              </div>
                              <div class="col-md-6">
                                {currentImage.imgobjects.map(
                                  (object, index) => (
                                    <div className="checkedfrm" key={index}>
                                      <label className="containercb">
                                        <input
                                          type="checkbox"
                                          onChange={() =>
                                            handleCheckboxChange(object)
                                          }
                                          checked={checkedObjects[
                                            currentImageIndex
                                          ]?.includes(object)}
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span>{object}</span>
                                    </div>
                                  )
                                )}

                                <div id="Other" style={{ display: "none" }}>
                                  <input
                                    type="text"
                                    placeholder="Triangle pattern"
                                    name=""
                                  />
                                </div>
                                <div class="c-btb-wrap">
                                  {!isLastImage && (
                                    <a
                                      href
                                      class="btn btn-primary"
                                      onClick={showNextImage}
                                    >
                                      Next image
                                    </a>
                                  )}
                                  {isLastImage && (
                                    <a
                                      href
                                      class="btn btn-primary primary-border"
                                      onClick={handleDoneClick}
                                    >
                                      Done
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {/* <!-- Modal body -->*/}
                    </div>
                  </div>
                </Modal>
                {/*<!-- The Modal Image Url section -->*/}
                {/* <!-- The Download Image Modal Second --> */}
                <Modal
                  className="modal modaldowload"
                  show={show}
                  onHide={handleClose}
                >
                  <a
                    href
                    className="downloadClose"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    <img src={"assests/close.png"} alt="" />
                  </a>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      {selectedImage && (
                        <div className="modlbody">
                          <img src={selectedImage} alt="" />
                          <a
                            href={selectedImage}
                            className="btn btn-primary downloadbtn"
                          >
                            Download
                          </a>
                          <a
                            href=""
                            onClick={() => shareImage(selectedImage)}
                            className="sharetxt"
                          >
                            Share
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Modal>
              </div>
              <div class="row">
                <div class="col-md-8">
                  {/* <p class="imagemsg">7 images in this board</p> */}
                </div>
                <div class="col-md-4">
                  <div class="trbwrap">
                    {/*---------------- Add more images section -------------------*/}
                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={addMoreComponent}
                      className="modal open addImage"
                    >
                      {/* <div class="modal" id="myModal"> */}
                      <div class="modal-dialog">
                        {uploadImagesData.length < 4 ? (
                          <div class="modal-content">
                            <div class="modal-header">
                              <h4 class="modal-title">Upload files</h4>
                              {/* <a href="" class="" data-bs-dismiss="modal"> */}
                              <span
                                onClick={CloseModal}
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
                                      onChange={handleAddMoreImageChange}
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
                                          src={
                                            image
                                              ? image
                                              : "assests/UploadArea.png"
                                          }
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
                                      style={{
                                        padding: "10px",
                                        marginTop: "5px",
                                      }}
                                      onClick={handleUpload}
                                    >
                                      Upload Add MoreImages
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div class="modal-content">
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="NeonUpload Neon-upload-theme-dragdropbox">
                                    <span style={{ color: "white" }}>
                                      PLease Subscription
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* </div> */}
                    </Modal>
                    <button onClick={handleClick} class="btn btn-primary">
                      Add more images
                    </button>
                    {/*---------------- Add more images section -------------------*/}

                    {/* <div class="dropdown">
                      <a
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={"assests/OptionsMenu.png"} alt="" />
                      </a>

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li class="moreoption">More options</li>
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
                    </div> */}
                  </div>
                </div>
              </div>
              {/*-------------------- MoodBoard Images --------------------*/}
              <div class="row mt-4 redboarbtm">
                {uploadImagesData.map((imageSrc, index) => (
                  <div class="col-md-3" key={index}>
                    <div class="sag-top">
                      <div class="sagimagetp">
                        <img src={imageSrc} alt="" className="fixed-size-image"/>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div class="col-md-6">
                  <div class="sag-top">
                    <div class="sagimagetp">
                      <img src={uploadImagesData[0]} alt="" />
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mt-5 mt-lg-0">
                  <div class="sag-top">
                    <div class="sagimagetpRgt">
                      <img src={uploadImagesData[1]} alt="" />
                    </div>
                    <div class="sagimagebtmRgt">
                      <span>
                        <img src={uploadImagesData[2]} alt="" />
                      </span>
                      <span>
                        <img src={uploadImagesData[3]} alt="" />
                      </span>
                    </div>
                  </div>
                </div> */}

                <div class="vision-bar generaterbimg generaterbimgresults">
                  <img src={"assests/MLogoIcon.png"} alt="" />
                  <input
                    type="text"
                    value={promtValue}
                    onChange={handleChange}
                    placeholder="Enter Promt text"
                    style={{
                      border: "none",
                      ":hover": {
                        border: "1px solid white",
                      },
                    }}
                  />
                  <a href class="btn btn-secondary" onClick={handleRenderImage}>
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
                          <img src={"assests/Delete.png"} alt="" /> Landscape
                          size only
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          <img src={"assests/Delete.png"} alt="" /> Portrait
                          size only
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          <img src={"assests/Delete.png"} alt="" /> High
                          resolution (+2880px)
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          <img src={"assests/Delete.png"} alt="" /> Mixed ratios
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*-------------------- MoodBoard Images --------------------*/}
            </div>
          </section>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default FeedBackBoard;
