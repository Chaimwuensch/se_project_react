import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <p>
            Are you sure you want to delete this item? This action is irreversible.
          </p>
          <div className="modal__buttons">
            <button
              className="modal__button modal__button_type_delete"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              className="modal__button modal__button_type_cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
