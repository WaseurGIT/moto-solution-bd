import React, { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import { FaCar } from "react-icons/fa6";

const VehicleStatCard = () => {
  const [vehiclesCount, setVehiclesCount] = useState(0);

  useEffect(() => {
    axiosSecure
      .get("/vehicles")
      .then((res) => setVehiclesCount(res.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-7 px-14 border-l-4"
      style={{ borderColor: "#10B981" }}
    >
      <div className="flex items-center justify-between gap-10">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">Vehicle</p>
          <h3 className="text-3xl font-bold text-gray-800">{vehiclesCount?.length || 0}</h3>
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: "#10B98120" }}
        >
          <FaCar size={32} style={{ color: "#10B981" }} />
        </div>
      </div>
    </div>
  );
};

export default VehicleStatCard;
