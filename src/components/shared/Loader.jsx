import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="text-center">
        {/* Spinning Motorcycle Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 animate-spin">
              <svg
                className="w-full h-full text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Moto Solution</h2>
        <p className="text-gray-600 mb-8">Loading your ride...</p>

        {/* DaisyUI Spinner as Alternative */}
        <div className="flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Custom CSS Animation */}
      <style>{`
                @keyframes pulse-scale {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                }

                .animate-pulse-scale {
                    animation: pulse-scale 1.5s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
};

export default Loader;
