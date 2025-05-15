require('dotenv').config();
const express = require('express');
const dbConfig = require('./config/db');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Database Connection
dbConfig();

// Routes
app.use(router);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
