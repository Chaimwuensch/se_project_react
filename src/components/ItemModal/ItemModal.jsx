import React from "react";
import close from "../../images/close.png";
import "../ItemModal/ItemModal.css";
export default function ItemModal({
  activeModal,
  card,
  onDeleteClick,
  item,
  onClose,
  isOpen = false,
}) {
  if (!isOpen) return null;
  if (!item) return null;
  const handleDelete = () => {
    onDeleteClick(card);
  };
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
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="modal__image" />
          )}

          <h2 className="modal-title">{item.name || "Item"}</h2>
          <h3 className="modal-condition">{`Weather: ${item.weather}`}</h3>
          <button
            className="modal__delete-button"
            type="button"
            onClick={handleDelete}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
