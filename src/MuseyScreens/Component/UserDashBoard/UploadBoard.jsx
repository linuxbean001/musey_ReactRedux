import React, { useState, useEffect } from "react";
import "../../../Style.css";
import BannerImage from "../../../Shared/Component/BannerImage";
import { Link } from "react-router-dom";

function UploadBoard() {
  const [moodBoardData, setMoodBoardData] = useState([]);
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
        console.log("data",data)
        console.log("UserMoodboard", data.moodboards[0].images[0].image_url);
        if (data.status === "success") {
          setMoodBoardData(data.moodboards);
          
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

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
                    />
                    <div class="row">
                      <a
                        href=""
                        class="btn btn-primary"
                        style={{ borderRadius: "24px" }}
                      >
                        Search
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="searchbox yb-active">
              <h3>Your boards</h3>
              <div class="row">
                {moodBoardData.map((item, index) => {
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
                        <a href="/yourboard" style={{ textDecoration: "none" }}>
                          <h4>{item.title}</h4>
                          {/* <p>
                            <span>----- </span>•<span> ------</span>
                          </p> */}
                        </a>
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
                    <h4>Board Title</h4>
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
    </div>
  );
}

export default UploadBoard;
