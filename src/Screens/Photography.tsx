import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Photography.scss";

function Photography(props) {
  const springPhotos = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });

  const imageUrls = [
    "https://i.imgur.com/f5Nuribl.jpg",
    "https://i.imgur.com/4m20dvDl.jpg",
    "https://i.imgur.com/YpMbroel.jpg",
    "https://i.imgur.com/jnzkbCLl.jpg",
    "https://i.imgur.com/72a0EKrl.jpg",
    "https://i.imgur.com/jZK4Lt2l.jpg",
    "https://i.imgur.com/oy9Yoiul.jpg",
    "https://i.imgur.com/lpPIhBPl.jpg",
    "https://i.imgur.com/o75JfjFl.jpg",
    "https://i.imgur.com/61yc0sOl.jpg",
    "https://i.imgur.com/Egu2Ankl.jpg",
    "https://i.imgur.com/h4NIYNJl.jpg",
  ];

  function renderImages() {
    return (
      <>
        <animated.div style={springPhotos} className="gallery-wrapper">
          {imageUrls.map((url) => (
            <img src={url} />
          ))}
        </animated.div>
      </>
    );
  }

  return (
    <>
      <div className="photography-wrapper">{renderImages()}</div>
      <button
        className="back-btn --negative"
        onClick={() => props.switchScreen("Landing")}
      >
        Back
      </button>
    </>
  );
}

export default Photography;
