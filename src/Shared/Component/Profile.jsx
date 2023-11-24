import React, { useEffect, useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../MuseyScreens/Contexts/AuthContext";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import "../../Style.css";


function Profile() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userActive, setUserActive] = useState("");
  const [editMode, setEditMode] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Fetch the data from localStorage
    const userId = localStorage.getItem("UserId");
    const userName = localStorage.getItem("UserName");
    const userEmail = localStorage.getItem("UserEmail");
    const userRole = localStorage.getItem("UserRole");
    const userActive = localStorage.getItem("UserActive");

    // Update the state variables with the fetched data
    setUserId(userId);
    setUserName(userName);
    setUserEmail(userEmail);
    setUserRole(userRole);
    setUserActive(userActive);

    // Listen for changes in user data from AuthContext
    // Check if the URL contains the "accesstoken" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accesstoken");
    if (accessToken) {
      // If the access token is present, call handleGoogleLogin
      // from the AuthContext to handle the Google login flow
      authContext.handleGoogleLogin();
    }
  }, [authContext]);

  const handleUserName = () => {
    setEditMode(true);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserNameSave = () => {
    const combinedData = {
      id: userId,
      name: userName,
    };
    const BASE_URL = "https://musey.ai/api";
    const url = `${BASE_URL}/userupdate/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "User Updated Successfully") {
          NotificationManager.success(data.success, "", 2000);
          localStorage.setItem("UserName", data.userName);
          setEditMode(false);
        } else {
          NotificationManager.error("something went wrong updating user", "", 2000);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    localStorage.setItem("UserName", userName);
    setEditMode(false);
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("UserActive");

    setTimeout(() => {
      NotificationManager.success("Logout Successfully", "", 6000);
    }, 2000)

    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", marginTop: "5rem", marginBottom:"15rem" }}
    >
      <Modal.Dialog>
        <div className="content">
          <Modal.Header>
            <Modal.Title>
              <div class="profile-img"></div><b style={{ fontFamily: "fangsong" }}>💻 User Information</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ fontFamily: "fangsong" }}>
              <label>
                <b>UserId : </b>
                {userId}{" "}
              </label>
              <br />
              <label>
                <b>Full Name : </b>{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                ) : (
                  userName
                )}
              </label>
              <br />
              <label>
                <b>Email : </b> {userEmail}
              </label>
              <br />
              <label>
                <b>Role : </b> {userRole}
              </label>
            </div>
          </Modal.Body>

          <Modal.Footer>
            {editMode ? (
              <Button
                onClick={handleUserNameSave}
                style={{ backgroundColor: "#322837", color: "white" }}
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={handleUserName}
                style={{ backgroundColor: "#322837", color: "white" }}
              >
                Edit Name
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleLogout}
              style={{ backgroundColor: "#322837", color: "white" }}
            >
              LogOut
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Dialog>
      <NotificationContainer />
    </div>
  );
}

export default Profile;
