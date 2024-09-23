import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: null,
  error: null,
  popupVisible: false,
  citySuggestions: [],
  favoriteCities: [],
  forecastData: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addFavoriteCity: (state, action) => {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity: (state, action) => {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city !== action.payload
      );
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      state.popupVisible = false;
    },
    setForecastData: (state, action) => {
      state.forecastData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.popupVisible = true;
    },
    closePopup: (state) => {
      state.popupVisible = false;
      state.error = null;
    },
    setCitySuggestions: (state, action) => {
      state.citySuggestions = action.payload;
    },
    clearCitySuggestions: (state) => {
      state.citySuggestions = [];
    },
    resetAppState: () => initialState, // Return the initial state directly
  },
});

export const {
  setWeatherData,
  addFavoriteCity,
  setError,
  resetAppState,
  setForecastData,
  closePopup,
  setCitySuggestions,
  clearCitySuggestions,
  removeFavoriteCity,
} = appSlice.actions;
export default appSlice.reducer;
