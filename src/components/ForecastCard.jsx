import React from "react";

const ForecastCard = ({ day, highTemp, lowTemp, iconUrl }) => {
  return (
    <div className="forecast-card">
      <h3>{day}</h3>
      <img src={iconUrl} alt="weather icon" className="m-auto" />
      <p>High: {highTemp}</p>
      <p>Low: {lowTemp}</p>
    </div>
  );
};

export default ForecastCard;
