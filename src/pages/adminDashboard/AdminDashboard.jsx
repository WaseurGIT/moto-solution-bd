import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import VehicleStats from "../../components/admin/ServicePieStats";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">

      <AdminSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>


    </div>
  );
};

export default AdminDashboard;