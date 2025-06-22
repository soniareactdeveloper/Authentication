const userSchema = require("../models/userSchema");
const generateRandomString = require("../utils/generateRandomString");
const sentMail = require("../utils/mail");
const cloudinary = require("../utils/cloudinary");
const { mailTemplate, forgotPasswordTemplate } = require("../utils/template");
const { isValidEmail, isValidPassword } = require("../utils/Validators")
var jwt = require('jsonwebtoken');
const fs = require('fs');

// Registration controller
const register = async (req, res) => {
  const { fullname, email, password, avatar } = req.body;

  try {
    // Validate required fields
    if (!fullname) return res.status(400).json({ error: "fullname is required" });
    if (!email) return res.status(400).json({ error: "email is required" });
    if (!password) return res.status(400).json({ error: "password is required" });

    // Validate email & password format
    if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email format" });
    if (!isValidPassword(password)) return res.status(400).json({ error: "Password must be 8+ chars with uppercase, lowercase, number & symbol." });
    

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });


    // Generate 4-digit OTP
   const randomOTP = Math.floor(1000 + Math.random() * 9000);

  
    const newUser = new userSchema({
      fullname, 
      email, 
      password,
      avatar, 
      otp: randomOTP, 
      otpExpiredAt :  new Date(Date.now() + 5 * 60 * 1000),
    });
    await newUser.save();

    // Send OTP email for verification
    sentMail(email, "Email Varified", mailTemplate, randomOTP)


    res.status(201).json({ message: "User registered successfully. Please varify your email" });

  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// verify email controller
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Input validation
    if (!email) return res.status(400).json({ error: "email is required" });
    if (!otp) return res.status(400).json({ error: "otp is required" });

    // Find user with valid OTP
    const verifyUser = await userSchema.findOne({
      email,
      otp,
      otpExpiredAt: { $gt: Date.now() },
    });

    if (!verifyUser) {
      return res.status(400).json({ error: "OTP is not valid or has expired" });
    }

    // Update verification status
    verifyUser.otp = null;
    verifyUser.otpExpiredAt = null;
    verifyUser.isAccountVarified = true;

    await verifyUser.save();

    res.status(200).json({message: "Email verified successfully"});
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Resend OTP controller
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ error: "email is required" });

    const user = await userSchema.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate 4-digit OTP
    const randomOTP = Math.floor(1000 + Math.random() * 9000);

    // Update OTP and expiry
    user.otp = randomOTP;
    user.otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
   
    // Send OTP email for verification
    sentMail(email, "Resend otp", mailTemplate, randomOTP)

    res.status(200).json({ message: "OTP resent successfully. Please check your email." });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// login controller
const login = async (req, res) => {
  try {
      const {email, password} = req.body;
      // Validation
      if (!email) return res.status(400).json({ error: "email is required" });
      if (!password) return res.status(400).json({ error: "password is required" });
      if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email format" });
    
      const existingUser = await userSchema.findOne({email})
      if (!existingUser) return res.status(400).json({ error: "Invalid email or password" });
    
    
      // validate password  
      const isPasswordValids = await existingUser.isPasswordValids(password);
      if (!isPasswordValids) return res.status(400).json({ error: "Invalid email or password" });
      if(!existingUser.isAccountVarified) return res.status(400).json({ error: "Email not verified. Please verify your account." });

      // jwt token
      const accessToken = jwt.sign({
        data : {
          id: existingUser._id,
          email : existingUser.email
        }
      }, process.env.JWT_SECRET, { expiresIn: '1d' });


      // Prepare user info to return
      const userInfo = {
        _id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        avatar: existingUser.avatar,
        isVerified: existingUser.isVarified,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,

      }
      
      res.status(200).json({ message: "Login successful", user: userInfo, accessToken });
    
      
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// forget password
const forgetPassword = async (req, res) =>{
  const { email } = req.body;
  try {
    if(!email) return res.status(400).json({error : "email is required"})
    
    const existingUser = await userSchema.findOne({email})
    if(!existingUser) return res.status(400).json({error : "user is not valid"})
    
    // generate random string
    const randomString = generateRandomString(45)
    existingUser.resetPass = randomString,
    existingUser.resetPassExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
    await existingUser.save()

    // sent the email toreset password
    sentMail(email, "reset password", forgotPasswordTemplate, randomString)

    res.status(200).json({ message: "Reset link sent to your email", existingUser });


  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// reset password 
const resetPassword = async (req, res) =>{
  const {newPass} = req.body;
  const randomString = req.params.randomString;
  const {email} = req.query;
  try {
    if(!newPass) return res.status(400).json({error : "password is required"})
    if (!isValidPassword(newPass)) return res.status(400).json({ error: "Password must be 8+ chars with uppercase, lowercase, number & symbol." });

    const existingUser = await userSchema.findOne({email, resetPass : randomString, resetPassExpiredAt : {$gt : Date.now()}})
    if(!existingUser) return res.status(400).json({error : "user is not valid"})


    existingUser.password = newPass;
    existingUser.resetPassExpiredAt = null;
    existingUser.resetPass= null;
    await existingUser.save()

    res.status(200).json({ message: "Password reset successfully!" });
    
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// resend forget password string

// update profile
const updateUser = async(req, res) =>{
  const {fullname, password , avatar} = req.body;
  try {
    const existingUser = await userSchema.findById(req.user.id)
    if(!existingUser) return res.status(400).json({error : "user is not valid"})

    if(fullname)existingUser.fullname = fullname.trim().split(/\s+/).join(' ');
    if(password)existingUser.password = password;

    if(req?.file?.path) {
       // Delete old avatar from Cloudinary
      if(existingUser.avatar) await cloudinary.uploader.destroy(existingUser.avatar.split('/').pop().split('.')[0])

      
      // Upload new avatar
      const uploadResult = await cloudinary.uploader.upload(req.file.path)
      existingUser.avatar = uploadResult.url
      fs.unlinkSync(req.file.path) 
    }
     await existingUser.save();

    return res.status(200).json(existingUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { register, verifyEmail, resendOtp, login, forgetPassword, resetPassword, updateUser}