import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import { useEffect, useState } from "react";

const VehicleBooking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const vehicle = location.state;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleVehicleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const vehicleName = form.vehicle.value;
    const bookingDate = form.date.value;
    const pickupLocation = form.pickupLocation.value;
    const notes = form.notes.value;
    const price = form.price.value;
    const paymentMethod = form.paymentMethod.value;


    const vehicleBookingData = {
      fullName,
      email,
      phone,
      bookingDate,
      pickupLocation,
      notes,
      price,
      paymentMethod,
      vehicleId: vehicle._id,
      vehicleName,
    };

    await axiosSecure
      .post("/vehicleBookings", vehicleBookingData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Booking Successful!",
            text: "Your vehicle has been booked successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
        form.reset();
        navigate("/vehicles");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Booking Failed!",
          text: "Something went wrong while booking the vehicle.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-600">
        Vehicle Booking Form
      </h2>

      <form
        onSubmit={handleVehicleBooking}
        className="space-y-4 md:space-y-5 bg-white shadow-lg p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl"
      >
        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            defaultValue={userInfo?.name}
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={userInfo?.email}
            placeholder="Enter your email"
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={userInfo?.phone}
            placeholder="Enter your phone number"
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Select Vehicle</label>
          <input
            type="text"
            name="vehicle"
            defaultValue={vehicle ? `${vehicle.name} (${vehicle.model})` : ""}
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Booking Date</label>
            <input
              type="date"
              name="date"
              className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Select a payment method</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            placeholder="Enter pickup location"
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Additional Notes</label>
          <textarea
            rows="2"
            name="notes"
            placeholder="Any special request..."
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-semibold mb-1.5 md:mb-2">Price (Read Only)</label>
          <input
            type="number"
            name="price"
            value={vehicle?.price || ""}
            readOnly
            className="w-full text-sm border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-lg transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default VehicleBooking;
