import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Star } from 'lucide-react';
import { submitFeedback } from './githubService';
import { useTranslation } from 'react-i18next';


const FeedbackForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    detailedFeedback: '',
    rating: 0,
    region: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitFeedback(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          feedbackType: '',
          detailedFeedback: '',
          rating: 0,
          region: ''
        });
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
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.feedbackType && formData.detailedFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">{t('feedback.title')}</CardTitle>
          </div>
          <CardDescription className="text-base">
            {t('feedback.description')}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                placeholder={t('feedback.description')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="transition-all duration-200"
                required
              />
            </div>

            {/* Feedback Type */}
            <div className="space-y-2">
              <label htmlFor="feedback-type" className="text-sm font-medium text-foreground">
              {t('feedback.type')} <span className="text-destructive">*</span>
              </label>
              <Select 
                value={formData.feedbackType} 
                onValueChange={(value) => handleInputChange('feedbackType', value)}
              >
                <SelectTrigger id="feedback-type">
                  <SelectValue placeholder={t('feedback.typePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bug">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      {t('feedback.bug')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Feature Request">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {t('feedback.feature')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Suggestion">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      {t('feedback.suggestion')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Other">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-gray-400" />
                      {t('feedback.other')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Detailed Feedback */}
            <div className="space-y-2">
              <label htmlFor="detailed-feedback" className="text-sm font-medium text-foreground">
                {t('feedback.detailLabel')} <span className="text-destructive">*</span>
              </label>
              <textarea
                id="detailed-feedback"
                placeholder={t('feedback.detailPlaceholder')}
                value={formData.detailedFeedback}
                onChange={(e) => handleInputChange('detailedFeedback', e.target.value)}
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
                onChange={(e) => handleInputChange('followUp', e.target.checked)}
                className="h-4 w-4 rounded border border-input focus:ring-2 focus:ring-primary"
              />
              <label 
                htmlFor="follow-up" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('feedback.followUp')}
              </label>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-400">
                  {t('feedback.success')}
                </span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-700 dark:text-red-400">
                  {t('feedback.error')}
                </span>
              </div>
            )}
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
                  {t('feedback.submitting')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t('feedback.submit')}
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {t('feedback.secure')}
              </Badge>
              <span>{t('feedback.improveNote')}</span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default FeedbackForm; 