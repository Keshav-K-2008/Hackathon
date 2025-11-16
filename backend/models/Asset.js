// Asset model - stores encrypted user assets and assigned beneficiaries
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    default: 'note'
  },
  content: {
    type: String, // encrypted content
    required: true
  },
  iv: {
    type: String, // initialization vector used for encryption
    required: true
  },
  assignedBeneficiaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beneficiary'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Asset', assetSchema);
