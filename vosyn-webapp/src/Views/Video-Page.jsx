import React from 'react';
import ReactPlayer from "react-player";

const VideoPage = ({ video }) => {
  return (
    <div className="media-player">
      <ReactPlayer
        url={video.url}
        controls // Display default controls (play, pause, volume, etc.)
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default VideoPage;