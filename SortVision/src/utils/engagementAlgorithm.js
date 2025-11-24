/**
 * Advanced Engagement Algorithm for Popup Timing
 * 
 * Improvements:
 * 1. Throttled interaction tracking (prevents spam)
 * 2. Quality-based scoring (meaningful vs random interactions)
 * 3. Exponential decay (more realistic engagement loss)
 * 4. Interaction velocity tracking (how quickly user engages)
 * 5. Context-aware scoring (algorithm-specific actions)
 * 6. Weighted formula instead of hard thresholds
 */

// Throttle configuration to prevent spam
const THROTTLE_CONFIG = {
  click: 200,      // 200ms between clicks
  scroll: 100,     // 100ms between scrolls
  keydown: 150,    // 150ms between keydowns
  mousemove: 500,  // 500ms between mouse moves
};

// Quality-based interaction scores
export const QUALITY_SCORES = {
  // High-value interactions (algorithm-specific)
  algorithmSelect: 5,      // User selected an algorithm
  sortingStart: 6,         // User started sorting
  sortingPause: 4,         // User paused/resumed
  arraySizeChange: 3,      // User changed array size
  speedChange: 3,          // User changed speed
  tabSwitch: 2,            // User switched tabs (config/metrics/details)
  
  // Medium-value interactions
  click: 2.5,              // Regular click (reduced from 3)
  keydown: 1.5,             // Keyboard usage (reduced from 2)
  
  // Low-value interactions
  scroll: 0.8,              // Scrolling (reduced from 1)
  mousemove: 0.2,           // Mouse movement (reduced from 0.5)
};

// Base engagement scores (fallback)
export const BASE_SCORES = {
  click: 2.5,
  keydown: 1.5,
  scroll: 0.8,
  mousemove: 0.2,
};

// Interaction velocity multipliers
const VELOCITY_MULTIPLIERS = {
  veryFast: 1.5,   // Multiple interactions in < 2 seconds
  fast: 1.2,       // Multiple interactions in < 5 seconds
  normal: 1.0,     // Normal pace
  slow: 0.8,       // Slow pace (> 10 seconds between)
};

/**
 * Advanced Engagement Tracker
 */
export class EngagementTracker {
  constructor() {
    this.engagementScore = 0;
    this.interactionHistory = [];
    this.lastInteractionTime = Date.now();
    this.interactionCount = 0;
    this.qualityInteractions = 0; // Count of high-quality interactions
    this.throttleTimers = {};
    this.decayRate = 0.95; // Exponential decay (5% per 30 seconds)
    this.decayTimer = null;
  }

  /**
   * Track interaction with throttling and quality scoring
   */
  trackInteraction(type, context = {}) {
    const now = Date.now();
    
    // Throttle to prevent spam
    if (this.isThrottled(type, now)) {
      return;
    }

    // Calculate base score
    let score = this.getQualityScore(type, context);
    
    // Apply velocity multiplier
    const velocity = this.calculateVelocity(now);
    score *= velocity;

    // Update engagement
    this.engagementScore += score;
    this.interactionCount++;
    this.lastInteractionTime = now;

    // Track quality interactions
    if (score >= 3) {
      this.qualityInteractions++;
    }

    // Record interaction
    this.interactionHistory.push({
      type,
      score,
      time: now,
      context,
    });

    // Keep only last 50 interactions
    if (this.interactionHistory.length > 50) {
      this.interactionHistory.shift();
    }

    // Reset decay timer
    this.resetDecayTimer();

    return score;
  }

  /**
   * Check if interaction should be throttled
   */
  isThrottled(type, now) {
    const throttleTime = THROTTLE_CONFIG[type] || 200;
    const lastTime = this.throttleTimers[type] || 0;
    
    if (now - lastTime < throttleTime) {
      return true;
    }
    
    this.throttleTimers[type] = now;
    return false;
  }

  /**
   * Get quality-based score for interaction
   */
  getQualityScore(type, context) {
    // Check for high-quality interactions first
    if (context.qualityType) {
      return QUALITY_SCORES[context.qualityType] || BASE_SCORES[type] || 1;
    }
    
    // Fallback to base scores
    return BASE_SCORES[type] || 1;
  }

  /**
   * Calculate interaction velocity multiplier
   */
  calculateVelocity(now) {
    if (this.interactionHistory.length < 2) {
      return VELOCITY_MULTIPLIERS.normal;
    }

    const recentInteractions = this.interactionHistory.slice(-5);
    const timeSpan = now - recentInteractions[0].time;
    const interactionCount = recentInteractions.length;

    // Very fast: 5+ interactions in < 2 seconds
    if (timeSpan < 2000 && interactionCount >= 5) {
      return VELOCITY_MULTIPLIERS.veryFast;
    }
    
    // Fast: 3+ interactions in < 5 seconds
    if (timeSpan < 5000 && interactionCount >= 3) {
      return VELOCITY_MULTIPLIERS.fast;
    }
    
    // Slow: > 10 seconds since last interaction
    if (now - this.lastInteractionTime > 10000) {
      return VELOCITY_MULTIPLIERS.slow;
    }

    return VELOCITY_MULTIPLIERS.normal;
  }

  /**
   * Start exponential decay timer
   */
  resetDecayTimer() {
    if (this.decayTimer) {
      clearTimeout(this.decayTimer);
    }

    this.decayTimer = setTimeout(() => {
      this.applyDecay();
    }, 30000); // 30 seconds
  }

  /**
   * Apply exponential decay to engagement score
   */
  applyDecay() {
    // Exponential decay: score *= decayRate
    this.engagementScore = Math.max(0, this.engagementScore * this.decayRate);
    
    // Continue decay if score > 0
    if (this.engagementScore > 0.1) {
      this.resetDecayTimer();
    }
  }

  /**
   * Get current engagement metrics
   */
  getMetrics() {
    const timeSinceStart = Date.now() - (this.interactionHistory[0]?.time || Date.now());
    const interactionsPerMinute = (this.interactionCount / (timeSinceStart / 60000)) || 0;
    
    return {
      score: Math.round(this.engagementScore * 10) / 10,
      interactionCount: this.interactionCount,
      qualityInteractions: this.qualityInteractions,
      interactionsPerMinute: Math.round(interactionsPerMinute * 10) / 10,
      timeSinceStart: Math.floor(timeSinceStart / 1000),
      hasInteracted: this.interactionCount > 0,
    };
  }

  /**
   * Calculate weighted engagement score
   * Combines time, engagement, and quality metrics
   */
  calculateWeightedScore(timeSpent) {
    const metrics = this.getMetrics();
    
    // Base engagement score
    const baseScore = metrics.score;
    
    // Quality multiplier (more quality interactions = higher multiplier)
    const qualityMultiplier = 1 + (metrics.qualityInteractions * 0.1);
    
    // Velocity multiplier (faster interactions = higher engagement)
    const velocityMultiplier = Math.min(1.5, 1 + (metrics.interactionsPerMinute / 20));
    
    // Time bonus (longer sessions get slight bonus)
    const timeBonus = Math.min(5, timeSpent / 60); // Max 5 points for time
    
    // Weighted formula
    const weightedScore = (baseScore * qualityMultiplier * velocityMultiplier) + timeBonus;
    
    return {
      weightedScore: Math.round(weightedScore * 10) / 10,
      baseScore,
      qualityMultiplier,
      velocityMultiplier,
      timeBonus,
      metrics,
    };
  }

  /**
   * Reset tracker
   */
  reset() {
    this.engagementScore = 0;
    this.interactionHistory = [];
    this.interactionCount = 0;
    this.qualityInteractions = 0;
    this.throttleTimers = {};
    if (this.decayTimer) {
      clearTimeout(this.decayTimer);
      this.decayTimer = null;
    }
  }
}

/**
 * Check if popup should show using improved algorithm
 */
export function shouldShowPopupImproved(tracker, timeSpent, popupType = 'github') {
  const { weightedScore, metrics } = tracker.calculateWeightedScore(timeSpent);
  
  // Different thresholds for different popup types
  const thresholds = {
    github: {
      minTime: 20,
      minWeightedScore: 8,
      minQualityInteractions: 0,
      fastTrack: { time: 20, score: 12 }, // Very active user
    },
    sponsor: {
      minTime: 60,
      minWeightedScore: 15,
      minQualityInteractions: 2, // Need at least 2 quality interactions
      fastTrack: { time: 60, score: 20 },
    },
  };

  const config = thresholds[popupType] || thresholds.github;

  // Fast track: Very active users
  if (timeSpent >= config.fastTrack.time && weightedScore >= config.fastTrack.score) {
    return {
      shouldShow: true,
      reason: 'fastTrack',
      score: weightedScore,
      time: timeSpent,
    };
  }

  // Standard: Normal engagement
  if (
    timeSpent >= config.minTime &&
    weightedScore >= config.minWeightedScore &&
    metrics.qualityInteractions >= config.minQualityInteractions &&
    metrics.hasInteracted
  ) {
    return {
      shouldShow: true,
      reason: 'standard',
      score: weightedScore,
      time: timeSpent,
    };
  }

  return {
    shouldShow: false,
    reason: 'insufficient',
    score: weightedScore,
    time: timeSpent,
  };
}

/**
 * Helper to track algorithm-specific interactions
 */
export function trackAlgorithmInteraction(tracker, action, algorithmName) {
  const context = {
    qualityType: action, // e.g., 'algorithmSelect', 'sortingStart'
    algorithm: algorithmName,
  };
  
  return tracker.trackInteraction('click', context);
}

