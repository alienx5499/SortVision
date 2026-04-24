import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { submitFeedback } from './services/github';
import { FeedbackSubmitStatus, FeedbackTypeSelectOptions } from './ui';
import { createEmptyFeedbackFormData, isFeedbackFormValid } from './state';

const FeedbackForm = () => {
  const [formData, setFormData] = useState(createEmptyFeedbackFormData());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitFeedback(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData(createEmptyFeedbackFormData());
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

  const isFormValid = isFeedbackFormValid(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">User Feedback</CardTitle>
          </div>
          <CardDescription className="text-base">
            We'd love your feedback to improve SortVision! Let us know if you
            encountered a bug, have a suggestion, or just want to share your
            thoughts.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className="transition-all duration-200"
                required
              />
            </div>

            {/* Feedback Type */}
            <div className="space-y-2">
              <label
                htmlFor="feedback-type"
                className="text-sm font-medium text-foreground"
              >
                Feedback Type <span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.feedbackType}
                onValueChange={value =>
                  handleInputChange('feedbackType', value)
                }
              >
                <SelectTrigger id="feedback-type">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <FeedbackTypeSelectOptions />
              </Select>
            </div>

            {/* Detailed Feedback */}
            <div className="space-y-2">
              <label
                htmlFor="detailed-feedback"
                className="text-sm font-medium text-foreground"
              >
                Detailed Feedback <span className="text-destructive">*</span>
              </label>
              <textarea
                id="detailed-feedback"
                placeholder="Please provide detailed feedback..."
                value={formData.detailedFeedback}
                onChange={e =>
                  handleInputChange('detailedFeedback', e.target.value)
                }
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200"
                required
              />
            </div>

            {/* Follow-up Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="follow-up"
                checked={formData.followUp}
                onChange={e => handleInputChange('followUp', e.target.checked)}
                className="h-4 w-4 rounded border border-input focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="follow-up"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Would you like us to follow up?
              </label>
            </div>

            {/* Status Messages */}
            <FeedbackSubmitStatus status={submitStatus} />
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                Secure
              </Badge>
              <span>Your feedback helps us improve SortVision</span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
