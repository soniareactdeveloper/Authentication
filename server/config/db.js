const mongoose = require('mongoose');

const dbConfig = () => {
  mongoose.connect(process.env.DB)
    .then(() => console.log('Connected!'))
};

module.exports = dbConfig;
