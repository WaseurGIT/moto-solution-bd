import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { MdMiscellaneousServices, MdNoteAlt } from "react-icons/md";
import { FaCar, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { CiUser } from "react-icons/ci";
import AdminProfile from "../../pages/adminDashboard/AdminProfile";
import UserTable from "./UserTable";

const AdminSidebar = () => {
  const { user, logOutUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await logOutUser();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex gap-6 h-screen">
      <aside className="w-64 h-screen bg-blue-100 p-4 overflow-y-auto">
        <div className="flex flex-col items-center mt-12">
          <img
            src={
              userInfo?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-semibold">Welcome, {userInfo?.name}</h1>
        </div>
        <div className="flex flex-col space-y-5 mt-8">
          
          <div className="flex items-center gap-2">
            <CiUser className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin"
              className="text-lg text-blue-500 font-semibold"
            >
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <AiFillHome className="text-xl text-blue-500" />
            <Link
              to="/"
              className="text-lg text-blue-500 font-semibold hover:text-blue-700 transition"
            >
              Home
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/users"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              All Users
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <MdMiscellaneousServices className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/manageAllServices"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              All Services
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <MdNoteAlt className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/serviceBookings"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              Service Bookings Table
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <FaCar className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/vehicles"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              Vehicle Bookings Table
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCar className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/technicians"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              All Technicians
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <FaCar className="text-xl text-blue-500" />
            <Link
              to="/addTechnician"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              Add Technitians
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCar className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/addAccessories"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              Add Accessories
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCar className="text-xl text-blue-500" />
            <Link
              to="/dashboard/admin/manageAllAccessories"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              All Accessories
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IoMdLogOut className="text-xl text-red-500" />
            <button
              onClick={handleLogout}
              className="cursor-pointer text-lg text-red-500 font-semibold hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
