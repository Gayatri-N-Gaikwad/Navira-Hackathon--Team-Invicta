const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/auth");

const validate = require("../middlewares/validate");

const {
  registerValidation,
  loginValidation
} = require("../validations/auth.validation");

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

module.exports = router;