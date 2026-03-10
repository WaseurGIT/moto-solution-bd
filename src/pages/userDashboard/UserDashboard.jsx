import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";

function UserDashboard() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="user-dashboard">
      <aside className="w-64 bg-blue-100 p-4">
        <h3>User Menu</h3>
        <ul>
          <li>Dashboard</li>
          <li>My Bookings</li>
          <li>Reviews</li>
        </ul>
      </aside>
      <main className="p-6 flex-1">
        <h1 className="text-3xl font-bold">Welcome, {userInfo?.name}</h1>
        <p>Email: {userInfo?.email}</p>
        <p>Phone: {userInfo?.phone}</p>
      </main>
    </div>
  );
}

export default UserDashboard;