import axios from "axios";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => setServices(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-500">Our Services</h1>
        <p className="text-gray-500 mt-3">
          Professional care for your bikes and vehicles
        </p>
      </div>

      <div className="space-y-20">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="flex-1">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-4">{service.title}</h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="list-disc ml-5 mt-3">
                {service.services.map((item, index) => (
                  <li key={index} className="text-green-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
