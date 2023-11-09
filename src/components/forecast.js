const Forecast = ({
  day,
  date,
  maxTemp,
  minTemp,
  maxTempAll,
  minTempAll,
  currentTemp,
  unit,
}) => {
  return (
    <div className="forecast-item">
      <div className="forecast-date-day">
        <span className="forecast-day">{day}</span>
        <span className="forecast-date">{date}</span>
      </div>
      <div className="forecast-temp-graph">
        <span className="forecast-temp">
          {minTemp}
          {unit}
        </span>
        <TempBar
          minTemp={minTemp}
          maxTemp={maxTemp}
          minTempAll={minTempAll}
          maxTempAll={maxTempAll}
          currentTemp={currentTemp}
        />
        {/* <div className="temp-bar">
          <div className="temp-bar-inner">{currentTemp}</div>
        </div> */}
        <span className="forecast-temp">
          {maxTemp}
          {unit}
        </span>
      </div>
    </div>
  );
};

const TempBar = ({ minTemp, maxTemp, maxTempAll, minTempAll, currentTemp }) => {
  const width = 200;
  const leftPosition =
    ((minTemp - minTempAll) / (maxTempAll - minTempAll)) * width;
  const rightPosition =
    ((maxTempAll - maxTemp) / (maxTempAll - minTempAll)) * width;

  // const currentPosition = ((currentTemp - minAmplitude) / currentTemp) * width;

  const currentPosition =
    ((currentTemp - minTempAll) / (maxTempAll - minTempAll)) * width;

  return (
    <div className="temp-bar" style={{ width: `${width}px` }}>
      {currentTemp ? (
        <div
          className="temp-bar-current"
          style={{ left: `${currentPosition}px` }}
        ></div>
      ) : null}
      <div
        className="temp-bar-inner"
        style={{
          right: `${rightPosition + 2}px`,
          left: `${leftPosition + 2}px`,
        }}
      ></div>
    </div>
  );
};

export default Forecast;
