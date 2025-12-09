import React, { createContext, useContext, useState } from "react";

const CurrentTemperatureUnitContext = createContext(undefined);

export function CurrentTemperatureUnitProvider({ children }) {
  // default to Fahrenheit
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function toggleUnit() {
    setCurrentTemperatureUnit((u) => (u === "F" ? "C" : "F"));
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit, toggleUnit }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const ctx = useContext(CurrentTemperatureUnitContext);
  if (!ctx)
    throw new Error(
      "useTemperatureUnit must be used within CurrentTemperatureUnitProvider"
    );
  return ctx;
}

export default CurrentTemperatureUnitContext;
