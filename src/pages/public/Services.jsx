
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axiosSecure from "../../api/axiosSecure";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/services")
      .then((res) => setServices(res.data));
  }, []);

  useGSAP(() => {
    gsap.from("#ourServices", {
      scrollTrigger: {
        trigger: "#ourServices",
        start: "top 80%",
        end: "#services",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#services", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        end: "#serviceCard",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#serviceCard", {
      scrollTrigger: {
        trigger: "#serviceCard",
        start: "top 80%",
        end: "top 60%",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
      <div id="ourServices" className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-2 sm:mb-3">Our Services</h1>
        <p className="text-sm sm:text-base text-gray-500">
          Professional care for your bikes and vehicles
        </p>
      </div>

      <div id="services" className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
        {services.map((service, index) => (
          <div
            id="serviceCard"
            key={service.id}
            className={`flex flex-col md:gap-8 lg:gap-12 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="w-full md:flex-1">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-500"
              />
            </div>

            <div className="w-full md:flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">{service.title}</h2>

              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                {service.services.map((item, index) => (
                  <li key={index} className="text-xs sm:text-sm md:text-base text-green-700">
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
