import React from "react";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <p>Welcome, {user?.displayName}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
