import React from "react";
import close from "../images/close.png";

import "../blocks/modal.css";

export default function ItemModal({ item, onClose, isOpen = false }) {
  if (!isOpen) return null;
  if (!item) return null;

  console.log(12312312312);
  console.log(item);

  return (
    <div className={`modal item-modal modal_is-opened`}>
      <div className="modal__overlay">
        <div className="modal-content">
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <img src={close} alt="Close" />
          </button>
          {item.link && (
            <img src={item.link} alt={item.name} className="modal__image" />
          )}

          <h2 className="modal-title">{item.name || "Item"}</h2>
          <h3 className="modal-condition">{`Weather: ${item.weather}`}</h3>
        </div>
      </div>
    </div>
  );
}
