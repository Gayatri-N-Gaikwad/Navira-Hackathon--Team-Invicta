const axios = require("axios");
const { buildQuizPrompt } = require("../prompts/quiz.prompts.js");

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const generateQuizFromAI = async (
  { module, difficulty, type, language },
  retries = 2
) => {
  const prompt = buildQuizPrompt(module, difficulty, type, language);

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let text = response.data?.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty Groq response");

    // 🧹 Clean markdown (same as Gemini)
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Convert to JSON
    return JSON.parse(cleanText);

  } catch (error) {
    if (retries > 0) {
      await sleep(1200);
      return generateQuizFromAI(
        { module, difficulty, type, language },
        retries - 1
      );
    }

    console.error("Groq Error:", error.response?.data || error.message);
    throw new Error("Failed to generate quiz");
  }
};

module.exports = { generateQuizFromAI };