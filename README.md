# WTWR — What To Wear (Frontend)

This repository contains the frontend for the "WTWR" project used in Sprint 10.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000 (Vite is configured to open the browser automatically).

## OpenWeather API

To enable live weather fetching, copy your OpenWeather API key into `src/utils/constants.js` by setting `API_KEY` to your key string. Example:

```js
export const API_KEY = "0327c72573e5919f2a22571adf96ad6b";
```

If `API_KEY` is empty the app will use a safe mocked weather (72°F) so the UI still works offline.

## What I implemented

- App wrapper and top-level state
- Default clothing items (in `src/utils/defaultClothingItems.js`)
- Weather helper (`src/utils/weatherApi.js`)
- Header, Main, Footer, WeatherCard, ItemCard, ModalWithForm, ItemModal
- Styling for header, weather card, item cards, and modals (in `src/blocks/`)

## Notes

- The Add Clothes modal currently uses a placeholder submit handler. Replace the form inputs and `onSubmit` handling in `App.jsx` to persist real data.
- For production deployment to GitHub Pages, follow the instructions in the sprint notes (add `gh-pages`, `homepage`, `predeploy`/`deploy` scripts and `base` in `vite.config.js`).
