const mongoose = require("mongoose");
const DBLink = process.env.DB_URL;

function connectDB() {
  return mongoose.connect(DBLink);
}

module.exports = connectDB;
