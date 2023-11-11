import React, { useState, useEffect, useRef } from "react";

function Options({
  onUnitToggle,
  unit,
  isDarkMode,
  toggleDarkMode,
  themeClass,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="options">
      <button
        className={`options-button ${themeClass}`}
        onClick={(e) => {
          toggleMenu();
          handleButtonClick(e);
        }}
      >
        <div className={`${menuVisible ? "bar visible" : "bar"}`}></div>
        <div className={`${menuVisible ? "bar visible" : "bar"}`}></div>
        <div className={`${menuVisible ? "bar visible" : "bar"}`}></div>
      </button>
      {menuVisible && (
        <div className={`options-menu ${themeClass}`} ref={menuRef}>
          <div className="option">
            <span className="option-label">
              Change unit to {unit === "°C" ? "°F" : "°C"}
            </span>
            <Toggle
              onToggle={onUnitToggle}
              initialPosition="2px"
              themeClass={themeClass}
            />
          </div>
          <div className="option">
            <span className="option-label">
              {isDarkMode ? "Light" : "Dark"} Mode
            </span>
            <Toggle
              onToggle={toggleDarkMode}
              initialPosition="2px"
              themeClass={themeClass}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Toggle = ({ onToggle, initialPosition, themeClass }) => {
  const [position, setPosition] = useState(initialPosition);

  const handleClick = () => {
    setPosition((prevPosition) => (prevPosition === "2px" ? "20px" : "2px"));
    onToggle();
  };
  return (
    <button className={`toggle-button ${themeClass}`} onClick={handleClick}>
      <div
        className="toggle-button-inner"
        style={{
          left: position,
        }}
      ></div>
    </button>
  );
};

export default Options;
