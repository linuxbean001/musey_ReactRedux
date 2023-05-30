import React, { useState } from "react";
import "../../Style.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="Menusection">
      <div className="container">
        <div className="menuHeader">
          <Sidebar />
          <div>
            <Link to="#" className="navbar-brand">
              <img src={"../../../public/assests/logo.png"} alt="Logo" />
            </Link>
          </div>
          <div>
            <button onClick={openModal} className="sign-in">
              Sign in
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SignUp onClose={closeModal} />
      )}
    </section>
  );
}

export default Header;
