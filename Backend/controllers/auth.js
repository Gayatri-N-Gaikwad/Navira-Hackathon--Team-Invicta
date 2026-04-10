const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// Register Function
const register = async (req, res) => {
  try {
    const { name, email, password, birthYear } = req.body;

    // ✅ FIXED
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const currentYear = new Date().getFullYear();
    const age = birthYear ? currentYear - parseInt(birthYear) : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
      age
    });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Function 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.provider === "google") {
      return res.status(400).json({
        message: "Please login using Google"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const googleAuthCallback = async (req, res) => {
  try {
    const profile = req.user;

    const token = generateToken(profile._id);

    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: profile._id,
        name: profile.name,
        email: profile.email,
        age: profile.age
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  googleAuthCallback,
  getMe
};