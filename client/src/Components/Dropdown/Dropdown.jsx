import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";


function Dropdown(props) {
    const selections  = props.list
    const dropdownType = props.type
    const {toggleDropdown} = props
    const {handleSelection} =props
    
        return (
          <>
             <div className="dropdown-list">
                <div className="dropdown-collapse">
                  <span>{props.type}</span>
                  <i className="fa-solid fa-xmark" onClick={toggleDropdown}></i>
                </div>
                <div className="dropdown-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder={"Search your "+ dropdownType}></input>
                </div>
                <div className="dropdown-split"></div>
                {selections.map((selected, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSelection(selected)}
                  >
                    <></>
                    <span>{selected.name}</span>
                  </div>
                ))}
                <div className="dropdown-more-container">
                  <i className="fa-solid fa-angle-down"></i>
                </div>
              </div>
          </>
        );
}

export default Dropdown
