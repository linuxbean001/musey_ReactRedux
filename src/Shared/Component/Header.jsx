import React, { useState } from "react";
import "../../Style.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              <button onClick={handleOpenModal} className="sign-in">
                Sign in
              </button>
            </div>
          </div>
        </div>

        <SignUp isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
      </section>
    </div>
  );
}

export default Header;
