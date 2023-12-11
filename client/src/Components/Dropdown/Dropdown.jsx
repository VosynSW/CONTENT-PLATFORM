import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

function Dropdown(props) {
  const selections = props.list;
  const dropdownType = props.type;
  const { toggleDropdown } = props;
  const { handleSelection } = props;
  const { isOpen } = props;

  const dropdownRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredSelections = selections.filter((selected) =>
    selected.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mountedStyle = [
    {
      animation: "inCollapse 250ms ease-in",
    },
  ];

  const unmountedStyle = [
    {
      animation: "collapseDropdown 250ms ease-out",
      animationFillMode: "forwards",
      visibility: "hidden",
    },
  ];

  return (
    <>
      <div
        className="dropdown"
        style={isOpen ? mountedStyle[0] : unmountedStyle[0]}
        ref={dropdownRef}
      >
        <div className="dropdown-title">
          <span>{props.type}</span>
          <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
        </div>
        <div className="dropdown-searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder={"Search your " + dropdownType}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <div className="dropdown-searchline"></div>
        <div className="dropdown-items">
          {filteredSelections.map((selected, index) => (
            <div
              key={dropdownType + "" + index}
              className="dropdown-item"
              onClick={() => handleSelection(selected)}
            >
              <></>
              <span>{selected.name}</span>
            </div>
          ))}
        </div>
        <div
          className="dropdown-moreitem"
          onClick={() => {
            const dropdownItems = document.querySelector(".dropdown-items");
            const scrollHeight = dropdownItems.scrollHeight;
            const scrollTop = dropdownItems.scrollTop;
            const scrollDistance = scrollHeight * 0.05;
            dropdownItems.scrollTop = scrollTop + scrollDistance;
          }}
        >
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
