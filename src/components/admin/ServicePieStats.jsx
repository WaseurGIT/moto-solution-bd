import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ServicePieStats = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosSecure.get("/bookings").then((res) => {
      const bookings = res.data;
      const serviceCount = {};

      bookings.forEach((booking) => {
        const category = booking.category;

        if (serviceCount[category]) {
          serviceCount[category] += 1;
        } else {
          serviceCount[category] = 1;
        }
      });

      const labels = Object.keys(serviceCount);
      const values = Object.values(serviceCount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Service Usage",
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="w-[450px] mx-auto">
      <Pie data={chartData} />
    </div>
  );
};

export default ServicePieStats;