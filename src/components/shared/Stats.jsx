import React from "react";

const Stats = () => {
  return (
    <div>
      <div className="flex justify-center max-w-7xl mx-auto my-12">
        <div className="flex items-center justify-between gap-66 mt-12 max-w-7xl">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-blue-400">
              500+
            </div>
            <p className="text-sm">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-blue-400">
              1000+
            </div>
            <p className="text-sm ">Bookings</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-blue-400">
              150+
            </div>
            <p className="text-sm ">Bikes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
