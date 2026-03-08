import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signin, setToken } from "../../utils/auth";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser, setIsLoggedIn } = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const { token, user } = await signin(email, password);
      setToken(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
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
    >
      {error && <p className="modal-error">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="modal-form__input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="modal-form__input"
        required
      />
      <p className="modal-form__footer">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onClose();
            onSwitchToRegister();
          }}
          className="modal-form__link"
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
