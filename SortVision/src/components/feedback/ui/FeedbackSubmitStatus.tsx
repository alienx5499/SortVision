import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { FeedbackBannerStatus } from '@/lib/feedback/types';

const STATUS_STYLES: Record<FeedbackBannerStatus, string> = {
  success:
    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
};

const STATUS_ICON: Record<FeedbackBannerStatus, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  error: <AlertCircle className="h-5 w-5 text-red-600" />,
};

const STATUS_TEXT: Record<FeedbackBannerStatus, string> = {
  success: 'Thank you! Your feedback has been submitted successfully.',
  error:
    'Sorry, there was an error submitting your feedback. Please try again.',
};

const STATUS_TEXT_COLOR: Record<FeedbackBannerStatus, string> = {
  success: 'text-green-700 dark:text-green-400',
  error: 'text-red-700 dark:text-red-400',
};

export type FeedbackSubmitStatusProps = {
  status: FeedbackBannerStatus | null;
  /** Extra line when status is error (e.g. API message). */
  errorDetail?: string | null;
};

function FeedbackSubmitStatus({
  status,
  errorDetail,
}: FeedbackSubmitStatusProps) {
  if (!status) return null;

  const detail = status === 'error' ? errorDetail?.trim() : '';

  return (
    <div
      className={`flex flex-col gap-1 p-3 border rounded-md ${STATUS_STYLES[status]}`}
    >
      <div className="flex items-center gap-2">
        {STATUS_ICON[status]}
        <span className={`text-sm ${STATUS_TEXT_COLOR[status]}`}>
          {STATUS_TEXT[status]}
        </span>
      </div>
      {detail ? (
        <p
          className={`text-xs pl-7 ${STATUS_TEXT_COLOR[status]} whitespace-pre-wrap break-words`}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}

export default FeedbackSubmitStatus;
