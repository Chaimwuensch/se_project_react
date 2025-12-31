import React, { useEffect, useState } from "react";
import logo from "../images/Logo (1).png";
import profile from "../images/profile.png";
import "../blocks/header.css";
import ToggleSwitch from "./ToggleSwitch";
import { useCurrentTemperatureUnit } from "../contexts/CurrentTemperatureUnitContext";

export default function Header({
  onAddClick,
  location,
  onProfileClick,
  weather,
}) {
  const { currentTemperatureUnit } = useCurrentTemperatureUnit();
  const unit = currentTemperatureUnit === "fahrenheit" ? "°F" : "°C";
  const tempData = weather?.temperature || {};
  const displayTemp =
    tempData[currentTemperatureUnit === "fahrenheit" ? "F" : "C"] || "—";

  // const [location, setLocation] = useState(
  //   locationProp || "Location unavailable"
  // );

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = "Chaim Wuensch";

  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="header-left">
          <img src={logo} alt="logo" className="logo" />
          <div className="title-block">
            <div className="app-sub">
              {currentDate}, {location}
            </div>
          </div>
        </div>

        <div className="header-right">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ToggleSwitch />
            <button
              className="add-button"
              onClick={onAddClick}
              aria-label="Add Clothes"
            >
              + Add Clothes
            </button>
            <div className="user">
              <div className="user-name">{userName}</div>
              <img
                src={profile}
                alt="profile picture"
                className="user__profile"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
