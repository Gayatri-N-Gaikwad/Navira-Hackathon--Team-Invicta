function detectIntent(text) {
  const scamKeywords = [
    "scam",
    "fake",
    "check message",
    "verify",
    "verify link",
    "suspicious",
    "otp",
    "verification code",
    "verification",
    "phishing",
    "fraud",
    "hack",
    "virus",
    "malware",
    "blocked",
    "blocked account",
    "suspended",
    "security alert",
    "confirm",
    "click here",
    "urgent",
    "immediately",
    "action required",
    "payment",
    "bill",
    "account"
  ];

  const lowerText = text.toLowerCase();

  // Check for keywords
  for (let keyword of scamKeywords) {
    if (lowerText.includes(keyword)) {
      return "SCAM_CHECK";
    }
  }

  // Check for suspicious URL patterns (additional check)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (text.match(urlRegex)) {
    return "SCAM_CHECK";
  }

  return "DIGITAL_HELP";
}

module.exports = detectIntent;