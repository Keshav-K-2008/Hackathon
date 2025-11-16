// Database configuration file
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the app if database connection fails
  }
};

module.exports = connectDB;