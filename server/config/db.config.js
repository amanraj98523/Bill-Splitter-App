const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error(
        "Database connection URL (DB_URL) is missing in environment variables."
      );
    }

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to the database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToDatabase };