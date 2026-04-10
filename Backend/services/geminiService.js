const axios = require("axios");

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const generateAIResponse = async (prompt, retries = 2) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty Gemini response");

    // clean markdown
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return text;
  } catch (err) {
    if (retries > 0) {
      await sleep(1200);
      return generateAIResponse(prompt, retries - 1);
    }

    console.error("Gemini Error:", err.response?.data || err.message);
    return null;
  }
};

module.exports = { generateAIResponse };