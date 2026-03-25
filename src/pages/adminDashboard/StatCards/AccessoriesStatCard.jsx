import React, { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

const AccessoriesStatCard = () => {
  const [accessoriesCount, setAccessoriesCount] = useState(0);

  useEffect(() => {
    axiosSecure
      .get("/accessories")
      .then((res) => setAccessoriesCount(res.data))
      .catch((error) => console.error("Error fetching accessories:", error));
  }, []);

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-7 px-14 border-l-4"
      style={{ borderColor: "#3B82F6" }}
    >
      <div className="flex items-center justify-between gap-10">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">
            Accessories
          </p>
          <h3 className="text-3xl font-bold text-gray-800">
            {accessoriesCount?.length || 0}
          </h3>
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: "#3B82F620" }}
        >
          <GiFullMotorcycleHelmet size={32} style={{ color: "#3B82F6" }} />
        </div>
      </div>
    </div>
  );
};

export default AccessoriesStatCard;
