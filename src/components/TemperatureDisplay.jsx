const TemperatureDisplay = ({ temperature, unit }) => {
  return (
    <p className="text-xl">
      {temperature} °{unit === "Celsius" ? "C" : "F"}
    </p>
  );
};

export default TemperatureDisplay;
