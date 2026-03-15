import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ onSignOut, onEditProfileClick }) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="sidebar__avatar"
          />
        ) : (
          <span className="navigation__user navigation__user_location_profile navigation__user_type_none">
            {currentUser?.name?.toUpperCase().charAt(0) || ""}
          </span>
        )}
        <p className="sidebar__user-name">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button onClick={onEditProfileClick} className="sidebar__button">
          Change profile
        </button>
        <button
          onClick={onSignOut}
          className="sidebar__button sidebar__button_type_logout"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
