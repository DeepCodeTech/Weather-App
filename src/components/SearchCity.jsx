import { useDispatch, useSelector } from "react-redux";
import { fetchCitySuggestions } from "../utils/services/weatherService";
import { setCitySuggestions, clearCitySuggestions } from "../slices/appSlice";
import { debounce } from "../utils/debounce";
import { useState } from "react";

const SearchCity = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const citySuggestions = useSelector((state) => state.app.citySuggestions);

  const fetchSuggestions = debounce(async (inputValue) => {
    const fetchedSuggestions = await fetchCitySuggestions(inputValue);
    dispatch(setCitySuggestions(fetchedSuggestions));
  }, 300);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue) {
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
      />
      {citySuggestions.length > 0 && (
        <ul>
          {citySuggestions.map((city) => (
            <li key={city.id} onClick={() => handleCitySelect(city.name)}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;
