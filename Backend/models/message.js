// const mongoose = require("mongoose")

// const MessageSchema = new mongoose.Schema({

//  sender: String,

//  message: String,

//  type: {
//    type: String,
//    enum: ["scam", "legit"]
//  },

//  category: String,

//  explanation: String,

//  indicators: [String]

// })

// module.exports = mongoose.model("Message", MessageSchema)


// models/Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: String,

  riskScore: Number,

  isScam: Boolean,

  features: {
    otp: Boolean,
    urgency: Boolean,
    suspiciousLink: Boolean
  },

  aiAnalysis: {
    fraudProbability: Number,
    redFlags: [String],
    advice: String
  },

  category: {
    type: String,
    enum: ["bank", "government", "otp", "electricity", "courier", "other"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Message", MessageSchema);