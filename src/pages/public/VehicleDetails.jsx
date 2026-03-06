import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/vehicles.json")
      .then((response) => {
        const foundVehicle = response.data.find((v) => v.id === parseInt(id));
        setVehicle(foundVehicle);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Handle booking logic here
    console.log("Booking pressed for vehicle:", vehicle);
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
    <div className="min-h-screen py-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                {vehicle.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {vehicle.company} • {vehicle.year}
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 mb-6">
                <p className="text-sm font-semibold mb-2">Price</p>
                <p className="text-4xl font-bold">
                  {/* ৳{vehicle.price.toLocaleString("bn-BD")} */}
                  Tk {vehicle.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="badge badge-lg badge-primary">
                  {vehicle.type}
                </div>
                <div className="badge badge-lg badge-accent">
                  {vehicle.condition}
                </div>
                <div className="badge badge-lg badge-info">
                  {vehicle.category}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-semibold mb-1">
                  Location
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {vehicle.location}
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-semibold mb-1">
                  Seller
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {vehicle.sellerName}
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!user}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                user
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {user ? "🚀 Book This Vehicle" : "🔒 Login to Book"}
            </button>
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
      </div>
    </div>
  );
};

export default VehicleDetails;
