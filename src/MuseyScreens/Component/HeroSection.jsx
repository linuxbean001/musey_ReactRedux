import React from 'react';

const HeroSection = () => {
  return (
    <section className="heroSection">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <h1>A picture is worth a thousand words</h1>
            <p>Visual AI rendering is here. Jumpstart your inspiration today.</p>
            <a href="#" className="btn btn-primary">
              Get Started for free
            </a>
          </div>
          <div className="col-sm-12 col-lg-6 mt-5 mt-lg-0">
            <div className="heroImageRight">
              <span>FPO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
