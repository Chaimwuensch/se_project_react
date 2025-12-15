import React from "react";
import "../blocks/cards.css";

export default function ItemCard({ item = {}, onCardClick }) {
  function handleClick() {
    onCardClick(item);
  }

  function handleLike(e) {
    // prevent triggering the card click when liking
    e.stopPropagation();
    // placeholder: toggle like state later
  }

  return (
    <li className="item-card">
      <img
        className="item-card__img"
        src={item.link}
        alt={item.name}
        onClick={handleClick}
      />
      <div className="item-card__content">
        <p className="item-card__name">{item.name || "Untitled"}</p>
      </div>
    </li>
  );
}
