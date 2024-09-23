import { useDispatch, useSelector } from "react-redux";
import PullToRefresh from "react-pull-to-refresh";
import SearchCity from "./components/searchCity";
import CityDisplay from "./components/CityDisplay";
import TemperatureDisplay from "./components/TemperatureDisplay";
import WeatherConditionDisplay from "./components/WeatherConditionDisplay";
import WeatherIcon from "./components/WeatherIcon";
import Popup from "./components/Popup";
import ForecastCard from "./components/ForecastCard";
import {
  fetchWeatherData,
  fetchFiveDayForecast,
  fetchWeatherDataForCurrentLocation,
} from "./utils/services/weatherService";
import {
  setWeatherData,
  setError,
  closePopup,
  setForecastData,
  resetAppState,
} from "./slices/appSlice";
import { useState, useEffect } from "react";
import {
  setQueryParams,
  getQueryParams,
} from "./utils/customHooks/useQueryParams";
import "./App.css";
import ForecastingDataMapper from "./components/ForecastingDataMapper";
import Footer from "./components/Footer";
import ToggleUnits from "./components/ToggleUnits";

const App = () => {
  const dispatch = useDispatch();
  const { weatherData, forecastData, error, popupVisible } = useSelector(
    (state) => state.app
  );
  const [unit, setUnit] = useState("Celsius");
  const [loading, setLoading] = useState(false);

  const saveToLocalStorage = (city, weatherData, forecastData) => {
    localStorage.setItem(
      "weatherData",
      JSON.stringify({ city, weatherData, forecastData })
    );
  };

  const loadFromLocalStorage = () => {
    const cachedData = localStorage.getItem("weatherData");
    return cachedData ? JSON.parse(cachedData) : null;
  };

  const handleCitySelect = async (city) => {
    setQueryParams({ city });
    setLoading(true);
    const weatherData = await fetchWeatherData(city);
    if (weatherData === null) {
      dispatch(setError("City not found. Please try another."));
      setQueryParams({});
    } else {
      dispatch(setWeatherData(weatherData));
      const forecastData = await fetchFiveDayForecast(city);
      const dailyForecast = getDailyForecast(forecastData.list);
      dispatch(setForecastData(dailyForecast));
      saveToLocalStorage(city, weatherData, dailyForecast);
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const cityWeather = await fetchWeatherDataForCurrentLocation(
            latitude,
            longitude
          );
          if (cityWeather) {
            dispatch(setWeatherData(cityWeather));
            const forecastData = await fetchFiveDayForecast(cityWeather.name);
            const dailyForecast = getDailyForecast(forecastData.list);
            dispatch(setForecastData(dailyForecast));
          } else {
            dispatch(
              setError("Could not fetch weather data for your location.")
            );
          }
        },
        () => {
          dispatch(setError("Location access denied."));
        }
      );
    } else {
      dispatch(setError("Geolocation is not supported by this browser."));
    }
  };

  useEffect(() => {
    const cachedData = loadFromLocalStorage();
    const params = getQueryParams();
    const city = params.get("city");

    if (cachedData) {
      dispatch(setWeatherData(cachedData.weatherData));
      dispatch(setForecastData(cachedData.forecastData));
    } else if (city) {
      handleCitySelect(city);
    } else fetchWeatherByLocation();
  }, []);

  const refreshData = async () => {
    const params = getQueryParams();
    const city = params.get("city");
    if (city) {
      await handleCitySelect(city);
    }
  };

  const getDailyForecast = (list) => {
    const dailyForecast = [];
    const seenDates = new Set();

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const formattedDate = date.toLocaleDateString();

      if (!seenDates.has(formattedDate) && dailyForecast.length < 5) {
        seenDates.add(formattedDate);
        dailyForecast.push(item);
      }
    });

    return dailyForecast;
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"));
  };

  const handleResetCachedData = () => {
    setQueryParams({}, true);
    localStorage.removeItem("weatherData");
    dispatch(resetAppState());
    dispatch(setWeatherData(null));
    dispatch(setForecastData([]));
  };

  const convertTemperature = (temp) => {
    let convertedTemp;
    if (unit === "Celsius") {
      convertedTemp = temp;
    } else {
      convertedTemp = (temp * 9) / 5 + 32;
    }
    return convertedTemp.toFixed(2);
  };

  return (
    <PullToRefresh onRefresh={refreshData}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 p-4">
        <h1 className="text-3xl mb-10">Weather App Dashboard</h1>
        {popupVisible && <Popup message={error} onClose={handleClosePopup} />}
        <SearchCity onSelectCity={handleCitySelect} />
        <ToggleUnits {...{ handleResetCachedData, unit, toggleUnit }} />
        {loading ? (
          <div className="loader"></div>
        ) : weatherData ? (
          <div className="mt-6 mb-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
            <CityDisplay city={weatherData.name} />
            <TemperatureDisplay
              temperature={convertTemperature(weatherData.main.temp)}
              unit={unit}
            />
            <WeatherConditionDisplay
              condition={weatherData.weather[0].description}
            />
            <WeatherIcon
              iconUrl={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            />
            <ForecastingDataMapper
              {...{ forecastData, convertTemperature, unit }}
            />
          </div>
        ) : (
          <p className="m-auto">Select a city</p>
        )}
        <Footer />
      </div>
    </PullToRefresh>
  );
};

export default App;
