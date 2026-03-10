import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { MdNoteAlt } from "react-icons/md";
import { FaCarSide, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const UserSidebar = () => {
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
      {/* Sidebar */}
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
          <h1 className="text-lg font-semibold">Welcome , {userInfo?.name}</h1>
        </div>
        <div className="flex flex-col space-y-5 mt-8">
          <div className="flex items-center gap-2">
            <FaUser className="text-xl text-blue-500" />
            <Link
              to="/dashboard/user/profile"
              className="text-lg text-blue-500 font-semibold"
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <AiFillHome className="text-xl text-blue-500" />
            <Link to="/" className="text-lg text-blue-500 font-semibold">
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MdNoteAlt className="text-xl text-blue-500" />
            <Link
              to="/addBooking"
              className="text-lg text-blue-500 font-semibold"
            >
              Service Bookings
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MdNoteAlt className="text-xl text-blue-500" />
            <Link
              to="/dashboard/user/myServiceBookings"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              My Service Bookings
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <FaCarSide className="text-xl text-blue-500" />
            <Link
              to="/vehicles"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              Book a Vehicle
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <FaCarSide className="text-xl text-blue-500" />
            <Link
              to="/dashboard/user/myVehicleBookings"
              className="cursor-pointer text-lg text-blue-500 font-semibold text-left hover:text-blue-700 transition"
            >
              My Vehicle Bookings
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <IoMdLogOut className="text-xl text-red-500" />
            <button
              onClick={handleLogout}
              className="cursor-pointer text-lg text-red-500 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default UserSidebar;
