const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  register,
  login,
  googleAuthCallback
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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

module.exports = router;