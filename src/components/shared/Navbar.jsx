import React, { useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About US" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="max-w-7xl mx-auto sticky top-2 rounded-full z-50 bg-white shadow">
      <div className="flex items-center justify-between px-4 py-2 ">
        {/* logo */}
        <div className="flex items-center justify-center gap-2">
          <FaMotorcycle className="text-4xl text-blue-500" />
          <h1 className="text-xl font-bold">Moto Solution BD</h1>
        </div>

        {/* desktop */}
        <div className="hidden md:flex space-x-4">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="cursor-pointer">
            Login
          </Link>
        </div>
        {/* mobile */}
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
          <Link to="/login" className="cursor-pointer block text-sm">
            Login
          </Link>
          <Link to="/register" className="cursor-pointer text-sm">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
