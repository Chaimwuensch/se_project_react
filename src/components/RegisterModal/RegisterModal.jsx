import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup, setToken, signin } from "../../utils/auth";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser, setIsLoggedIn } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user } = await signup(
        values.email,
        values.password,
        values.name,
        values.avatar
      );

      const { token } = await signin(values.email, values.password);

      setToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className="modal-error">{error}</p>}

      <label className="modal-form__label">Email*</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        className="modal-form__input"
        required
      />

      <label className="modal-form__label">Password*</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        className="modal-form__input"
        required
      />

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

      <p className="modal-form__footer">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onClose();
            onSwitchToLogin();
          }}
          className="modal-form__link"
        >
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
