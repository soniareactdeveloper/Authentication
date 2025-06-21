import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { authService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Otp = () => {
  const params = useParams().email;
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value)


  
  // handle change
  const handleChange = (val, index) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  // handle resend
  const handleResend = async () => {
    try {
      const res = await authService.resendOtp({email : params})
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };

  // handle submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  const enteredOtp = otp.join("");
  if (enteredOtp.length < 4) {
    toast.error("Please enter all 4 digits of the OTP.");
    return;
  }
  try {
    const res = await authService.otp({ email: params, otp: enteredOtp }); 
    toast.success(res.message);

    setTimeout(() => {
      navigate("/login")
    }, 1000);
  } catch (error) {
    toast.error(error.response?.data.error || error.message);
  }
};


 if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
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
      <div className="bg-none bg-opacity-30 backdrop-blur-md rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#5b8506]">Enter OTP</h2>

        <p className="mb-6 max-w-full sm:max-w-md mx-auto text-white text-sm sm:text-base px-2">
          We have sent a 4-digit verification code to your registered email or phone number. Please enter it below to verify your account.
        </p>

        <div className="flex justify-center gap-3 sm:gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={e => handleChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506] bg-white bg-opacity-80"
              aria-label={`OTP Digit ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 sm:py-2.5 mb-4 bg-[#5b8506] text-white rounded-md text-sm sm:text-base font-semibold hover:bg-[#4a6e04] transition-all duration-200"
        >
          Submit
        </button>

        <p className="mb-2 text-white max-w-full sm:max-w-xs mx-auto text-xs sm:text-sm px-2">
          Didn't receive the code? You can resend it after 30 seconds.
        </p>

        <button
          onClick={handleResend}
          className="text-sm text-[#5b8506] hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;
