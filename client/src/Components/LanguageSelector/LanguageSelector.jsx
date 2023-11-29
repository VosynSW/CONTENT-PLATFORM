import React, { useState, useRef, useEffect } from "react";
import "./LanguageSelector.css";
import Dropdown from "../Dropdown/Dropdown";

function LanguageSelector() {
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelection = (selected) => {
    setSelected(selected);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container">
      <div className="language-selector-header " onClick={toggleDropdown}>
        {selected.sign && <span>{selected.sign}</span>}
      </div>
      <div className="language-dropdown">
        {isOpen && (
          <Dropdown
            list={LanguageList}
            toggleDropdown={toggleDropdown}
            handleSelection={handleSelection}
            type="Language"
          />
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
