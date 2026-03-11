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
    <div className="max-w-7xl mx-auto px-3 sm:px-4 my-6 md:my-12">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500">Accessories</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
        {accessoriesCategories.map((category) => (
          <button
            onClick={() => handleAccessoriesCategory(category)}
            key={category}
            className="py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base active:bg-blue-500 active:text-white hover:bg-blue-100 cursor-pointer rounded-full transition border border-blue-200"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {accessories.map((accessory) => (
          <div
            key={accessory.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative overflow-hidden bg-gray-200 h-32 sm:h-40 md:h-48">
              <img
                src={accessory.image}
                alt={accessory.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {accessory.stock > 0 && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  In Stock
                </span>
              )}
              {accessory.stock === 0 && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-2 sm:p-3 md:p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {accessory.brand}
              </p>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-1 mb-1 sm:mb-2 line-clamp-2">
                {accessory.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                {accessory.description}
              </p>

              <div className="flex items-center mb-2 sm:mb-3">
                <div className="flex text-yellow-400 text-xs sm:text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(accessory.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1 sm:ml-2">
                  ({accessory.rating})
                </span>
              </div>

              <div className="flex justify-between items-center mb-2 sm:mb-4">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500">
                  Tk {accessory.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">
                  Stock: {accessory.stock}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 md:gap-3 flex-col sm:flex-row">
                <button
                  disabled={accessory.stock === 0}
                  className="w-full sm:flex-1 cursor-pointer py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  {accessory.stock > 0 ? "Add to Cart" : "Unavailable"}
                </button>
                {user && role === "admin" && (
                  <button
                    onClick={() => handleDeleteAccessory(accessory._id)}
                    className="w-full sm:flex-1 text-xs sm:text-sm text-white bg-red-500 py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-lg cursor-pointer hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
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
