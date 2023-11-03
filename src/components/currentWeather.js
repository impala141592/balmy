const CurrentWeather = ({ city, country, temperature }) => {
  return (
    <div className="current-weather">
      <div className="current-location">
        <span className="current-city">{city}</span>
        <span className="current-country">{country}</span>
      </div>
      <span className="current-temperature">{temperature}°C</span>
    </div>
  );
};

export default CurrentWeather;
