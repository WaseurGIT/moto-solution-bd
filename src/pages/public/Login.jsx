import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const handleEmailLogin = async (e) => {
    e.preventDefault();
  };

  const handleGoogleLogin = async () => {};

  return (
    <div className="my-12 min-h-screen flex items-center justify-center p-4">
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
                Moto Solution
              </h2>
              <p className="text-blue-100 text-lg mb-2">
                Your Trusted Motorcycle Partner
              </p>
              <p className="text-blue-100">
                Experience the freedom of the open road
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-5 mb-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
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
                    placeholder="Enter your password"
                    required
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-primary w-full mt-4">
                "Sign In"
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-lg w-full gap-2 mb-6"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
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
