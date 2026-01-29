import ModalWithForm from "../ModalWithForm/ModalWithForm";
export default function AddItemModal({
  activeModal,
  handleCloseModal,
  handleAddItem,
}) {
  return (
    <ModalWithForm
      isOpen={activeModal === "add"}
      name="add-clothes"
      title="New garment"
      onClose={handleCloseModal}
      onSubmit={(formData) => {
        handleAddItem(Object.fromEntries(formData));
      }}
    >
      <>
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
              required
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
      </>
    </ModalWithForm>
  );
}
