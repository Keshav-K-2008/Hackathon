// Asset routes - create, read, delete assets
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const authMiddleware = require('../middleware/auth');
const { encrypt, decrypt } = require('../utills/encryption');

// All routes here are protected - user must be logged in
router.use(authMiddleware);

// GET /api/assets - Get all assets for logged-in user
router.get('/', async (req, res) => {
  try {
    // Find all assets belonging to this user
    const assets = await Asset.find({ userId: req.userId })
      .populate('assignedBeneficiaries', 'name email relation') // Get beneficiary details
      .sort({ createdAt: -1 }); // Newest first

    // Decrypt asset content before sending
    const decryptedAssets = assets.map(asset => {
      const decryptedContent = decrypt(asset.content, asset.iv);
      return {
        id: asset._id,
        title: asset.title,
        type: asset.type,
        content: decryptedContent, // Send decrypted content
        assignedBeneficiaries: asset.assignedBeneficiaries,
        createdAt: asset.createdAt
      };
    });

    res.json(decryptedAssets);
  } catch (error) {
    console.error('Get assets error:', error);
    res.status(500).json({ message: 'Error fetching assets' });
  }
});

// POST /api/assets - Create a new asset
router.post('/', async (req, res) => {
  try {
    const { title, type, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Encrypt the content before saving
    const { encryptedData, iv } = encrypt(content);

    // Create new asset
    const asset = new Asset({
      userId: req.userId,
      title,
      type: type || 'note',
      content: encryptedData, // Store encrypted content
      iv // Store initialization vector
    });

    // Save to database
    await asset.save();

    res.status(201).json({
      message: 'Asset created successfully',
      asset: {
        id: asset._id,
        title: asset.title,
        type: asset.type,
        content: content, // Return original content (not encrypted)
        createdAt: asset.createdAt
      }
    });
  } catch (error) {
    console.error('Create asset error:', error);
    res.status(500).json({ message: 'Error creating asset' });
  }
});

// DELETE /api/assets/:id - Delete an asset
router.delete('/:id', async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, userId: req.userId });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await asset.deleteOne();
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ message: 'Error deleting asset' });
  }
});

module.exports = router;