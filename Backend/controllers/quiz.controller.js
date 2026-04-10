const { generateQuizFromAI } = require("../services/ai.service.js");

const generateQuiz = async (req, res) => {
  try {
    const { module, difficulty, type, language } = req.body;

    const quiz = await generateQuizFromAI({
      module,
      difficulty,
      type,
      language
    });

    if (quiz.type === "image") {
        const prompt =
            quiz.imageDescription ||
            quiz.imageKeywords?.join(" ") ||
            "phishing scam sms india";

        quiz.imageUrl =
  `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=768&height=768&seed=${Date.now()}`;
    }

    res.json({
      success: true,
      quiz
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { generateQuiz };