import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AccessoriesPieStats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await axiosSecure.get("/accessories");
        const accessories = res.data;

        // Count accessories per category
        const categoryCount = {};
        accessories.forEach((acc) => {
          const category = acc.category || "Uncategorized";
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        // Prepare data for Pie chart
        setData({
          labels: Object.keys(categoryCount),
          datasets: [
            {
              label: "Accessories by Category",
              data: Object.values(categoryCount),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(199, 199, 199, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(159, 159, 159, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch accessories for chart",
        });
      }
    };

    fetchAccessories();
  }, []);

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="mt-3 text-gray-500">Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Pie data={data} />
    </div>
  );
};

export default AccessoriesPieStats;