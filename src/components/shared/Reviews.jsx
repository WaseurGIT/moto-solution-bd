import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosSecure from "../../api/axiosSecure";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  useGSAP(() => {
    if (reviews.length === 0) return;
    gsap.from("#reviewsHeader", {
      scrollTrigger: {
        trigger: "#reviewsHeader",
        start: "top 80%",
        end: "#reviewCards",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });

    gsap.from(".reviewCard", {
      scrollTrigger: {
        trigger: "#reviewCards",
        start: "top 80%",
      },
      opacity: 0,
      y: 80,
      stagger: 0.2,
    });

    gsap.from("#addReviewBtn", {
      scrollTrigger: {
        trigger: "#addReviewBtn",
        start: "top 80%",
        end: "top 60%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div id="reviewsHeader" className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-blue-500">
            Customer Reviews
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            What our satisfied customers say about us
          </p>
        </div>

        <div
          id="reviewCards"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="reviewCard bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition duration-300"
            >
              {/* ⭐ Rating Stars */}
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`sm:w-5 sm:h-5 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-semibold text-gray-700">
                  {review.rating}/5
                </span>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 sm:mb-4 italic leading-relaxed">"{review.review}"</p>

              <div className="border-t border-gray-200 pt-3 sm:pt-4">
                <p className="font-semibold text-sm sm:text-base text-gray-900">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div id="addReviewBtn" className="mt-6 sm:mt-8 md:mt-10 text-center">
          <Link
            to="/reviewForm"
            className="inline-block bg-blue-500 text-white text-sm sm:text-base py-2 sm:py-2.5 px-6 sm:px-8 md:px-10 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Review
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
