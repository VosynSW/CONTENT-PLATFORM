import React, { useState } from "react";
import "./VideoCards.scoped.css";
import videoData from "../../Data/videos.json";

const VideoCards = (props) => {
  const [expanded, setExpanded] = useState(false);

  if (videoData.length === 0) return <div>Loading...</div>;

  let allData = props?.data;

  if (allData === undefined) {
    allData = videoData;
  }

  const limitedData = expanded ? allData : allData.slice(0, props.max);

  const handleShowMore = () => {
    setExpanded(true);
  };

  return (
    // display video card data
    <div className="video-cards">
      <div
        className={`wrap ${props.containerName ? props.containerName : "row"}`}
      >
        {limitedData.map((video) => (
          <div
            className={`video-card ${props.className && props.className} `}
            key={video.id}
            // onClick={() => props.getUrl(video.url)}
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
      {/* <button className="show-more-button" onClick={handleShowMore}>
        {expanded ? "Show Less" : "Show More"}
      </button> */}
    </div>
  );
};

export default VideoCards;
