import { useState, useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");

  useEffect(() => {
    setIsChecked(currentTemperatureUnit === "C");
  }, [currentTemperatureUnit]);

  const handleChange = () => {
    const newValue = !isChecked;
    const newUnit = newValue ? "C" : "F";

    setIsChecked(newValue);
    handleToggleSwitchChange(newUnit);
  };

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          className="toggle-switch__input"
          type="checkbox"
          name="toggle-switch-checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="toggle-switch__circle" />
        <span className="toggle-switch__value toggle-switch__value_left">
          F
        </span>
        <span className="toggle-switch__value toggle-switch__value_right">
          C
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
