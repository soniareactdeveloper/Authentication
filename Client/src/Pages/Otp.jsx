import React, { useRef, useState } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
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

  const handleResend = () => {
    alert('OTP resent!');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Transparent container */}
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
              onChange={e => handleChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b8506] bg-white bg-opacity-80"
              aria-label={`OTP Digit ${index + 1}`}
            />
          ))}
        </div>

        <p className="mb-4 text-white max-w-full sm:max-w-xs mx-auto text-xs sm:text-sm px-2">
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
