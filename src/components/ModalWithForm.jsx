import React, { useEffect } from "react";
import close from "../images/close.png";

export default function ModalWithForm({
  isOpen,
  name,
  title,
  buttonText,
  onClose,
  onSubmit,
  children,
}) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose && onClose();
    }
  }

  const containerClass = `modal ${isOpen ? "modal_is-opened" : ""}`;
  return (
    <div className={containerClass} onMouseDown={handleOverlayClick}>
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

          <h2 className="modal-title">{title}</h2>
          <form className="modal-form">
            {children}
            <button type="submit" className="modal-form__submit">
              Add garment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
