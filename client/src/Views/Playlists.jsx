import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Earth from "../Components/Earth/Earth";
import PlaylistCards from "../Components/PlaylistCards/PlaylistCards";
import Airis from "../Components/Airis/Airis";
import playlistsData from "../Data/playlist.json";
import videosData from "../Data/videos.json";
import VideoCards from "../Components/VideoCards/VideoCards";

import "./Styles/Playlists.css";

function Playlists(props) {
  const [view, setView] = useState("main");
  const [playlist, setPlaylist] = useState(0);

  let playlistsDataCollab = [
    {
      id: 1,
      thumbnail:
        "https://img.freepik.com/free-vector/realistic-popcorn-poster-with-flakes-falling-bucket-blue-background-vector-illustration_1284-79109.jpg?size=626&ext=jpg",
      name: "Group Movies",
      videos: [
        { id: 1, title: "Video 1" },
        { id: 2, title: "Video 2" },
        { id: 3, title: "Video 3" },
      ],
    },
    {
      id: 2,
      thumbnail:
        "https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg?size=626&ext=jpg",
      name: "Trip to Banff",
      videos: [
        { id: 4, title: "Video 4" },
        { id: 5, title: "Video 5" },
      ],
    },
    {
      id: 3,
      thumbnail:
        "https://img.freepik.com/free-photo/futuristic-cat-with-goggles_23-2150969557.jpg?size=626&ext=jpg",
      name: "Cats",
      videos: [
        { id: 4, title: "Video 4" },
        { id: 5, title: "Video 5" },
      ],
    },
  ];

  return (
    <div className="playlists-container">
      {view === "main" && (
        <>
          <div className="playlists-header">
            <h1>My Playlists {view}</h1>
            <span>
              <button className="button blue">
                <i className="fa-solid fa-plus"></i>Create New Playlist
              </button>
              <button className="button">
                <i className="fa-solid fa-pencil"></i>Edit
              </button>
            </span>
          </div>
          <div className="playlists-private">
            <h2>Private Playlists</h2>
            <PlaylistCards
              data={playlistsData}
              setView={setView}
              setPlaylist={setPlaylist}
              className="playlist-cards"
            />
          </div>
          <div className="playlists-private">
            <h2>Collaborative Playlists</h2>
            <PlaylistCards
              data={playlistsDataCollab}
              setView={setView}
              setPlaylist={setPlaylist}
            />
          </div>
        </>
      )}
      {view.includes("playlist") && (
        <>
          <div className="playlist-header">
            <img src={playlist.thumbnail} alt="Playlist Thumbnail" />
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => setView("main")}
            >
              Back
            </i>
            <div className="playlist-banner">
              <h1>{playlist.name}</h1>
              <h2>{playlist.videos.length} videos | 46h 32m playtime</h2>
              <span>
                <button className="button blue">
                  <i className="fa-solid fa-play"></i>Play All
                </button>
                <button className="button">
                  <i className="fa-solid fa-shuffle"></i>Shuffle
                </button>
              </span>
            </div>
          </div>
          <div className="playlist-cards">
            <div className="playlists-header">
              <h1>
                Sort by <i className="fa-solid fa-chevron-down"></i>
              </h1>
              <span>
                <button className="button blue">
                  <i className="fa-solid fa-plus"></i>Add to Playlist
                </button>
                <button className="button">
                  <i className="fa-solid fa-pencil"></i>Edit
                </button>
              </span>
            </div>
            <VideoCards
              data={playlist.videos}
              setView={setView}
              setPlaylist={setPlaylist}
              className="playlist-cards"
              containerName="column"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Playlists;
