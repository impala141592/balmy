const Forecast = ({ day, date, maxTemp, minTemp }) => {
  return (
    <div className="forecast-item">
      <div className="forecast-date-day">
        <span className="forecast-day">{day}</span>
        <span className="forecast-date">{date}</span>
      </div>
      <div className="forecast-temp-graph">
        <span className="forecast-temp">{maxTemp}°C</span>
        <div className="temp-bar">
          <div className="temp-bar-inner"></div>
        </div>
        <span className="forecast-temp">{minTemp}°C</span>
      </div>
    </div>
  );
};

const TempBar = ({ minTemp, maxTemp }) => {
  return (
    <div className="temp-bar">
      <div className="temp-bar-inner" style={{ width: `${maxTemp}%` }}></div>
    </div>
  );
};

export default Forecast;
