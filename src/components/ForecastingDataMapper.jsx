import ForecastCard from "./ForecastCard";

const ForecastingDataMapper = ({ forecastData, unit, convertTemperature }) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forecastData.map((dayData, index) => {
        const date = new Date(dayData.dt * 1000);
        const day = date.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const highTemp = convertTemperature(dayData.main.temp_max);
        const lowTemp = convertTemperature(dayData.main.temp_min);
        const iconUrl = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

        return (
          <ForecastCard
            key={index}
            day={day}
            highTemp={`${highTemp} °${unit === "Celsius" ? "C" : "F"}`}
            lowTemp={`${lowTemp} °${unit === "Celsius" ? "C" : "F"}`}
            iconUrl={iconUrl}
          />
        );
      })}
    </div>
  );
};

export default ForecastingDataMapper;
