import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup, setToken, signin } from "../../utils/auth";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, handleEditProfile }) => {
  const { values, handleChange, resetForm, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await handleEditProfile(values);
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
    if (isOpen && currentUser) 
        {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  },[isOpen]);


  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Profile"
      buttonText={isLoading ? "Saving..." : "Save Changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className="modal-error">{error}</p>}
      <label className="modal-form__label">Name *</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        className="modal-form__input"
        required
      />

      <label className="modal-form__label">Avatar URL *</label>
      <input
        type="text"
        name="avatar"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
        className="modal-form__input"
        required
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
