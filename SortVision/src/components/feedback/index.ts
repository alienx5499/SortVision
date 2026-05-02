/**
 * Feedback UI: modal, floating button, and standalone form.
 * Domain logic and API types: `@/lib/feedback`.
 */

export { default as FeedbackButton } from './FeedbackButton';
export { default as FeedbackModal } from './FeedbackModal';
export { default as FeedbackForm } from './FeedbackForm';

export type { FeedbackButtonProps } from './FeedbackButton';
export type { FeedbackModalProps } from './FeedbackModal';

export type {
  FeedbackFormData,
  EnhancedFeedbackPayload,
  FeedbackTranslateFn,
} from '@/lib/feedback/types';
