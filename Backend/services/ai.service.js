const axios = require("axios");
const { buildQuizPrompt } = require("../prompts/quiz.prompts.js");

const generateQuizFromAI = async ({ module, difficulty, type, language }) => {

  const prompt = buildQuizPrompt(module, difficulty, type, language);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    // clean markdown if any
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    throw new Error("Failed to generate quiz");
  }
};

module.exports = { generateQuizFromAI };