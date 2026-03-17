import { useState } from "react";
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
        createdAt: new Date().toISOString().split("T")[0],
        role: "user",
      };
      await axiosSecure.post("/users", usereData);
      const tokenResponse = await axiosSecure.post("/jwt", {
        email: result.user.email,
      });

      localStorage.setItem("access-token", tokenResponse.data.token);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-10">
            <div className="text-center">
              <div className="mb-8 animate-bounce">
                <svg
                  className="w-28 h-28 mx-auto text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <h2 className="text-4xl font-bold text-white mb-3">
                Join Moto Solution
              </h2>

              <p className="text-blue-100 text-lg">
                Start Your Journey Today
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Get instant access to our premium motorcycle fleet
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm">
                Join thousands of happy customers
              </p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-xl text-gray-500"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  At least 6 characters
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 text-xl text-gray-500"
                  >
                    {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="checkbox checkbox-sm mt-1"
                />

                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a className="text-blue-600 font-semibold hover:text-blue-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-600 font-semibold hover:text-blue-700">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md"
              >
                Create Account
              </button>

            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;