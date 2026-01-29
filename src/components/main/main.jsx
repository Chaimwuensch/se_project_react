import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { getWeatherCondition } from "../../utils/weatherApi";
import "./main.css";

export default function Main({
  items = [],
  onItemClick,
  weather,
  weatherLoading,
}) {
  const temp = weather?.temp;
  const condition = getWeatherCondition(temp);

  const filtered = items.filter((it) => {
    // normalize both to lowercase for comparison
    const w = (it.weather || "").toString().toLowerCase();
    return w === condition;
  });

  console.log("Total items:", items.length);
  console.log("Current weather condition:", condition);
  console.log("Filtered items:", filtered.length);
  return (
    <main className="main-content">
      <section className="weather-list">
        <WeatherCard weather={weather} loading={weatherLoading} />
      </section>

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
