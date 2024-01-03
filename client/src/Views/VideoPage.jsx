import React, { useState, useEffect } from "react";

import VideoPlayer from "../Components/VideoPlayer/VideoPlayer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import VideoSidebar from "../Components/VideoSidebar/VideoSidebar";

import "./Styles/VideoPage.css";

function VideoPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

  const setVisible = (e) => {
    console.log(e);
    setIsVisible(e);
  };

  return (
    <div>
      <div className="video">
        <div
          className={`video-container ${isCollapsed ? "collapsed" : ""} ${
            isPortrait ? "portrait" : ""
          } ${!isVisible ? "invisible" : ""}`}
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
                Lionel Messi: The Heart of a Champion - Navigating Soccer and
                Longing for Home
              </h1>
              <h2>320,234 views | Oct 18, 2023</h2>
              <div className="body-main">
                <h2>Description</h2>
                <p>
                  Join us in this exclusive and heartfelt interview with soccer
                  legend Lionel Messi as he opens up about his personal journey
                  in the world of professional soccer. Born and raised in
                  Argentina, Messi shares his experiences of leaving his
                  homeland to pursue his dreams, the challenges of adapting to
                  new cultures, and the emotions of playing soccer far from
                  home. From his early days at FC Barcelona to his recent
                  endeavors, Messi reflects on the blend of nostalgia and
                  ambition that has fueled his extraordinary career. Whether
                  you're a soccer fan, an aspiring athlete, or someone who
                  relates to the universal feeling of missing home, this video
                  offers a rare glimpse into the life of one of the greatest
                  footballers of our time. Dive into Messi's world and discover
                  the human side of a global sports icon.
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
        <VideoSidebar setVisible={(e) => setVisible(e)} />
      </div>
    </div>
  );
}

export default VideoPage;
