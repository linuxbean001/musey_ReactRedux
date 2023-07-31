import React from "react";

const MidSection = () => {
  return (
    <section className="midSection">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>AI, AI, AI why so complicated</h2>
            <p>
              Making your vision come to life should be easy. When you find
              yourself in a creative slump, the last thing you want to worry
              about is crafting together a complicated prompt.
            </p>
            <p>
              Build a museboard, tell Musey what you want to do, and that’s it.
              Within minutes your brilliant visual input combined with your
              simple text prompt creates high quality graphics to get your
              creative flow back in order.
            </p>
          </div>
          <div className="col-md-6 mt-5 mt-lg-0">
            <div className="grid-wrapper-Right">
              <div className="gridLeft">
                <img src={"assests/gallary-pic02.png"} alt="" />
              </div>
              <div className="gridRight">
                <div className="grRtop">
                  <img src={"assests/gallary-pic01.png"} alt="" />
                </div>
                <div className="grRbtm">
                  <div>
                    <img src={"assests/gallary-pic05.png"} alt="" />
                  </div>
                  <div className="grRbtmright">
                    <span>
                      <img src={"assests/gallary-pic03.png"} alt="" />
                    </span>
                    <span>
                      <img src={"assests/gallary-pic04.png"} alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidSection;
