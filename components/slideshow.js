import React from "react";
import { Fade } from "react-slideshow-image";
import slide from "react-slideshow-image/dist/styles.css";

const FadeExample = () => {
  const fadeImages = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
    "images/pic6.jpg",
    "images/pic7.jpg",
    "images/pic8.jpg",
    "images/pic9.jpg",
    "images/pic10.jpg",
    "images/pic11.jpg",
    "images/pic12.jpg",
    "images/pic13.jpg",
    "images/pic14.jpg",
    "images/pic15.jpg",
    "images/pic16.jpg",
    "images/pic17.jpg",
    "images/pic18.jpg",
    "images/pic19.jpg",
    "images/pic20.jpg",
  ];

  return (
    <div>
      <h2>Fade Effect</h2>
      <div className="slide-container">
        <Fade pauseOnHover={true} arrows={false}>
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
          <div className="each-fade">
            <div>
              <img src={fadeImages[6]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[7]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[8]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[9]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[10]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[11]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[12]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[13]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[14]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[15]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[16]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[17]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[18]} />
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

export default FadeExample;
