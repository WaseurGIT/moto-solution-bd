import React from "react";

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-500">
            500+
          </div>
          <p className="text-sm md:text-base text-gray-600">Happy Customers</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-500">
            1000+
          </div>
          <p className="text-sm md:text-base text-gray-600">Bookings</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-500">
            150+
          </div>
          <p className="text-sm md:text-base text-gray-600">Bikes</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
