import React, { useState, useRef, useEffect } from "react";
import RegionSelector from "../RegionSelector/RegionSelector";
import { useMediaQuery } from "react-responsive";
import Dropdown from "../Dropdown/Dropdown";

import "./Navbar.css";

function Navbar() {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  let LanguageList = [
    {
      name: "Afrikans",
      sign: "AF",
    },
    {
      name: "Azərbaycan",
      sign: "AZ",
    },
    {
      name: "Bahasa Indonesia",
      sign: "BI",
    },
    {
      name: "Malaysia",
      sign: "MA",
    },
    {
      name: "Bosanski",
      sign: "BO",
    },
    {
      name: "English",
      sign: "EN",
    },
    {
      name: "Chinese",
      sign: "ZH",
    },
    {
      name: "French",
      sign: "FR",
    },
    {
      name: "Japanese",
      sign: "JP",
    },
    {
      name: "Spanish (European)",
      sign: "SP",
    },
    {
      name: "Spanish (Mexican)",
      sign: "SP",
    },
  ];

  const [selected, setSelected] = useState(LanguageList[0]);
  const [isOpen, setIsOpen] = useState(false);

  const LanguageSelector = () => {
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelection = (selected) => {
      setSelected(selected);
      setIsOpen(false);
    };

    return (
      <div className="language-selector-container">
        <div className="language-selector-header " onClick={toggleDropdown}>
          {selected.sign && (
            <div className="navbar-item">
              <i>{selected.sign}</i>
            </div>
          )}
        </div>
        <div className="language-dropdown">
          <Dropdown
            list={LanguageList}
            toggleDropdown={toggleDropdown}
            handleSelection={handleSelection}
            type="Language"
            isOpen={isOpen}
            setIsOpen={() => setIsOpen()}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={`navbar-container ${isPortrait && "portrait"}`}>
      <div className="navbar-region-selector">
        <RegionSelector />
      </div>
      <div className={`navbar-right ${isPortrait && "portrait"}`}>
        {!isPortrait && (
          <>
            <div className="navbar-item">
              <i className="fa-solid fa-plus" aria-label="Plus"></i>
            </div>
            {LanguageSelector()}
            <div className="navbar-item">
              <i className="fa-solid fa-bell" aria-label="Notifications"></i>
            </div>
          </>
        )}
        <div className={`navbar-img ${isPortrait && "portrait"}`}>
          <img src="/assets/globe.png" aria-label="User Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
