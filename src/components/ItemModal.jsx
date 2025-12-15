import React from "react";
import close from "../images/close.png";
import "../blocks/modal.css";
export default function ItemModal({ item, onClose, isOpen = false }) {
  if (!isOpen) return null;
  if (!item) return null;

  return (
    <div className={`modal item-modal modal_is-opened`}>
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
      </div>
    </div>
  );
}
