import React from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2">
              <FaMotorcycle className="text-2xl text-blue-400" />
              <h2 className="text-lg font-semibold">Moto Solution BD</h2>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Your trusted vehicle service platform in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <div className="flex flex-col space-y-1 text-sm text-gray-400">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
            <p className="text-sm text-gray-400">support@motosolutionbd.com</p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Moto Solution BD. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;