export const INITIAL_FEEDBACK_FORM_DATA = {
  name: '',
  email: '',
  feedbackType: '',
  detailedFeedback: '',
  rating: 0,
  region: '',
  followUp: false,
};

export function createEmptyFeedbackFormData() {
  return { ...INITIAL_FEEDBACK_FORM_DATA };
}

export function isFeedbackFormValid(formData) {
  return formData.name && formData.feedbackType && formData.detailedFeedback;
}

export function isFeedbackModalFormValid(formData) {
  return isFeedbackFormValid(formData) && formData.rating > 0;
}
