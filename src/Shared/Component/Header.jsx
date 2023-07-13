import React, { useState } from "react";
import "../../Style.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { useLocation } from 'react-router-dom';
import FeedBackBoard from "../../MuseyScreens/Component/UserDashBoard/FeedBackBoard";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname);

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
                <a href class="sign-in">
                  <span class="userName">WW</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <SignUp isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      </section>
    </div>
  );
}

export default Header;
