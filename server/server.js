const express = require('express')
const dbConfig = require('./config/db')
const app = express()
require('dotenv').config()
dbConfig()




app.listen("8000", ()=>{
  console.log("server is running on port 8000")
})