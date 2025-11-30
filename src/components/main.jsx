import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { getWeatherCondition } from "../utils/weatherApi";

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

  return (
    <main className="main-content">
      <section className="weather-list">
        <WeatherCard
          temp={temp}
          city={weather?.city}
          loading={weatherLoading}
        />
      </section>

      <section className="items-list">
        {filtered.length === 0 ? (
          <p>No items match current weather ({condition})</p>
        ) : (
          <ul className="items-grid">
            {filtered.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onClick={() => onItemClick(item)}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
