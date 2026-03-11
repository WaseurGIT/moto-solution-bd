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

      // console.log(result);
      // // navigate("/");
      // console.log(result);

    // eslint-disable-next-line no-unused-vars
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
        role:'user',
      };
      await axiosSecure.post("/users", userData);
      const tokenResponse = await axiosSecure.post("/jwt", {
        email: res.user.email,
      });
      localStorage.setItem("access-token", tokenResponse.data.token);
      const userRes = await axiosSecure.get(`/usersRole/${res.user.email}`);
      // localStorage.setItem("role", userRes.data.role);

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
                Moto Solution
              </h2>
              <p className="text-blue-100 text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                Your Trusted Motorcycle Partner
              </p>
              <p className="text-blue-100 text-xs md:text-sm">
                Experience the freedom of the open road
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4 md:space-y-5 mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full text-sm focus:input-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="password"
                    className="input input-bordered w-full text-sm focus:input-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-xs sm:text-sm text-gray-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2 md:mt-4 text-sm sm:text-base">
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-3 md:gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-xs sm:text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full gap-2 mb-6 text-sm sm:text-base h-10 md:h-12"
            >
              <FcGoogle className="text-xl md:text-2xl" />
              <span className="hidden sm:inline">Continue with Google</span>
              <span className="sm:hidden">Google</span>
            </button>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
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
    </div>
  );
};

export default Login;
