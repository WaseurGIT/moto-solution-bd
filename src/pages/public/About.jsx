import React from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";

const About = () => {
  return (
    <div className="my-12 mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">About Moto Solution</h1>
            <p className="text-xl">
              Your trusted partner for motorcycle rental and maintenance
              solutions in Bangladesh
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide affordable, reliable, and high-quality motorcycle
                rental services while maintaining the highest standards of
                customer care and vehicle maintenance.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To become the leading motorcycle rental platform in Bangladesh,
                offering seamless booking experiences and exceptional service to
                our valued customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏍️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Motorcycles</h3>
              <p className="text-gray-600">
                Well-maintained fleet of modern motorcycles in excellent
                condition
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Affordable Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with transparent billing and no hidden
                charges
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quick Booking</h3>
              <p className="text-gray-600">
                Easy and hassle-free booking process through our user-friendly
                platform
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
              <p className="text-gray-600">
                Comprehensive insurance coverage and secure payment options
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support for any assistance you need
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Locations</h3>
              <p className="text-gray-600">
                Available across major cities in Bangladesh for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className=" py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <p className="text-xl">Active Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <p className="text-xl">Bookings Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <p className="text-xl">Motorcycles</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10+</div>
              <p className="text-xl">Locations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
