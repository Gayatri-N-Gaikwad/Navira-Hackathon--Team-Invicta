function generateScamScenario() {
  return `
You are an expert cybersecurity simulation designer.

Generate a realistic Indian scam training scenario.

RULES:
- MUST be JSON only
- Simple English or regional tone
- Real-world Indian digital behavior (UPI, OTP, bank, WhatsApp)
- No explanations outside JSON

Return format:
{
  "title": "",
  "goal": "",
  "initialMessage": "",
  "scamType": "otp|kyc|bank|job|refund",
  "tactics": ["urgency", "fear", "reward", "authority"]
}

Make it feel like a real scammer initiating conversation.
`;
}

function generateScamScenario() {
  return `
You are generating a scam training scenario.

Return ONLY JSON:

{
  "title": "string",
  "goal": "string",
  "type": "otp | kyc | bank | job | refund | government",
  "initialMessage": "first scammer message to start chat"
}

Rules:
- Must be realistic Indian scam
- Only ONE message in initialMessage
- No explanation
`;
}

function scammerChatPrompt(scenario, history, userMessage) {
  return `
You are a scammer in a cybersecurity training simulation.

SCENARIO:
${scenario}

CHAT HISTORY:
${history}

USER MESSAGE:
${userMessage}

RULES:
- Stay in scammer role
- Use manipulation tactics (fear, urgency, reward)
- Try to convince user
- Keep reply short (2-4 lines)
- Never break character

Respond ONLY as scammer message.
`;
}

function explanationPrompt(message) {
  return `
Analyze this message:

"${message}"

Return ONLY JSON:
{
  "type": "scam or legit",
  "indicators": [],
  "explanation": ""
}
`;
}

module.exports = {
  generateScamScenario,
  scammerChatPrompt,
  explanationPrompt
};