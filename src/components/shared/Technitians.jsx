import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axiosSecure from "../../api/axiosSecure";
gsap.registerPlugin(ScrollTrigger);

const Technitians = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    axiosSecure.get("/technicians").then((response) => {
      setTechnicians(response.data);
    });
  }, []);

  useGSAP(() => {
    gsap.from(".techTitle", {
      scrollTrigger: {
        trigger: ".techTitle",
        start: "top 80%",
        end: ".techCards",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from(".techCards", {
      scrollTrigger: {
        trigger: ".techCards",
        start: "top 80%",
        end: "top 60%",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="techTitle text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-blue-500">
            Our Expert Technicians
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Highly skilled professionals ready to serve you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className="techCards bg-white rounded-xl md:rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-200 w-full">
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6 text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-800">{tech.name}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{tech.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technitians;
