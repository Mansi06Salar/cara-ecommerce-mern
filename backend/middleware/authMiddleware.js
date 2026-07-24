const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ========================================
// PROTECT ROUTES
// User must be logged in
// ========================================

const protect = async (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;


    // Check Authorization header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message:
          "Not authorized. No token provided.",
      });

    }


    // Authorization: Bearer <token>
    const token =
      authHeader.split(" ")[1];


    // Verify JWT
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // Find logged-in user
    const user =
      await User.findById(
        decoded.userId
      ).select("-password");


    if (!user) {

      return res.status(401).json({
        message:
          "Not authorized. User not found.",
      });

    }


    // Attach user to request
    req.user = user;


    next();


  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );


    return res.status(401).json({
      message:
        "Not authorized. Invalid or expired token.",
    });

  }

};



// ========================================
// ADMIN ONLY
// User must already pass protect first
// ========================================

const admin = (req, res, next) => {

  // Safety check
  if (!req.user) {

    return res.status(401).json({
      message:
        "Not authorized. Please login.",
    });

  }


  // Check user role
  if (req.user.role !== "admin") {

    return res.status(403).json({
      message:
        "Access denied. Admin only.",
    });

  }


  // User is admin
  next();

};



module.exports = {
  protect,
  admin,
};