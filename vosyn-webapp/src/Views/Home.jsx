import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Earth from "../Components/Earth/Earth";
import VideoCards from "../Components/VideoCards/VideoCards";
import Airis from "../Components/Airis/Airis";

import "./Home.css";

function Home() {
  const [reRender, setReRender] = useState(false);

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

  const triggerRender = () => {
    console.log("trigger render");
    setReRender(!reRender);
  };

  const [isFullScreen, setIsFullScreen] = useState(true);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // return (
  //     <div className='home-container'>
  //         <Sidebar />
  //         <div className='home-body'>
  //             <Navbar />
  //             <div className="video-type-bar">
  //                 {videoTypeBar}
  //             </div>
  //             <div className='globe-container'>
  //                 <button className="fullscreen-button" onClick={toggleFullScreen}>
  //                     {isFullScreen? "Exit Fullscreen" : "Fullscreen"}
  //                     <i class={isFullScreen ? "fa-solid fa-minimize" : "fa-solid fa-maximize"}></i>
  //                 </button>
  //                 {isFullScreen ? (<><img src="/assets/globe.png"/></>) : (<div><VideoCards /></div>)} 
  //             </div>
  //         </div>
  //     </div>
  // );

  return (
    <div className="home-container">
      <Sidebar triggerRender={triggerRender} />
      <div className="home-body">
        <Navbar />
        <div className="video-type-bar">{videoTypeBar}</div>
        <div className="globe-container">
          <div className="home-fullscreen">
            <h2>Exit Fullscreen</h2>
            <i className="fa-solid fa-expand-arrows-alt fa-beat"></i>
          </div>
          <div className="home-airis">
            <Airis />
          </div>
          <Earth reRender={reRender} />
        </div>
        <div className="home-videos">
          <VideoCards />
        </div>
      </div>
    </div>
  );
}

export default Home;
