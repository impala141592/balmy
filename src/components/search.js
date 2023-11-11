import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import searchIcon from "../images/search.svg";

const SearchBar = ({ onSearch, loading, error, themeClass }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
    setSearchText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchText);
      setSearchText("");
    }
  };

  return (
    <div className="search">
      <div className={`search-bar ${themeClass}`}>
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder=""
        />
        <button className="search-button" onClick={handleSearch}>
          <ReactSVG src={searchIcon} className={`icon ${themeClass}`} />
          {/* <img src={searchIcon} alt="search" /> */}
        </button>
      </div>
      {/* add spinner here */}
      {loading && <span className="message">Loading</span>}
      {error && <span>Error: {error.message}</span>}
      {/* {error && (
        <span className="message">Error: no such city! Try something else</span>
      )} */}
    </div>
  );
};

export default SearchBar;
