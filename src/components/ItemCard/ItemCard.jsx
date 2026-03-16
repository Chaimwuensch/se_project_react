import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

const ItemCard = ({ card, onCardClick, onCardLike }) => {
  const { currentUser, isLoggedIn } = useCurrentUser();

  const isLiked =
    isLoggedIn && card.likes && card.likes.includes(currentUser?._id);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    onCardLike(card.id || card._id, isLiked);
  };

  return (
    <li className="card">
      <img
        src={card.imageUrl}
        alt={card.name}
        onClick={handleClick}
        className="card__image"
      />
      <div className="card__title-and-like">
        <p className="card__title">{card.name}</p>
        {isLoggedIn && (
          <button
            className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
            onClick={handleLikeClick}
          />
        )}
      </div>
    </li>
  );
};

export default ItemCard;
