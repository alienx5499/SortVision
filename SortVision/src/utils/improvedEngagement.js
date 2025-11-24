/**
 * Improved Engagement Tracking Utilities
 * 
 * Features:
 * - Throttled interactions (prevents spam)
 * - Exponential decay (more realistic)
 * - Interaction velocity tracking
 * - Quality-based scoring
 */

// Throttle map to track last interaction times
const throttleMap = new Map();

/**
 * Check if interaction should be throttled
 */
export function isThrottled(type, throttleMs) {
  const now = Date.now();
  const lastTime = throttleMap.get(type) || 0;
  
  if (now - lastTime < throttleMs) {
    return true;
  }
  
  throttleMap.set(type, now);
  return false;
}

/**
 * Calculate interaction velocity multiplier
 * Tracks how quickly user is interacting
 */
export function calculateVelocity(interactionHistory, now) {
  if (interactionHistory.length < 2) {
    return 1.0; // Normal velocity
  }

  // Look at last 5 interactions
  const recent = interactionHistory.slice(-5);
  const timeSpan = now - recent[0].time;
  const count = recent.length;

  // Very fast: 5+ interactions in < 2 seconds
  if (timeSpan < 2000 && count >= 5) {
    return 1.5;
  }
  
  // Fast: 3+ interactions in < 5 seconds
  if (timeSpan < 5000 && count >= 3) {
    return 1.2;
  }
  
  // Slow: > 10 seconds since last interaction
  if (interactionHistory.length > 0) {
    const lastTime = interactionHistory[interactionHistory.length - 1].time;
    if (now - lastTime > 10000) {
      return 0.8;
    }
  }

  return 1.0; // Normal
}

/**
 * Apply exponential decay to engagement score
 */
export function applyExponentialDecay(score, decayRate = 0.95) {
  return Math.max(0, score * decayRate);
}

/**
 * Calculate weighted engagement score
 * Combines base score with quality and velocity
 */
export function calculateWeightedScore(baseScore, qualityInteractions, velocity, timeSpent) {
  // Quality multiplier (more quality interactions = higher)
  const qualityMultiplier = 1 + (qualityInteractions * 0.1);
  
  // Velocity multiplier
  const velocityMultiplier = velocity;
  
  // Time bonus (longer sessions get slight bonus, max 5 points)
  const timeBonus = Math.min(5, timeSpent / 60);
  
  // Weighted formula
  const weighted = (baseScore * qualityMultiplier * velocityMultiplier) + timeBonus;
  
  return Math.round(weighted * 10) / 10;
}

/**
 * Track interaction with improved algorithm
 */
export function trackInteractionImproved(
  type,
  engagementScore,
  interactionHistory,
  qualityType = null,
  config
) {
  const now = Date.now();
  const throttleMs = config.THROTTLE_MS[type] || 200;
  
  // Check throttle
  if (isThrottled(type, throttleMs)) {
    return {
      score: engagementScore,
      history: interactionHistory,
      added: 0,
    };
  }

  // Get base score
  let score = qualityType 
    ? (config.QUALITY_SCORES[qualityType] || config.ENGAGEMENT_SCORES[type] || 1)
    : (config.ENGAGEMENT_SCORES[type] || 1);

  // Apply velocity multiplier
  const velocity = calculateVelocity(interactionHistory, now);
  score *= velocity;

  // Update engagement
  const newScore = engagementScore + score;

  // Update history
  const newHistory = [
    ...interactionHistory.slice(-49), // Keep last 50
    { type, score, time: now, qualityType },
  ];

  return {
    score: newScore,
    history: newHistory,
    added: score,
    velocity,
  };
}

/**
 * Improved decay function
 */
export function applyDecayImproved(engagementScore, decayRate, useExponential = true) {
  if (useExponential) {
    return applyExponentialDecay(engagementScore, decayRate);
  }
  // Fallback to linear decay
  return Math.max(0, engagementScore - 1);
}

