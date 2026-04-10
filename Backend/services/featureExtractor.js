function extractFeatures(text) {
  const features = {
    otp: false,
    urgency: false,
    suspiciousLink: false
  };

  const lowerText = text.toLowerCase();

  // Check for OTP keywords
  if (lowerText.includes("otp") || lowerText.includes("verification code") || lowerText.includes("one time password")) {
    features.otp = true;
  }

  // Check for urgency signals
  if (
    lowerText.includes("urgent") ||
    lowerText.includes("immediately") ||
    lowerText.includes("blocked") ||
    lowerText.includes("suspended") ||
    lowerText.includes("action required") ||
    lowerText.includes("limited time")
  ) {
    features.urgency = true;
  }

  // Check for suspicious links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (text.match(urlRegex)) {
    features.suspiciousLink = true;
  }

  return features;
}

module.exports = extractFeatures;