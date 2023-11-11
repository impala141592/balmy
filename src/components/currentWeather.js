const CurrentWeather = ({ city, country, temperature, unit, themeClass }) => {
  return (
    <div className={`current-weather ${themeClass}`}>
      <div className="current-location">
        <span className="current-city">{city}</span>
        <span className="current-country">{country}</span>
      </div>
      <span className="current-temperature">
        {temperature}
        {unit}
      </span>
    </div>
  );
};

export default CurrentWeather;
