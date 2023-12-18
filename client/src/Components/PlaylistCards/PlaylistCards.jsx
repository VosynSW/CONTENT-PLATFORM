import React, { useState } from "react";
import "./PlaylistCards.scoped.css";
import videoData from "../../Data/videos.json";

const PlaylistCards = (props) => {
  const [expanded, setExpanded] = useState(false);

  if (videoData.length === 0) return <div>Loading...</div>;

  let allData = props?.data;

  if (allData === undefined) {
    allData = videoData;
  }

  const limitedData = expanded ? allData : allData.slice(0, props.max);

  const handleShowMore = () => {
    setExpanded(true);
  };

  return (
    // display video card data
    <div>
      <div className="row wrap">
        {limitedData.map((playlist) => (
          <div
            className={`playlist-card ${props.className && props.className} `}
            key={playlist.id}
            onClick={() => {
              props.setView("playlist " + playlist.name);
              props.setPlaylist(playlist);
            }}
          >
            <img src={playlist.thumbnail} alt={playlist.name} />
            <div className="playlist-info">
              <div className="playlist-card-info">
                <span>
                  <h3>{playlist.name}</h3>
                  <h4>Private</h4>
                </span>
                <h5>{playlist?.videos?.length} videos | 46h 32m playtime</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <button className="show-more-button" onClick={handleShowMore}>
        {expanded ? "Show Less" : "Show More"}
      </button> */}
    </div>
  );
};

export default PlaylistCards;
