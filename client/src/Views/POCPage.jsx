import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPlayer/VideoPlayer";
import VideoCards from "../Components/VideoCards/VideoCards";
import axios from "axios";

import "./Styles/POC.css";

const POCPage = () => {
  const [showCards, setShowCards] = useState(true);
  const [videoURL, setVideoURL] = useState();

  const handleIconClick = () => {
    setShowCards(!showCards);
  };

  useEffect(() => {
    console.log(videoURL);
    let userData = {
      username: "test2",
      password: "test2",
    };

    const registerUser = async () => {
      axios
        .post("/user/register/", userData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Request failed:", error.response.data.username[0]);
        });
    };

    const deleteUser = async (token) => {
      axios
        .delete("/user/delete/", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Request failed:", error.response);
        });
    };

    const loginUser = async () => {
      axios
        .post("/user/login/", userData)
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          getUser(token);
        })
        .catch((error) => {
          console.error("Request failed:", error.response);
        });
    };

    const getUser = async (token) => {
      axios
        .get("/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Request failed:", error.response);
        });
    };

    // registerUser();
    // deleteUser();
    loginUser();
  }, [videoURL]);

  return (
    <div className="poc-container">
      <div className="poc-main">
        <div className="poc-header">
          <i>
            <img
              className="icon playlist-icon"
              src={process.env.PUBLIC_URL + "/assets/icons/playlist.svg"}
              alt=""
              onClick={handleIconClick}
            />
          </i>

          <img
            src={process.env.PUBLIC_URL + "/assets/vosyn_logo_long.png"}
            alt="Vosyn Logo"
            // onClick={() =>
            //   (window.location.href = process.env.PUBLIC_URL + "/home")
            // }
          />
        </div>
        {showCards && (
          <div className="poc-cards">
            <h1>Your Curated Playlist: 5 videos</h1>
            <h2>Show me popular videos I would like!</h2>
            <span>
              <VideoCards
                max={3}
                className="poc-card"
                getUrl={(e) => setVideoURL(e)}
              />
            </span>
          </div>
        )}
      </div>

      <div className={`poc-player ${!showCards ? "full" : "half"}`}>
        <VideoPlayer />
      </div>
      {/* <div className="radial-circle-pink poc-balls"></div>
      <div className="radial-circle-blue poc-balls"></div>
      <div className="radial-circle-pink poc-balls right-ball"></div>
      <div className="radial-circle-blue poc-balls right-ball"></div> */}
    </div>
  );
};

export default POCPage;
