import { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import { FaScrewdriverWrench } from "react-icons/fa6";

const TechnicianStatCard = () => {
  const [techniciansCount, setTechniciansCount] = useState(0);

  useEffect(() => {
    axiosSecure
      .get("/technicians")
      .then((res) => setTechniciansCount(res.data))
      .catch((error) => console.error("Error fetching technicians:", error));
  }, []);

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-7 px-14 border-l-4"
      style={{ borderColor: "#F59E0B" }}
    >
      <div className="flex items-center justify-between gap-10">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">
            Technicians
          </p>
          <h3 className="text-3xl font-bold text-gray-800">
            {techniciansCount?.length || 0}
          </h3>
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: "#F59E0B20" }}
        >
          <FaScrewdriverWrench size={32} style={{ color: "#F59E0B" }} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianStatCard;
