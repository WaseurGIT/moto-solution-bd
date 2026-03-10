import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch services",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">All Services</h2>
      <p className="text-gray-600 mb-8">
        Manage and view all available services
      </p>

      {services.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No services found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                    Services Included:
                  </h4>
                  <div className="space-y-1">
                    {service.services && service.services.length > 0 ? (
                      service.services.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <span className="text-blue-500 mr-2 font-bold">
                            •
                          </span>
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No services listed
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4 flex gap-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;
