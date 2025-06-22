const express = require('express')
const { register, login, verifyEmail, resendOtp, forgetPassword, resetPassword, updateUser } = require('../../controllers/authController')
const authMiddleware = require('../../Middlewares/authMiddleware')
const upload = require('../../utils/multer')
const router = express.Router()


router.post("/register", register )
router.post('/verifyemail', verifyEmail)
router.post('/resend-otp', resendOtp)
router.post('/login', login)
router.post("/forget-password", forgetPassword)
router.post("/reset-password/:randomString", resetPassword)
router.post("/update-user",authMiddleware, upload.single('avatar'), updateUser)

module.exports = router 
