import React, { useState, useEffect } from "react";
import SearchBar from "./search.js";

const WeatherApp = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherByCoordinates = (latitude, longitude) => {
    setLoading(true);
    setError(null);

    const apiKey = "fc0844b2a1384e18bc8154636230211";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const city = data.location.name;
        const temperature = data.current.temp_c;
        const country = data.location.country;

        setLocationData({
          city: `${city}, ${country}`,
          temperature,
        });

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSearch = (city) => {
    if (city) {
      fetchWeatherByCoordinates(city);
    }
  };

  const fetchWeatherForCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          setError(new Error("Geolocation error: " + error.message));
          setLoading(false);
        }
      );
    } else {
      setError(new Error("Geolocation is not supported by your browser."));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherForCurrentLocation();
  }, []);

  return (
    <div className="weather-dashboard">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {locationData && (
        <div>
          <h2>{locationData.city}</h2>
          <p>Temperature: {locationData.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
