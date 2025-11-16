// User model - defines the structure of user data in MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema (structure) for a User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each email can only be used once
    lowercase: true, // Convert to lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Password must be at least 6 characters
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to current date
  }
});

// Hash password before saving to database
// This runs automatically before a user is saved
userSchema.pre('save', async function(next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
module.exports = mongoose.model('User', userSchema);