import { useEffect, useState } from "react";
import useWeather from "../hooks/useWeather";

function Weather({ position }) {
  const currentTime = new Date();
  const data = useWeather(position);

  const [tempA, setTempA] = useState(0);
  const [rainA, setRainA] = useState(0);
  // const [temps, setTemps] = useState([]);
  // const [rains, setRains] = useState([]);
  // const [times, setTimes] = useState([]);

  useEffect(() => {
    if (data) {
      const temps = [...data.hourly.temperature_2m];
      const rains = [...data.hourly.rain];
      const times = data.hourly.time;

      const yearC = currentTime.getFullYear();
      const dayC = currentTime.getDate();
      const monthC = currentTime.getMonth();
      const hourC = currentTime.getHours();

      const obj = times.find((time) => {
        return (
          time.getFullYear() === yearC &&
          time.getDate() === dayC &&
          time.getHours() === hourC &&
          time.getMonth() === monthC
        );
      });
      // fin de la funcion para obtener la ultima hora
      const [tempC, rainC] = (() => {
        const i = times.indexOf(obj);
        console.log(i);

        return [temps[i], rains[i]];
      })();
      console.log("Wazaaaaaaa");
      console.log(obj);

      setTempA(tempC);
      setRainA(rainC);
    } else {
      return;
    }
  }, [data, currentTime]);
  if (!data) {
    return <p>Cargando...</p>;
  }
  const temps = [...data.hourly.temperature_2m];
  const rains = [...data.hourly.rain];
  const times = data.hourly.time;
  console.log(currentTime);
  console.log(data);
  return (
    <div id="weather-display">
      <div className="weather-list">
        <ul>
          {times.map((time, i) => (
            <li key={i}>
              {time.toLocaleString()} — 🌡 {temps[i].toFixed(1)}°C — ☔{" "}
              {rains[i].toFixed(2)} mm
            </li>
          ))}
        </ul>
      </div>
      <div className="current-weather">
        <h2>Temperatura actual.</h2>
        <h3>
          {tempA.toFixed(1)}°C / {rainA.toFixed(2)} mm.
        </h3>
      </div>
    </div>
  );
}

export default Weather;
