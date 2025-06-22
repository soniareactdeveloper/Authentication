const mailTemplate = (otp) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f8ff; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #1e3a8a; text-align: center; margin-bottom: 20px;">Verification Code (OTP)</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">
          Please use the following One-Time Password (OTP) to complete your action. This OTP is valid for <strong>5 minutes</strong>.
        </p>
        <div style="font-size: 36px; font-weight: bold; text-align: center; margin: 30px 0; color: #2563eb;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #666;">
          If you did not request this code, please disregard this email. No further action is required.
        </p>
        <p style="font-size: 16px; color: #333; margin-top: 30px;">Best regards,<br/><strong>Connect</strong></p>
      </div>
    </div>
  `;
};

// forget password template
const forgotPasswordTemplate = (randomString, email) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #5C2E91;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to proceed. This link is valid for <strong> 5 minutes</strong>.</p>

        <a href="http://localhost:5173/reset-password/${randomString}?email=${email}" 
           target="_blank" 
           style="display: inline-block; padding: 12px 25px; background-color: #5C2E91; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>

        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>Best regards,<br/><strong>Connect Team</strong></p>
      </div>
    </div>
  `;
};


module.exports = { mailTemplate , forgotPasswordTemplate};
