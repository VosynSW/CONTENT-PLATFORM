import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

function Dropdown(props) {
  const selections = props.list;
  const dropdownType = props.type;
  const { toggleDropdown } = props;
  const { handleSelection } = props;
  const {isOpen} =props

  const mountedStyle = [
    {
      animation: "inCollapse 250ms ease-in",
    },
  ];

  const unmountedStyle = [
    {
      animation: "collapseDropdown 250ms ease-out",
      animationFillMode: "forwards",
      visibility:"hidden",
    },
  ];

  return (
    <>
      <div className="dropdown" style={isOpen?mountedStyle[0]:unmountedStyle[0]} >
        <div className="dropdown-title">
          <span>{props.type}</span>
          <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
        </div>
        <div className="dropdown-searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder={"Search your " + dropdownType}
          ></input>
        </div>
        <div className="dropdown-searchline"></div>
        {selections.map((selected, index) => (
          <div
            key={dropdownType + "" + index}
            className="dropdown-item"
            onClick={() => handleSelection(selected)}
          >
            <></>
            <span>{selected.name}</span>
          </div>
        ))}
        <div className="dropdown-moreitem">
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
