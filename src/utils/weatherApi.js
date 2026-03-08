// Small wrapper around OpenWeather calls and weather condition helper

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export async function fetchWeather(lat, lon, API_KEY) {
  if (!API_KEY)
    return { temp: 72, city: "Sample City", temperature: { F: 72, C: 22 } };

  // Basic validation of coordinates
  if (typeof lat !== "number" || typeof lon !== "number") {
    throw new Error("Invalid coordinates provided to fetchWeather");
  }

  // Call OpenWeather using provided lat/lon and API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API request failed");

  const data = await res.json();

  // Extract temperature and city name
  const temp = data?.main?.temp;
  const city = data?.name || "";
  const day = isDay(data.sys, Date.now());
  const condition = data.weather[0].main;

  return {
    temp,
    city,
    day,
    condition,
    temperature: {
      F: Math.round(temp),
      C: Math.round(((temp - 32) * 5) / 9),
    },
  };
}

// Optional helper for mapping temp to a condition string
export function getWeatherCondition(tempF) {
  if (typeof tempF !== "number") return "warm";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}
