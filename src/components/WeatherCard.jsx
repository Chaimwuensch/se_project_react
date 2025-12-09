import React from "react";
import { getWeatherCondition } from "../utils/weatherApi";
import { weatherOptions } from "../utils/constants";
import { useTemperatureUnit } from "../contexts/CurrentTemperatureUnitContext";

export default function WeatherCard({ weather, loading = false }) {
  const day = weather?.day;
  const temp = weather?.temp;
  const condition = weather?.condition;
  const { currentTemperatureUnit } = useTemperatureUnit();
  console.log("weather", day, condition);
  const weatherOption = weatherOptions.filter((option) => {
    return option.day === day && option.condition === condition;
  });
  let tempStr = "--";
  if (loading) tempStr = "Loading…";
  else if (typeof temp === "number") {
    tempStr =
      currentTemperatureUnit === "F"
        ? Math.round(temp) + "°F"
        : Math.round(((temp - 32) * 5) / 9) + "°C";
  }

  console.log(weatherOption, weatherOptions, day, condition);

  const weatherCondition = getWeatherCondition(temp);
  const cardClass = `weather-card weather-card--${weatherCondition}`;

  return (
    <div className={cardClass}>
      <div className="weather-inner">
        <div className="weather-temp">{tempStr}</div>
      </div>
      <img
        className="weather-card__image"
        src={weatherOption[0]?.url || weatherOptions[0]?.url}
        alt="Card showing weather condition"
      />
    </div>
  );
}
