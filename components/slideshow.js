import React from "react";
import { Fade } from "react-slideshow-image";
import slide from "react-slideshow-image/dist/styles.css";

const BgFade = () => {
  const fadeImages = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
    "images/pic6.jpg",
  ];

  return (
    <div>
      <h2>Fade Effect</h2>
      <div className="slide-container">
        <Fade pauseOnHover={false} arrows={false}>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[1]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[3]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[4]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[5]} />
            </div>
          </div>
        </Fade>
      </div>
      <style jsx global>{`
        .each-fade {
          display: flex;
          width: 100%;
        }

        .each-fade > div {
          width: 100%;
        }

        .each-fade > div img {
          /* Set rules to fill background */
          min-height: 100%;
          min-width: 1024px;

          /* Set up proportionate scaling */
          width: 100%;
          height: auto;

          /* Set up positioning */
          position: fixed;
          top: 0;
          left: 0;
          z-index: -2;
        }
      `}</style>
    </div>
  );
};

export default BgFade;
