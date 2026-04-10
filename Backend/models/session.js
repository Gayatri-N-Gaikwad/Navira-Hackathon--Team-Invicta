// models/Session.js
const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  scenarioId: String,

  messages: [
    {
      role: String,
      content: String
    }
  ],

  result: {
    type: String // "safe", "scammed", "warning"
  },

  score: Number, // optional (for training)

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Session", SessionSchema);