// const { v4: uuidv4 } = require("uuid")
// const { generateAIResponse } = require("../services/geminiService")
// const {
//   generateScamScenario,
//   scammerChatPrompt,
//   explanationPrompt
// } = require("../prompts/scam.prompts")

// // In-memory sessions (NO DB)
// const sessions = {}

// /* -----------------------------
//    1. GENERATE RANDOM MESSAGE
// ------------------------------*/
// exports.getRandomMessage = async (req, res) => {
//   try {
//     const prompt = `
// Generate a single message:

// Return JSON:
// {
//   "sender": "",
//   "message": "",
//   "type": "scam or legit",
//   "hint": "why"
// }
// `

//     const result = await generateAIResponse(prompt)

//     res.json(JSON.parse(result))
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// /* -----------------------------
//    2. CHECK USER ANSWER (AI validation)
// ------------------------------*/
// exports.checkAnswer = async (req, res) => {
//   try {
//     const { message, userChoice } = req.body

//     const prompt = `
// User classified this message:

// Message: ${message}
// User choice: ${userChoice}

// Tell if correct or not and explain briefly.
// Return JSON:
// {
//   "correct": true/false,
//   "explanation": "",
//   "indicators": []
// }
// `

//     const result = await generateAIResponse(prompt)

//     res.json(JSON.parse(result))
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// /* -----------------------------
//    3. START SCAM ROLEPLAY CHAT
// ------------------------------*/
// exports.startScamChat = async (req, res) => {
//   try {
//     const scenarioText = await generateAIResponse(generateScamScenario());

//     const scenario = JSON.parse(scenarioText);

//     res.json({
//       scenario,
//       message: scenario.initialMessage
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* -----------------------------
//    4. CHAT WITH SCAMMER AI
// ------------------------------*/
// exports.chat = async (req, res) => {
//   try {
//     const { scenario, history, message } = req.body;

//     const prompt = `
//     You are a scammer in a training simulation.

//     SCENARIO:
//     ${JSON.stringify(scenario)}

//     CHAT HISTORY:
//     ${history}

//     USER MESSAGE:
//     ${message}

//     RULES:
//     - Stay in scammer role
//     - Be convincing
//     - Use urgency, fear, reward tactics
//     - Keep reply short

//     Respond only as scammer.
//     `;

//         const aiReply = await generateAIResponse(prompt);

//         res.json({ reply: aiReply });

//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
//     };

// /* -----------------------------
//    5. ANALYZE MESSAGE (AI SECURITY ENGINE)
// ------------------------------*/
// exports.analyzeMessage = async (req, res) => {
//   try {
//     const { message } = req.body

//     const result = await generateAIResponse(
//       explanationPrompt(message)
//     )

//     res.json(JSON.parse(result))
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

const { v4: uuidv4 } = require("uuid");
const { generateAIResponse } = require("../services/geminiService");
const {
  generateScamScenario,
  scammerChatPrompt,
  explanationPrompt
} = require("../prompts/scam.prompts");

// -----------------------------
// START CHAT
// -----------------------------
exports.startScamChat = async (req, res) => {
  try {
    const scenarioText = await generateAIResponse(generateScamScenario());

    if (!scenarioText) {
      return res.status(500).json({ error: "AI failed" });
    }

    const scenario = JSON.parse(scenarioText);

    res.json({
      scenario,
      message: scenario.initialMessage
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// CHAT (SCAMMER AI)
// -----------------------------
exports.chat = async (req, res) => {
  try {
    const { scenario, history, message } = req.body;

    const prompt = scammerChatPrompt(
      JSON.stringify(scenario),
      history,
      message
    );

    const aiReply = await generateAIResponse(prompt);

    if (!aiReply) {
      return res.status(500).json({ error: "AI unavailable" });
    }

    res.json({
      reply: aiReply
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// RANDOM MESSAGE (QUIZ MODE)
// -----------------------------
exports.getRandomMessage = async (req, res) => {
  try {
    const prompt = `
Return JSON:
{
  "sender": "",
  "message": "",
  "type": "scam or legit",
  "hint": ""
}
`;

    const result = await generateAIResponse(prompt);

    res.json(JSON.parse(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// CHECK ANSWER
// -----------------------------
exports.checkAnswer = async (req, res) => {
  try {
    const { message, userChoice } = req.body;

    const prompt = `
Message: ${message}
User says: ${userChoice}

Return JSON:
{
  "correct": true/false,
  "explanation": "",
  "indicators": []
}
`;

    const result = await generateAIResponse(prompt);

    res.json(JSON.parse(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// ANALYZE MESSAGE
// -----------------------------
exports.analyzeMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await generateAIResponse(
      explanationPrompt(message)
    );

    res.json(JSON.parse(result));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};