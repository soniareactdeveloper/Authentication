const express = require('express')
const apiRouter = require("./api")
const router = express.Router()

router.use(process.env.BASE_URL, apiRouter)


router.use((req, res)=> {
  res.status(404).send('page is not found')
})






module.exports = router 