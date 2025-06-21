const express = require('express')
const { register, login, verifyEmail, resendOtp, forgetPassword, resetPassword, updateUser } = require('../../controllers/authController')
const authMiddleware = require('../../Middlewares/authMiddleware')
const upload = require('../../utils/multer')
const authRouter = express.Router()


authRouter.post("/register", register )
authRouter.post('/verifyemail', verifyEmail)
authRouter.post('/resend-otp', resendOtp)
authRouter.post('/login', login)
authRouter.post("/forget-password", forgetPassword)
authRouter.post("/reset-password/:randomString", resetPassword)




authRouter.post("/update-user",authMiddleware, upload.single('avatar'), updateUser)

module.exports = authRouter 
