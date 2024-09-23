const ToggleUnits = ({ handleResetCachedData, unit, toggleUnit }) => {
  return (
    <>
      <div className="mt-4 flex items-center">
        <span className="mr-2 text-lg">{unit}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={unit === "Fahrenheit"}
            onChange={toggleUnit}
          />
          <div className="toggle__line w-14 h-8 bg-gray-300 rounded-full"></div>
          <div
            className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform"
            style={{
              transform:
                unit === "Fahrenheit" ? "translateX(100%)" : "translateX(0)",
            }}
          ></div>
        </label>
      </div>
      <button className="underline" onClick={handleResetCachedData}>
        Reset data
      </button>
    </>
  );
};

export default ToggleUnits;
