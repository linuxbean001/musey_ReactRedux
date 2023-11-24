import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ImageRequestBoard from "./ImageRequestBoard";

function UploadBoard() {
  const [moodBoardData, setMoodBoardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMoodBoardData, setFilteredMoodBoardData] = useState([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedMoodboardId, setSelectedMoodboardId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const baseUrl = "https://www.musey.ai/api/static/moodimages/";
  const navigate = useNavigate();

  const handleUpdateMoodBoard = (item) => {
    localStorage.setItem("MoodBoardData", JSON.stringify(item));
    navigate("/generateImage");
  };

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
    const filteredData = moodBoardData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMoodBoardData(filteredData);
  }, [searchQuery, moodBoardData]);

  const handleTitleEdit = (moodboardId, title) => {
    setEditedTitle(title);
    setSelectedMoodboardId(moodboardId);
    setEditMode(true);
  };

  const handleTitleSave = () => {
    const combinedData = {
      title: editedTitle,
      moodboard_id: selectedMoodboardId,
    };
    const BASE_URL = "https://musey.ai/api";
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
          NotificationManager.success(data.message,"",2000);
          setMoodBoardData((prevData) =>
            prevData.map((item) =>
              item.moodboard_id === selectedMoodboardId
                ? { ...item, title: editedTitle }
                : item
            )
          );
        } else {
          NotificationManager.error(data.error,"",2000);
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
    const BASE_URL = "https://musey.ai/api";
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
          NotificationManager.success(data.message,"",2000);
          setMoodBoardData((prevData) =>
            prevData.filter((item) => item.moodboard_id !== moodboardId)
          );
        } else {
          NotificationManager.error(data.error,"",2000);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setEditMode(false);
      });
  };

  const handleMoveNextPage =() =>{
    console.log("first")
    localStorage.setItem('showing', true);
  }

  return (
    <div style={{marginBottom:"2rem"}}>
      <div className="mainWraper">
        <BannerImage />
        <section className="searchsection">
          <div className="container-fluid">
            <div className="searchbar mb-5" style={{ marginTop: "154px" }}>
              <form action="">
                <div className="formContrl">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button
                        id=""
                        type="submit"
                        className="btn btn-link text-warning"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                    <input
                      type="search"
                      placeholder="Search your boards"
                      aria-describedby="button-addon2"
                      className="form-control border-0 bg-light"
                      value={searchQuery}
                      name="searchQuery"
                      onChange={handleChange}
                      style={{boxShadow:"none"}}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="searchbox yb-active">
              <h3>Weeding MoodBoards</h3>
              <div className="row" style={{ rowGap: "50px", marginBottom: "70px" }}>
                {filteredMoodBoardData.length > 0
                  ? (filteredMoodBoardData || moodBoardData).map(
                      (item, index) => (
                        <div className="col-sm-6 col-lg-3" key={item.moodboard_id}>
                          <div className="your-board-body">
                            <div
                              className="addboard-button"
                            >
                              <div onClick={() => handleUpdateMoodBoard(item)}>
                              <Link>
                                <i
                                  className="fa fa-pencil"
                                  style={{
                                    cursor: "pointer",
                                    color: "#2afdfd",
                                  }}
                                ></i>
                              </Link>
                              </div>
                            </div>
                            <div className="ybgleft">
                              {item.images && item.images[0] && (
                                <img src={baseUrl + item.images[0].image_url} />
                              )}
                            </div>
                            <div className="ybgright">
                              <span>
                                {item.images && item.images[1] && (
                                  <img
                                    src={baseUrl + item.images[1].image_url}
                                  />
                                )}
                              </span>
                              <span>
                                {item.images && item.images[2] && (
                                  <img
                                    src={baseUrl + item.images[2].image_url}
                                  />
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="your-board-footer">
                            {editMode &&
                            item.moodboard_id === selectedMoodboardId ? (
                              <div className="editmode">
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
                      )
                    )
                  : ""}

                {/* Moodboard Create Section */}
                <div className="col-sm-6 col-lg-3">
                  <div className="your-board-body">
                    <div className="addboard-button" onClick={handleMoveNextPage}>
                      <Link to="/addimage">
                        <img src="assests/add-plus.png" />
                      </Link>
                    </div>
                    <div className="ybgleft"></div>
                    <div className="ybgright">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="your-board-footer">
                    <h4>MoodBoard Title</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default UploadBoard;
