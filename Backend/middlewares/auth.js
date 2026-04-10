const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - no token provided"
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized - user not found"
        });
      }

      // Attach user to request
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      };
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - invalid token"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error in auth middleware"
    });
  }
};

// Optional auth - doesn't require auth but attaches user if token exists
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (user) {
          req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            age: user.age
          };
        }
      } catch (error) {
        // Invalid token, but continue without user
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  optionalAuth
};
