// Small wrapper around OpenWeather calls and weather condition helper

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export async function fetchWeather(lat, lon, apiKey) {
  // If there's no API key available, return a safe mock so the UI still works.
  if (!apiKey) return { temp: 72, city: "Sample City" };

  // Basic validation of coordinates
  if (typeof lat !== "number" || typeof lon !== "number") {
    throw new Error("Invalid coordinates provided to fetchWeather");
  }

  // Call OpenWeather using provided lat/lon and API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API request failed");

  const data = await res.json();

  // Extract temperature and city name
  const temp = data?.main?.temp;
  const city = data?.name || "";
  const day = isDay(data.sys, Date.now());
  const condition = data.weather[0].main.toLowerCase();

  return { temp, city, day, condition };
}

// Optional helper for mapping temp to a condition string
export function getWeatherCondition(tempF) {
  if (typeof tempF !== "number") return "warm";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}
