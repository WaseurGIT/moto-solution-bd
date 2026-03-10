import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex">
      <UserSidebar />

      {/* This is where child routes will render */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;