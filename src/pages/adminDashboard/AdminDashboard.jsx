import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setAdminInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="admin-dashboard flex">
      <aside className="w-64 bg-gray-300 p-4">
        <h3>Admin Menu</h3>
        <ul>
          <li>Dashboard</li>
          <li>Add Technician</li>
          <li>Manage Vehicles</li>
        </ul>
      </aside>
      <main className="p-6 flex-1">
        <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
        <p>Welcome, {adminInfo?.name}</p>
        <p>Email: {adminInfo?.email}</p>
      </main>
    </div>
  );
};

export default AdminDashboard;