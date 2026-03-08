import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ cards, onCardClick, onAddNewClick, onCardLike }) => {
  const { currentUser } = useCurrentUser();

  const userCards = cards.filter((card) => card.owner === currentUser?._id);

  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar />
      </section>
      <section className="profile-clothes">
        <ClothesSection
          sectionData={userCards}
          onAddNewClick={onAddNewClick}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
