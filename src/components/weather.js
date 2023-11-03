import React, { useState, useEffect } from "react";
import SearchBar from "./search.js";
import CurrentWeather from "./currentWeather.js";
import Forecast from "./forecast.js";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState([]);
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
        setForecast(data.forecast.forecastday);
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

  const fetchWeatherForCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(`${latitude},${longitude}`);
          fetch7DayWeatherForecast(city);
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="weather-dashboard">
      <SearchBar onSearch={handleSearch} loading={loading} error={error} />
      <CurrentWeather city={city} country={country} temperature={temperature} />
      <div className="forecast">
        {forecast.map((day, index) => (
          <Forecast
            key={index}
            day={formatDay(day.date)}
            date={formatDate(day.date)}
            maxTemp={day.day.maxtemp_c}
            minTemp={day.day.mintemp_c}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
