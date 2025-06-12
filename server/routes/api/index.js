const express = require('express')
const authRouter = require('./auth')
const chatRouter = require('./chat')
const apiRouter = express.Router()

apiRouter.use("/auth", authRouter)
apiRouter.use('/chat', chatRouter )


module.exports = apiRouter
