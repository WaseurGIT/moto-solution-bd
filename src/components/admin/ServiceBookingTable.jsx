import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const ServiceBookingTable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure.get("/bookings").then((res) => {
      setBookings(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/bookings/${id}`);

      if (res.data.message === "Deleted successfully") {
        setBookings(bookings.filter((b) => b._id !== id));
        Swal.fire("Deleted!", "", "success");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Service Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Vehicle</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{booking.name}</td>
                <td className="border p-2">{booking.email}</td>
                <td className="border p-2">{booking.phone}</td>
                <td className="border p-2">{booking.vehicleType}</td>
                <td className="border p-2">{booking.model}</td>
                <td className="border p-2">{booking.category}</td>
                <td className="border p-2">{booking.price}</td>
                <td className="border p-2">{booking.address}</td>
                <td className="border p-2">{booking.date}</td>

                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceBookingTable;