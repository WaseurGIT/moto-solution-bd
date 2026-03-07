import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Accessories = () => {
  const { user, role } = useAuth();
  const accessoriesCategories = [
    "All",
    "Helmets",
    "Gloves",
    "Jackets",
    "Boots",
    "Tires",
    "Batteries",
  ];
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/accessories")
      .then((res) => setAccessories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAccessoriesCategory = (category) => {
    axiosSecure.get("/accessories").then((res) => {
      const fileteredAccessories =
        category === "All"
          ? res.data.data || res.data
          : (res.data.data || res.data).filter(
              (accessory) =>
                accessory.category.toLowerCase() === category.toLowerCase(),
            );
      setAccessories(fileteredAccessories);
    });
  };

  const handleDeleteAccessory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This accessory will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/accessories/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setAccessories((prev) =>
              prev.filter((accessory) => accessory._id !== id),
            );

            Swal.fire("Deleted!", "The accessory has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-12">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-blue-500">Accessories</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {accessoriesCategories.map((category) => (
          <button
            onClick={() => handleAccessoriesCategory(category)}
            key={category}
            className="py-2 px-4 active:bg-blue-500 active:text-white cursor-pointer rounded-full"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {accessories.map((accessory) => (
          <div
            key={accessory.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative overflow-hidden bg-gray-200 h-48">
              <img
                src={accessory.image}
                alt={accessory.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {accessory.stock > 0 && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  In Stock
                </span>
              )}
              {accessory.stock === 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {accessory.brand}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2">
                {accessory.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {accessory.description}
              </p>

              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(accessory.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({accessory.rating})
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-500">
                  Tk {accessory.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {accessory.stock}
                </span>
              </div>

              <div className="flex items-center justify-center gap-5">
                <button
                  disabled={accessory.stock === 0}
                  className="cursor-pointer py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  {accessory.stock > 0 ? "Add to Cart" : "Unavailable"}
                </button>
                {user && role === "admin" && (
                  <button
                    onClick={() => handleDeleteAccessory(accessory._id)}
                    className="text-white bg-red-500 py-2 rounded-lg px-6 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete Item
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
