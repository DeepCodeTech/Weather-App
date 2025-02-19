import React from "react";

const ForecastCard = ({ day, highTemp, lowTemp, iconUrl }) => {
  return (
    <div className="forecast-card rounded-[20px] w-[200px] padding-block-[20px] shadow-[0px_4px_24px_rgba(0,0,0,0.20)]">
      <h3>{day}</h3>
      <img src={iconUrl} alt="weather icon" className="m-auto" />
      <p>High: {highTemp}</p>
      <p>Low: {lowTemp}</p>
    </div>
  );
};

export default ForecastCard;
