import React from "react";
import "../../Style.css";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div>
      <input type="checkbox" id="openSideMenu" className="openSideMenu" />
      <label for="openSideMenu" className="menuIconToggle">
        <span>
          <img src={"../../../public/assests/HamburgerMenu.png"} />
        </span>
      </label>
      <nav>
        <ul>
          <li>
            <Link to="#">Menu Item 1</Link>
          </li>
          <li>
            <Link to="#">Menu Item 2</Link>
          </li>
          <li>
            <Link to="#">Menu Item 3</Link>
          </li>
          <li>
            <Link to="#">Menu Item 4</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
