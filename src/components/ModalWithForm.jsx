import React, { useEffect } from "react";
import close from "../images/close.png";

export default function ModalWithForm({
  isOpen = false,
  name = "form",
  title = "Form",
  buttonText = "Submit",
  onClose,
  onSubmit,
  children,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose && onClose();
    }
  }

  const containerClass = `modal ${isOpen ? "modal_is-opened" : ""}`;
  return (
    <div className={containerClass} onMouseDown={handleOverlayClick}>
      <div className="modal-content">
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <img src={close} alt="Close" />
        </button>

        <h2 className="modal-title">New garment</h2>

        <form className="modal-form">
          <div className="modal-form__label_container">
            <label className="modal-form__label">
              Name
              <input
                name="name"
                type="text"
                className="modal-form__input"
                placeholder="Name"
                required
              />
            </label>

            <label className="modal-form__label">
              Image
              <input
                name="imageUrl"
                type="url"
                className="modal-form__input"
                placeholder="Image URL"
                required
              />
            </label>
          </div>
          <fieldset className="modal-form__fieldset">
            <legend className="modal-form__legend">
              Select the weather type:
            </legend>
            <label className="modal-form__radio-label-wrapper">
              <input
                className="modal-form__radio-input"
                type="radio"
                name="weather"
                value="Hot"
              />
              <span className="modal-form__radio-label">Hot</span>
            </label>

            <label className="modal-form__radio-label-wrapper">
              <input
                className="modal-form__radio-input"
                type="radio"
                name="weather"
                value="Warm"
              />
              <span className="modal-form__radio-label">Warm</span>
            </label>
            <label className="modal-form__radio-label-wrapper">
              <input
                className="modal-form__radio-input"
                type="radio"
                name="weather"
                value="Cold"
              />
              <span className="modal-form__radio-label">Cold</span>
            </label>
          </fieldset>

          <button type="submit" className="modal-form__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}
