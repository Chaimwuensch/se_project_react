import React from "react";

export default function ItemModal({ item, onClose, isOpen = false }) {
  if (!isOpen) return null;
  if (!item) return null;

  return (
    <div className={`modal item-modal modal_is-opened`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <h3>{item.name || "Item"}</h3>
        {item.link && (
          <img
            src={item.link}
            alt={item.name}
            style={{ width: 240, height: 240, objectFit: "contain" }}
          />
        )}
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    </div>
  );
}
