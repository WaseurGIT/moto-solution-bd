import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosSecure from "../../api/axiosSecure";

gsap.registerPlugin(ScrollTrigger);

const Vehicles = () => {
  const categories = [
    "All",
    "Motorcycles",
    "Cars",
    "Electric Scooters",
    "Scooters",
  ];
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/vehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  const handleCategories = (category) => {
    axiosSecure.get("/vehicles").then((res) => {
      const filterdVehicles =
        category === "All"
          ? res.data || res.data.data
          : (res.data || res.data.data).filter(
              (vehicle) =>
                vehicle.category.toLowerCase() === category.toLowerCase(),
            );
      setVehicles(filterdVehicles);
    });
  };

  useGSAP(() => {
    gsap.from("#vehiclesTitle", {
      scrollTrigger: {
        trigger: "#vehiclesTitle",
        start: "top 80%",
        end: "#vehicleCategories",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".categoryBtn", {
      scrollTrigger: {
        trigger: "#vehicleCategories",
        start: "top 80%",
        end: "#vehicleGrid",
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div id="vehiclesTitle">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-blue-500 text-center mb-6 sm:mb-8 md:mb-10">
          Pick your favourite vehicle
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
        {categories.map((category) => (
          <button
            onClick={() => handleCategories(category)}
            key={category}
            className="py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base active:bg-blue-500 active:text-white hover:bg-blue-100 cursor-pointer rounded-full transition border border-blue-200"
          >
            {category}
          </button>
        ))}
      </div>

      <div
        id="vehicleGrid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
      >
        {vehicles.map((vehicle) => (
          <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id}>
            <div className="vehicleCard border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-400 transition duration-300 h-full">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-105 transition duration-300"
              />
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
                  {vehicle.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {vehicle.company} - {vehicle.model}
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-green-500 mt-2">
                  Tk {vehicle.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
