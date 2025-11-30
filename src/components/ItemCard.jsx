import React from "react";

import "../blocks/cards.css";

export default function ItemCard({ item = {}, onClick }) {
  function handleClick() {
    onClick(item);
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
      <div className="item-card__title-and-like">
        <p className="item-card__name">{item.name || "Untitled"}</p>
        <button
          className="item-like"
          aria-label={`Like ${item.name || "item"}`}
        ></button>
      </div>
    </li>
  );
}
