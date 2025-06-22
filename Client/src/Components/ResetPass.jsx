import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPass = () => {
  const { randomString } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");


  const [newPass, setNewPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.passwordReset(randomString, email, newPass);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm relative">
        <h2 className="text-xl font-bold mb-4 text-center text-[#5b8506]">Reset Password</h2>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506]"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5b8506] text-white py-2 rounded-md font-semibold hover:bg-[#487004] transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
