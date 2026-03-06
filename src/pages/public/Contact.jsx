import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We will contact you soon.",
          });

          form.reset();
        },
        () => {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong.",
          });
        },
      );
  };

  return (
    <div className="max-w-7xl mx-auto my-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold mb-3">Email</h3>
              <p className="text-gray-600 mb-2">support@motosolution.com</p>
              <p className="text-gray-600">info@motosolution.com</p>
              <p className="text-sm text-gray-500 mt-4">
                We'll reply within 24 hours
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3">Phone</h3>
              <p className="text-gray-600 mb-2">+880 1700-000000</p>
              <p className="text-gray-600">+880 1900-111111</p>
              <p className="text-sm text-gray-500 mt-4">Available 24/7</p>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-3">Location</h3>
              <p className="text-gray-600 mb-2">Dhaka, Bangladesh</p>
              <p className="text-gray-600">
                Multiple locations across the country
              </p>
              <p className="text-sm text-gray-500 mt-4">Visit our showroom</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Send us a Message
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Fill out the form below and our team will get back to you shortly
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  //   value={formData.name}
                  required
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  //   value={formData.email}
                  required
                  className="input input-bordered w-full"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  placeholder="Your phone number"
                />
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="input input-bordered w-full"
                  placeholder="What is this about?"
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {/* FAQ 1 */}
            <div className="collapse collapse-plus bg-white border border-gray-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl">
                What is your booking lead time?
              </div>
              <div className="collapse-content">
                <p>
                  You can book a motorcycle as soon as 1 hour in advance.
                  However, for better availability and special rates, we
                  recommend booking at least 24 hours ahead.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="collapse collapse-plus bg-white border border-gray-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl">
                Do you provide insurance?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, all our motorcycles come with comprehensive insurance
                  coverage. Basic coverage is included in the rental price, and
                  you can opt for additional protection if needed.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="collapse collapse-plus bg-white border border-gray-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl">
                What documents do I need to rent a motorcycle?
              </div>
              <div className="collapse-content">
                <p>
                  You will need a valid government-issued ID, a valid driving
                  license (preferably motorcycle endorsement), and proof of
                  residence. International visitors may provide a passport.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="collapse collapse-plus bg-white border border-gray-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl">
                Can I cancel or modify my booking?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, you can cancel or modify your booking up to 2 hours
                  before your rental period begins without any charges.
                  Cancellations made later may incur a small fee.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="collapse collapse-plus bg-white border border-gray-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl">
                How is the pricing calculated?
              </div>
              <div className="collapse-content">
                <p>
                  Pricing is based on the motorcycle model, rental duration, and
                  current demand. We offer hourly, daily, and weekly rates.
                  Check our pricing page or contact us for specific quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
