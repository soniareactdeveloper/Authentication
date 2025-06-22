import { Link, useNavigate } from 'react-router';
import { authService } from '../services/api';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ForgetPass = () => {
const [forgetData, setForgetData] = useState({
  email : ""
})
const navigate = useNavigate()


const handleForgetPassword = async (e) => {
  e.preventDefault()
  try {
    const res = await authService.forgetPassword(forgetData)
    toast.success(res.message);
    setTimeout(() => {
      navigate('/login')
    }, 2000);
    
  } catch (error) {
    toast.error(error.response.data.error);
  }
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
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12 bg-white box-border h-screen overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 text-[#5b8506]">Forgot your password?</h2>
        <p className="mb-6 max-w-sm text-gray-600 text-center">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleForgetPassword} className="w-full max-w-sm">
          <label className="block mb-2 font-semibold" htmlFor="email">Email Address</label>
          <input
            onChange={(e) => setForgetData((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />

          <button
            type="submit"
            className="w-full bg-[#5b8506] text-white py-2 rounded-md font-semibold hover:bg-[#487004] transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="text-[#5b8506] hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-full md:w-1/2 h-screen overflow-hidden">
        <img
          src="/images/bg.jpg"
          alt="Forgot Password Illustration"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ForgetPass;
