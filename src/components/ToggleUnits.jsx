const ToggleUnits = ({ handleResetCachedData, unit, toggleUnit }) => {
  return (
    <>
      <div className="mt-4 flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={unit === "Fahrenheit"}
            onChange={toggleUnit}
          />
          {/* Toggle Track */}
          <div className="relative w-32 h-8 bg-gray-300 rounded-full transition duration-300 flex items-center px-1">
            {/* Toggle Dot with Dynamic Text */}
            <div
              className={`absolute flex bg-blue-500 items-center justify-center text-xs font-bold text-white w-8 h-6 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                unit === "Fahrenheit" ? "translate-x-[88px]" : "translate-x-0"
              }`}
            >
              {unit === "Fahrenheit" ? "°F" : "°C"}
            </div>

            {/* Dynamic Label: Display text on opposite side of thumb */}
            <span
              className={`absolute text-xs font-bold transition-opacity ${
                unit === "Fahrenheit"
                  ? "left-2 text-gray-800"
                  : "right-2 text-gray-800"
              }`}
            >
              {unit === "Fahrenheit" ? "Fahrenheit" : "Celsius"}
            </span>
          </div>
        </label>
      </div>
      <button className="underline mt-2" onClick={handleResetCachedData}>
        Reset data
      </button>
    </>
  );
};

export default ToggleUnits;
