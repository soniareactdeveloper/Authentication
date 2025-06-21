import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Register = () => {
  const [regData, setRegData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
   const user = useSelector((state) => state.auth.value)

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (regData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await authService.register(regData);
      toast.success(res.message);
      setTimeout(() => {
         navigate(`/otp/${regData.email}`);
      }, 1000);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Registration failed.";
      toast.error(errMsg);
    }
  };

  if(user){
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

      {/* Left side - Register Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 bg-white box-border h-screen overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 text-[#5b8506]">Create your account</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {/* fullname */}
          <label className="block mb-2 font-semibold" htmlFor="fullname">Full Name</label>
          <input
            onChange={(e) => setRegData((prev) => ({ ...prev, fullname: e.target.value }))}
            type="text"
            id="fullname"
            name='fullname'
            placeholder="Your full name"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          {/* email */}
          <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
          <input
            onChange={(e) => setRegData((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          {/* password */}
          <label className="block mb-2 font-semibold" htmlFor="password">Password</label>
          <div className="relative mb-4">
            <input
              onChange={(e) => setRegData((prev) => ({ ...prev, password: e.target.value }))}
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

          {/* confirm password */}
          <label className="block mb-2 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative mb-6">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506] pr-10"
            />
            <span
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-600 cursor-pointer"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* button */}
          <button
            type="submit"
            className="w-full bg-[#5b8506] text-white py-2 rounded-md font-semibold hover:bg-[#487004] transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-[#5b8506] hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-full md:w-1/2 h-screen overflow-hidden">
        <img
          src="/images/bg.jpg"
          alt="Register Illustration"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Register;
