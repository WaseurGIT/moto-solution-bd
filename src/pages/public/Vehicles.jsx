import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    axios
      .get("http://localhost:5000/vehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  const handleCategories = (category) => {
    axios.get("http://localhost:5000/vehicles").then((res) => {
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

    gsap.from(".vehicleCard", {
      scrollTrigger: {
        trigger: "#vehicleGrid",
        start: "top 80%",
        end: "top 20%",
      },
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.15,
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div id="vehiclesTitle">
        <h1 className="text-2xl font-semibold text-blue-500 text-center">
          Pick your favourite vehicle
        </h1>
      </div>

      <div id="vehicleCategories" className="flex items-center justify-between">
        {categories.map((category) => (
          <div key={category} className=" mt-6">
            <button
              onClick={() => handleCategories(category)}
              className="categoryBtn text-md font-semibold cursor-pointer hover:bg-blue-200 rounded-lg p-2"
            >
              {category}
            </button>
          </div>
        ))}
      </div>

      <div id="vehicleGrid" className="grid grid-cols-3 gap-2">
        {vehicles.map((vehicle) => (
          <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id}>
            <div className="vehicleCard border cursor-pointer border-gray-300 rounded-lg p-4 m-4">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{vehicle.name}</h3>
              <p className="text-gray-600">
                {vehicle.company} - {vehicle.model}
              </p>
              <p className="text-xl font-bold text-green-500">
                Tk {vehicle.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
