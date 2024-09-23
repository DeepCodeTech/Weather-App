import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_APP_API_KEY;

export const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchCitySuggestions = async (query) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

export const fetchFiveDayForecast = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return null;
  }
};

export const fetchWeatherDataForCurrentLocation = async (
  latitude,
  longitude
) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
    import.meta.env.VITE_WEATHER_APP_API_KEY
  }&units=metric`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    return null;
  }
};
