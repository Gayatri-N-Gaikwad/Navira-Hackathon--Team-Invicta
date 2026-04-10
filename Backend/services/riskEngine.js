function calculateRisk(features) {
  let score = 0;

  // Rule-based scoring
  if (features.otp) score += 40;
  if (features.suspiciousLink) score += 25;
  if (features.urgency) score += 15;

  // Cap at 100
  return Math.min(score, 100);
}

module.exports = calculateRisk;