import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/bookings/${user.email}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch bookings");
        setLoading(false);
      });
  }, [user?.email]);

  const handleDeleteBooking = async (bookingId, bookingModel) => {
    const result = await Swal.fire({
      title: "Delete Booking?",
      text: `Are you sure you want to delete the booking for ${bookingModel}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/bookings/${bookingId}`);

      setBookings(bookings.filter((booking) => booking._id !== bookingId));

      Swal.fire({
        title: "Deleted!",
        text: "Your booking has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to delete booking",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mt-4 text-gray-600 text-lg">No bookings found</p>
            <p className="text-gray-500 text-sm mt-2">
              Create your first booking to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {booking.model}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {booking.vehicleType}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {booking.category}
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {booking.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-semibold">Name</p>
                      <p className="text-gray-900">{booking.name}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 font-semibold">Date</p>
                      <p className="text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 font-semibold">Phone</p>
                      <p className="text-gray-900">{booking.phone}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 font-semibold">Address</p>
                      <p className="text-gray-900">{booking.address}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 font-semibold">Price</p>
                      <p className="text-gray-900 font-bold">{booking.price} BDT</p>
                    </div>

                    <div>
                      <p className="text-gray-600 font-semibold">Email</p>
                      <p className="text-gray-900 text-xs break-all">
                        {booking.email}
                      </p>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-200" />
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleDeleteBooking(booking._id, booking.model)
                      }
                      className="cursor-pointer flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
