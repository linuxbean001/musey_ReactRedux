import React, { useState, useEffect } from "react";
import "../../Style.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { useLocation } from "react-router-dom";
import FeedBackBoard from "../../MuseyScreens/Component/UserDashBoard/FeedBackBoard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserOpen, setUserIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userActive, setUserActive] = useState("");
  const [editMode, setEditMode] = useState(false); // State variable to track edit mode

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
  }, []);

  const toggleDropdown = () => {
    setUserIsOpen(!isUserOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    const BASE_URL = "http://localhost:8000";
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
        console.log("Add more", data.success);
        if(data.success === "User Updated Successfully"){
          toast.success(data.success);
          localStorage.setItem("UserName", data.userName);
          setEditMode(false);
        } else {
          toast.error("something went wrong updating user")
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
    toast.success("Logout Successfully")
    setUserIsOpen(false)
    // Redirect to the main page (assuming the main page path is "/")
    setTimeout(() => {
    window.location.href = "/";
    }, 5000);
  };

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <section className="Menusection">
        <div className="container">
          <div className="menuHeader">
            <Sidebar />
            <div>
              <Link to="#" className="navbar-brand">
                <img src={"assests/logo.png"} alt="Logo" />
              </Link>
            </div>
            <div>
              {pathname === "/" ? (
                <button onClick={handleOpenModal} className="sign-in">
                  SignUp
                </button>
              ) : (
                <div>
                  <a href className="sign-in" onClick={toggleDropdown}>
                    <span className="userName userName-container">
                      WW
                    </span>
                  </a>
                  {isUserOpen && (
                    <div className="dropdown-content">
                      {/* Add the dropdown content here */}
                      <div id="login-container">
                        <div className="profile-img"></div>
                        <h1>{userName}</h1>
                        <div className="description">
                          <div className="grid-thirds">
                            <div>UserId</div>
                            <div>:</div>
                            <div>{userId}</div>
                            <br />
                          </div>
                          <br />
                          <div className="design">{editMode ? (
                        <input
                          type="text"
                          value={userName}
                          onChange={handleUserNameChange}
                        />
                      ) : (
                        userName
                      )}</div>
                          <br />
                          <div className="design">{userEmail}</div>
                          <br />
                          <div className="design">{userRole}</div>
                          <br />
                          <div className="design">{userActive}</div>
                        </div>
                        <div className="social">
                          {editMode ? (
                            <button onClick={handleUserNameSave}>Save</button>
                          ) : (
                            <button onClick={handleUserName}>Edit Name</button>
                          )}
                        </div>
                        <br/>
                        <br/>
                        <div className="social1">
                            <button onClick={handleLogout}>LogOut</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <SignUp isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      </section>
      <ToastContainer />
    </div>
  );
}

export default Header;
