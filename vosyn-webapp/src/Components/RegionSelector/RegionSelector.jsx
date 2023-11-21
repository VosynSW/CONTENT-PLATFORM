import React, { useState, useRef, useEffect } from 'react';
import './RegionSelector.css';

function RegionSelector() {
  const [isSearch, setIsSearch] = useState(false);
  const searchInputRef = useRef(null); // Create a ref for the input

  useEffect(() => {
    if (isSearch) {
      searchInputRef.current?.focus();
    }
  }, [isSearch]);

  let regionList = [
    {
      name: "Canada",
      flag: "ca.png"
    },
    {
      name: "United States",
      flag: "us"
    },
  ]

  const CountryDropdown = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCountrySelect = (country) => {
      setSelectedCountry(country);
      setIsOpen(false);
    };

    return (
      <div className="country-dropdown">
        <div className="country-dropdown-header" onClick={toggleDropdown}>
          <img src={"/assets/" + selectedCountry.flag} />
          <span>{selectedCountry.name}</span>
          {!isOpen ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
        </div>
        {isOpen && (
          <div className="country-dropdown-list">
            {regionList.map((country, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleCountrySelect(country)}>
                <img src={"/assets/" + country.flag} style={{ width: '20px', marginRight: '10px' }} />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='region-selector-container'>
      {isSearch ?
        <div className='region-selector-text-container'>
          <input
            ref={searchInputRef} // Attach the ref to the input
            className="region-selector-text"
            type="text"
            placeholder="Search"
          />
          <i onClick={() => setIsSearch(false)} className="fa-solid fa-xmark"></i>
        </div>
        : <i onClick={() => setIsSearch(true)} className="fa-solid fa-magnifying-glass"></i>}
      <CountryDropdown countries={regionList} />
    </div>
  ); 
}

export default RegionSelector;