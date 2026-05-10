import { AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { SelectContent, SelectItem } from '@/components/ui/select';
import type { ReactNode } from 'react';

const FEEDBACK_TYPE_OPTIONS: {
  value: string;
  icon: ReactNode;
  label: string;
}[] = [
  {
    value: 'Bug',
    icon: <AlertCircle className="size-4 text-red-500" />,
    label: 'Bug Report',
  },
  {
    value: 'Feature Request',
    icon: <CheckCircle2 className="size-4 text-green-500" />,
    label: 'Feature Request',
  },
  {
    value: 'Suggestion',
    icon: <MessageSquare className="size-4 text-blue-500" />,
    label: 'Suggestion',
  },
  {
    value: 'Other',
    icon: <span className="size-4 rounded-full bg-gray-400" />,
    label: 'Other',
  },
];

function FeedbackTypeSelectOptions() {
  return (
    <SelectContent className="max-h-72">
      {FEEDBACK_TYPE_OPTIONS.map(option => (
        <SelectItem
          key={option.value}
          value={option.value}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {option.icon}
            {option.label}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  );
}

export default FeedbackTypeSelectOptions;
