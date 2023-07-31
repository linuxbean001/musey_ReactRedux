import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadBoard() {
  const [moodBoardData, setMoodBoardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMoodBoardData, setFilteredMoodBoardData] = useState([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedMoodboardId, setSelectedMoodboardId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const baseUrl = "http://localhost:8000/static/moodimages/";

  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    const combinedData = {
      id: userId,
    };
    const BASE_URL = "http://localhost:8000";
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
          setMoodBoardData(data.moodboards);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Filter the mood boards whenever searchQuery changes
    const filteredData = moodBoardData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMoodBoardData(filteredData);
  }, [searchQuery, moodBoardData]);

  const handleTitleEdit = (moodboardId, title) => {
    setEditedTitle(title);
    setSelectedMoodboardId(moodboardId);
    setEditMode(true); // Enable edit mode when the user clicks on the title
  };

  const handleTitleSave = () => {
    const combinedData = {
      title: editedTitle,
      moodboard_id: selectedMoodboardId,
    };
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/updatemoodboard/`;
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
          setEditMode(false);
          toast.success(data.message);
          // Update the moodBoardData with the updated title
          setMoodBoardData((prevData) =>
            prevData.map((item) =>
              item.moodboard_id === selectedMoodboardId
                ? { ...item, title: editedTitle }
                : item
            )
          );
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setEditMode(false);
      });
  };

  const handleDelete = (moodboardId) => {
    const combinedData = {
      moodboard_id: moodboardId,
    };
    const BASE_URL = "http://localhost:8000";
    const url = `${BASE_URL}/deletemoodboard/`;
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
          toast.success(data.message);
          setMoodBoardData((prevData) =>
            prevData.filter((item) => item.moodboard_id !== moodboardId)
          );
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setEditMode(false);
      });
  };

  return (
    <div>
      <div class="mainWraper">
        <BannerImage />
        <section class="searchsection">
          <div class="container">
            <div class="searchbar" style={{ marginTop: "154px" }}>
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
                      value={searchQuery}
                      onChange={handleChange}
                    />
                    {/* <div class="row">
                      <a
                        href="#"
                        class="btn btn-primary"
                        style={{ borderRadius: "24px" }}
                        onClick={handleSearch}
                      >
                        Search
                      </a>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>

            <div class="searchbox yb-active">
              <h3>Weeding MoodBoards</h3>
              <div class="row" style={{ rowGap: "50px" }}>
                {filteredMoodBoardData.length > 0
                  ? filteredMoodBoardData.map((item, index) => (
                      <div class="col-sm-6 col-lg-3">
                        <div class="your-board-body">
                          <div class="ybgleft">
                            <img src={baseUrl + item.images[0].image_url} />
                          </div>
                          <div class="ybgright">
                            <span>
                              <img src={baseUrl + item.images[1].image_url} />
                            </span>
                            <span>
                              <img src={baseUrl + item.images[2].image_url} />
                            </span>
                          </div>
                        </div>
                        <div class="your-board-footer">
                          {editMode &&
                          item.moodboard_id === selectedMoodboardId ? (
                            <div className="editmode">
                              {/* Input field to edit the title */}
                              <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                              />
                              <button onClick={handleTitleSave}>Save</button>
                            </div>
                          ) : (
                            <div>
                              <a style={{ textDecoration: "none" }}>
                                <h4>{item.title}</h4>
                              </a>
                              {/* "Edit" and "Delete" icons */}
                              <div className="edit-delete-icons">
                                <span
                                  onClick={() =>
                                    handleTitleEdit(
                                      item.moodboard_id,
                                      item.title
                                    )
                                  }
                                >
                                  <i
                                    className="fa fa-pencil"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </span>
                                <span
                                  onClick={() =>
                                    handleDelete(item.moodboard_id)
                                  }
                                >
                                  <i
                                    className="fa fa-trash"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : moodBoardData.map((item, index) => {
                      return (
                        <div class="col-sm-6 col-lg-3">
                          <div class="your-board-body">
                            <div class="ybgleft">
                              <img src={baseUrl + item.images[0].image_url} />
                            </div>
                            <div class="ybgright">
                              <span>
                                <img src={baseUrl + item.images[1].image_url} />
                              </span>
                              <span>
                                <img src={baseUrl + item.images[2].image_url} />
                              </span>
                            </div>
                          </div>
                          <div class="your-board-footer">
                            {editMode &&
                            item.moodboard_id === selectedMoodboardId ? (
                              <div>
                                {/* Input field to edit the title */}
                                <input
                                  type="text"
                                  value={editedTitle}
                                  onChange={(e) =>
                                    setEditedTitle(e.target.value)
                                  }
                                />
                                <button onClick={handleTitleSave}>Save</button>
                              </div>
                            ) : (
                              <div>
                                <a style={{ textDecoration: "none" }}>
                                  <h4>{item.title}</h4>
                                </a>
                                {/* "Edit" and "Delete" icons */}
                                <div className="edit-delete-icons">
                                  <span
                                    onClick={() =>
                                      handleTitleEdit(
                                        item.moodboard_id,
                                        item.title
                                      )
                                    }
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      style={{ cursor: "pointer" }}
                                    ></i>
                                  </span>
                                  <span
                                    onClick={() =>
                                      handleDelete(item.moodboard_id)
                                    }
                                  >
                                    <i
                                      className="fa fa-trash"
                                      style={{ cursor: "pointer" }}
                                    ></i>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                <div class="col-sm-6 col-lg-3">
                  <div class="your-board-body">
                    <div class="addboard-button">
                      <Link to="/addimage">
                        <img src="assests/add-plus.png" />
                      </Link>
                    </div>
                    <div class="ybgleft"></div>
                    <div class="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="your-board-footer">
                    <h4>MoodBoard Title</h4>
                    {/* <p>
                      <span>0 images </span>•<span> 0 renders</span>
                    </p> */}
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

export default UploadBoard;
