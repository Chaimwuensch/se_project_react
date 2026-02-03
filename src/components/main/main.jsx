import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { getWeatherCondition } from "../../utils/weatherApi";
import "./main.css";
import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";

export default function Main({
  items = [],
  onItemClick,
  weather,
  weatherLoading,
}) {
  const { currentTemperatureUnit } = useCurrentTemperatureUnit();
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";
  const tempData = weather?.temperature || {};
  const displayTemp =
    tempData[currentTemperatureUnit === "F" ? "F" : "C"];
  const condition = getWeatherCondition(displayTemp);

  const filtered = items.filter((it) => {
    const w = (it.weather || "").toString().toLowerCase();
    return w === condition;
  });

  return (
    <main className="main-content">
      <section className="weather-list">
        <WeatherCard weather={weather} loading={weatherLoading} />
      </section>
      <div className="main__info">
        <p className="main__description">
          Today is {displayTemp}
          {unit}/You may want to wear:
        </p>
      </div>
      <section className="items-list">
        {filtered.length === 0 ? (
          <p>No items match current weather ({condition})</p>
        ) : (
          <ul className="items-grid">
            {filtered.map((item) => (
              <ItemCard key={item.id} card={item} onCardClick={onItemClick} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
