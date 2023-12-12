// VideoCardPin.js

import React from 'react';
import './VideoCardPin.css'; // Ensure this is the correct path to your CSS file

const VideoCardPin = ({ video, onClose }) => {
    if (!video) return null;

    return (
        <div className="video-pin">
            <button className="video-pin-close-button" onClick={onClose}>&times;</button>
            <img src={video.thumbnail} alt={video.title} className="video-pin-thumbnail" />
            <div className="video-pin-content">
                <div className="video-pin-info">
                    <img
                        className="video-pin-channel-img"
                        src={video.channelImg}
                        alt={video.channelName}
                    />
                    <div className="video-pin-text-content">
                        <h3 className="video-pin-title">{video.title}</h3>
                        <div className="video-pin-meta">
                            <span className="video-pin-channel">{video.channel}</span>
                            <span className="video-pin-views">{video.views} views</span>
                            <span className="video-pin-date">{video.date}date</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCardPin;
