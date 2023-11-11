import React, { useState } from "react";
import "./style/css/style.css";
import WeatherApp from "./components/weather";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode ? "dark-theme" : "light-theme";

  return (
    <div className={`App ${themeClass}`}>
      {/* <Header /> */}
      <WeatherApp
        themeClass={themeClass}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
}

export default App;
