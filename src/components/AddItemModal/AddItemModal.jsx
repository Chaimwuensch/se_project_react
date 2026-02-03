import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

export default function AddItemModal({ activeModal, handleCloseModal, handleAddItem }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(values, resetForm);
  };

  const resetForm = () => {
    setValues({ name: "", imageUrl: "", weather: "" });
  };

  return (
    <ModalWithForm
      title="New garment"
      isOpen={activeModal === "add"}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="modal-form__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="modal-form__input"
          placeholder="Name"
          required
        />
      </label>
      <label className="modal-form__label">
        Image
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className="modal-form__input"
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal-form__fieldset">
        <legend className="modal-form__legend">Select the weather type:</legend>
        <label className="modal-form__radio-label-wrapper">
          <input
            type="radio"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            className="modal-form__radio-input"
          />
          <span className="modal-form__radio-label">Hot</span>
        </label>
        <label className="modal-form__radio-label-wrapper">
          <input
            type="radio"
            name="weather"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            className="modal-form__radio-input"
          />
          <span className="modal-form__radio-label">Warm</span>
        </label>
        <label className="modal-form__radio-label-wrapper">
          <input
            type="radio"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
            className="modal-form__radio-input"
          />
          <span className="modal-form__radio-label">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
