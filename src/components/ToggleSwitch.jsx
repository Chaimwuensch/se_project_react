import { useCurrentTemperatureUnit } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } =
    useCurrentTemperatureUnit();
  const isChecked = currentTemperatureUnit === "fahrenheit";

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          className="toggle-switch__input"
          type="checkbox"
          name="toggle-switch-checkbox"
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span className="toggle-switch__circle" />
        <span className="toggle-switch__value toggle-switch__value_left">
          °F
        </span>

        <span className="toggle-switch__value toggle-switch__value_right">
          °C
        </span>
      </label>
    </div>
  );
};
export default ToggleSwitch;
