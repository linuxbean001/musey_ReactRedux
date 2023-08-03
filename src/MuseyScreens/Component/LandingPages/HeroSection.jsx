import LogIn from "../../../Shared/Component/LogIn";
import React, { useState } from "react";
import "../../../Style.css";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <section className="heroSection">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <h1>A picture is worth a thousand words</h1>
            <p>
              Visual AI rendering is here. Jumpstart your inspiration today.
            </p>

            <button onClick={handleOpenModal} className="btn btn-primary width">
              LogIn
            </button>
             
          </div>
          <LogIn
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
          <div className="col-sm-12 col-lg-6 mt-5 mt-lg-0">
            <div className="heroImageRight">
              <span className="padding">FPO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
