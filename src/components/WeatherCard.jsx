import React from "react";
import { getWeatherCondition } from "../utils/weatherApi";

export default function WeatherCard({ temp, city, loading = false }) {
  const condition = getWeatherCondition(temp);
  const tempStr = loading
    ? "Loading…"
    : typeof temp === "number"
    ? Math.round(temp) + "°F"
    : "--";

  return (
    <div className={`weather-card weather-card--${condition}`}>
      <div className="weather-inner">
        <div className="weather-temp">{tempStr}</div>
        <div className="weather-city">{loading ? "" : city || "Unknown"}</div>
      </div>
    </div>
  );
}
