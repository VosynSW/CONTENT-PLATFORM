import React, { useState, useEffect } from "react";

import "./VideoSidebar.scoped.css";
import VideoCards from "../VideoCards/VideoCards";

const VideoSidebar = (props) => {
  const [users, setUsers] = useState([]);
  const [random, setRandom] = useState(Math.floor(Math.random() * 6));
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users.slice(0, 5));
      });
    console.log(users);
  }, []);

  useEffect(() => {
    console.log(window.scrollY);
    const scrollEventListener = () => {
      if (window.scrollY > 0) {
        props.setVisible(false);
        setIsVisible(false);
      } else {
        setIsVisible(true);
        props.setVisible(true);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", scrollEventListener);

    return () => {
      window.removeEventListener("scroll", scrollEventListener);
    };
  }, []);

  if (users.length === 0) return <div>Loading...</div>;

  let test = [
    {
      id: 4,
      title: "Video 4",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      views: 790,
      channelName: "VosynTV",
      channelImg:
        "https://yt3.ggpht.com/8dmkFX1UcqiTQSTi2pbgNEHi-MPij0Ad6C0ENRbqm3wiZpBo8RYzXiQqyZNViC17JJEiEdTDH8o=s176-c-k-c0x00ffffff-no-rj-mo",
    },
  ];

  return (
    <div
      className={`sidebar ${!isVisible && "invisible"} ${
        isExpanded && "expanded"
      }`}
    >
      {!isExpanded ? (
        <>
          <div className="sidebar-top-icons">
            <i
              onClick={() => setIsExpanded(!isExpanded)}
              class="fa-solid fa-right-from-bracket"
            ></i>
            <i class="fa-solid fa-shop"></i>
            <i class="fa-solid fa-link"></i>
          </div>
          <div className="sidebar-users">
            {users.map((user) => {
              let i = Math.floor(Math.random() * 6);
              return (
                <div className="user">
                  <img style={{ background: colors[i] }} src={user.image} />
                  {/* <div>
                <h3>{user.firstName}</h3>
                <p>{user.email}</p>
              </div> */}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="sidebar-expanded">
          <div className="expanded-header">
            <i
              onClick={() => setIsExpanded(!isExpanded)}
              class="fa-solid fa-right-from-bracket"
            ></i>
            <h1>Satnight Binge</h1>
            <i class="fa-solid fa-shop"></i>
            <i class="fa-solid fa-link"></i>
          </div>
          <div className="expanded-users">
            {users.map((user) => {
              return <img src={user.image} />;
            })}
          </div>
          <div className="sidebar-expanded-video">
            <span>
              <h1>Upcoming Next (5s)</h1>
              <a>Skip</a>
            </span>
            <VideoCards data={test} />
          </div>
          <div className="voice">
            <h1>Voice Connected</h1>
            <span>
              <i class="fa-solid fa-microphone"></i>
              <i class="fa-solid fa-volume-high"></i>
            </span>
          </div>
          <div className="message">
            <span>
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
              <i class="fa-solid fa-smile"></i>
            </span>
            <img src={process.env.PUBLIC_URL + "/assets/popcorn.png"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSidebar;
