const express = require("express");
const router = express.Router();
const ScamPattern = require("../models/ScamPattern");
const Message = require("../models/message");

router.get("/heatmap", async (req, res) => {
  try {
    // Get top scam patterns
    const commonScams = await ScamPattern.find()
      .sort({ frequency: -1 })
      .limit(10)
      .select("pattern frequency category");

    // Get today's scam reports count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayReports = await Message.countDocuments({
      createdAt: { $gte: today },
      isScam: true
    });

    // Get total reports
    const totalReports = await Message.countDocuments({ isScam: true });

    res.json({
      success: true,
      data: {
        commonScams: commonScams.map(scam => ({
          type: scam.pattern,
          reports: scam.frequency,
          category: scam.category
        })),
        todayReports,
        totalReports,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
      success: false
    });
  }
});

module.exports = router;