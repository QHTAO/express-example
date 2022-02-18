const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the correct environment database
exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_URI, function (err) {
      if (err) throw err;
      console.log("database connected");
      resolve();
    });
  });
};
