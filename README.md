# Weather App

This is a feature-rich weather dashboard application built with React. It allows users to search for current weather information by city name, see a 5-day forecast, and even get weather data based on their location.

## Features
- **Search Weather by City**: Easily search for current weather and a 5-day forecast for any city.
- **Location-based Weather**: Option to get weather details based on the user’s current location.
- **Responsive Design**: Optimized for both desktop and mobile views for a seamless experience.
- **Detailed Weather Info**: Displays temperature, humidity, wind speed, and weather conditions.
- **5-Day Forecast**: View the forecast for the next five days, including temperature highs/lows and weather icons.
- **Error Handling**: Shows helpful error messages for invalid city names or issues fetching data.
- **Lazy Loading**: Components are lazy-loaded to improve performance.
- **Offline Cache**: Stores the last searched city and its weather data for offline viewing.
- **Query Parameter Updates**: Automatically updates the URL with search queries, making sharing easy.
- **Unit Conversion**: Easily switch between Celsius and Fahrenheit for temperature display.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine using `git clone`.
   ```bash
   git clone https://github.com/DeepCodeTech/Weather-App.git
2. Navigate to the project directory.
   ```bash
   cd react-app
3. Install dependencies using npm or yarn.
    ```bash
    npm install
4. Create a .env file in the root of the project with the following environment variable for the OpenWeatherMap API key:
    ```bash
    VITE_WEATHER_APP_API_KEY="f788e4671071ee45d3255bd32a5b0bb4"
5. Start the development server.
   ```bash
   npm run dev
6. Open your web browser and go to http://localhost:5173 to view the app.
7. You can also interact with the app deployed on GitHub Pages: https://deepcodetech.github.io/Weather-App. 

Usage
  1.	Search: Enter the name of the city for which you want to see the weather information in the input field.
  2.	Current Weather: View the current weather details including temperature, humidity, and wind speed.
  3.	5-Day Forecast: See a detailed 5-day forecast with high/low temperatures and weather icons.
  5.	Location-based Weather: Allow the app to access your location to automatically fetch weather data for your town or city.
  6.	Responsive Design: The app adapts to mobile, tablet, and desktop screens.
  7.	Celsius/Fahrenheit Toggle: Switch between Celsius and Fahrenheit temperature units.

## Technologies Used
- **React** for building the user interface.
- **Redux** for global state management (weather data, city suggestions, and favorites).
- **Tailwind CSS** for responsive design and styling.
- **Axios** for making API requests.
- **Vite** for fast development bundling.
- **OpenWeatherMap API** for fetching weather data.
- **Browser Geolocation API** for getting the user’s current location.
- **LocalStorage** for caching data to enable offline viewing.

## Updates and Enhancements
- **Performance Optimizations**: Implemented lazy loading for components to improve performance.
- **Offline Mode**: Cached last searched city data for offline access.
- **Location-based Weather**: Integrated location permission to fetch weather data for the user’s current location.
- **Query Parameters**: Automatically update the URL with query parameters to share searches via links.
<hr/>
Contributing

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Contributions are welcome and appreciated! If you have any questions or feedback, please don’t hesitate to contact me.
