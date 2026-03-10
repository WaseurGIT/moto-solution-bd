import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const VehiclePieStats = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axiosSecure.get("/vehicleBookings").then((res) => {
      const bookings = res.data;

      // count vehicle names
      const vehicleCount = {};

      bookings.forEach((booking) => {
        const name = booking.vehicleName || booking.vehicle || "Unknown";

        if (vehicleCount[name]) {
          vehicleCount[name] += 1;
        } else {
          vehicleCount[name] = 1;
        }
      });

      const labels = Object.keys(vehicleCount);
      const values = Object.values(vehicleCount);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Vehicle Bookings",
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

  if (!chartData) return <p>Loading vehicle stats...</p>;

  return (
    <div className="w-[450px] mx-auto">
      <Pie data={chartData} />
    </div>
  );
};

export default VehiclePieStats;