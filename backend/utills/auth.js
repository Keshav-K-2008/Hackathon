// Authentication middleware - protects routes that need login
const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get token from request header
  // Format: "Bearer <token>"
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user id from token to request object
    // This makes user ID available in all protected routes
    req.userId = decoded.userId;
    
    // Continue to the next function (route handler)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;