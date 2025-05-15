const express = require('express');
const { registration, login } = require('../../controllers/authController');
const authRouter = express.Router();

authRouter.post('/register', registration)

authRouter.post('/login', login)

module.exports = authRouter ;