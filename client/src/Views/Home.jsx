import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Earth from "../Components/Earth/Earth";
import VideoCards from "../Components/VideoCards/VideoCards";
import Airis from "../Components/Airis/Airis";
import countriesData from "../Data/countries.json";
import videosData from "../Data/videos.json";
import Playlists from "./Playlists";

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

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);
  return (
    <>
      <div className="globe-container">
        <div className="video-type-bar">{videoTypeBar}</div>
        <div
          className="home-fullscreen"
          onClick={() => setIsFullScreen(!isFullScreen)}
        >
          <h2>{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</h2>
          <i className="fa-solid fa-expand-arrows-alt fa-beat"></i>
        </div>
        <div className="home-airis">
          <Airis />
        </div>
        <div className="home-earth">
          <Earth
            reRender={reRender}
            videos={videosData}
            countries={countriesData}
            isCollapsed={isCollapsed}
            isFullScreen={isFullScreen}
          />
        </div>
      </div>
      <div className="home-videos">
        <h1>TRENDING IN CANADA 🇨🇦</h1>
        <VideoCards />
      </div>
    </>
  );
}

export default Home;
