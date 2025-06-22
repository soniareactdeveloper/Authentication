import React, { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { authService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logUserData } from '../store/slices/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [logData , setLogData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.value)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(logData)
      toast.success(res.message);
      dispatch(logUserData(res.user))
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

 if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
         {/* toast container */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 bg-white box-border">
        <h2 className="text-3xl font-bold mb-6 text-[#5b8506]">Login to your account</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
          <input
            onChange={(e) => setLogData((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

           <label className="block mb-2 font-semibold" htmlFor="password">Password</label>
            <div className="relative mb-4">
              <input
                onChange={(e) => setLogData((prev) => ({ ...prev, password: e.target.value }))}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506] pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

          <div className="text-right mb-6">
            <a href="/forgot-password" className="text-sm text-[#5b8506] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b8506] text-white py-2 rounded-md font-semibold hover:bg-[#487004] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#5b8506] hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden">
        <img
          src="/images/bg.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Login;
