import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role: requiredRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && role !== requiredRole) {
    return role === "admin" ? (
      <Navigate to="/dashboard/admin" replace />
    ) : (
      <Navigate to="/dashboard/user" replace />
    );
  }

  return children;
};

export default PrivateRoute;