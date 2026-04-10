const express = require("express");
const router = express.Router();

const detectIntent = require("../services/intentDetector");
const scamDetector = require("../services/scamDetector");

const Message = require("../models/message");
const User = require("../models/user");
const ScamPattern = require("../models/ScamPattern");

// Helper function to detect scam category
function detectCategory(text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("bank") || lowerText.includes("account") || lowerText.includes("credit")) {
    return "bank";
  } else if (lowerText.includes("electricity") || lowerText.includes("electricity bill") || lowerText.includes("power")) {
    return "electricity";
  } else if (lowerText.includes("government") || lowerText.includes("income tax") || lowerText.includes("aadhar")) {
    return "government";
  } else if (lowerText.includes("otp") || lowerText.includes("verification code")) {
    return "otp";
  } else if (lowerText.includes("courier") || lowerText.includes("delivery") || lowerText.includes("package")) {
    return "courier";
  }

  return "other";
}

router.post("/", async (req, res) => {

  try {
    const { text, userId } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required",
        success: false
      });
    }

    const intent = detectIntent(text);

    if (intent === "SCAM_CHECK") {

      const result = await scamDetector(text);

      const isScam = result.finalScore > 50;

      const category = detectCategory(text);

      // ✅ 1. SAVE MESSAGE
      await Message.create({
        userId: userId || null,
        text,
        riskScore: result.finalScore,
        isScam,
        features: result.features,
        aiAnalysis: {
          fraudProbability: result.aiResult?.fraud_probability,
          redFlags: result.aiResult?.red_flags,
          advice: result.aiResult?.advice
        },
        category
      });

      // ✅ 2. UPDATE USER (only if userId exists)
      if (userId) {
        const user = await User.findById(userId);

        if (user) {
          user.totalMessagesChecked = (user.totalMessagesChecked || 0) + 1;

          if (isScam) user.scamDetectedCount = (user.scamDetectedCount || 0) + 1;
          else user.safeMessageCount = (user.safeMessageCount || 0) + 1;

          user.riskScoreAvg =
            (user.riskScoreAvg * (user.totalMessagesChecked - 1) +
              result.finalScore) /
            user.totalMessagesChecked;

          await user.save();
        }
      }

      // ✅ 3. UPDATE SCAM PATTERN (🔥 IMPORTANT)
      if (isScam) {
        await ScamPattern.findOneAndUpdate(
          { pattern: category },
          {
            $inc: { frequency: 1 },
            category,
            lastSeen: new Date()
          },
          { upsert: true }
        );
      }

      return res.json({
        success: true,
        type: "scam",
        result: {
          finalScore: result.finalScore,
          riskScore: result.finalScore,
          isScam,
          features: result.features,
          aiAnalysis: result.aiResult,
          category
        }
      });
    }

    return res.json({
      success: true,
      type: "help"
    });

  } catch (error) {
    console.error("Analyze route error:", error);
    res.status(500).json({
      error: "Analysis failed",
      success: false,
      details: error.message
    });
  }
});

module.exports = router;