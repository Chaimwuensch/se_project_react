import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signin, setToken } from "../../utils/auth";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, handleLogin }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser, setIsLoggedIn } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await handleLogin(values);
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign In"
      buttonText={isLoading ? "Signing in..." : "Sign In"}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="or Sign up"
      onSecondaryButtonClick={() => {
        onClose();
        onSwitchToRegister();
      }}
    >
      {error && <p className="modal-error">{error}</p>}

      <label className="modal-form__label">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        className="modal-form__input"
        required
      />

      <label className="modal-form__label">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        className="modal-form__input"
        required
      />
    </ModalWithForm>
  );
};

export default LoginModal;
