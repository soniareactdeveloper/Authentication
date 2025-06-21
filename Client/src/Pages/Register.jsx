import React from 'react';
import { Link } from 'react-router'; // Make sure it's react-router-dom

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* Left side - Register Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 bg-white box-border h-screen overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 text-[#5b8506]">Create your account</h2>
        
        <form className="w-full max-w-sm">
          <label className="block mb-2 font-semibold" htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Your full name"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          <label className="block mb-2 font-semibold" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          <label className="block mb-2 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

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
