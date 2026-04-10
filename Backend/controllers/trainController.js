// const { v4: uuidv4 } = require("uuid");
// const { generateAIResponse } = require("../services/geminiService");
// const {
//   generateScamScenario,
//   scammerChatPrompt,
//   explanationPrompt
// } = require("../prompts/scam.prompts");

// // -----------------------------
// // 🛠️ SAFE JSON PARSER (VERY IMPORTANT)
// // -----------------------------
// const safeJSONParse = (text) => {
//   try {
//     return JSON.parse(text);
//   } catch (err) {
//     console.error("JSON Parse Error:", text);
//     return null;
//   }
// };

// // -----------------------------
// // START CHAT
// // -----------------------------
// exports.startScamChat = async (req, res) => {
//   try {
//     const scenarioText = await generateAIResponse(generateScamScenario());

//     if (!scenarioText) {
//       return res.status(500).json({ error: "AI failed" });
//     }

//     const scenario = safeJSONParse(scenarioText);

//     if (!scenario) {
//       return res.status(500).json({ error: "Invalid AI JSON (scenario)" });
//     }

//     // 🆕 Generate initial user options
//     const optionsPrompt = `
// Scammer message:
// "${scenario.initialMessage}"

// Generate 3 user reply options:
// - one cautious
// - one confused
// - one falling into trap

// Return ONLY JSON:
// {
//   "options": [
//     { "text": "", "type": "safe" },
//     { "text": "", "type": "neutral" },
//     { "text": "", "type": "risky" }
//   ]
// }
// `;

//     const optionsRes = await generateAIResponse(optionsPrompt);
//     const parsedOptions = safeJSONParse(optionsRes);

//     res.json({
//       sessionId: uuidv4(),
//       scenario,
//       message: scenario.initialMessage,
//       options: parsedOptions?.options || []
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----------------------------
// // CHAT (SCAMMER AI)
// // -----------------------------
// exports.chat = async (req, res) => {
//   try {
//     const { scenario, history, message } = req.body;

//     const prompt = scammerChatPrompt(
//       JSON.stringify(scenario),
//       history,
//       message
//     );

//     const aiReply = await generateAIResponse(prompt);

//     if (!aiReply) {
//       return res.status(500).json({ error: "AI unavailable" });
//     }

//     // 🆕 Generate guided options
//     const optionsPrompt = `
// User is learning scam detection.

// Scammer said:
// "${aiReply}"

// Generate 3 possible user responses:
// 1 safe (reject / cautious)
// 1 risky (falling into trap)
// 1 neutral (unsure / questioning)

// Return ONLY JSON:
// {
//   "options": [
//     { "text": "", "type": "safe" },
//     { "text": "", "type": "risky" },
//     { "text": "", "type": "neutral" }
//   ]
// }
// `;

//     const optionsRes = await generateAIResponse(optionsPrompt);
//     const parsedOptions = safeJSONParse(optionsRes);

//     res.json({
//       reply: aiReply,
//       options: parsedOptions?.options || []
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----------------------------
// // RANDOM MESSAGE (QUIZ MODE)
// // -----------------------------
// exports.getRandomMessage = async (req, res) => {
//   try {
//     const prompt = `
// Generate a realistic SMS/WhatsApp message in India.

// Return ONLY JSON:
// {
//   "sender": "",
//   "message": "",
//   "type": "scam or legit",
//   "hint": "",
//   "options": ["Scam", "Legit", "Not Sure"]
// }
// `;

//     const result = await generateAIResponse(prompt);
//     const parsed = safeJSONParse(result);

//     if (!parsed) {
//       return res.status(500).json({ error: "Invalid AI JSON (quiz)" });
//     }

//     res.json(parsed);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----------------------------
// // CHECK ANSWER
// // -----------------------------
// exports.checkAnswer = async (req, res) => {
//   try {
//     const { message, userChoice } = req.body;

//     const prompt = `
// Message: "${message}"
// User answer: "${userChoice}"

// Evaluate if user is correct.

// Return ONLY JSON:
// {
//   "correct": true/false,
//   "explanation": "",
//   "indicators": [],
//   "betterResponse": ""
// }
// `;

//     const result = await generateAIResponse(prompt);
//     const parsed = safeJSONParse(result);

//     if (!parsed) {
//       return res.status(500).json({ error: "Invalid AI JSON (answer)" });
//     }

//     res.json(parsed);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----------------------------
// // ANALYZE MESSAGE
// // -----------------------------
// exports.analyzeMessage = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const result = await generateAIResponse(
//       explanationPrompt(message)
//     );

//     const parsed = safeJSONParse(result);

//     if (!parsed) {
//       return res.status(500).json({ error: "Invalid AI JSON (analysis)" });
//     }

//     res.json(parsed);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// ================================================================================================================================
// GROQ service


const { v4: uuidv4 } = require("uuid");
const { generateAIResponse } = require("../services/groqService"); // ✅ CHANGED HERE
const {
  generateScamScenario,
  scammerChatPrompt,
  explanationPrompt
} = require("../prompts/scam.prompts");

// -----------------------------
// 🛠️ SAFE JSON PARSER
// -----------------------------
const safeJSONParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ JSON Parse Error:", text);
    return null;
  }
};

// -----------------------------
// START CHAT
// -----------------------------
exports.startScamChat = async (req, res) => {
  try {
    const scenarioText = await generateAIResponse(generateScamScenario());

    if (!scenarioText) {
      return res.status(500).json({ error: "AI failed" });
    }

    const scenario = safeJSONParse(scenarioText);

    if (!scenario || !scenario.initialMessage) {
      return res.status(500).json({ error: "Invalid AI JSON (scenario)" });
    }

    // 🔹 Generate initial options (LLAMA-OPTIMIZED PROMPT)
    const optionsPrompt = `
You are helping a user learn scam detection.

Scammer message:
"${scenario.initialMessage}"

Generate EXACTLY 3 user replies:
1 safe (reject / cautious)
1 neutral (asking / unsure)
1 risky (falling into trap)

Return ONLY valid JSON:
{
  "options": [
    { "text": "", "type": "safe" },
    { "text": "", "type": "neutral" },
    { "text": "", "type": "risky" }
  ]
}
`;

    const optionsRes = await generateAIResponse(optionsPrompt);
    const parsedOptions = safeJSONParse(optionsRes);

    res.json({
      sessionId: uuidv4(),
      scenario,
      message: scenario.initialMessage,
      options: parsedOptions?.options || []
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

    if (!scenario || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = scammerChatPrompt(
      JSON.stringify(scenario),
      history,
      message
    );

    const aiReply = await generateAIResponse(prompt);

    if (!aiReply) {
      return res.status(500).json({ error: "AI unavailable" });
    }

    // 🔹 Generate next options
    const optionsPrompt = `
You are helping a user learn scam detection.

Scammer said:
"${aiReply}"

Generate EXACTLY 3 user replies:
1 safe (reject clearly)
1 risky (trusting / giving info)
1 neutral (confused / asking)

Return ONLY valid JSON:
{
  "options": [
    { "text": "", "type": "safe" },
    { "text": "", "type": "risky" },
    { "text": "", "type": "neutral" }
  ]
}
`;

    const optionsRes = await generateAIResponse(optionsPrompt);
    const parsedOptions = safeJSONParse(optionsRes);

    res.json({
      reply: aiReply,
      options: parsedOptions?.options || []
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
Generate a realistic Indian SMS or WhatsApp message.

Return ONLY valid JSON:
{
  "sender": "",
  "message": "",
  "type": "scam or legit",
  "hint": "",
  "options": ["Scam", "Legit", "Not Sure"]
}
`;

    const result = await generateAIResponse(prompt);
    const parsed = safeJSONParse(result);

    if (!parsed) {
      return res.status(500).json({ error: "Invalid AI JSON (quiz)" });
    }

    res.json(parsed);

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

    if (!message || !userChoice) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `
Message: "${message}"
User answer: "${userChoice}"

Evaluate correctness.

Return ONLY valid JSON:
{
  "correct": true/false,
  "explanation": "",
  "indicators": [],
  "betterResponse": ""
}
`;

    const result = await generateAIResponse(prompt);
    const parsed = safeJSONParse(result);

    if (!parsed) {
      return res.status(500).json({ error: "Invalid AI JSON (answer)" });
    }

    res.json(parsed);

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

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await generateAIResponse(
      explanationPrompt(message)
    );

    const parsed = safeJSONParse(result);

    if (!parsed) {
      return res.status(500).json({ error: "Invalid AI JSON (analysis)" });
    }

    res.json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};