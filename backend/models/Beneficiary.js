// Beneficiary model - defines people who will receive legacy items
const mongoose = require('mongoose');

// Define the schema for a Beneficiary
const beneficiarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who added this beneficiary
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  relation: {
    type: String, // e.g., "Son", "Daughter", "Friend", "Lawyer"
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Beneficiary model
module.exports = mongoose.model('Beneficiary', beneficiarySchema);