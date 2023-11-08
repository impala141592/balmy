import React, { useState, useEffect } from "react";
import SearchBar from "./search.js";
import CurrentWeather from "./currentWeather.js";
import Forecast from "./forecast.js";
import Options from "./options.js";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [maxTempAll, setMaxTempAll] = useState(null);
  const [minTempAll, setMinTempAll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("°C");

  const [defaultLocation] = useState("Warsaw"); // Set your default location here

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

        if (unit === "°C") {
          setTemperature(data.current.temp_c);
        } else {
          setTemperature(data.current.temp_f);
        }

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
        const maxTemps = forecastData.map((day) =>
          unit === "°C" ? day.day.maxtemp_c : day.day.maxtemp_f
        );
        const minTemps = forecastData.map((day) =>
          unit === "°C" ? day.day.mintemp_c : day.day.mintemp_f
        );
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

  const toggleUnit = () => {
    if (unit === "°C") {
      setUnit("°F");
      setTemperature(((temperature * 9) / 5 + 32).toFixed(1));
      setMaxTempAll(((maxTempAll * 9) / 5 + 32).toFixed(1));
      setMinTempAll(((minTempAll * 9) / 5 + 32).toFixed(1));
    } else {
      setUnit("°C");
      setTemperature((((temperature - 32) * 5) / 9).toFixed(1));
      setMaxTempAll((((maxTempAll - 32) * 5) / 9).toFixed(1));
      setMinTempAll((((minTempAll - 32) * 5) / 9).toFixed(1));
    }
  };

  return (
    <div className="weather-dashboard">
      <div className="search-options">
        <SearchBar onSearch={handleSearch} loading={loading} error={error} />
        <Options
          unit={unit}
          onUnitToggle={() => toggleUnit(unit === "°C" ? "°F" : "°C")}
        />
      </div>
      <CurrentWeather
        city={city}
        country={country}
        temperature={temperature}
        unit={unit}
      />
      <div className="forecast">
        {forecast.slice(0, 7).map((day, index) => (
          <Forecast
            key={index}
            day={formatDay(day.date)}
            date={formatDate(day.date)}
            maxTemp={unit === "°C" ? day.day.maxtemp_c : day.day.maxtemp_f}
            minTemp={unit === "°C" ? day.day.mintemp_c : day.day.mintemp_f}
            maxTempAll={maxTempAll}
            minTempAll={minTempAll}
            currentTemp={index === 0 ? temperature : null}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
