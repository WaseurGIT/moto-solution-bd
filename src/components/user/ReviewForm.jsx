import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const review = form.review.value;
    const reviewData = {
      name,
      review,
      rating,
    };

    console.log("Review Data:", reviewData);
    try {
      axios.post("http://localhost:5000/reviews", reviewData).then((res) => {
        Swal.fire({
          title: "Review Submitted 🎉",
          text: "Thank you for your valuable feedback!",
          icon: "success",
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          background: "#f0fdf4",
        });
        form.reset();
        setRating(0);
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your review.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-md my-12 mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6">Share Your Review</h2>

      <form onSubmit={handleReviewSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            //   value={user.?displayName}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review
          </label>
          <textarea
            placeholder="Write your review"
            rows="4"
            name="review"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
