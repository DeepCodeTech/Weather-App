import { useDispatch, useSelector } from "react-redux";
import { fetchCitySuggestions } from "../utils/services/weatherService";
import { setCitySuggestions, clearCitySuggestions } from "../slices/appSlice";
import debounce from "lodash/debounce";
import { useState, useEffect, useCallback } from "react";

const SearchCity = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const citySuggestions = useSelector((state) => state.app.citySuggestions);

  // Debounced API Call with Lodash (Stable Reference)
  const fetchSuggestions = useCallback(
    debounce(async (inputValue) => {
      if (!inputValue.trim()) return;
      const fetchedSuggestions = await fetchCitySuggestions(inputValue);
      dispatch(setCitySuggestions(fetchedSuggestions));
    }, 300),
    [] // Empty dependency to ensure it remains stable
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => fetchSuggestions.cancel();
  }, [fetchSuggestions]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue.trim()) {
      fetchSuggestions(inputValue);
    } else {
      dispatch(clearCitySuggestions());
    }
  };

  const handleCitySelect = (city) => {
    onSelectCity(city);
    setQuery("");
    dispatch(clearCitySuggestions());
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className="px-4 py-2 rounded-xl"
      />
      {citySuggestions.length > 0 && (
        <ul>
          {citySuggestions.map((city) => (
            <li
              className="cursor-pointer hover:bg-gray-200 p-2"
              key={city.id}
              onClick={() => handleCitySelect(city.name)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;
