import React, { useState, useRef, useEffect } from "react";
import Switch from "../Switch/Switch";

import "./VideoPlayer.css"; // Make sure to create a corresponding CSS file for styling
import vid from "./messi.mp4";

const VideoPlayer = ({ src, type }) => {
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [resolution, setResolution] = useState("1080p");
  const [timerState, setTimerState] = useState(false);

  const volumeContainerRef = useRef(null);
  const settingsRef = useRef(null);

  const toggleVolume = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

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

  useEffect(() => {
    const video = videoRef.current;
    console.log(video.currentTime);
    if (video.currentTime >= 12 && video.currentTime <= 13) {
      setTimerState(true);
    }
  }, [videoRef?.current?.currentTime]);

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

  const handleDocumentClick = (e) => {
    if (showVolumeSlider && !volumeContainerRef.current.contains(e.target)) {
      setShowVolumeSlider(false);
    }
    if (
      showSettings &&
      settingsRef.current &&
      !settingsRef.current.contains(e.target)
    ) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    // Adding click event listener
    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Removing event listener on cleanup
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showVolumeSlider, showSettings]);

  return (
    <div
      onMouseEnter={() => setShowTimeline(true)}
      // onMouseLeave={() => setShowTimeline(false)}
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
        <source src={vid} type="video/mp4" />
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
        <div className="volume-container" ref={volumeContainerRef}>
          {volume === "0" ? (
            <i class="fa-solid fa-volume-xmark"></i>
          ) : (
            <i className="fa-solid fa-volume-low" onClick={toggleVolume}></i>
          )}

          {showVolumeSlider && (
            <div className="volume-slideer-container">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          )}
        </div>
        <Switch switch={timerState} />
        <div className="settings-container" ref={settingsRef}>
          <i className="fa-solid fa-cog" onClick={toggleSettings}></i>
          {showSettings && (
            <div className="settings-popup">
              <div>
                <i class="fa-solid fa-gauge"></i>
                <label>Playback Speed</label>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(e.target.value)}
                  defaultValue={1}
                >
                  {/* options for playback speed */}

                  <option value="0.25">0.25</option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div>
                <i className="fa-solid fa-closed-captioning"></i>
                <label>Captions</label>
                <input
                  type="checkbox"
                  checked={captionsEnabled}
                  onChange={() => setCaptionsEnabled(!captionsEnabled)}
                />
              </div>
              <div>
                <i class="fa-solid fa-sliders"></i>
                <label>Resolution</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                >
                  {/* options for resolution */}
                </select>
              </div>
            </div>
          )}
        </div>

        <i onClick={handleFullscreen} className="fa-solid fa-expand"></i>
      </div>
    </div>
  );
};

export default VideoPlayer;
