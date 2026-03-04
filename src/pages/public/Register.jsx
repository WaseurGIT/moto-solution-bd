import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-8">
            <div className="text-center">
              <div className="mb-8 animate-bounce">
                <svg
                  className="w-32 h-32 mx-auto text-white"
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
              <h2 className="text-4xl font-bold text-white mb-4">
                Join Moto Solution
              </h2>
              <p className="text-blue-100 text-lg mb-2">
                Start Your Journey Today
              </p>
              <p className="text-blue-100">
                Get instant access to our premium motorcycle fleet
              </p>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Join thousands of happy customers</p>
            </div>

            {/* Error Message */}
            

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4 mb-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+880 1XXXXXXXXX"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    required
                    className="input input-bordered w-full focus:input-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  At least 6 characters
                </p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    className="input input-bordered w-full focus:input-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-600"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer my-4">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="checkbox checkbox-sm mt-1"
                />
                <span className="text-sm text-gray-700">
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

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                  "Create Account"
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
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
