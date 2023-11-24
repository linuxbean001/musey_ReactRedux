import React, { useState, useRef,useEffect } from "react";
import "../../Style.css";
import { Link,useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
   const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 useEffect(() => {
    const closeSidebarOnOutsideClick = (event) => {
      const toggleButton = document.getElementById("openSideMenu");
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target !== toggleButton
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isOpen]);


  const crossStyle = {
    color: "#2afdfd",
    float: "right",
    padding: "10px",
    cursor: "pointer",
    border : "1px solid #2afdfd",
    borderRadius : "14px"
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleClose = () =>{
    setIsOpen(false)
    navigate("/profile")
  }

  const handleCloseSidebar =() =>{
    setIsOpen(false)
    navigate("/uploadboard")
  }


  return (
    <div>
      <input
        type="checkbox"
        id="openSideMenu"
        className="openSideMenu"
        checked={isOpen}
      />
      {isOpen ? null : (
        <label htmlFor="openSideMenu" className="menuIconToggle" onClick={toggleSidebar}>
          <span className="menuIcon mt-3">
            <img src="assests/HamburgerMenu.png" alt="menu" />
          </span>
        </label>
      )}
       <nav>
        <div className="flex mt-3">
           <h4 style={{ color: "#2afdfd", float: "right", marginTop: "10px", fontWeight:"bold",marginLeft:"8px" }}>Moodboard</h4>
           <span style={crossStyle} onClick={closeSidebar}>X</span>
        </div>
        
        <ul className={isOpen ? "sidebarOpen" : "sidebarClosed"}>
          <li onClick={handleClose}>
            <Link to="/profile">Profile
            <hr style={{ marginRight:"20px"}}/></Link>
          </li>
          <li className="mt-4" onClick={handleCloseSidebar}>
            <Link to="/uploadboard">MoodBoard<hr style={{ marginRight:"20px"}}/></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
