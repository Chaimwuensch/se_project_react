import React, { useEffect } from "react";

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

  function handleSubmit(e) {
    e.preventDefault();
    // Let the parent handle actual submit via onSubmit
    onSubmit && onSubmit(new FormData(e.target));
  }

  const containerClass = `modal modal_type_${name} ${
    isOpen ? "modal_is-opened" : ""
  }`;

  return (
    <div className={containerClass} onMouseDown={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <h3>{title}</h3>
        <form name={name} onSubmit={handleSubmit}>
          {children}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}
