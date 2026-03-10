import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./Header.css";
import "./Navigation.css";
import logoPath from "../../images/logo.png";

const Header = ({ weatherData, handleAddClick, handleSignInClick, onSignOut }) => {
  const { currentUser, isLoggedIn } = useCurrentUser();

  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logoPath} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <nav className="navigation">
        <ul className="navigation__container">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleAddClick} className="navigation__button">
                  + Add clothes
                </button>
              </li>
              <li>
                <Link to="/profile" className="navigation__link">
                  {currentUser?.name}
                  {currentUser?.avatar ? (
                    <img
                      className="navigation__user"
                      src={currentUser.avatar}
                      alt="user avatar"
                    />
                  ) : (
                    <span className="navigation__user navigation__user_type_none">
                      {currentUser?.name?.toUpperCase().charAt(0) || ""}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <button
                  onClick={onSignOut}
                  className="navigation__button navigation__logout"
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleSignInClick} className="navigation__button">
                  Sign in
                </button>
              </li>
              <li>
                <button onClick={handleAddClick} className="navigation__button">
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
