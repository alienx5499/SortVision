/**
 * Improved Engagement Tracking Utilities
 *
 * Features:
 * - Throttled interactions (prevents spam)
 * - Exponential decay (more realistic)
 * - Interaction velocity tracking
 * - Quality-based scoring
 */

const throttleMap = new Map<string, number>();

export function isThrottled(type: string, throttleMs: number): boolean {
  const now = Date.now();
  const lastTime = throttleMap.get(type) || 0;

  if (now - lastTime < throttleMs) {
    return true;
  }

  throttleMap.set(type, now);
  return false;
}

export interface InteractionHistoryEntry {
  type: string;
  score: number;
  time: number;
  qualityType?: string | null;
}

export type EngagementTrackConfig = {
  THROTTLE_MS: Readonly<Record<string, number>>;
  QUALITY_SCORES: Readonly<Record<string, number>>;
  ENGAGEMENT_SCORES: Readonly<Record<string, number>>;
};

export function calculateVelocity(
  interactionHistory: InteractionHistoryEntry[],
  now: number
): number {
  if (interactionHistory.length < 2) {
    return 1.0;
  }

  const recent = interactionHistory.slice(-5);
  const timeSpan = now - recent[0].time;
  const count = recent.length;

  if (timeSpan < 2000 && count >= 5) {
    return 1.5;
  }

  if (timeSpan < 5000 && count >= 3) {
    return 1.2;
  }

  if (interactionHistory.length > 0) {
    const lastTime = interactionHistory[interactionHistory.length - 1].time;
    if (now - lastTime > 10000) {
      return 0.8;
    }
  }

  return 1.0;
}

export function applyExponentialDecay(score: number, decayRate = 0.95): number {
  return Math.max(0, score * decayRate);
}

export function calculateWeightedScore(
  baseScore: number,
  qualityInteractions: number,
  velocity: number,
  timeSpent: number
): number {
  const qualityMultiplier = 1 + qualityInteractions * 0.1;
  const velocityMultiplier = velocity;
  const timeBonus = Math.min(5, timeSpent / 60);

  const weighted =
    baseScore * qualityMultiplier * velocityMultiplier + timeBonus;

  return Math.round(weighted * 10) / 10;
}

export interface TrackInteractionResult {
  score: number;
  history: InteractionHistoryEntry[];
  added: number;
  velocity?: number;
}

export function trackInteractionImproved(
  type: string,
  engagementScore: number,
  interactionHistory: InteractionHistoryEntry[],
  qualityType: string | null = null,
  config: EngagementTrackConfig
): TrackInteractionResult {
  const now = Date.now();
  const throttleMs = config.THROTTLE_MS[type] ?? 200;

  if (isThrottled(type, throttleMs)) {
    return {
      score: engagementScore,
      history: interactionHistory,
      added: 0,
    };
  }

  let score = qualityType
    ? (config.QUALITY_SCORES[qualityType] ??
      config.ENGAGEMENT_SCORES[type] ??
      1)
    : (config.ENGAGEMENT_SCORES[type] ?? 1);

  const velocity = calculateVelocity(interactionHistory, now);
  score *= velocity;

  const newScore = engagementScore + score;

  const newHistory: InteractionHistoryEntry[] = [
    ...interactionHistory.slice(-49),
    { type, score, time: now, qualityType },
  ];

  return {
    score: newScore,
    history: newHistory,
    added: score,
    velocity,
  };
}

export function applyDecayImproved(
  engagementScore: number,
  decayRate: number,
  useExponential = true
): number {
  if (useExponential) {
    return applyExponentialDecay(engagementScore, decayRate);
  }
  return Math.max(0, engagementScore - 1);
}
