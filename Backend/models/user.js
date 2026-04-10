const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"]
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v); // Indian phone validation
        },
        message: "Invalid phone number"
      }
    },

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },

     provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    googleId: {
      type: String,
      sparse: true
    },
    age: Number,

  location: {
    type: String,
    default: "India"
  },

  totalMessagesChecked: { type: Number, default: 0 },
  scamDetectedCount: { type: Number, default: 0 },
  safeMessageCount: { type: Number, default: 0 },
  riskScoreAvg: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);