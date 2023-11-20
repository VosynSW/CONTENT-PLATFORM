import React from 'react';
import './VideoCards.css';
import videoData from '../../Data/videos.json';

const VideoCards = () => {
  return (
    // display video card data
    <div className="video-cards">
      {videoData.map((video) => (
        <div className="video-card" key={video.id}>
          <img src={video.thumbnail} />
          <div className="video-card-content">
            {/* <img className="channel-img" src={video.channelImg} alt="channel-img" /> */}
            <h3 className="title">{video.title}</h3>
            <h5 className="channel">{video.channelName}</h5>
            {/* <h5 className="date">{video.duration}</h5> */}
          </div>
          {/* <MediaPlayer url={video.url} /> */}
        </div>
      ))}
    </div>
  );
}

export default VideoCards;