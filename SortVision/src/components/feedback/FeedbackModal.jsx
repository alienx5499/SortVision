import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { shouldAllowSortVisionVerboseLogging } from './utils';
import {
  useFeedbackModalChrome,
  useFeedbackModalForm,
  useFeedbackModalLocation,
  useFeedbackModalSession,
} from './hooks';
import {
  FeedbackModalCardHeader,
  FeedbackModalDetailsSection,
  FeedbackModalErrorBanner,
  FeedbackModalFeedbackTypeSection,
  FeedbackModalIdentityFields,
  FeedbackModalLocationSection,
  FeedbackModalRatingSection,
  FeedbackModalSubmitFooter,
  FeedbackModalSuccessOverlay,
} from './modal';

const FeedbackModal = ({ isOpen, onClose }) => {
  const { t, language: appLocale } = useLanguage();
  const [hoverRating, setHoverRating] = useState(0);

  const showFeedbackMetaUi = process.env.NODE_ENV !== 'production';
  const shouldLog = useMemo(() => shouldAllowSortVisionVerboseLogging(), []);

  const {
    sessionId,
    persistentSessionStart,
    timeSpentOnSite,
    formatTimeSpent,
  } = useFeedbackModalSession(isOpen);

  const [pendingDetectedRegion, setPendingDetectedRegion] = useState('');

  const {
    detectedRegion,
    setDetectedRegion,
    locationData,
    setLocationData,
    isDetectingLocation,
  } = useFeedbackModalLocation(isOpen, shouldLog, setPendingDetectedRegion);

  const {
    formData,
    isSubmitting,
    submitStatus,
    showFullScreenSuccess,
    setShowFullScreenSuccess,
    handleInputChange,
    handleSubmit,
    isFormValid,
  } = useFeedbackModalForm({
    isOpen,
    onClose,
    appLocale,
    locationData,
    sessionId,
    timeSpentOnSite,
    persistentSessionStart,
  });

  React.useEffect(() => {
    if (pendingDetectedRegion) {
      handleInputChange('region', pendingDetectedRegion);
    }
  }, [handleInputChange, pendingDetectedRegion]);

  useFeedbackModalChrome(isOpen, onClose);

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
