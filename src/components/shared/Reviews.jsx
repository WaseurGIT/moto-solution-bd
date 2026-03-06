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
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div id="reviewsHeader" className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blue-500">
            Customer Reviews
          </h2>
          <p className="text-gray-600 text-lg">
            What our satisfied customers say about us
          </p>
        </div>

        <div
          id="reviewCards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="reviewCard bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              {/* ⭐ Rating Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  {review.rating}/5
                </span>
              </div>

              <p className="text-gray-700 mb-4 italic">"{review.review}"</p>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div id="addReviewBtn" className="mt-8 text-center">
          <Link
            to="/reviewForm"
            className="bg-blue-500 text-white py-2 px-10 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Review
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
