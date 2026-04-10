const axios = require("axios");

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const generateAIResponse = async (prompt, retries = 2) => {
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

    console.error("Groq Error:", err.response?.data || err.message);
    return null;
  }
};

module.exports = { generateAIResponse };