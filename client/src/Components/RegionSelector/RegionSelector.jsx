import React, { useState, useRef, useEffect } from "react";
import "./RegionSelector.css";
import Dropdown from "../Dropdown/Dropdown";
import countries from "../../Data/countries.json";
import axios from "axios";

function RegionSelector() {
  const [isSearch, setIsSearch] = useState(false);
  const searchInputRef = useRef(null); // Create a ref for the input
  const [showDiv, setShowDiv] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [regionList, setRegionList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isSearch) {
      searchInputRef.current?.focus();
    }
  }, [isSearch]);

  useEffect(() => {
    Object.values(countries.features).map((country, i) => {
      console.log(country);
      setRegionList((prevRegionList) => [
        ...prevRegionList,
        {
          name: country.properties?.ADMIN,
          flag: country.properties?.ISO_A2.toLowerCase() + ".png",
        },
      ]);
    });
  }, []);

  useEffect(() => {
    //set show div false if clicked outside

    const handleClickOutside = (event) => {
      console.log(event.target);
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearch(false);
        setIsOpen(false);
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mountedStyle = [
    {
      animation: "inAnimation 250ms ease-in",
    },
    {
      animation: "inCollapse 350ms ease-in",
    },
  ];

  const unmountedStyle = [
    {
      animation: "outAnimation 350ms forwards",
      animationFillMode: "forwards",
    },
    {
      animation: "outCollapse 250ms ease-out",
      animationFillMode: "forwards",
    },
  ];

  const Search = () => {
    let results = [
      {
        thumbnail: "example.png",
        title: "Video 1",
        description: "This is the description for Video 1",
      },
      {
        thumbnail: "example.png",
        title: "Video 2",
        description: "This is the description for Video 2",
      },
      {
        thumbnail: "example.png",
        title: "Video 3",
        description: "This is the description for Video 3",
      },
      {
        thumbnail: "example.png",
        title: "Video 3",
        description: "This is the description for Video 3",
      },
      {
        thumbnail: "example.png",
        title: "Video 3",
        description: "This is the description for Video 3",
      },
      {
        thumbnail: "example.png",
        title: "Video 3",
        description: "This is the description for Video 3",
      },
    ];

    return (
      <div
        onAnimationEnd={() => {
          if (!isSearch) setIsSearching(false);
        }}
        className="search-container"
      >
        <div className="search-icons">
          <span>
            <i className="fa-solid fa-video"></i>
            Video
          </span>
          <span>
            <i className="fa-solid fa-book"></i>
            Text
          </span>
          <span>
            <i className="fa-solid fa-microphone"></i>
            Audio
          </span>
        </div>
        <div className="search-buttons">
          <button>All</button>
          <button>PDF</button>
          <button>Sheet</button>
          <button>News</button>
          <button>Blog</button>
        </div>
        <div className="search-results">
          {results.map((result, index) => (
            <div className="search-result" key={index}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <h3>{result.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CountryDropdown = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCountrySelect = (country) => {
      setSelectedCountry(country);
      setIsOpen(false);
    };
    if (!selectedCountry) return <div>Loading...</div>;
    return (
      <div className={`country-dropdown ${isOpen && "open"}`}>
        <div className={`country-dropdown-header`} onClick={toggleDropdown}>
          <img
            src={
              process.env.PUBLIC_URL + "/assets/flags/" + selectedCountry.flag
            }
          />
          <span>{selectedCountry.name}</span>
          {!isOpen ? (
            <i className="fa-solid fa-chevron-down"></i>
          ) : (
            <i className="fa-solid fa-chevron-up"></i>
          )}
        </div>

        <div className="country-dropdown-list" ref={dropdownRef}>
          <Dropdown
            list={regionList}
            toggleDropdown={toggleDropdown}
            handleSelection={handleCountrySelect}
            type="Region"
            isOpen={isOpen}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="region-selector-container"
      style={showDiv ? mountedStyle[0] : unmountedStyle[0]}
    >
      {showDiv ? (
        <div className={`region-selector-main`}>
          <div
            className={`region-selector-text-container`}
            onAnimationEnd={() => {
              if (!isSearch) setShowDiv(false);
            }}
          >
            <input
              ref={searchInputRef} // Attach the ref to the input
              className="region-selector-text"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setIsSearching(true);
                } else {
                  setIsSearching(false);
                }
              }}
            />
            <i
              onClick={() => {
                setIsSearch(false);
                setShowDiv(false);
                setIsSearching(false);
              }}
              className="fa-solid fa-xmark"
            ></i>
          </div>
          <div
            className="region-selector-search"
            style={isSearching ? mountedStyle[1] : unmountedStyle[1]}
          >
            {isSearching && <Search />}
          </div>
        </div>
      ) : (
        <i
          onClick={() => {
            setIsSearch(true);
            if (!showDiv) setShowDiv(true);
          }}
          className="fa-solid fa-magnifying-glass"
        ></i>
      )}
      <CountryDropdown countries={regionList} />
    </div>
  );
}

export default RegionSelector;
