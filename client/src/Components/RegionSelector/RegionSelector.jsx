import React, { useState, useRef, useEffect } from "react";
import "./RegionSelector.css";
import Dropdown from "../Dropdown/Dropdown";
import countries from "../../Data/countries.json";
import {useSelector, useDispatch } from "react-redux";

function RegionSelector() {
  const [searchActive, setSearchActive] = useState(false);
  const [regionList, setRegionList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "World",
    flag: "ca.png",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  console.log(selectedCountry);
  const selectedRegion = useSelector((state) => state.selectedRegion);
 
  

  useEffect(() => {
    const countryList = Object.values(countries.features).map((country) => ({
      name: country.properties?.ADMIN,
      flag: country.properties?.ISO_A2.toLowerCase() + ".png",
    }));
    setRegionList(countryList);

    const foundCountry = countryList.find(country => country.name === selectedRegion);
    setSelectedCountry(foundCountry || { name: "World", flag: "ca.png" });
  }, [selectedRegion]);


  useEffect(() => {
    if (searchActive) {
      searchInputRef.current?.focus();
    }
  }, [searchActive]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    dispatch({ type: "SET_SELECTED_REGION", payload: country.name });
  };

  const toggleSearch = () => {
    setSearchActive((prev) => !prev);
    setSearchTerm("");
  };

  const isSearching = searchTerm.length > 0;

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="region-selector-container">
      {searchActive ? (
        <div className={`region-selector-main`}>
          <div className="region-selector-text-container">
            <input
              ref={searchInputRef}
              className="region-selector-text"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i onClick={toggleSearch} className="fa-solid fa-xmark"></i>
          </div>
          <div
            className="region-selector-search"
            style={isSearching ? mountedStyle[1] : unmountedStyle[1]}
          >
            {isSearching && (
              <Search searchTerm={searchTerm} searchRef={searchRef} />
            )}
          </div>
        </div>
      ) : (
        <i onClick={toggleSearch} className="fa-solid fa-magnifying-glass"></i>
      )}
      <CountryDropdown
        selectedCountry={selectedCountry}
        regionList={regionList}
        handleCountrySelect={handleCountrySelect}
        dropdownRef={dropdownRef}
      />
    </div>
  );
}

export default RegionSelector;

function Search({ searchTerm, isSearch, setIsSearching, searchRef }) {
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
      ref={searchRef}
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
}

function CountryDropdown({
  selectedCountry,
  regionList,
  handleCountrySelect,
  dropdownRef,
}) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(selectedCountry);

  return (
    <div className={`country-dropdown ${isOpen && "open"}`}>
      <div className="country-dropdown-header" onClick={() => setIsOpen(true)}>
        <img
          src={"/assets/flags/" + selectedCountry.flag}
          alt={selectedCountry.name}
        />
        <span>{selectedCountry.name}</span>
        <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      <div className="country-dropdown-list" ref={dropdownRef}>
        <Dropdown
          list={regionList}
          toggleDropdown={() => setIsOpen(false)}
          handleSelection={handleCountrySelect}
          type="Region"
          isOpen={isOpen}
          setIsOpen={() => setIsOpen()}
        />
      </div>
    </div>
  );
}