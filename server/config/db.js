const mongoose = require('mongoose');

const dbConfig = () => {
  return mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB connected"))
    .catch((error) => console.error("DB connection error:", error));
};

module.exports = dbConfig;
