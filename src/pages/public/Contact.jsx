import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useAuth from "../../hooks/useAuth";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { user } = useAuth();
  useGSAP(() => {
    gsap.from("#contactHero", {
      scrollTrigger: {
        trigger: "#contactHero",
        start: "top 80%",
        end: "#contactInfo",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#contactInfo", {
      scrollTrigger: {
        trigger: "#contactInfo",
        start: "top 80%",
        end: "#contactForm",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#contactForm", {
      scrollTrigger: {
        trigger: "#contactForm",
        start: "top 80%",
        end: "#faq",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
    gsap.from("#faq", {
      scrollTrigger: {
        trigger: "#faq",
        start: "top 80%",
        end: "top 60%",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }, []);
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
    <div className="max-w-7xl mx-auto px-3 sm:px-4 my-6 md:my-12">
      <section
        id="contactHero"
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12 md:py-16 lg:py-20 rounded-lg"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4">Get In Touch</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section id="contactInfo" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✉️</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Email</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1 sm:mb-2">support@motosolution.com</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">info@motosolution.com</p>
              <p className="text-xs text-gray-500 mt-2 sm:mt-3 md:mt-4">
                We'll reply within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📱</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Phone</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1 sm:mb-2">+880 1700-000000</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">+880 1900-111111</p>
              <p className="text-xs text-gray-500 mt-2 sm:mt-3 md:mt-4">Available 24/7</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📍</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Location</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1 sm:mb-2">Dhaka, Bangladesh</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Multiple locations across the country
              </p>
              <p className="text-xs text-gray-500 mt-2 sm:mt-3 md:mt-4">Visit our showroom</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contactForm" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-center">
              Send us a Message
            </h2>
            <p className="text-center text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8 md:mb-12">
              Fill out the form below and our team will get back to you shortly
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8"
            >
              <div className="mb-4 md:mb-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user?.displayName}
                  required
                  className="input input-bordered w-full text-sm focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  required
                  className="input input-bordered w-full text-sm focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={user?.phone}
                  className="input input-bordered w-full text-sm focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="input input-bordered w-full text-sm focus:outline-none"
                  placeholder="What is this about?"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 md:mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  className="textarea textarea-bordered w-full h-24 sm:h-28 md:h-32 text-sm focus:outline-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {user ? (
                <button type="submit" className="btn btn-primary w-full text-sm sm:text-base">
                  Send Message
                </button>
              ) : (
                <p className="text-center text-xs sm:text-sm text-gray-600">
                  Please log in to send us a message.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-blue-500 font-bold mb-6 sm:mb-8 md:mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-2xl mx-auto space-y-3 md:space-y-4">
            <div className="collapse collapse-plus bg-white border border-gray-200 rounded">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-sm sm:text-base md:text-lg font-medium">
                What is your booking lead time?
              </div>
              <div className="collapse-content text-xs sm:text-sm md:text-base">
                <p>
                  You can book a motorcycle as soon as 1 hour in advance.
                  However, for better availability and special rates, we
                  recommend booking at least 24 hours ahead.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white border border-gray-200 rounded">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-sm sm:text-base md:text-lg font-medium">
                Do you provide insurance?
              </div>
              <div className="collapse-content text-xs sm:text-sm md:text-base">
                <p>
                  Yes, all our motorcycles come with comprehensive insurance
                  coverage. Basic coverage is included in the rental price, and
                  you can opt for additional protection if needed.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white border border-gray-200 rounded">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-sm sm:text-base md:text-lg font-medium">
                What documents do I need to rent a motorcycle?
              </div>
              <div className="collapse-content text-xs sm:text-sm md:text-base">
                <p>
                  You will need a valid government-issued ID, a valid driving
                  license (preferably motorcycle endorsement), and proof of
                  residence. International visitors may provide a passport.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white border border-gray-200 rounded">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-sm sm:text-base md:text-lg font-medium">
                What is your cancellation policy?
              </div>
              <div className="collapse-content text-xs sm:text-sm md:text-base">
                <p>
                  Cancellations made 48 hours in advance receive a full refund.
                  Cancellations made less than 48 hours before the booking will
                  incur a 25% cancellation fee.
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
