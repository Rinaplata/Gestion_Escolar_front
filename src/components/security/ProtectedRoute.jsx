import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { userData, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(userData.role_id)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.array,
};
