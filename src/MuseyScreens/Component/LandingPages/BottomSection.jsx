import React from "react";

const BottomSection = () => {
  return (
    <section className="bottomSection">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Stable Diffusion for not-so-dummies</h2>
            <p>
              Keep it simple. No long carefully, crafted text prompts. Use
              simple natural language input to craft beautiful graphics. Great
              for visual artist, UX/UI designers, graphic designers, event
              planners, and possible even cats. This is AI for everyone.
            </p>
            
          </div>
          <div className="col-md-6 mt-5 mt-lg-0">
            <img src={"assests/stable-diffusion-text-images.png"} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;
