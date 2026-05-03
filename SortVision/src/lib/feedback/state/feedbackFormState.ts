import type { FeedbackFormData } from '../types';

export const INITIAL_FEEDBACK_FORM_DATA: FeedbackFormData = {
  name: '',
  email: '',
  feedbackType: '',
  detailedFeedback: '',
  rating: 0,
  region: '',
  followUp: false,
};

export function createEmptyFeedbackFormData(): FeedbackFormData {
  return { ...INITIAL_FEEDBACK_FORM_DATA };
}

export function isFeedbackFormValid(formData: FeedbackFormData): boolean {
  return Boolean(
    formData.name && formData.feedbackType && formData.detailedFeedback
  );
}

export function isFeedbackModalFormValid(formData: FeedbackFormData): boolean {
  return isFeedbackFormValid(formData) && formData.rating > 0;
}
