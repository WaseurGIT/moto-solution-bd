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
import { FaScrewdriverWrench } from "react-icons/fa6";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

const AdminSidebar = ({ onClose }) => {
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
    <aside className="w-full h-full bg-blue-100 p-3 sm:p-4 overflow-y-auto">
      {/* Close button for mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden block text-right w-full mb-4 text-lg font-semibold text-gray-600"
        >
          ✕
        </button>
      )}

      {/* User Profile Section */}
      <div className="flex flex-col items-center py-4 md:py-6 md:mt-12">
        <img
          src={
            userInfo?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="avatar"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500"
        />
        <h1 className="text-sm md:text-base font-semibold text-gray-800 mt-2 text-center">
          {userInfo?.name}
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 md:space-y-5 mt-6 md:mt-8">
        
        <Link
          to="/dashboard/admin"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <CiUser className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium">Profile</span>
        </Link>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <AiFillHome className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Home</span>
        </Link>

        <Link
          to="/dashboard/admin/users"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaUsers className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">All Users</span>
        </Link>

        <Link
          to="/dashboard/admin/manageAllServices"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <MdMiscellaneousServices className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">All Services</span>
        </Link>
        
        <Link
          to="/dashboard/admin/serviceBookings"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <MdNoteAlt className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Service Bookings</span>
        </Link>

        <Link
          to="/dashboard/admin/vehicles"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaCar className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Vehicle Bookings</span>
        </Link>
        
        <Link
          to="/dashboard/admin/technicians"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaScrewdriverWrench className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Technicians</span>
        </Link>

        <Link
          to="/addTechnician"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaScrewdriverWrench className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Add Technician</span>
        </Link>
        
        <Link
          to="/dashboard/admin/addAccessories"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <GiFullMotorcycleHelmet className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Add Accessories</span>
        </Link>
        
        <Link
          to="/dashboard/admin/manageAllAccessories"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <GiFullMotorcycleHelmet className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">Manage Accessories</span>
        </Link>

        <button
          onClick={() => {
            handleLogout();
            onClose?.();
          }}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-red-100 transition w-full text-left"
        >
          <IoMdLogOut className="text-lg md:text-xl text-red-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-red-500 font-medium hover:text-red-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
