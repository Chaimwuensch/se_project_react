
import close from "../../images/close.png";
import "../ModalWithForm/ModalWithForm.css";

export default function ModalWithForm({
  isOpen,
  title,
  buttonText,
  onClose,
  onSubmit,
  children,
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal__overlay")) {
      onClose && onClose();
    }
  }

  const containerClass = `modal ${isOpen ? "modal_is-opened" : ""}`;

  return (
    <div className={containerClass}>
      <div className="modal__overlay" onClick={handleOverlayClick}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <img src={close} alt="Close" />
          </button>

          <h2 className="modal-title">{title}</h2>
          <form className="modal-form" onSubmit={onSubmit}>
            {children}
           <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
