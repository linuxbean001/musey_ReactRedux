import React, { useState, useEffect, useRef } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Modal, ProgressBar, Form, Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ReactEasyEdit from "react-easy-edit";
import ImageRequestBoard from "./ImageRequestBoard";

function AddImageBoard() {
  //--------------------------------------- AddImage Board ---------------------------------------//
  const navigate = useNavigate();
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [selectedImag, setSelectedImag] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [value, setValue] = useState("Untitled Image");
  const [moodBoardDataTitle, setMoodBoardDataTitle] = useState("");
  const isUploadButtonDisableds = selectedImag.length === 0;
  const [itemTitleName, setitemTitleName] = useState("");
  const [progres, setProgres] = useState(0);
  const [showing, setShowing] = useState(localStorage.getItem("showing"));
  const [moodBoardId, setMoodBoardId] = useState("");
  //--------------------------------------- AddImage Board ---------------------------------------//

  //--------------------------------------- FeedBack Board ---------------------------------------//
  const [dataMood, setDataMood] = useState(null);
  const [uploadImagesData, setUploadImagesData] = useState([]);
  const [promtValue, setPromtValue] = useState("");
  const [reRenderdImages, setReRenderdImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showExtraComponent, setShowExtraComponent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkedObjects, setCheckedObjects] = useState([]);
  const [finalSelectedObjects, setFinalSelectedObjects] = useState([]);
  const [showSadEmojiComponent, setShowSadEmojiComponent] = useState(false);
  const [addMoreComponent, setAddMoreComponent] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [addMoreImage, setAddMoreImage] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const isUploadButtonDisabled = selectedImages.length === 0;
  const isPromptButtonDisabled = promtValue.length === 0;
  const initialImageObject =
    (location.state && location.state.imageObject) || [];
  const initialRenderedImages =
    (location.state && location.state.renderdimages) || [];

  const [imageObject, setImageObject] = useState(
    initialImageObject ? initialImageObject : []
  );

  const [renderdimages, setRenderdImage] = useState(
    initialRenderedImages ? initialRenderedImages : []
  );
  //--------------------------------------- FeedBack Board ---------------------------------------//

  //--------------------------------------- AddImage Board ---------------------------------------//
  const handleSave = (newValue) => {
    moodBoardDataTitle.map((items) => {
      if (items.title === newValue) {
        NotificationManager.error(
          "This title already exists in the moodBoard",
          "",
          3000
        );
        setIsModalOpens(false);
      } else {
        setValue(newValue);
      }
    });
  };

  useEffect(() => {
    if (Array.isArray(moodBoardDataTitle)) {
      moodBoardDataTitle.map((items) => {
        setitemTitleName(items.title);
      });
    }
  }, [moodBoardDataTitle]);

  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    const combinedData = {
      id: userId,
    };

    const BASE_URL = "https://musey.ai/api";
    const url = `${BASE_URL}/usermoodboards/`;
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
          setMoodBoardDataTitle(data.moodboards);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleCancel = () => {};

  const handleValidate = (newValue) => {
    return true;
  };

  const handleUpload = () => {
    const Id = localStorage.getItem("UserId");
    const combinedData = {
      user_id: Id,
      images: selectedImag,
      title: value,
    };
    const BASE_URL = "https://musey.ai/api";
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
          localStorage.removeItem("MoodBoardData")
          setDataMood(null)
          setShowing(false);
          localStorage.setItem("showing", false);
          localStorage.setItem(
            "uploadedimagesdata",
            JSON.stringify(data.uploadedimages.images)
          );
          setMoodBoardId(data.moodid);
          setUploadImagesData(data.uploadedimages.images);
          NotificationManager.success("Upload Successful", "", 2000);
          setSelectedImag([]);
          setIsModalOpens(false);
        } else if (
          data.error ===
          "Free user can only add 2 moodboard, please purchase prop plan to add more moodboards"
        ) {
          NotificationManager.error(data.error, "", 2000);
          navigate("/subscription");
        } else if (data.error === "Moodboard Already exists for user") {
          NotificationManager.error(data.error, "", 2000);
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
      NotificationManager.error(
        "Only up to four images can be uploaded",
        "",
        2000
      );
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
      setSelectedImag(base64Images);
      setSelectedFile(Array.from(files));
      setProgres(0);

      const interval = setInterval(() => {
        setProgres((prevProgres) => {
          if (prevProgres >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgres + 1;
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

  const handleOpenModals = () => {
    if (itemTitleName != value) {
      setIsModalOpens(true);
    } else {
      NotificationManager.error("Please Change the Moodboard Name", "", 3000);
    }
  };

  const handleCloseModals = () => {
    setIsModalOpens(false);
  };

  const progressBarStyle = {
    height: "10px",
  };
  //--------------------------------------- AddImage Board ---------------------------------------//

  //--------------------------------------- FeedBack Board ---------------------------------------//
  const handleAdvancedOptionClick = (dimension) => {
    setSelectedDimension(dimension);
  };

  useEffect(() => {
    const storedMoodboardString = localStorage.getItem("MoodBoardData");
    if (storedMoodboardString) {
      const storedMoodboard = JSON.parse(storedMoodboardString);
      setDataMood(storedMoodboard);
    }
  }, []);

  const getDimensionsForOption = (dimensionOption) => {
    const dimensions = {
      landscape: { width: 1024, height: 768 },
      portrait: { width: 768, height: 1024 },
      high_resolution: { width: 2880, height: 2160 },
      mixed_ratios: { width: 1280, height: 720 },
    };

    return dimensions[dimensionOption] || null;
  };

  const selectedDimensions = getDimensionsForOption(selectedDimension);

  useEffect(() => {
    if (location.state && location.state.imageObject) {
      setImageObject(location.state.imageObject);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.renderdimages) {
      setRenderdImage(location.state.renderdimages);
    }
  }, [location.state]);

  useEffect(() => {
    if (inputRef.current) {
      const yOffset = -50;
      const elementPosition = inputRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const baseUrl = "https://www.musey.ai/api/static/moodimages/";

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageObject.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCheckboxChange = (object) => {
    const updatedCheckedObjects = [...checkedObjects];

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

    setCheckedObjects(updatedCheckedObjects);
  };

  const handleDoneClick = () => {
    setIsLoading(true);
    setIsModalOpen(false);
    NotificationManager.success(
      "Re-Render image response is processing...",
      "",
      2000
    );
    const allSelectedObjects = checkedObjects.flat();
    setFinalSelectedObjects(allSelectedObjects);
    setCheckedObjects([]);
    setCurrentImageIndex(0);

    //----- re-render API -----//
    const Id = localStorage.getItem("UserId");
    const userRole = localStorage.getItem("user_role");
    const imageData = imageObject.map((image, index) => {
      const imageID = image.image_id;
      const imageURL = image.imageurl;
      const objects = image.imgobjects.filter((object) =>
        checkedObjects[index]?.includes(object)
      );

      if (checkedObjects[index]?.includes("color")) {
        objects.push("color");
      }

      const selectedObjects =
        objects.length > 0 ? objects : ["No objects selected"];

      return {
        image_id: imageID,
        image_url: imageURL,
        image_objects: selectedObjects,
      };
    });

    const combinedData = {
      userid: Number(Id),
      moodid: Number(moodBoardId),
      userrole: userRole,
      prompt: promtValue,
      images: Array.isArray(imageData) ? imageData : [],
    };
    const BASE_URL = "https://musey.ai/api";
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
          NotificationManager.success("Re-Render image Succesfully", "", 2000);
          setReRenderdImage(data.generatedimages);
        } else {
          NotificationManager.error(data.error, "", 2000);
        }
      })
      .catch((error) => {
        console.log("error", error);
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

  const handleChange = (event) => {
    setPromtValue(event.target.value);
  };

  const handleRenderImage = () => {
    setIsLoading(true);
    const Id = localStorage.getItem("UserId");
    const userRole = localStorage.getItem("UserRole");
    const imagesData = uploadImagesData;

    const combinedData = {
      userid: Number(Id),
      moodid: Number(moodBoardId),
      userrole: userRole,
      prompt: promtValue,
      images: Array.isArray(imagesData) ? imagesData : [],
    };
    const BASE_URL = "https://musey.ai/api";
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
          setPromtValue("");
          setRenderdImage(data.generatedimages);
          setImageObject(data.imageswithobjects);
        } else if (data.status === "error") {
          NotificationManager.error(data.error, "", 2000);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  const handleClickAddMoreImages = () => {
    setAddMoreComponent(true);
  };

  const CloseModal = () => {
    setAddMoreComponent(false);
    setSelectedImages("");
  };

  const handleAddMoreImageChange = (event) => {
    const userRole = localStorage.getItem("UserRole");
    const files = event.target.files;
    const imagesArray = [];
    const maxImages = 4;

    if (files.length > maxImages) {
      NotificationManager.error(
        "Only up to four images can be uploaded",
        "",
        2000
      );
      return;
    }

    if (userRole === "free" && uploadImagesData.length + files.length > 8) {
      NotificationManager.error(
        "Free users can only upload up to 8 images",
        "",
        2000
      );
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
      setSelectedFiles(Array.from(files));
      setProgress(0);

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

  const handleUploadMoreImages = () => {
    const Id = localStorage.getItem("UserId");
    const combinedData = {
      image_url: selectedImages,
      userid: Id,
      moodboard_id: moodBoardId,
    };
    const BASE_URL = "https://musey.ai/api";
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
        NotificationManager.success("Image Upload Successful", "", 2000);
        setSelectedImages([]);
        const dataMore = data.uploadedimages.images;
        const AddMoreImage = data.uploadedimages.images;
        setUploadImagesData((prevData) => [...prevData, ...AddMoreImage]);
        //-------------------- add more new data -------------------//
        const storedData =
          JSON.parse(localStorage.getItem("uploadedimagesdata")) || [];
        const updatedData = [...storedData, ...dataMore];
        localStorage.setItem("uploadedimagesdata", JSON.stringify(updatedData));
        //-------------------- add more new data -------------------//
        setSelectedImages("");
        setAddMoreComponent(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedimagesdata");
    if (storedImages) {
      setUploadImagesData(JSON.parse(storedImages));
    }
  }, []);

  //--------------------------------------- FeedBack Board ---------------------------------------//

  console.log("uploadImagesData",uploadImagesData)
  console.log("first",dataMood)

  return (
    <div style={{ marginBottom: "6rem" }}>
      {isLoading ? (
        <ImageRequestBoard />
      ) : (
        <div className="mainWraper">
          <BannerImage />

          {showing === "true" ? (
            <>
              {/*------------------------------------- AddImage Board -----------------------------------*/}
              <section className="searchsection">
                <div className="container-fluid">
                  <div className="searchbar">
                    <p className="edittitle">Enter MoodBoard Title</p>
                    <div className="untitleboard">
                      <ReactEasyEdit
                        type="text"
                        onSave={handleSave}
                        onValidate={handleValidate}
                        value={value}
                        saveButtonLabel="Save"
                        attributes={{ placeholder: "MoodBoard Name" }}
                        onClick={() => setValue("")}
                      />
                    </div>
                  </div>
                  <div className="start-adding-grid">
                    <div className="popupbox adpop">
                      <div>
                        <p className="fontsize">
                          Start adding some images to this board
                        </p>
                        <button
                          className="btn btn-primary width"
                          onClick={handleOpenModals}
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

                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={isModalOpens}
                      className="modal open addImage"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Upload files</h4>
                            <span
                              onClick={handleCloseModals}
                              className="cross"
                              data-bs-dismiss="modal"
                            >
                              <img src={"assests/close.png"} alt="Close" />
                            </span>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="NeonUpload Neon-upload-theme-dragdropbox">
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
                                  {selectedImag.length > 0 ? (
                                    selectedImag.map((image, index) => (
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
                              <div className="col-md-6">
                                <div className="randomeimgbox">
                                  {selectedImag.map((image, index) => (
                                    <div className="progresss" key={index}>
                                      <p>{selectedFile[index].name}</p>
                                      <ProgressBar
                                        now={progres}
                                        style={progressBarStyle}
                                        label={`${progres}%`}
                                        visuallyHidden
                                      />
                                    </div>
                                  ))}
                                  <br />
                                  <div>
                                    <button
                                      className="btn btn-primary width"
                                      style={{
                                        padding: "10px",
                                        marginTop: "5px",
                                      }}
                                      onClick={handleUpload}
                                      disabled={isUploadButtonDisableds}
                                    >
                                      Upload Images
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </section>
              {/*------------------------------------- AddImage Board -----------------------------------*/}
            </>
          ) : (
            <>
              {/*------------------------------------- FeedBack Board -----------------------------------*/}
              <section className="rendering-board-section">
                <div className="container-fluid">
                  <div className="row mt-4">
                    {renderdimages.length > 0 ? (
                      <div className="col-md-12">
                        <p className="imagemsg">Test renderings board</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {reRenderdImages.length > 0
                      ? reRenderdImages.map((image, index) => (
                          <div className="col-6 col-xl-3" key={index}>
                            <div className="showreslutboximg">
                              <img src={image} alt="" />
                              <a
                                onClick={() => handleShow(image)}
                                href
                                className="onovrshow"
                              >
                                <img src={"assests/download.png"} alt="" />
                              </a>
                            </div>
                          </div>
                        ))
                      : renderdimages.length > 0 &&
                        renderdimages.map((image, index) => (
                          <div className="col-6 col-xl-3" key={index}>
                            <div className="showreslutboximg">
                              <img src={image} alt="" />
                              <a
                                onClick={() => handleShow(image)}
                                href
                                className="onovrshow"
                              >
                                <img src={"assests/download.png"} alt="" />
                              </a>
                            </div>
                          </div>
                        ))}

                    <div className="col-md-12">
                      <div className="satisfybox">
                        {renderdimages.length > 0 ? (
                          <div>
                            <p>Are you satisfied with these results?</p>
                            <div className="satisfyicon">
                              <a href>
                                <img src={"assests/satisfy.png"} alt="" />
                              </a>
                              <a href onClick={handleUnsatisfyClick}>
                                <img src={"assests/Unsatisfy.png"} alt="" />
                              </a>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {showExtraComponent && (
                          <div>
                            <p className="mt-4">
                              Sorry to hear that. Let’s see if we can improve
                              those results.
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
                    <Modal
                      show={isModalOpen}
                      className="modal continueEditImg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <span
                        onClick={handleCloseModal}
                        className=""
                        data-bs-dismiss="modal"
                      >
                        <img
                          src={"assests/close.png"}
                          alt="Close"
                          style={{ float: "right" }}
                        />
                      </span>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header border-bottom-0">
                            <h4 className="modal-title">
                              What did you like about this image?
                            </h4>
                          </div>

                          {imageObject.length > 0 && (
                            <>
                              <div
                                key={currentImage.image_id}
                                className="modal-body"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="continuemodalboximg">
                                      <img
                                        src={baseUrl + currentImage.imageurl}
                                        alt={`Image ${currentImage.image_id}`}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div>
                                      {currentImage.imgobjects.map(
                                        (object, index) => (
                                          <div
                                            className="checkedfrm"
                                            key={index}
                                          >
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
                                      <div className="checkedfrm">
                                        <label className="containercb">
                                          <input
                                            type="checkbox"
                                            onChange={() =>
                                              handleCheckboxChange("color")
                                            }
                                            checked={checkedObjects[
                                              currentImageIndex
                                            ]?.includes("color")}
                                          />
                                          <span className="checkmark"></span>
                                        </label>
                                        <span>color</span>
                                      </div>
                                    </div>

                                    <div id="Other" style={{ display: "none" }}>
                                      <input
                                        type="text"
                                        placeholder="Triangle pattern"
                                        name=""
                                      />
                                    </div>
                                    <div className="c-btb-wrap">
                                      {!isLastImage && (
                                        <a
                                          href
                                          className="btn btn-primary"
                                          onClick={showNextImage}
                                        >
                                          Next image
                                        </a>
                                      )}
                                      {isLastImage && (
                                        <a
                                          href
                                          className="btn btn-primary primary-border"
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
                        </div>
                      </div>
                    </Modal>

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
                  <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                      <div className="trbwrap">
                        <Modal
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={addMoreComponent}
                          className="modal open addImage"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h4 className="modal-title">Upload files</h4>
                                <span
                                  onClick={CloseModal}
                                  className=""
                                  data-bs-dismiss="modal"
                                >
                                  <img src={"assests/close.png"} alt="Close" />
                                </span>
                                {/* </a> */}
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="NeonUpload Neon-upload-theme-dragdropbox">
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
                                  <div className="col-md-6">
                                    <div className="randomeimgbox">
                                      {Array.isArray(selectedImages) &&
                                        selectedImages.length > 0 &&
                                        selectedImages.map((image, index) => (
                                          <div
                                            className="progresss"
                                            key={index}
                                          >
                                            <p>
                                              {selectedFiles[index]
                                                ? selectedFiles[index].name
                                                : "Unnamed File"}
                                            </p>
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
                                        className="btn btn-primary width"
                                        style={{
                                          padding: "10px",
                                          marginTop: "5px",
                                        }}
                                        onClick={handleUploadMoreImages}
                                        disabled={isUploadButtonDisabled}
                                      >
                                        Upload Add MoreImages
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>

                        <button
                          onClick={handleClickAddMoreImages}
                          className="btn btn-primary"
                        >
                          Add more images
                        </button>
                      </div>
                    </div>
                  </div>
                  {/*----MoodBoard Images ----*/}
                  <div className="row mt-4 redboarbtm">
                    {dataMood != null ? (
                      <>
                        {dataMood.images &&
                          dataMood.images.map((image, index) => (
                            <div className="col-md-3" key={index}>
                              <div className="sag-top1">
                                <div className="sagimagetp">
                                  <img
                                    src={baseUrl + image.image_url}
                                    alt={`Image ${index}`}
                                    className="fixed-size-image"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <>
                        {uploadImagesData.map((imageSrc, index) => (
                          <div className="col-md-3" key={index}>
                            <div className="sag-top1">
                              <div className="sagimagetp">
                                <img
                                  src={baseUrl + imageSrc.image_url}
                                  alt={`Image ${index}`}
                                  className="fixed-size-image"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    <div style={{ marginTop: "235px" }}>
                      <div
                        ref={inputRef}
                        className="vision-bar generaterbimg generaterbimgresults"
                      >
                        <img src={"assests/MLogoIcon.png"} alt="" />
                        <Form.Control
                          ref={inputRef}
                          type="text"
                          value={promtValue}
                          onChange={handleChange}
                          placeholder="Firstly Enter Promt text"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            ":hover": {
                              border: "1px solid white",
                            },
                          }}
                        />
                        <Button
                          className="btn btn-secondary"
                          onClick={handleRenderImage}
                          style={{
                            backgroundColor: "#2afdfd",
                            color: "black",
                            border: "none",
                          }}
                          disabled={isPromptButtonDisabled}
                        >
                          Generate
                        </Button>
                      </div>
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
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu2"
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                handleAdvancedOptionClick("landscape")
                              }
                            >
                              <img src={"assests/Delete.png"} alt="" />{" "}
                              Landscape size only
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                handleAdvancedOptionClick("portrait")
                              }
                            >
                              <img src={"assests/Delete.png"} alt="" /> Portrait
                              size only
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                handleAdvancedOptionClick("high_resolution")
                              }
                            >
                              <img src={"assests/Delete.png"} alt="" /> High
                              resolution (+2880px)
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                handleAdvancedOptionClick("mixed_ratios")
                              }
                            >
                              <img src={"assests/Delete.png"} alt="" /> Mixed
                              ratios
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*-- MoodBoard Images --*/}
                </div>
              </section>
              {/*------------------------------------- FeedBack Board -----------------------------------*/}
            </>
          )}
        </div>
      )}
      <NotificationContainer />
    </div>
  );
}

export default AddImageBoard;
