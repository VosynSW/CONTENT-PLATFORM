import React from "react";
import RegionSelector from "../RegionSelector/RegionSelector";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-region-selector">
        <RegionSelector />
      </div>
      <div className="navbar-right">
        <div className="navbar-item">
          <i className="fa-solid fa-plus" aria-label="Plus"></i>
        </div>
        <div className="navbar-item">
          <i className="fa-solid fa-bell" aria-label="Notifications"></i>
        </div>
        <div className="navbar-item">
          <i className="fa-solid fa-user" aria-label="User Profile"></i>
        </div>
        <div className="navbar-img">
          <img src="/assets/globe.png" aria-label="User Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
