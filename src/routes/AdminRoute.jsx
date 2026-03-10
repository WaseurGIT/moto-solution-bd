import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading admin...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "admin") return <Navigate to="/dashboard/user" replace />;

  return children;
};

export default AdminRoute;
