import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import type {
  FeedbackFormData,
  FeedbackLocationData,
  FeedbackSubmitState,
  SetFeedbackField,
} from '@/lib/feedback/types';
import { submitFeedback } from '@/lib/feedback/github/githubService';
import { buildEnhancedFeedbackPayload } from '@/lib/feedback/payload';
import {
  createEmptyFeedbackFormData,
  isFeedbackModalFormValid,
} from '@/lib/feedback/state';

const SHOW_SUCCESS_DELAY_MS = 800;
const CLOSE_AFTER_SUCCESS_MS = 4000;
/** Artificial latency in development only (easier to test loading UI). */
const DEV_SIMULATED_NETWORK_DELAY_MS = 500;

export function useFeedbackModalForm({
  isOpen: _isOpen,
  onClose,
  appLocale,
  locationData,
  sessionId,
  timeSpentOnSite,
  persistentSessionStart,
}: {
  isOpen: boolean;
  onClose: () => void;
  appLocale: string;
  locationData: FeedbackLocationData | null;
  sessionId: string;
  timeSpentOnSite: number;
  persistentSessionStart: number;
}): {
  formData: FeedbackFormData;
  isSubmitting: boolean;
  submitStatus: FeedbackSubmitState;
  submitErrorDetail: string | null;
  showFullScreenSuccess: boolean;
  setShowFullScreenSuccess: (v: boolean) => void;
  handleInputChange: SetFeedbackField;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isFormValid: boolean;
} {
  const [formData, setFormData] = useState(() => createEmptyFeedbackFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<FeedbackSubmitState>(null);
  const [submitErrorDetail, setSubmitErrorDetail] = useState<string | null>(
    null
  );
  const [showFullScreenSuccess, setShowFullScreenSuccess] = useState(false);
  const showSuccessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const closeModalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => clearSuccessTimers, [clearSuccessTimers]);

  const resetFormAndClose = useCallback(() => {
    setShowFullScreenSuccess(false);
    setSubmitStatus(null);
    setSubmitErrorDetail(null);
    setFormData(createEmptyFeedbackFormData());
    onClose();
  }, [onClose]);

  const handleInputChange = useCallback<SetFeedbackField>((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);
      setSubmitErrorDetail(null);
      clearSuccessTimers();

      if (process.env.NODE_ENV === 'development') {
        await new Promise<void>(resolve =>
          setTimeout(resolve, DEV_SIMULATED_NETWORK_DELAY_MS)
        );
      }

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
        setSubmitErrorDetail(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        );
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
    submitErrorDetail,
    showFullScreenSuccess,
    setShowFullScreenSuccess,
    handleInputChange,
    handleSubmit,
    isFormValid: isFeedbackModalFormValid(formData),
  };
}
