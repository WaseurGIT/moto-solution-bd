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
    <div>
      <h1>User Dashboard</h1>
      <p className="text-2xl font-bold text-fuchsia-500">Welcome, {userInfo?.name}</p>
      <p className="text-lg ">{userInfo?.email}</p>
      <p className="text-lg">{userInfo?.phone}</p>
    </div>
  );
}

export default UserDashboard;