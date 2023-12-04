import React from "react";
import "./VideoCards.css";
import videoData from "../../Data/videos.json";

const VideoCards = (props) => {
  if (videoData.length === 0) return <div>Loading...</div>;

  let allData = props?.data;

  if (allData === undefined) {
    allData = videoData;
  }

  return (
    // display video card data
    <div className="video-cards">
      <div className="row wrap">
        {allData.map((video) => (
          <div
            className={`video-card ${props.className && props.className} `}
            key={video.id}
          >
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-info">
              <img
                className="channel-img"
                src={video.channelImg}
                alt={video.channelImg}
              />
              <div className="main-info">
                <h3 className="title">{video.title}</h3>
                <div className="data">
                  <h5 className="channel">{video.channelName}</h5>
                  <h5 className="views">{video.views} views</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;
