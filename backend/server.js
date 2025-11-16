// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/assets');
const beneficiaryRoutes = require('./routes/beneficiaries');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON request bodies

// Routes
// All auth routes will start with /api/auth
app.use('/api/auth', authRoutes);
// All asset routes will start with /api/assets
app.use('/api/assets', assetRoutes);
// All beneficiary routes will start with /api/beneficiaries
app.use('/api/beneficiaries', beneficiaryRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Digital Death Locker API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});