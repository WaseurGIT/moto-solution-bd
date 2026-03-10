import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import AdminSidebar from "../../components/admin/AdminSidebar";

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
    <div className="flex justify-between h-screen">
      <aside className="w-64 h-screen bg-blue-100 p-4">
        <AdminSidebar />
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
