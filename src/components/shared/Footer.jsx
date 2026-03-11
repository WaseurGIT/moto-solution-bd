import React from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10 md:mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Logo + Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <FaMotorcycle className="text-2xl md:text-3xl text-blue-400" />
              <h2 className="text-lg md:text-xl font-semibold">Moto Solution BD</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Your trusted vehicle service platform in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-400">
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/about" className="hover:text-blue-400 transition">About</Link>
              <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Contact</h3>
            <p className="text-xs sm:text-sm text-gray-400">Dhaka, Bangladesh</p>
            <p className="text-xs sm:text-sm text-gray-400">support@motosolutionbd.com</p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Moto Solution BD. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
export default Footer;