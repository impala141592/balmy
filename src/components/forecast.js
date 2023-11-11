const Forecast = ({
  day,
  date,
  maxTemp,
  minTemp,
  maxTempAll,
  minTempAll,
  currentTemp,
  unit,
  themeClass,
}) => {
  return (
    <div className={`forecast-item ${themeClass}`}>
      <div className="forecast-date-day">
        <span className="forecast-day">{day}</span>
        <span className="forecast-date">{date}</span>
      </div>
      <div className="forecast-temp-graph">
        <span className="forecast-temp min">
          {minTemp}
          {unit}
        </span>
        <TempBar
          minTemp={minTemp}
          maxTemp={maxTemp}
          minTempAll={minTempAll}
          maxTempAll={maxTempAll}
          currentTemp={currentTemp}
          themeClass={themeClass}
        />
        <span className="forecast-temp max">
          {maxTemp}
          {unit}
        </span>
      </div>
    </div>
  );
};

const TempBar = ({
  minTemp,
  maxTemp,
  maxTempAll,
  minTempAll,
  currentTemp,
  themeClass,
}) => {
  const width = window.innerWidth > 520 ? 200 : 100;
  const leftPosition =
    ((minTemp - minTempAll) / (maxTempAll - minTempAll)) * width;
  const rightPosition =
    ((maxTempAll - maxTemp) / (maxTempAll - minTempAll)) * width;

  // const currentPosition = ((currentTemp - minAmplitude) / currentTemp) * width;

  const currentPosition =
    ((currentTemp - minTempAll) / (maxTempAll - minTempAll)) * width;

  return (
    <div className={`temp-bar ${themeClass}`} style={{ width: `${width}px` }}>
      {currentTemp ? (
        <div
          className="temp-bar-current"
          style={{ left: `${currentPosition - 10}px` }}
        ></div>
      ) : null}
      <div
        className={`temp-bar-inner ${themeClass}`}
        style={{
          right: `${rightPosition + 2}px`,
          left: `${leftPosition + 2}px`,
        }}
      ></div>
    </div>
  );
};

export default Forecast;
