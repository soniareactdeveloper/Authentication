require('dotenv').config()
const express = require('express')
const router = require('./routes');
const dbConfig = require('./config/db');
const app = express()

app.use(express.json());
app.use(router);

dbConfig()







app.listen(3000 , ()=> {console.log("server is running on port 3000")})