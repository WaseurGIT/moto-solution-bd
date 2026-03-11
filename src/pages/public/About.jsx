import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // form, to, fromto
    gsap.from("#bannerHero", {
      scrollTrigger: {
        trigger: "#bannerHero",
        start: "top 80%",
        end: "#mission",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });

    gsap.from("#mission", {
      scrollTrigger: {
        trigger: "#mission",
        start: "top 80%",
        end: "#features",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#features", {
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
        end: "#stats",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#stats", {
      scrollTrigger: {
        trigger: "#stats",
        start: "top 80%",
        end: "top 60% ",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }, []);

  return (
    <div className="my-6 md:my-12 mx-auto max-w-7xl px-3 sm:px-4">
      <section
        id="bannerHero"
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12 md:py-16 lg:py-20 rounded-lg"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4">
              About Moto Solution
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Your trusted partner for motorcycle rental and maintenance
              solutions in Bangladesh
            </p>
          </div>
        </div>
      </section>

      <section id="mission" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To provide affordable, reliable, and high-quality motorcycle
                rental services while maintaining the highest standards of
                customer care and vehicle maintenance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌟</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To become the leading motorcycle rental platform in Bangladesh,
                offering seamless booking experiences and exceptional service to
                our valued customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">🏍️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Premium Motorcycles
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Well-maintained fleet of modern motorcycles in excellent
                condition
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">💰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Affordable Prices
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Competitive pricing with transparent billing and no hidden
                charges
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">⚡</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Quick Booking
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Easy and hassle-free booking process through our user-friendly
                platform
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">🛡️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Safe & Secure
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Comprehensive insurance coverage and secure payment options
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">👥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                24/7 Support
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Round-the-clock customer support for any assistance you need
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">🌍</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Multiple Locations
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Available across major cities in Bangladesh for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                500+
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-gray-700">
                Active Customers
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                1000+
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-gray-700">
                Bookings Completed
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                150+
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-gray-700">
                Motorcycles
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                10+
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-gray-700">
                Locations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
