import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/vehicles")
      .then((response) => {
        const foundVehicle = response.data.find((v) => v._id === id);
        setVehicle(foundVehicle);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this vehicle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/vehicles/${vehicle._id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The vehicle has been deleted successfully.",
              "success",
            );
            navigate("/vehicles");
          })
          .catch((error) => {
            console.error("Error deleting vehicle:", error);
            Swal.fire("Error!", "Failed to delete vehicle.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Vehicle Not Found</h1>
          <p className="text-gray-500 mt-2">
            The vehicle you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Image Section */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <div className="w-full bg-white rounded-lg sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3">
                {vehicle.name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2 md:mb-4">
                {vehicle.company} • {vehicle.year}
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-5 md:mb-6">
                <p className="text-xs sm:text-sm font-semibold mb-1 md:mb-2">Price</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Tk {vehicle.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                <div className="badge badge-sm sm:badge-md md:badge-lg badge-primary text-xs sm:text-sm">
                  {vehicle.type}
                </div>
                <div className="badge badge-sm sm:badge-md md:badge-lg badge-accent text-xs sm:text-sm">
                  {vehicle.condition}
                </div>
                <div className="badge badge-sm sm:badge-md md:badge-lg badge-info text-xs sm:text-sm">
                  {vehicle.category}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-blue-50 rounded-lg md:rounded-xl p-3 md:p-4 border-l-4 border-blue-500">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold mb-0.5 md:mb-1">
                  Location
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">
                  {vehicle.location}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg md:rounded-xl p-3 md:p-4 border-l-4 border-green-500">
                <p className="text-gray-600 text-xs sm:text-sm font-semibold mb-0.5 md:mb-1">
                  Seller
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">
                  {vehicle.sellerName}
                </p>
              </div>
            </div>

            <Link
              to={user ? `/vehicleBooking/${vehicle._id}` : "/login"}
              state={vehicle}
              disabled={!user}
              className={`w-full block py-2 sm:py-2.5 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 text-center ${
                user
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {user ? "Book This Vehicle" : "Login to Book"}
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <span className="mr-3 text-2xl">⚙️</span> Engine & Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Engine CC</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.engineCC}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Transmission</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.transmission}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.fuelType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.mileage}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="mr-3 text-2xl">🎨</span> Physical Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Color</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.color}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.category}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Manufacture Year</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.year}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Model</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.model}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="mr-3 text-2xl">📋</span> Registration & Usage
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Registration</span>
                  <span
                    className={`font-bold px-3 py-1 rounded-full text-sm ${
                      vehicle.registered
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {vehicle.registered ? "✓ Registered" : "Not Registered"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.condition}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Vehicle Type</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">KM Running</span>
                  <span className="font-bold text-gray-800">
                    {vehicle.kmRunning}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {user && role === "admin" ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDelete}
              className="cursor-pointer px-8 py-3 bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Delete Vehicle
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VehicleDetails;
