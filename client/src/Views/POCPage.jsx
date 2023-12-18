import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPlayer/VideoPlayer";
import VideoCards from "../Components/VideoCards/VideoCards";

import "./Styles/POC.css";

const POCPage = () => {
  const [showCards, setShowCards] = useState(true);
  const [videoURL, setVideoURL] = useState();

  const handleIconClick = () => {
    setShowCards(!showCards);
  };

  useEffect(() => {
    console.log(videoURL);
  }, [videoURL]);

  return (
    <div className="poc-container">
      <div className="poc-main">
        <div className="poc-header">
          <i className="fa-solid fa-photo-film" onClick={handleIconClick}></i>
          <img
            src={process.env.PUBLIC_URL + "/assets/vosyn_logo_long.png"}
            alt="Vosyn Logo"
            onClick={() =>
              (window.location.href = process.env.PUBLIC_URL + "/home")
            }
          />
        </div>
        {showCards && (
          <div className="poc-cards">
            <h1>Your Curated Playlist: 5 videos</h1>
            <h2>
              Catch me up on popular videos from last month that I would be
              interested in
            </h2>
            <VideoCards
              max={3}
              className="poc-card"
              getUrl={(e) => setVideoURL(e)}
            />
          </div>
        )}
      </div>

      <div className="poc-player">
        <VideoPlayer />
      </div>
      <div className="radial-circle-pink poc-balls"></div>
      <div className="radial-circle-blue poc-balls"></div>
      <div className="radial-circle-pink poc-balls right-ball"></div>
      <div className="radial-circle-blue poc-balls right-ball"></div>
    </div>
  );
};

export default POCPage;
