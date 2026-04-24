import React from 'react';
import { AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { SelectContent, SelectItem } from '@/components/ui/select';

const FEEDBACK_TYPE_OPTIONS = [
  {
    value: 'Bug',
    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    label: 'Bug Report',
  },
  {
    value: 'Feature Request',
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    label: 'Feature Request',
  },
  {
    value: 'Suggestion',
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    label: 'Suggestion',
  },
  {
    value: 'Other',
    icon: <span className="h-4 w-4 rounded-full bg-gray-400" />,
    label: 'Other',
  },
];

const FeedbackTypeSelectOptions = () => (
  <SelectContent>
    {FEEDBACK_TYPE_OPTIONS.map(option => (
      <SelectItem key={option.value} value={option.value}>
        <div className="flex items-center gap-2">
          {option.icon}
          {option.label}
        </div>
      </SelectItem>
    ))}
  </SelectContent>
);

export default FeedbackTypeSelectOptions;
