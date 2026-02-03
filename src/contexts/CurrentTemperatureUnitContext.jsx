import { createContext, useContext, useState } from "react";

export const CurrentTemperatureUnitContext = createContext();

export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = (newUnit) => {
    console.log("Context updating to:", newUnit);
    setCurrentTemperatureUnit(newUnit);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
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
