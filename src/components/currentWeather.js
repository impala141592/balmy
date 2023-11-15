const CurrentWeather = ({
  city,
  country,
  temperature,
  unit,
  condition,
  themeClass,
}) => {
  return (
    <div className={`current-weather ${themeClass}`}>
      <div className="current-location">
        <span className="current-city">{city}</span>
        <span className="current-country">{country}</span>
      </div>
      <div className="current-conditions">
        <span>{condition}</span>
        <span>
          {temperature}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
