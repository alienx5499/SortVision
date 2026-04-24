import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const STATUS_STYLES = {
  success:
    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
};

const STATUS_ICON = {
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  error: <AlertCircle className="h-5 w-5 text-red-600" />,
};

const STATUS_TEXT = {
  success: 'Thank you! Your feedback has been submitted successfully.',
  error:
    'Sorry, there was an error submitting your feedback. Please try again.',
};

const STATUS_TEXT_COLOR = {
  success: 'text-green-700 dark:text-green-400',
  error: 'text-red-700 dark:text-red-400',
};

const FeedbackSubmitStatus = ({ status }) => {
  if (!status) return null;

  return (
    <div
      className={`flex items-center gap-2 p-3 border rounded-md ${STATUS_STYLES[status]}`}
    >
      {STATUS_ICON[status]}
      <span className={`text-sm ${STATUS_TEXT_COLOR[status]}`}>
        {STATUS_TEXT[status]}
      </span>
    </div>
  );
};

export default FeedbackSubmitStatus;
