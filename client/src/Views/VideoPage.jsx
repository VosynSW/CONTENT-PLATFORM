import React, { useState, useEffect } from "react";

import VideoPlayer from "../Components/VideoPlayer/VideoPlayer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import VideoSidebar from "../Components/VideoSidebar/VideoSidebar";

import "./Styles/VideoPage.css";

function VideoPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayComments, setDisplayComments] = useState([]);
  const [commentIndex, setCommentIndex] = useState(0);

  useEffect(() => {
    let allComments = [];

    for (let i = 0; i < 20; i++) {
      allComments.push({
        name: `User ${i + 1}`,
        image: "https://www.w3schools.com/howto/img_avatar.png",
        comment: `This is comment ${i + 1}`,
        date: "2 days ago",
      });
    }
    setComments(allComments);
    setDisplayComments(allComments.slice(commentIndex, commentIndex + 5));
    setCommentIndex(commentIndex + 5);
  }, []);

  const showMoreComments = () => {
    setDisplayComments([
      ...displayComments,
      ...comments.slice(commentIndex, commentIndex + 5),
    ]);
    setCommentIndex(commentIndex + 5);
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="radial-circle-pink"></div>
      <div className="radial-circle-blue"></div>
      <Sidebar setIsCollapsed={setIsCollapsed} isPortrait={isPortrait} />
      <VideoSidebar />
      <div
        className={`video-body ${isCollapsed ? "collapsed" : ""} ${
          isPortrait ? "portrait" : ""
        }`}
      >
        <Navbar />
        <div
          className={`video-container ${isCollapsed ? "collapsed" : ""} ${
            isPortrait ? "portrait" : ""
          }`}
        >
          <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          <div className="video-description">
            <div className="header">
              <div className="header-user">
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
                <div>
                  <h1>Hejo K.</h1>
                  <h2>356,231 subscribers</h2>
                </div>
                <button className="button blue">Subscribe</button>
              </div>
              <div className="header-buttons">
                <button className="button">
                  <i className="fa-solid fa-thumbs-up"></i>Like
                </button>
                <button className="button">
                  <i className="fa-solid fa-share"></i>Share
                </button>
                <button className="button">
                  <i className="fa-solid fa-download"></i>Download
                </button>
                <button className="button">
                  <i className="fa-solid fa-plus"></i>Add to Playlist
                </button>
              </div>
            </div>
            <div className="body">
              <h1>
                JoJo's Bizarre Adventure: All-Star Battle R - Update Patch 2.2
              </h1>
              <h2>320,234 views | Oct 18, 2023</h2>
              <div className="body-main">
                <h2>Description</h2>
                <p>
                  Join us as we delve into the latest patch notes for JoJo's
                  Bizarre Adventure All Star Battle R, unpacking all the
                  exciting buffs and nerfs that have just hit the game. We’ll
                  discuss the changes that affect hit behavior, pushing
                  detection, recovery mechanics, assault assists, landing after
                  aerial recovery, and more.
                </p>
              </div>
              <span>Show More</span>
            </div>
          </div>
          <div className="video-comments">
            <h1>{comments.length} Comments</h1>
            <div className="comment">
              <img src="https://www.w3schools.com/howto/img_avatar.png" />
              <input type="text" placeholder="Add a public comment..." />
              <button className="button blue">Comment</button>
              <button className="button">Cancel</button>
            </div>
            {displayComments.map((comment, index) => (
              <div key={index} className="comments">
                <img src={comment.image} />
                <div className="column">
                  <div className="row">
                    <h1>@{comment.name}</h1>
                    <h2>{comment.date}</h2>
                  </div>
                  <p>{comment.comment}</p>
                  <div className="row">
                    <span className="like">
                      <i className="fa-solid fa-thumbs-up"></i>57
                    </span>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            ))}
            {displayComments.length < comments.length && (
              <span className="show-more-button" onClick={showMoreComments}>
                Show More
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
