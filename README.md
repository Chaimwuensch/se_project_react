# WTWR — What To Wear (Frontend)

**Backend Repository:** [se_project_express](https://github.com/YOUR_USERNAME/se_project_express)

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

## Features

- Weather-based clothing recommendations
- User authentication with JWT
- Add/delete/like clothing items
- Profile management
- Temperature unit toggle (°F/°C)

## What I implemented

- App wrapper with JWT auth check on mount
- Header with conditional nav (sign in/profile based on auth state)
- Main page with weather card and filtered items
- Protected /profile route
- ItemCard with like button (auth-only)
- LoginModal & RegisterModal for sign up/sign in
- API integration with Authorization headers for protected endpoints
- Likes functionality (PUT/DELETE /items/:id/likes)
- User profile filtering (only show own items on profile page)
- SideBar with user info
- Temperature context for °F/°C toggle

## Notes

- For production deployment to GitHub Pages, follow the instructions in the sprint notes (add `gh-pages`, `homepage`, `predeploy`/`deploy` scripts and `base` in `vite.config.js`).

# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
  > > > > > > > 9c58eb19c6000d324b636939159fc4d3e53442ef
WORK ON MODAL/(S) AND ADDING CARDS