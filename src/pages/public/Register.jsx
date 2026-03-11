import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axiosSecure from "../../api/axiosSecure";

const Register = () => {
  const { registerUser } = useAuth();
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await registerUser(email, password, firstName, lastName);
      const usereData = {
        name: `${firstName} ${lastName}`,
        email: result.user.email,
        uid: result.user.uid,
        phone: phone,
        role: "user",
      };
      await axiosSecure.post("/users", usereData);
      const tokenResponse = await axiosSecure.post("/jwt", {
        email: result.user.email,
      });

      localStorage.setItem("access-token", tokenResponse.data.token);

      navigate("/dashboard/user");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${firstName}! Account created successfully.`,
        showConfirmButton: false,
        timer: 2000,
      });
      form.reset();
      navigate("/dashboard/user");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 sm:px-4 py-6 sm:py-12">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-6 md:p-8 lg:p-12">
            <div className="text-center">
              <div className="mb-6 md:mb-8 animate-bounce">
                <svg
                  className="w-24 md:w-32 h-24 md:h-32 mx-auto text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                Join Moto Solution
              </h2>
              <p className="text-blue-100 text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                Start Your Journey Today
              </p>
              <p className="text-blue-100 text-xs md:text-sm">
                Get instant access to our premium motorcycle fleet
              </p>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="mb-4 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Join thousands of happy customers</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-2 sm:p-3 rounded mb-3 md:mb-4 text-xs sm:text-sm">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-3 md:space-y-4 mb-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+880 1XXXXXXXXX"
                  className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    required
                    className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600 text-lg"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 md:mt-1">
                  At least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    className="input input-bordered text-sm w-full focus:input-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-600 text-lg"
                  >
                    {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 sm:gap-3 cursor-pointer my-3 md:my-4">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="checkbox checkbox-sm mt-0.5 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button type="submit" className="btn btn-primary w-full mt-2 md:mt-4 text-sm sm:text-base h-10 md:h-12">
                Create Account
              </button>
            </form>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
