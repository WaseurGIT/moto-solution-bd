import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TechnicianRolePieStats = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosSecure.get("/technicians").then((res) => {
      const technicians = res.data;

      // count roles
      const roleCount = {};

      technicians.forEach((tech) => {
        const role = tech.role || "Unknown";

        if (roleCount[role]) {
          roleCount[role] += 1;
        } else {
          roleCount[role] = 1;
        }
      });

      const labels = Object.keys(roleCount);
      const values = Object.values(roleCount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Technician Roles",
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p>Loading technician statistics...</p>;

  return (
    <div className="w-[450px] mx-auto">
      <Pie data={chartData} />
    </div>
  );
};

export default TechnicianRolePieStats;