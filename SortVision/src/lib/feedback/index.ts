/**
 * Feedback domain layer: contracts, form state, telemetry payload, location heuristics,
 * and GitHub issue submission. Presentation lives in `@/components/feedback`.
 */

export * from './types';
export * from './state';
export { buildEnhancedFeedbackPayload } from './payload';
export * from './utils';
export * from './github';
