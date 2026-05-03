/** Types for `improvedEngagement.js` (allow `string | null` quality labels). */

export function trackInteractionImproved(
  type: string,
  engagementScore: number,
  interactionHistory: unknown[],
  qualityType?: string | null,
  config: Record<string, unknown>
): {
  score: number;
  history: unknown[];
  added: number;
  velocity?: number;
};

export function calculateWeightedScore(
  baseScore: number,
  qualityInteractions: number,
  velocity: number,
  timeSpent: number
): number;

export function applyDecayImproved(
  engagementScore: number,
  decayRate: number,
  useExponential?: boolean
): number;
