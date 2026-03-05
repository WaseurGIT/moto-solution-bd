import axios from "axios";
import React, { useState, useEffect } from "react";

const Technitians = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    axios.get("/technitians.json").then((response) => {
      setTechnicians(response.data);
    });
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blue-500">
            Our Expert Technicians
          </h2>
          <p className="text-gray-600 text-lg">
            Highly skilled professionals ready to serve you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-gray-600 font-medium">{tech.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technitians;
