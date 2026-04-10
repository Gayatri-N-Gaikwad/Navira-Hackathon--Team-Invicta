const extractFeatures = require("./featureExtractor");
const calculateRisk = require("./riskEngine");
const { generateAIResponse } = require("./geminiService");

async function detectScam(text) {
  try {
    // Extract features using rule-based approach
    const features = extractFeatures(text);

    // Calculate rule-based risk score
    const ruleScore = calculateRisk(features);

    // Prepare AI prompt for scam analysis
    const aiPrompt = `
Analyze this message for potential scam/fraud indicators.

Message: "${text}"

Detected Features:
- OTP mentioned: ${features.otp}
- Urgency signals: ${features.urgency}
- Suspicious links: ${features.suspiciousLink}

Return a JSON object with:
{
  "fraud_probability": number (0-100),
  "red_flags": ["list", "of", "red", "flags"],
  "advice": "brief safety advice",
  "category": "bank|government|otp|electricity|courier|other"
}

Be conservative - only flag clear scam indicators.
`;

    // Get AI analysis
    const aiResponse = await generateAIResponse(aiPrompt);

    let aiResult;
    try {
      aiResult = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      aiResult = {
        fraud_probability: 30,
        red_flags: ["Unable to analyze"],
        advice: "Please be cautious with this message",
        category: "other"
      };
    }

    // Combine rule-based and AI scores (60% rules, 40% AI)
    const llmScore = aiResult.fraud_probability || 50;
    const finalScore = Math.round(ruleScore * 0.6 + llmScore * 0.4);

    return {
      finalScore,
      features,
      aiResult,
      category: aiResult.category || "other"
    };

  } catch (error) {
    console.error("Scam detection error:", error);
    // Return safe fallback
    return {
      finalScore: 20,
      features: extractFeatures(text),
      aiResult: {
        fraud_probability: 20,
        red_flags: ["Analysis failed"],
        advice: "Unable to analyze - please be cautious",
        category: "other"
      },
      category: "other"
    };
  }
}

module.exports = detectScam;