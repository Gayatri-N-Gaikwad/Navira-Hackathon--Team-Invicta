function generateScamScenario() {
  return `
You are generating a scam training scenario.

Return ONLY JSON:

{
  "title": "string",
  "goal": "string",
  "type": "otp | kyc | bank | job | refund | government | electricity | courier | Pension stop | Lottery |Scholarship	| Hospital emergency | Job offer | other",
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

function generateUserOptionsPrompt(scammerMessage) {
  return `
Scammer message:
"${scammerMessage}"

Generate 3 user reply options:
- one safe
- one risky
- one unsure

Return JSON:
{
  "options": [
    { "text": "", "type": "safe" },
    { "text": "", "type": "risky" },
    { "text": "", "type": "unsure" }
  ]
}
`;
}

module.exports = {
  generateScamScenario,
  scammerChatPrompt,
  explanationPrompt,
  generateUserOptionsPrompt
};