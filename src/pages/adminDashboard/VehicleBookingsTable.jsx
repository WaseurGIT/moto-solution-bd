import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const VehicleBookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/vehicleBookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vehicle bookings",
        });
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/vehicleBookings/${id}`);
          if (res.data.deletedCount > 0) {
            setBookings(bookings.filter((booking) => booking._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Vehicle booking has been deleted.",
            });
          }
        } catch (error) {
          console.error("Error deleting vehicle booking:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete vehicle booking",
          });
        }
      }
    });
  };

  if (loading) {
    return <div className="p-6 text-center">Loading vehicle bookings...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vehicle Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">#</th>
              <th className="border border-gray-300 p-3 text-left">
                Customer Name
              </th>
              <th className="border border-gray-300 p-3 text-left">Email</th>
              <th className="border border-gray-300 p-3 text-left">Vehicle</th>
              <th className="border border-gray-300 p-3 text-left">
                Booking Date
              </th>
              <th className="border border-gray-300 p-3 text-left">
                Total Price
              </th>
              <th className="border border-gray-300 p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3 text-sm">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-3">
                  {booking.fullName || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {booking.email || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {booking.vehicleName || booking.vehicle || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {booking.bookingDate
                    ? new Date(booking.bookingDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  ${booking.price || "0"}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No vehicle bookings found.
        </div>
      )}
    </div>
  );
};

export default VehicleBookingsTable;
