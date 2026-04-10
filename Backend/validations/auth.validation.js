const { body } = require("express-validator");

// ✅ Register validation
exports.registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .isEmail().withMessage("Valid email required")
    .normalizeEmail(),
    
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

// ✅ Login validation
exports.loginValidation = [
  body("email")
    .isEmail().withMessage("Valid email required"),

  body("password")
    .notEmpty().withMessage("Password is required")
];