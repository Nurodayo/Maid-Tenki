import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";

function useWeather(position) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const funcionpaqnoqueje = async () => {
      if (!position) return;

      const params = {
        latitude: position[0],
        longitude: position[1],
        hourly: ["temperature_2m", "rain"],
        start_date: "2025-10-22",
        end_date: "2025-11-05",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      const response = responses[0];
      const hourly = response.hourly();

      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      const weatherData = {
        hourly: {
          time: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),

          temperature_2m: hourly.variables(0).valuesArray(),
          rain: hourly.variables(1).valuesArray(),
        },
      };

      setData(weatherData);

      console.log(weatherData);
    };
    funcionpaqnoqueje();
  }, [position]);

  return data;
}

export default useWeather;
