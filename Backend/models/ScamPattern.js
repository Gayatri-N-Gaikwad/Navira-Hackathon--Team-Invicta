// models/ScamPattern.js
const mongoose = require("mongoose");

const ScamPatternSchema = new mongoose.Schema({
  pattern: String,

  frequency: {
    type: Number,
    default: 1
  },

  category: {
    type: String,
    enum: ["bank", "government", "otp", "electricity", "courier", "other"]
  },

  lastSeen: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ScamPattern", ScamPatternSchema);