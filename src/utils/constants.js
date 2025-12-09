// API and default coordinates. Do NOT commit a real API key here.
// Paste your OpenWeather API key here when you want to enable live requests.
export const API_KEY = "0327c72573e5919f2a22571adf96ad6b"; // <-- add your API key here if available

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/dayClear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/dayCloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("../images/dayFog.png", import.meta.url).href,
    //src/images/dayFog.png
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../images/dayRain.png", import.meta.url).href,
    //src/images/dayRain.png
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("../images/daySnow.png", import.meta.url).href,
    //src/images/daySnow.png
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../images/dayStorm.png", import.meta.url).href,
    //src/images/dayStorm.png
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/nightClear.png", import.meta.url).href,
    //src/images/nightClear.png
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../images/nightCloudy.png", import.meta.url).href,
    //src/images/nightCloudy.png
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("../images/nightFog.png", import.meta.url).href,
    //src/images/nightFog.png
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../images/nightRain.png", import.meta.url).href,
    //src/images/nightRain.png
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("../images/nightSnow.png", import.meta.url).href,
    //src/images/nightSnow.png
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../images/nightStorm.png", import.meta.url).href,
    //src/images/nightStorm.png
  },
];

// Default coordinates (you can change these to your preferred city)
export const DEFAULT_LAT = 31.776948;
export const DEFAULT_LON = 35.234536;
