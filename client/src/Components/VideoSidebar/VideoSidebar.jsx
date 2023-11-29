import React, { useState, useEffect } from "react";

const VideoSidebar = () => {
  const [users, setUsers] = useState([]);
  const [random, setRandom] = useState(Math.floor(Math.random() * 6));
  const [isExpanded, setIsExpanded] = useState(true);

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

  if (users.length === 0) return <div>Loading...</div>;

  if (isExpanded) {
    return (
      <div className="sidebar">
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
      </div>
    );
  }
};

export default VideoSidebar;
