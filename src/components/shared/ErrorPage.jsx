import React from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center flex flex-col items-center gap-4">
        <FaMotorcycle className="text-6xl text-red-500" />
        <h1 className="text-6xl md:text-8xl font-bold text-blue-500">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;