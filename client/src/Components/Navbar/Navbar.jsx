import React from "react";
import RegionSelector from "../RegionSelector/RegionSelector";
import { useMediaQuery } from "react-responsive";

import "./Navbar.css";

function Navbar() {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <div className={`navbar-container ${isPortrait && "portrait"}`}>
      <div className={`navbar-region-selector ${isPortrait && "portrait"}`}>
        <RegionSelector />
      </div>
      <div className={`navbar-right ${isPortrait && "portrait"}`}>
        {!isPortrait && (
          <div className="navbar-items">
            <div className="navbar-item">
              <i className="fa-solid fa-plus" aria-label="Plus"></i>
            </div>
            <div className="navbar-item">
              <i className="fa-solid fa-bell" aria-label="Notifications"></i>
            </div>
            <div className="navbar-item">
              <i className="fa-solid fa-user" aria-label="User Profile"></i>
            </div>
          </div>
        )}
        <div className={`navbar-img ${isPortrait && "portrait"}`}>
          <img
            src={process.env.PUBLIC_URL + "/assets/globe.png"}
            aria-label="User Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
