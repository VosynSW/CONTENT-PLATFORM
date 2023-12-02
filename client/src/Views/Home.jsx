import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Earth from "../Components/Earth/Earth";
import VideoCards from "../Components/VideoCards/VideoCards";
import Airis from "../Components/Airis/Airis";
import "./Styles/Home.css";

function Home() {
  const [reRender, setReRender] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);

  let videoTypes = [
    {
      name: "All",
    },
    {
      name: "Gaming",
      icon: "fa-gamepad",
    },
    {
      name: "Series",
      icon: "fa-clapperboard",
    },
    {
      name: "News",
      icon: "fa-newspaper",
    },
    {
      name: "Music",
      icon: "fa-music",
    },
    {
      name: "Sports",
      icon: "fa-dumbbell",
    },
    {
      name: "Learning",
      icon: "fa-graduation-cap",
    },
    {
      name: "Health & Fitness",
      icon: "fa-heart",
    },
    {
      name: "Fashion & Beauty",
      icon: "fa-hat-cowboy",
    },
    {
      name: "Automotive",
      icon: "fa-car",
    },
    {
      name: "Travel",
      icon: "fa-plane-departure",
    },
  ];

  const videoTypeBar = videoTypes.map((videoType, index) => {
    return (
      <div className="video-type" key={index}>
        <div>
          <i className={"fa-solid " + videoType.icon}></i>
        </div>
        <div className="video-type-name">{videoType.name}</div>
      </div>
    );
  });

  useEffect(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  });

  const triggerRender = () => {
    console.log("trigger render");
    setReRender(!reRender);
  };

  const toggleFullScreen = () => {
    console.log("Toggle FullScreen clicked");
    setIsFullScreen(!isFullScreen);
  }

  return (
    <div className="home-container">
      <Sidebar
        triggerRender={triggerRender}
        setIsCollapsed={setIsCollapsed}
        isPortrait={isPortrait}
      />
      <div
        className={`home-body ${isCollapsed ? "collapsed" : ""} ${
          isPortrait ? "portrait" : ""
        }`}
      >
        <Navbar />
        <div className="globe-container">
          <div className="video-type-bar">{videoTypeBar}</div>
          <div className="home-airis">
            <Airis />
          </div>
          <div className="home-fullscreen" onClick={toggleFullScreen}>
            {isFullScreen ? (<>
              <h2>Exit Fullscreen</h2>
              <i className="fa-solid fa-minimize"></i>
              </>) : (<>
              <h2>Fullscreen</h2>
              <i className="fa-solid fa-maximize"></i>
            </>)}
          </div>
          <div className={`${isFullScreen ? "home-earth" : "home-earth-mini"}`}>
            <Earth reRender={reRender} />
          </div>
        </div>
        {!isFullScreen ?
          <div className="home-videos">
            <VideoCards />
          </div> : <></>
        }
      </div>
    </div>
  );
}

export default Home;
