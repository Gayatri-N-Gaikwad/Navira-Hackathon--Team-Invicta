const express = require("express");
const router = express.Router();
const { generateAIResponse } = require("../services/geminiService");

router.post("/", async (req, res) => {
  try {
    const { question, age, userId } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
        success: false
      });
    }

    // Age-adaptive prompt
    const isSenior = age && parseInt(age) > 60;

    const prompt = `
You are Digital Saathi, a helpful assistant for digital literacy in India.

User Details:
- Age: ${age || "Not specified"}
- Senior Citizen: ${isSenior ? "Yes" : "No"}

Question: "${question}"

Instructions:
${isSenior ? `
- Use very simple language
- Explain each step clearly
- Avoid technical jargon
- Include scam safety tips
- Be patient and encouraging
- Use short sentences
` : `
- Use clear, friendly language
- Include relevant scam warnings
- Provide step-by-step guidance
`}

Provide a helpful, accurate response about digital tasks, online safety, or technology usage.

Format your response as a JSON object:
{
  "answer": "your detailed answer here",
  "safetyTips": ["tip1", "tip2"],
  "relatedTopics": ["topic1", "topic2"]
}
`;

    const aiResponse = await generateAIResponse(prompt);

    let result;
    try {
      result = JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      result = {
        answer: aiResponse || "I apologize, but I couldn't process your question properly. Please try rephrasing it.",
        safetyTips: ["Always verify website URLs before clicking", "Never share OTPs or passwords"],
        relatedTopics: ["Online Safety", "Digital Literacy"]
      };
    }

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error("Help route error:", error);
    res.status(500).json({
      error: "Help request failed",
      success: false,
      answer: "Sorry, I'm having trouble processing your request right now. Please try again later.",
      safetyTips: ["Stay safe online", "Report suspicious messages"]
    });
  }
});

module.exports = router;