import React, { useEffect, useState } from "react";
import logo from "../images/Logo (1).png";
import avatarImg from "../images/react.svg";

export default function Header({ onAddClick, location }) {
  // const [location, setLocation] = useState(
  //   locationProp || "Location unavailable"
  // );

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // useEffect(() => {
  //   // If parent passed a location (from API), use it; otherwise try geolocation
  //   if (locationProp) return;
  //   if (!navigator?.geolocation) return;

  //   const onSuccess = (pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
  //   };

  //   const onError = () => {
  //     setLocation("Location unavailable");
  //   };

  //   navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  //     enableHighAccuracy: false,
  //     timeout: 5000,
  //   });
  // }, [locationProp]);

  // Hardcoded user for now
  const userName = "Chaim Wuensch";

  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="header-left">
          <img src={logo} alt="logo" className="logo" />
          <div className="title-block">
            <div className="app-sub">
              {currentDate} · {location}
            </div>
          </div>
        </div>

        <div className="header-right">
          <button
            className="add-button"
            onClick={onAddClick}
            aria-label="Add Clothes"
          >
            + Add Clothes
          </button>

          <div className="user">
            <div className="user-name">{userName}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
