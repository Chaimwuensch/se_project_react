// src/contexts/CurrentTemperatureUnitContext.js
import { createContext, useContext, useState } from "react";

const CurrentTemperatureUnitContext = createContext();

export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState("celsius");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) =>
      prev === "celsius" ? "fahrenheit" : "celsius"
    );
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};

export const useCurrentTemperatureUnit = () => {
  const context = useContext(CurrentTemperatureUnitContext);
  if (!context) {
    throw new Error(
      "useCurrentTemperatureUnit must be used within CurrentTemperatureUnitProvider"
    );
  }
  return context;
};
