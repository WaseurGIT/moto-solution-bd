import { useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser, role } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/accessories", label: "Accessories" },
    ...(user
      ? [
          {
            path: role === "admin" ? "/dashboard/admin" : "/dashboard/user",
            label: "Dashboard",
          },
        ]
      : []),
  ];

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
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 md:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <FaMotorcycle className="text-2xl sm:text-3xl md:text-4xl text-blue-500" />
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 whitespace-nowrap">
            Moto Solution BD
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xs lg:text-sm px-2 lg:px-3 py-1.5 rounded hover:bg-blue-50 transition"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="avatar"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-blue-500"
              />

              <button
                onClick={handleLogout}
                className="text-xs lg:text-sm text-red-500 hover:text-red-700 flex items-center gap-1 px-2 transition"
              >
                <FiLogOut className="text-base" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs lg:text-sm bg-blue-500 text-white py-1.5 px-2 lg:px-4 rounded-full hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-2">
          {isMenuOpen ? (
            <RxCross1
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer text-gray-700"
            />
          ) : (
            <RxHamburgerMenu
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl cursor-pointer text-gray-700"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-3 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={
                    user.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded flex items-center gap-2 transition"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
