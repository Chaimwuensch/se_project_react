import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useCurrentUser();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
