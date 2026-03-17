/* eslint-disable no-unused-vars */
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const Login = () => {
  const { loginUser, googleLoginUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await loginUser(email, password);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        createdAt: new Date().toISOString().split("T")[0],
      };

      const tokenResponse = await axiosSecure.post("/jwt", {
        email: result.user.email,
      });

      localStorage.setItem("access-token", tokenResponse.data.token);

      const userRes = await axiosSecure.get(`/usersRole/${email}`);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${result.user.displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });
      form.reset();

      if (userRes.data.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Login failed. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLoginUser();
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        role: "user",
        lastLoggedIn: new Date().toISOString().split("T")[0],
      };
      await axiosSecure.post("/users", userData);
      const tokenResponse = await axiosSecure.post("/jwt", {
        email: res.user.email,
      });
      localStorage.setItem("access-token", tokenResponse.data.token);
      const userRes = await axiosSecure.get(`/usersRole/${res.user.email}`);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${res.user.displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });

      if (userRes.data.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Google login failed. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
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
                Moto Solution
              </h2>

              <p className="text-blue-100 text-lg">
                Your Trusted Motorcycle Partner
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Experience the freedom of the open road
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome Back 👋
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-5 mb-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-gray-700">Remember me</span>
                </label>

                <a className="text-blue-600 hover:text-blue-700 font-semibold">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md"
              >
                Sign In
              </button>

            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition shadow-sm"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Signup
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;