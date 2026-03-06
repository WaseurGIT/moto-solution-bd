import React, { useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About US" },
    { path: "/contact", label: "Contact" },
    { path: "/vehicles", label: "Vehicles" },
    { path: "/addBooking", label: "Add Booking" },
    { path: "/addTechnician", label: "Add Technician" },
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
    <div className="max-w-7xl mx-auto sticky top-2 rounded-full z-50 bg-white shadow">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaMotorcycle className="text-4xl text-blue-500" />
          <h1 className="text-xl font-bold">Moto Solution BD</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm">
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              {/* Avatar */}
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-500 flex items-center gap-1"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-500 text-white py-2 px-4 rounded-full"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <RxCross1
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <RxHamburgerMenu
              onClick={() => setIsMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block py-1 text-sm"
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
                className="w-10 h-10 rounded-full"
              />

              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer flex items-center gap-1"
              >
                <FiLogOut className="cursor-pointer" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm">
                Login
              </Link>
              <Link to="/register" className="block text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
