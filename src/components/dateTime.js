import React, { useState, useEffect } from "react";

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateGreeting = (currentDate) => {
    const currentHour = currentDate.getHours();
    let greeting = "";
    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
    return greeting;
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const greeting = updateGreeting(currentDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="date-time">
      <span className="greeting">{`${greeting}, it's `}</span>
      <span className="date">{formattedDate}</span>
    </div>
  );
};

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const formattedHour = currentTime.getHours().toString().padStart(2, "0");
  const formattedMinute = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedSecond = currentTime.getSeconds().toString().padStart(2, "0");

  return (
    <div className="time">
      <span className="digits hour">{formattedHour}</span>
      <span className="colon">:</span>
      <span className="digits minute">{formattedMinute}</span>
      <span className="colon">:</span>
      <span className="digits second">{formattedSecond}</span>
    </div>
  );
};

export { TimeDisplay, DateDisplay };
