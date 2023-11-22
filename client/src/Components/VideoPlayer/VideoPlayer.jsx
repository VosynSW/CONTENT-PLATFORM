import React, { useState, useRef, useEffect } from "react";
import Switch from "../Switch/Switch";

import "./VideoPlayer.css"; // Make sure to create a corresponding CSS file for styling

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (playing) {
        video.pause();
      } else {
        video.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleTimelineClick = (e) => {
    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 0);
    }
  }, [videoRef]);

  // Format time in HH:MM:SS
  const formatTime = (time) => {
    if (!isNaN(time)) {
      return new Date(time * 1000).toISOString().substr(11, 8);
    }
    return "00:00:00";
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setShowTimeline(true)}
      onMouseLeave={() => setShowTimeline(false)}
      className="video-player"
    >
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration || 0);
          }
        }}
        onClick={togglePlayPause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`controls ${showTimeline ? "show" : ""}`}>
        <button onClick={togglePlayPause}>
          {playing ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
        <div
          className={`timeline`}
          ref={timelineRef}
          onClick={handleTimelineClick}
        >
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <i className="fa-solid fa-volume-low"></i>
        <Switch />

        <i className="fa-solid fa-cog"></i>
        <i onClick={handleFullscreen} className="fa-solid fa-expand"></i>
      </div>
    </div>
  );
};

export default VideoPlayer;
