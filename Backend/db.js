const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://kazx:9uN5gLG3LaCkQjVW@portfolio.mu9i2wc.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
