import React from "react";

import "./VideoCards.css";

const VideoCards = ({}) => {
  let videos = [
    {
      id: 1,
      thumbnail: "/assets/example.png",
      title: "Video 1",
      description: "This is the description for Video 1",
    },
    {
      id: 2,
      thumbnail: "/assets/example.png",
      title: "Video 2",
      description: "This is the description for Video 2",
    },
    {
      id: 3,
      thumbnail: "/assets/example.png",
      title: "Video 3",
      description: "This is the description for Video 3",
    },
    {
      id: 4,
      thumbnail: "/assets/example.png",
      title: "Video 3",
      description: "This is the description for Video 3",
    },
    {
      id: 5,
      thumbnail: "/assets/example.png",
      title: "Video 3",
      description: "This is the description for Video 3",
    },
    {
      id: 6,
      thumbnail: "/assets/example.png",
      title: "Video 3",
      description: "This is the description for Video 3",
    },
  ];

  return (
    <div className="video-cards">
      {videos.map((video) => (
        <div className="video-card" key={video.id}>
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-info">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCards;
