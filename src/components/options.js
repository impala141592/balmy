import React, { useState, useEffect, useRef } from "react";

function Options({ onUnitToggle, unit }) {
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
        className="options-button"
        onClick={(e) => {
          toggleMenu();
          handleButtonClick(e);
        }}
      ></button>
      {menuVisible && (
        <div className="options-menu" ref={menuRef}>
          <div className="option">
            <span className="option-label">
              Change unit to {unit === "°C" ? "°F" : "°C"}
            </span>
            <Toggle onToggle={onUnitToggle} unit={unit} />
          </div>
        </div>
      )}
    </div>
  );
}

const Toggle = ({ onToggle, unit }) => {
  return (
    <div className="toggle">
      <button className="toggle-button" onClick={onToggle}>
        <div
          className="toggle-button-inner"
          style={{
            left: `${unit === "°C" ? "2px" : "30px"}`,
          }}
        ></div>
      </button>
    </div>
  );
};

export default Options;
