import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoCards from "../Components/VideoCards/VideoCards";

import './Home.css';

function Home() {

    let videoTypes = [
        {
            name: "All",
        },
        {
            name: "Gaming",
            icon: "fa-gamepad"
        },
        {
            name: "Series",
            icon: "fa-clapperboard"
        },
        {
            name: "News",
            icon: "fa-newspaper"
        },
        {
            name: "Music",
            icon: "fa-music"
        },
        {
            name: "Sports",
            icon: "fa-dumbbell"
        },
        {
            name: "Learning",
            icon: "fa-graduation-cap"
        },
        {
            name: "Health & Fitness",
            icon: "fa-heart"
        },
        {
            name: "Fashion & Beauty",
            icon: "fa-hat-cowboy"
        },
        {
            name: "Automotive",
            icon: "fa-car"
        },
        {
            name: "Travel",
            icon: "fa-plane-departure"
        },
    ]

    const videoTypeBar = videoTypes.map((videoType) => {
        return (
            <div className="video-type">
                <div>
                    <i class={"fa-solid " + videoType.icon}></i>
                </div>
                <div className="video-type-name">
                    {videoType.name}
                </div>
            </div>
        )
    })

    const [isFullScreen, setIsFullScreen] = useState(true);
    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    return (
        <div className='home-container'>
            <Sidebar />
            <div className='home-body'>
                <Navbar />
                <div className="video-type-bar">
                    {videoTypeBar}
                </div>
                <div className='globe-container'>
                    <button className="fullscreen-button" onClick={toggleFullScreen}>
                        {isFullScreen? "Exit Fullscreen" : "Fullscreen"}
                        <i class={isFullScreen ? "fa-solid fa-minimize" : "fa-solid fa-maximize"}></i>
                    </button>
                    {isFullScreen ? <img src="/assets/globe.png"/> : <VideoCards />} 
                </div>
            </div>
        </div>
    );
}

export default Home;
