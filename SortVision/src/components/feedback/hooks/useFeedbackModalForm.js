import { useCallback, useEffect, useRef, useState } from 'react';
import { submitFeedback } from '../services/github';
import { buildEnhancedFeedbackPayload } from '../payload';
import {
  createEmptyFeedbackFormData,
  isFeedbackModalFormValid,
} from '../state';

const SHOW_SUCCESS_DELAY_MS = 800;
const CLOSE_AFTER_SUCCESS_MS = 4000;
const SIMULATED_NETWORK_DELAY_MS = 500;

export function useFeedbackModalForm({
  isOpen,
  onClose,
  appLocale,
  locationData,
  sessionId,
  timeSpentOnSite,
  persistentSessionStart,
}) {
  const [formData, setFormData] = useState(createEmptyFeedbackFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showFullScreenSuccess, setShowFullScreenSuccess] = useState(false);
  const showSuccessTimerRef = useRef(null);
  const closeModalTimerRef = useRef(null);

  const clearSuccessTimers = useCallback(() => {
    if (showSuccessTimerRef.current) {
      clearTimeout(showSuccessTimerRef.current);
      showSuccessTimerRef.current = null;
    }
    if (closeModalTimerRef.current) {
      clearTimeout(closeModalTimerRef.current);
      closeModalTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus(null);
    }
  }, [isOpen]);

  useEffect(() => clearSuccessTimers, [clearSuccessTimers]);

  const resetFormAndClose = useCallback(() => {
    setShowFullScreenSuccess(false);
    setSubmitStatus(null);
    setFormData(createEmptyFeedbackFormData());
    onClose();
  }, [onClose]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);
      clearSuccessTimers();

      await new Promise(resolve =>
        setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS)
      );

      try {
        const enhancedFormData = buildEnhancedFeedbackPayload({
          formData,
          locationData,
          sessionId,
          timeSpentOnSite,
          persistentSessionStart,
          appLocale,
        });

        const result = await submitFeedback(enhancedFormData);

        if (!result.success) {
          throw new Error('Failed to submit feedback');
        }

        setSubmitStatus('success');

        showSuccessTimerRef.current = setTimeout(() => {
          setShowFullScreenSuccess(true);
        }, SHOW_SUCCESS_DELAY_MS);

        closeModalTimerRef.current = setTimeout(
          resetFormAndClose,
          CLOSE_AFTER_SUCCESS_MS
        );
      } catch (error) {
        console.error('Error submitting feedback:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      appLocale,
      clearSuccessTimers,
      formData,
      locationData,
      persistentSessionStart,
      resetFormAndClose,
      sessionId,
      timeSpentOnSite,
    ]
  );

  return {
    formData,
    isSubmitting,
    submitStatus,
    showFullScreenSuccess,
    setShowFullScreenSuccess,
    handleInputChange,
    handleSubmit,
    isFormValid: isFeedbackModalFormValid(formData),
  };
}
