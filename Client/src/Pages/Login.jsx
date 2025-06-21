import React from 'react';
import { Link } from 'react-router';

const Login = () => {

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 bg-white box-border">
        <h2 className="text-3xl font-bold mb-6 text-[#5b8506]">Login to your account</h2>
        
        <form className="w-full max-w-sm">
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
            placeholder="Enter your password"
            className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

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
