import React from "react";
import { getWeatherCondition } from "../../utils/weatherApi";
import { weatherOptions } from "../../utils/constants";
import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";
import "../WeatherCard/WeatherCard.css";

export default function WeatherCard({ weather, loading = false }) {
  const day = weather?.day;
  const temp = weather?.temp;
  const condition = weather?.condition;
  const { currentTemperatureUnit } = useCurrentTemperatureUnit();
  const unit = currentTemperatureUnit === "fahrenheit" ? "°F" : "°C";
  const tempData = weather?.temperature || {};
  const displayTemp =
    tempData[currentTemperatureUnit === "fahrenheit" ? "F" : "C"];
  const weatherOption = weatherOptions.filter((option) => {
    return option.day === day && option.condition === condition;
  });

  const weatherCondition = getWeatherCondition(temp);
  const cardClass = `weather-card weather-card--${
    weatherCondition || "Loading..."
  }`;

  return (
    <div className={cardClass}>
      <div className="weather-inner">
        <div className="weather-temp">{displayTemp}</div>
        <div className="weather-unit">{unit}</div>
      </div>
      <img
        className="weather-card__image"
        src={weatherOption[0]?.url || weatherOptions[0]?.url}
        alt={weather?.condition || "weather"}
      />
    </div>
  );
}
