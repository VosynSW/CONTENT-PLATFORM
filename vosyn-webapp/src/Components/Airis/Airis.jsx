import React, { useState, useEffect } from "react";

import "./Airis.css";

const Airis = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [renderResponse, setRenderResponse] = useState(false);
  const [showResponse, setShowResponse] = useState(true);
  const [showDiv, setShowDiv] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }, []);

  let dummyResponse = [
    {
      id: 1,
      type: "text",
      data: "Here is a video about traditional clothing in Japan. Enjoy!",
    },
    {
      id: 2,
      type: "video",
      data: "https://www.youtube.com/embed/watch?v=uQX8UwV87Os",
    },
  ];

  const mountedStyle = [
    {
      animation: "airis-in 250ms ease-in",
    },
    {
      animation: "airis-render-in 250ms ease-in",
    },
  ];

  const unmountedStyle = [
    {
      animation: "airis-out 270ms ease-out",
      animationFillMode: "forwards",
    },
    {
      animation: "airis-render-out 250ms ease-out",
      animationFillMode: "forwards",
    },
  ];

  const getResponse = () => {
    return dummyResponse.map((response) => {
      if (response.type === "text") {
        return (
          <div className="airis-response-text" key={response.id}>
            {response.data}
          </div>
        );
      } else if (response.type === "video" && showResponse) {
        return (
          <div
            style={renderResponse ? mountedStyle[1] : unmountedStyle[1]}
            className="airis-response-video"
            key={response.id}
          >
            <div className="airis-response-video-title">
              <h1> AIRIS Recommended</h1>
              <i
                onClick={() => setShowResponse(false)}
                className="fa-solid fa-close"
              ></i>
            </div>
            <iframe
              src={response.data}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <button onClick={console.log("redirect to Vosyn Video Page")}>
              Start Watching
            </button>
          </div>
        );
      }
    });
  };

  return (
    <div className="airis-container">
      <div
        style={showDiv ? mountedStyle[0] : unmountedStyle[0]}
        className="airis-main"
      >
        {showPopup && (
          <div className="airis-popup">
            Hey! I’m Airis, your personal AI companion.
          </div>
        )}
        {isSearching && !showPopup && (
          <div
            className="airis-input-container"
            onAnimationEnd={() => {
              if (!isSearching) setShowDiv(false);
            }}
          >
            <button>Surprise Me 🎉</button>
            <div className="airis-input">
              <input type="text" placeholder="Search" />
              <i className="fa-solid fa-microphone"></i>
              <i
                className="fa-solid fa-paper-plane"
                onClick={() => {
                  setRenderResponse(true);
                  setShowResponse(true);
                }}
              ></i>
            </div>
            {renderResponse && getResponse()}
          </div>
        )}
      </div>
      <div
        className="airis-icon"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          onClick={() => {
            setIsSearching(!isSearching);
            setRenderResponse(false);
            setShowDiv(!showDiv);
          }}
          src={isHover ? "/assets/airis-smile.png" : "/assets/airis.png"}
          alt="Airis"
        />
      </div>
    </div>
  );
};

export default Airis;
