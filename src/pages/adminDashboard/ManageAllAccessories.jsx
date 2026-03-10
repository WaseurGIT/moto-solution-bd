import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaStar, FaBox } from "react-icons/fa";

const ManageAllAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/accessories")
      .then((res) => {
        setAccessories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch accessories",
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
          const res = await axiosSecure.delete(`/accessories/${id}`);
          if (res.data.deletedCount > 0) {
            setAccessories(accessories.filter((acc) => acc._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Accessory has been deleted.",
            });
          }
        } catch (error) {
          console.error("Error deleting accessory:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete accessory",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading accessories...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">All Accessories</h2>
      <p className="text-gray-600 mb-8">
        Manage motorcycle accessories and parts
      </p>

      {accessories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No accessories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((accessory) => (
            <div
              key={accessory._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-200 overflow-hidden group">
                {accessory.image ? (
                  <img
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No Image</span>
                  </div>
                )}

                {/* Stock Badge */}
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaBox size={12} />
                  {accessory.stock}
                </div>

                {/* Rating Badge */}
                {accessory.rating && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaStar size={12} />
                    {accessory.rating}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Brand & Category */}
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {accessory.brand}
                  </span>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    {accessory.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {accessory.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {accessory.description}
                </p>

                {/* Price */}
                <div className="text-2xl font-bold text-green-600 mb-4">
                  ${accessory.price}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded flex items-center justify-center gap-2 transition">
                    <AiOutlineEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(accessory._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded flex items-center justify-center gap-2 transition"
                  >
                    <AiOutlineDelete size={18} />
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

export default ManageAllAccessories;
