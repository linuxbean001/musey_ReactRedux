import React, { useState } from "react";
import "../../Style.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const crossStyle = {
    color: "#2afdfd",
    float: "right",
    padding: "10px",
    cursor: "pointer"
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

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
          <span className="menuIcon">
            <img src="assests/HamburgerMenu.png" alt="menu" />
          </span>
        </label>
      )}
      <nav>
        <span style={crossStyle} onClick={closeSidebar}>X</span>
        <ul className={isOpen ? "sidebarOpen" : "sidebarClosed"}>
          <li>
            <Link to="#">Boards</Link>
          </li>
          <li>
            <Link to="#">Favorites</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
          </li>
          <li>
            <Link to="#">Payments</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
