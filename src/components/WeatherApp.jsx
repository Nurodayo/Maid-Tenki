import Map from "./Map";
import Weather from "./Weather";

function WeatherApp() {
  const position = [-41.469, -72.942];
  return (
    <div id="todalawea">
      <Map position={position} />
      <Weather position={position} />
    </div>
  );
}

export default WeatherApp;
