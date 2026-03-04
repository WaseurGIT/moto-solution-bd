import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto relative h-96 md:h-[600px] overflow-hidden rounded-lg shadow-2xl my-12">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 bg-opacity-40"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center max-w-3xl">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-block text-white px-4 py-2 rounded-full mb-4 font-semibold">
              🔧 Expert Motorcycle Service
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-2xl font-semibold text-white mb-4 leading-tight">
              Keep Your Bike <br />{" "}
              <span className="text-4xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                Running Smooth
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-lg text-gray-100 mb-8 mx-auto">
              Professional maintenance, repairs, and servicing for all
              motorcycle brands. Trust our expert technicians to keep your ride
              in perfect condition.
            </p>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/services" className="btn btn-primary btn-lg">
                Browse Available Bikes
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-600"
              >
                Get More Info
              </Link>
            </div> */}

            {/* Stats */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">
                    500+
                  </div>
                  <p className="text-sm text-gray-200">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">
                    1000+
                  </div>
                  <p className="text-sm text-gray-200">Bookings</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">
                    150+
                  </div>
                  <p className="text-sm text-gray-200">Bikes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
