// Beneficiary routes - manage beneficiaries and assign assets
const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const Asset = require('../models/Asset');
const authMiddleware = require('../middleware/auth');
const { sendLegacyEmail } = require('../utills/email');
const { decrypt } = require('../utills/encryption');

// All routes here are protected - user must be logged in
router.use(authMiddleware);

// GET /api/beneficiaries - Get all beneficiaries for logged-in user
router.get('/', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(beneficiaries);
  } catch (error) {
    console.error('Get beneficiaries error:', error);
    res.status(500).json({ message: 'Error fetching beneficiaries' });
  }
});

// POST /api/beneficiaries - Add a new beneficiary
router.post('/', async (req, res) => {
  try {
    const { name, email, relation } = req.body;

    // Validate input
    if (!name || !email || !relation) {
      return res.status(400).json({ message: 'Name, email, and relation are required' });
    }

    // Create new beneficiary
    const beneficiary = new Beneficiary({
      userId: req.userId,
      name,
      email,
      relation
    });

    // Save to database
    await beneficiary.save();

    res.status(201).json({
      message: 'Beneficiary added successfully',
      beneficiary
    });
  } catch (error) {
    console.error('Create beneficiary error:', error);
    res.status(500).json({ message: 'Error creating beneficiary' });
  }
});

// POST /api/beneficiaries/assign - Assign an asset to a beneficiary
router.post('/assign', async (req, res) => {
  try {
    const { assetId, beneficiaryId } = req.body;

    // Find the asset
    const asset = await Asset.findOne({ _id: assetId, userId: req.userId });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Find the beneficiary
    const beneficiary = await Beneficiary.findOne({ _id: beneficiaryId, userId: req.userId });
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }

    // Check if already assigned
    if (asset.assignedBeneficiaries.includes(beneficiaryId)) {
      return res.status(400).json({ message: 'Asset already assigned to this beneficiary' });
    }

    // Add beneficiary to asset's assigned list
    asset.assignedBeneficiaries.push(beneficiaryId);
    await asset.save();

    res.json({
      message: 'Asset assigned successfully',
      asset
    });
  } catch (error) {
    console.error('Assign asset error:', error);
    res.status(500).json({ message: 'Error assigning asset' });
  }
});

// POST /api/beneficiaries/activate-legacy - Send emails to all beneficiaries
router.post('/activate-legacy', async (req, res) => {
  try {
    // Find all assets for this user that have beneficiaries
    const assets = await Asset.find({ userId: req.userId })
      .populate('assignedBeneficiaries');

    if (assets.length === 0) {
      return res.status(400).json({ message: 'No assets with beneficiaries found' });
    }

    let emailsSent = 0;
    const errors = [];

    // Loop through each asset
    for (const asset of assets) {
      // Loop through each beneficiary for this asset
      for (const beneficiary of asset.assignedBeneficiaries) {
        try {
          // Send email to this beneficiary
          const sent = await sendLegacyEmail(
            beneficiary.email,
            beneficiary.name,
            asset.title
          );
          if (sent) emailsSent++;
        } catch (error) {
          errors.push(`Failed to send to ${beneficiary.email}`);
        }
      }
    }

    res.json({
      message: 'Legacy activation completed',
      emailsSent,
      errors: errors.length > 0 ? errors : null
    });
  } catch (error) {
    console.error('Activate legacy error:', error);
    res.status(500).json({ message: 'Error activating legacy' });
  }
});

// DELETE /api/beneficiaries/:id - Delete a beneficiary
router.delete('/:id', async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findOne({ _id: req.params.id, userId: req.userId });

    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }

    // Remove beneficiary from all assets
    await Asset.updateMany(
      { userId: req.userId },
      { $pull: { assignedBeneficiaries: req.params.id } }
    );

    await beneficiary.deleteOne();
    res.json({ message: 'Beneficiary deleted successfully' });
  } catch (error) {
    console.error('Delete beneficiary error:', error);
    res.status(500).json({ message: 'Error deleting beneficiary' });
  }
});

module.exports = router;