import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { submitFeedback } from './githubService';
import { useLanguage } from '../../context/LanguageContext';
import { buildEnhancedFeedbackPayload } from './buildEnhancedFeedbackPayload';
import { shouldAllowSortVisionVerboseLogging } from './sortVisionVerboseLogging';
import { useFeedbackModalSession } from './hooks/useFeedbackModalSession';
import { useFeedbackModalLocation } from './hooks/useFeedbackModalLocation';
import { useFeedbackModalChrome } from './hooks/useFeedbackModalChrome';
import { FeedbackModalSuccessOverlay } from './modal/FeedbackModalSuccessOverlay';
import { FeedbackModalIdentityFields } from './modal/FeedbackModalIdentityFields';
import { FeedbackModalRatingSection } from './modal/FeedbackModalRatingSection';
import { FeedbackModalLocationSection } from './modal/FeedbackModalLocationSection';
import { FeedbackModalCardHeader } from './modal/FeedbackModalCardHeader';
import { FeedbackModalFeedbackTypeSection } from './modal/FeedbackModalFeedbackTypeSection';
import { FeedbackModalDetailsSection } from './modal/FeedbackModalDetailsSection';
import { FeedbackModalErrorBanner } from './modal/FeedbackModalErrorBanner';
import { FeedbackModalSubmitFooter } from './modal/FeedbackModalSubmitFooter';

const FeedbackModal = ({ isOpen, onClose }) => {
  const { t, language: appLocale } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    detailedFeedback: '',
    rating: 0,
    region: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showFullScreenSuccess, setShowFullScreenSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const showFeedbackMetaUi = process.env.NODE_ENV !== 'production';
  const shouldLog = useMemo(() => shouldAllowSortVisionVerboseLogging(), []);

  const {
    sessionId,
    persistentSessionStart,
    timeSpentOnSite,
    formatTimeSpent,
  } = useFeedbackModalSession(isOpen);

  const applyDetectedRegion = useCallback(region => {
    setFormData(prev => ({ ...prev, region }));
  }, []);

  const {
    detectedRegion,
    setDetectedRegion,
    locationData,
    setLocationData,
    isDetectingLocation,
  } = useFeedbackModalLocation(isOpen, shouldLog, applyDetectedRegion);

  useFeedbackModalChrome(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus(null);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    await new Promise(resolve => setTimeout(resolve, 500));

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

      if (result.success) {
        setSubmitStatus('success');

        setTimeout(() => {
          setShowFullScreenSuccess(true);
        }, 800);

        setTimeout(() => {
          setShowFullScreenSuccess(false);
          setSubmitStatus(null);
          setFormData({
            name: '',
            email: '',
            feedbackType: '',
            detailedFeedback: '',
            rating: 0,
            region: '',
          });
          onClose();
        }, 4000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.name &&
    formData.feedbackType &&
    formData.detailedFeedback &&
    formData.rating > 0;

  if (!isOpen) return null;

  const sessionTimeLabel =
    showFeedbackMetaUi && timeSpentOnSite > 0
      ? `${formatTimeSpent(timeSpentOnSite)} on site`
      : null;

  return (
    <>
      <FeedbackModalSuccessOverlay open={showFullScreenSuccess} t={t} />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
          showFullScreenSuccess
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0 duration-500 ease-out"
          onClick={submitStatus === 'success' ? undefined : onClose}
        />

        <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 duration-500">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
          </button>

          <FeedbackModalCardHeader t={t} isSubmitting={isSubmitting} />

          <form onSubmit={handleSubmit}>
            <CardContent
              className={`space-y-8 pb-2 transition-all duration-500 ${
                isSubmitting ? 'opacity-75 pointer-events-none' : 'opacity-100'
              }`}
            >
              <FeedbackModalIdentityFields
                t={t}
                name={formData.name}
                email={formData.email}
                onFieldChange={handleInputChange}
              />

              <FeedbackModalRatingSection
                t={t}
                rating={formData.rating}
                hoverRating={hoverRating}
                onHoverRating={setHoverRating}
                onSetRating={star => handleInputChange('rating', star)}
              />

              {showFeedbackMetaUi && (
                <FeedbackModalLocationSection
                  region={formData.region}
                  onRegionChange={value => handleInputChange('region', value)}
                  detectedRegion={detectedRegion}
                  onManualOverride={() => {
                    setDetectedRegion(null);
                    setLocationData(null);
                    handleInputChange('region', '');
                  }}
                  locationData={locationData}
                  isDetectingLocation={isDetectingLocation}
                />
              )}

              <FeedbackModalFeedbackTypeSection
                t={t}
                value={formData.feedbackType}
                onValueChange={value =>
                  handleInputChange('feedbackType', value)
                }
              />

              <FeedbackModalDetailsSection
                t={t}
                value={formData.detailedFeedback}
                onChange={e =>
                  handleInputChange('detailedFeedback', e.target.value)
                }
                showSessionTimer={showFeedbackMetaUi}
                sessionTimeLabel={sessionTimeLabel}
              />

              <FeedbackModalErrorBanner visible={submitStatus === 'error'} />
            </CardContent>

            <FeedbackModalSubmitFooter
              t={t}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              isFormValid={isFormValid}
              shouldLog={shouldLog}
              onPreviewSuccess={() => setShowFullScreenSuccess(true)}
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default FeedbackModal;
