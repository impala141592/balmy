import React, { useState } from "react";
import searchIcon from "../images/search.svg";

const SearchBar = ({ onSearch }) => {
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
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder=""
      />
      <button className="search-button" onClick={handleSearch}>
        <img src={searchIcon} alt="" />
      </button>
    </div>
  );
};

export default SearchBar;
