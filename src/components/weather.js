import React, { useState, useEffect } from "react";
import SearchBar from "./search.js";
import CurrentWeather from "./currentWeather.js";
import Forecast from "./forecast.js";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [maxTempAll, setMaxTempAll] = useState(null);
  const [minTempAll, setMinTempAll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [defaultLocation] = useState(""); // Set your default location here

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
        setCity(data.location.name);
        setCountry(data.location.country);
        setTemperature(data.current.temp_c);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const fetch7DayWeatherForecast = (city) => {
    const apiKey = "fc0844b2a1384e18bc8154636230211";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const forecastData = data.forecast.forecastday;
        setForecast(forecastData);
        const maxTemps = forecastData.map((day) => day.day.maxtemp_c);
        const minTemps = forecastData.map((day) => day.day.mintemp_c);
        setMaxTempAll(Math.max(...maxTemps));
        setMinTempAll(Math.min(...minTemps));
      })
      .catch((error) => {
        console.error("Failed to fetch 7-day weather forecast: " + error);
      });
  };

  const formatDay = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleSearch = (userCity) => {
    if (userCity) {
      setCity("");
      setCountry("");
      setTemperature(null);
      setLoading(true);
      setError(null);
      fetchWeatherByCoordinates(userCity);
      fetch7DayWeatherForecast(userCity);
    }
  };

  useEffect(() => {
    if (defaultLocation) {
      fetchWeatherByCoordinates(defaultLocation);
      fetch7DayWeatherForecast(defaultLocation);
    }
    // eslint-disable-next-line
  }, [defaultLocation]);

  return (
    <div className="weather-dashboard">
      <SearchBar onSearch={handleSearch} loading={loading} error={error} />
      <CurrentWeather city={city} country={country} temperature={temperature} />
      <div className="forecast">
        {forecast.slice(0, 7).map((day, index) => (
          <Forecast
            key={index}
            day={formatDay(day.date)}
            date={formatDate(day.date)}
            maxTemp={day.day.maxtemp_c}
            minTemp={day.day.mintemp_c}
            maxTempAll={maxTempAll}
            minTempAll={minTempAll}
            currentTemp={index === 0 ? temperature : null}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
