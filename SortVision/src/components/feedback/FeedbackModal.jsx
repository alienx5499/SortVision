import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, X, Star, MapPin, Wifi } from 'lucide-react';
import { submitFeedback } from './githubService';
import { detectUserLocation, getSimplifiedRegion, formatLocationString, getLocationAccuracy } from './locationService';
import { useTranslation } from 'react-i18next';

const FeedbackModal = ({ isOpen, onClose }) => {
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
  const [showFullScreenSuccess, setShowFullScreenSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [detectedRegion, setDetectedRegion] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [timeSpentOnSite, setTimeSpentOnSite] = useState(0);
  const [_sessionStartTime] = useState(Date.now());
  
  // Persistent session ID that survives page refreshes
  const [sessionId] = useState(() => {
    // Try to get existing session ID from localStorage
    let existingSessionId = localStorage.getItem('sortvision_session_id');
    
    if (!existingSessionId) {
      // Generate new session ID using cryptographically secure random values
      const timestamp = Date.now().toString(36).toUpperCase();
      const randomBytes = new Uint8Array(4);
      crypto.getRandomValues(randomBytes);
      const randomString = Array.from(randomBytes, byte => byte.toString(36)).join('').toUpperCase();
      existingSessionId = `sess_${timestamp}_${randomString}`;
      localStorage.setItem('sortvision_session_id', existingSessionId);
      localStorage.setItem('sortvision_session_start', Date.now().toString());
    }
    
    return existingSessionId;
  });
  
  // Get persistent session start time
  const [persistentSessionStart] = useState(() => {
    const storedStart = localStorage.getItem('sortvision_session_start');
    return storedStart ? parseInt(storedStart) : Date.now();
  });
  
  // Development mode detection
  const _isDevelopment = process.env.NODE_ENV !== 'production';

  // Check if logging should be enabled using same logic as devTools
  const shouldLog = useMemo(() => {
    // More reliable check for debug parameter (same as index.html)
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
    
    const debugParam = getQueryParam('cr7');
    const hasDebugParam = debugParam === 'goat';
    
    // Check if we're on a production domain (secure validation)
    const hostname = window.location.hostname.toLowerCase();
    const isProductionDomain = 
      hostname.endsWith('.vercel.app') || 
      hostname === 'vercel.app' ||
      hostname.endsWith('.netlify.app') || 
      hostname === 'netlify.app' ||
      hostname.endsWith('.github.io') || 
      hostname === 'github.io' ||
      hostname.endsWith('.sortvision.com') || 
      hostname === 'sortvision.com';
    
    // Always block access on production domains
    if (isProductionDomain && hasDebugParam) {
      console.log('%c SortVision DevTools Access Denied\n DevTools not available in production', 'background: #991b1b; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #f87171;');
      return false;
    }
    
    // Allow in development mode OR with debug parameter (if not production)
    return process.env.NODE_ENV !== 'production' || hasDebugParam;
  }, []);

  // Auto-detect location when modal opens
  useEffect(() => {
    if (isOpen && !locationData) {
      detectUserLocationEnhanced();
    }
  }, [isOpen]);

  // Track time spent on site
  useEffect(() => {
    const updateTimeSpent = () => {
      const currentTime = Date.now();
      const timeSpent = Math.round((currentTime - persistentSessionStart) / 1000); // in seconds
      setTimeSpentOnSite(timeSpent);
    };

    // Update time immediately when modal opens
    if (isOpen) {
      updateTimeSpent();
      // Update every 10 seconds while modal is open
      const interval = setInterval(updateTimeSpent, 10000);
      return () => clearInterval(interval);
    }
  }, [isOpen, persistentSessionStart]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus(null);
    }
  }, [isOpen]);

  // Enhanced location detection using multiple services
  const detectUserLocationEnhanced = async () => {
    setIsDetectingLocation(true);
    try {
      if (shouldLog) console.log('🌍 Starting enhanced location detection...');
      const location = await detectUserLocation();
      
      // Merge enhanced data properly
      const enhancedLocationData = {
        ...location,
        // Use locale-based country if available and timezone didn't detect one
        country: location.countryFromLocale && location.country === 'Unknown' 
          ? location.countryFromLocale 
          : location.country,
        // Add extra metadata for debugging
        detectionDetails: {
          browser: location.browser,
          os: location.os,
          locale: location.locale,
          platform: location.platform,
          connectionType: location.connectionType,
          screenResolution: location.screenResolution
        }
      };
      
      if (shouldLog) console.log('📍 Enhanced location detected:', enhancedLocationData);
      setLocationData(enhancedLocationData);
      
      // Set region in form
      const simplifiedRegion = getSimplifiedRegion(enhancedLocationData);
      setDetectedRegion(simplifiedRegion);
      handleInputChange('region', simplifiedRegion);
      
    } catch (error) {
      console.error('❌ Location detection failed:', error);
      setDetectedRegion('Unknown');
      setLocationData({
        country: 'Detection failed',
        region: 'Unknown',
        city: 'Unknown',
        timezone: 'Unknown',
        detectionMethod: 'Failed',
        accuracy: 'none'
      });
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Add a slight delay for better UX (shows loading state)
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Collect comprehensive system and browser information
      const getDeviceInfo = () => {
        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTablet = /iPad/i.test(ua) || (isMobile && window.innerWidth > 768);
        
        return {
          deviceType: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
          isMobile,
          isTablet,
          platform: navigator.platform || 'Unknown',
          vendor: navigator.vendor || 'Unknown',
          cookieEnabled: navigator.cookieEnabled,
          onlineStatus: navigator.onLine,
          doNotTrack: navigator.doNotTrack || 'Not set'
        };
      };

      const getNetworkInfo = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return connection ? {
          effectiveType: connection.effectiveType || 'Unknown',
          downlink: connection.downlink || 'Unknown',
          rtt: connection.rtt || 'Unknown',
          saveData: connection.saveData || false
        } : { effectiveType: 'Unknown', downlink: 'Unknown', rtt: 'Unknown', saveData: false };
      };

      const getPerformanceInfo = () => {
        if (performance && performance.timing) {
          const timing = performance.timing;
          return {
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            pageLoad: timing.loadEventEnd - timing.navigationStart,
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
            tcpConnect: timing.connectEnd - timing.connectStart,
            serverResponse: timing.responseEnd - timing.requestStart
          };
        }
        return null;
      };

      const getBrowserCapabilities = () => {
        return {
          localStorage: typeof(Storage) !== 'undefined',
          sessionStorage: typeof(Storage) !== 'undefined',
          webGL: !!window.WebGLRenderingContext,
          touchSupport: 'ontouchstart' in window,
          geolocation: 'geolocation' in navigator,
          webWorkers: typeof(Worker) !== 'undefined',
          websockets: 'WebSocket' in window,
          indexedDB: 'indexedDB' in window,
          serviceWorker: 'serviceWorker' in navigator,
          pushNotifications: 'PushManager' in window
        };
      };

      const getPageContext = () => {
        return {
          url: window.location.href,
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          referrer: document.referrer || 'Direct access',
          title: document.title,
          scrollPosition: {
            x: window.pageXOffset || window.scrollX,
            y: window.pageYOffset || window.scrollY
          },
          documentHeight: Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          )
        };
      };

      const getMemoryInfo = () => {
        if (performance && performance.memory) {
          return {
            usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
            totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
            jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
          };
        }
        return null;
      };

      const getErrorHistory = () => {
        const errors = [];
        // Capture any stored error logs
        try {
          const storedErrors = localStorage.getItem('sortvision_error_log');
          if (storedErrors) {
            errors.push(...JSON.parse(storedErrors));
          }
        } catch (_e) {
          // Ignore localStorage errors
        }
        return errors.slice(-5); // Last 5 errors
      };

      const getFeatureUsage = () => {
        try {
          const usage = localStorage.getItem('sortvision_feature_usage');
          return usage ? JSON.parse(usage) : null;
        } catch (_e) {
          return null;
        }
      };

      const getAccessibilityInfo = () => {
        return {
          reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          highContrast: window.matchMedia('(prefers-contrast: high)').matches,
          darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
          forcedColors: window.matchMedia('(forced-colors: active)').matches
        };
      };

      // Include enhanced location data and comprehensive technical information
      const enhancedFormData = {
        ...formData,
        locationData: locationData, // Include detailed location information
        sessionData: {
          sessionId: sessionId, // Persistent session ID
          timeSpentOnSite: timeSpentOnSite,
          sessionStartTime: new Date(persistentSessionStart).toISOString(),
          submissionTime: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenResolution: `${screen.width}x${screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
          language: navigator.language,
          languages: navigator.languages || [navigator.language],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          colorDepth: screen.colorDepth,
          pixelRatio: window.devicePixelRatio || 1
        },
        deviceInfo: getDeviceInfo(),
        networkInfo: getNetworkInfo(),
        performanceInfo: getPerformanceInfo(),
        browserCapabilities: getBrowserCapabilities(),
        pageContext: getPageContext(),
        memoryInfo: getMemoryInfo(),
        errorHistory: getErrorHistory(),
        featureUsage: getFeatureUsage(),
        accessibilityInfo: getAccessibilityInfo()
      };
      
      const result = await submitFeedback(enhancedFormData);
      
      if (result.success) {
        setSubmitStatus('success');
        
        // Show full-screen success animation after brief delay
        setTimeout(() => {
          setShowFullScreenSuccess(true);
        }, 800);
        
        // Auto-close everything after full-screen animation
        setTimeout(() => {
          setShowFullScreenSuccess(false);
          setSubmitStatus(null);
          setFormData({
            name: '',
            email: '',
            feedbackType: '',
            detailedFeedback: '',
            rating: 0,
            region: ''
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
      [field]: value
    }));
  };

  // Format time for display
  const formatTimeSpent = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const isFormValid = formData.name && formData.feedbackType && formData.detailedFeedback;

  if (!isOpen) return null;

  return (
    <>
      {/* Enhanced Full-Screen Success Animation */}
      {showFullScreenSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-slate-950/98 via-emerald-950/20 to-slate-950/98 backdrop-blur-lg animate-in fade-in-0 duration-700">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-ping opacity-40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative text-center space-y-10 animate-in zoom-in-50 duration-700 delay-300">
            {/* Success Icon with Enhanced Effects */}
            <div className="relative flex items-center justify-center">
              {/* Outer Ring Particles */}
              <div className="absolute inset-0">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping"
                    style={{
                      top: `${50 + 35 * Math.cos((i * 22.5 * Math.PI) / 180)}%`,
                      left: `${50 + 35 * Math.sin((i * 22.5 * Math.PI) / 180)}%`,
                      animationDelay: `${i * 80}ms`,
                      animationDuration: '2.5s'
                    }}
                  />
                ))}
              </div>
              
              {/* Inner Ring */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
                    style={{
                      top: `${50 + 20 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                      left: `${50 + 20 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                      animationDelay: `${i * 150}ms`,
                      animationDuration: '1.8s'
                    }}
                  />
                ))}
              </div>
              
              {/* Main Success Icon */}
              <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-10 shadow-2xl shadow-emerald-500/60 animate-bounce border-4 border-emerald-300/50">
                <CheckCircle2 className="h-28 w-28 text-white drop-shadow-2xl" />
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            {/* Enhanced Success Message */}
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-600 delay-600">
              <div className="space-y-2">
                <h2 className="text-5xl font-bold font-mono text-white drop-shadow-lg">
                  <span className="text-emerald-400 animate-pulse">Thank</span>{" "}
                  <span className="text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }}>You!</span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-purple-400 mx-auto rounded-full animate-pulse"></div>
              </div>
              
              <p className="text-2xl text-slate-200 font-mono leading-relaxed">
                <span className="text-amber-400 animate-pulse">//</span> {t('feedback.successMessage')}
              </p>
              
                             <div className="flex items-center justify-center gap-3 text-lg text-slate-300 font-mono bg-slate-800/50 px-6 py-3 rounded-full border border-emerald-500/30">
                 <span className="text-emerald-400 animate-pulse">✓</span>
                 <span>{t('feedback.helpsImprove')}</span>
               </div>
             </div>
             
             {/* Clean Finish */}
             <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500 delay-1000">
               <p className="text-sm text-slate-500 font-mono">
                 <span className="text-amber-400">//</span>{t('feedback.redirecting')}
               </p>
             </div>
          </div>
        </div>
      )}

      {/* Main Modal - hide when full-screen success is showing */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
        showFullScreenSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
      {/* Enhanced Backdrop with smooth transitions */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0 duration-500 ease-out"
        onClick={submitStatus === 'success' ? null : onClose} // Prevent closing during success animation
      />
      
      {/* Enhanced Modal with better animations */}
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
        </button>

        <CardHeader className="text-center pr-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className={`h-7 w-7 transition-all duration-300 ${
              isSubmitting ? 'text-amber-400 animate-spin' : 'text-emerald-400 animate-pulse'
            }`} style={{ animationDuration: isSubmitting ? '1s' : '2.5s' }} />
            <CardTitle className="text-2xl font-bold font-mono text-white">
              <span className="text-emerald-400">{t('feedback.title1')}</span>
              <span className="text-purple-400">{t('feedback.title2')}</span>
            </CardTitle>
          </div>
          
          {/* Progress indicator during submission */}
          {isSubmitting && (
            <div className="mb-4 animate-in slide-in-from-top-2 duration-300">
              <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 animate-pulse bg-size-200 animate-shimmer" />
              </div>
              <div className="text-xs text-amber-400 font-mono mt-2 animate-pulse" style={{ animationDuration: '2s' }}>
                {t('feedback.processing')}
              </div>
            </div>
          )}
          
          <CardDescription className="text-slate-400 font-mono">
            <span className="text-amber-400">//</span>  {t('feedback.subtitle.line1')}
            <br />
            <span className="text-amber-400">//</span>  {t('feedback.subtitle.line2')}
            </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className={`space-y-8 pb-2 transition-all duration-500 ${
            isSubmitting ? 'opacity-75 pointer-events-none' : 'opacity-100'
          }`}>
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2">
                <span className="text-amber-400">$</span> {t('feedback.name.label')}
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  formData.name 
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                    : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
                }`} style={{ animationDuration: formData.name ? 'none' : '2.5s' }} />
              </label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                placeholder={t('feedback.name.placeholder')}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="transition-all duration-200 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 font-mono"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium font-mono text-purple-400">
                <span className="text-amber-400">$</span> {t('feedback.email.label')} <span className="text-slate-500">(optional)</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('feedback.email.placeholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="transition-all duration-200 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 font-mono"
              />
              <p className="text-xs font-mono text-slate-500">
                <span className="text-amber-400">//</span> {t('feedback.email.note')}
              </p>
            </div>

            {/* Enhanced Star Rating */}
            <div className="space-y-4 p-4 rounded-lg border border-slate-600 bg-slate-800/30">
              <div className="text-sm font-medium font-mono text-amber-400 flex items-center gap-2">
                <span className="text-amber-400">$</span> {t('feedback.rating.label')}
                <span className="text-xs text-slate-500 font-normal">
                  {(hoverRating || formData.rating) > 0 && `(${hoverRating || formData.rating}/5)`}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Star Container */}
                <div 
                  id="rating-container"
                  className="flex items-center justify-center gap-2 p-3 rounded-md bg-slate-700/50 border border-slate-600"
                  onMouseLeave={() => setHoverRating(0)}
                  role="radiogroup"
                  aria-label="Rate SortVision from 1 to 5 stars"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    // Better UX: Show hover preview only if it's higher than current rating
                    // or if no rating is set yet
                    const currentRating = formData.rating;
                    const displayRating = hoverRating > 0 ? hoverRating : currentRating;
                    const isCurrentSelection = star <= currentRating;
                    const isHoverPreview = hoverRating > 0 && star <= hoverRating;
                    const showHoverEffect = hoverRating > 0 && (hoverRating > currentRating || currentRating === 0);
                    
                    // Star is active if it's part of current selection OR hover preview
                    const isActive = star <= displayRating;
                    
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          // Toggle functionality - if clicking the same star, clear rating
                          const newRating = formData.rating === star ? 0 : star;
                          handleInputChange('rating', newRating);
                          setHoverRating(0);
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                          isActive 
                            ? (isHoverPreview && showHoverEffect 
                                ? 'bg-amber-500/30 shadow-lg shadow-amber-500/40 border border-amber-400/50' 
                                : 'bg-amber-500/20 shadow-lg shadow-amber-500/25')
                            : 'hover:bg-slate-600 hover:shadow-md'
                        }`}
                        role="radio"
                        aria-checked={star <= formData.rating}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-300 ${
                            isActive
                              ? (isHoverPreview && showHoverEffect
                                  ? 'text-amber-300 fill-amber-300 drop-shadow-md animate-pulse'
                                  : 'text-amber-400 fill-amber-400 drop-shadow-sm')
                              : 'text-slate-500 hover:text-amber-400/70'
                          } ${isHoverPreview && showHoverEffect ? 'scale-110' : ''}`}
                          style={{ animationDuration: (isHoverPreview && showHoverEffect) ? '2s' : 'none' }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Rating Display */}
                <div className="text-center min-h-[24px]">
                  {(hoverRating || formData.rating) > 0 ? (
                    <div className="flex items-center justify-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                      <span className="text-lg">
                        {'⭐'.repeat(hoverRating || formData.rating)}
                      </span>
                      <span className="text-sm font-mono font-semibold">
                        {(() => {
                          const currentRating = hoverRating || formData.rating;
                          const labels = {
                            1: { text: 'Poor', color: 'text-red-400' },
                            2: { text: 'Fair', color: 'text-orange-400' },
                            3: { text: 'Good', color: 'text-yellow-400' },
                            4: { text: 'Great', color: 'text-emerald-400' },
                            5: { text: 'Excellent', color: 'text-purple-400' }
                          };
                          const label = labels[currentRating];
                          return (
                            <span className={`${label.color} ${hoverRating ? 'animate-pulse' : ''}`} 
                                  style={{ animationDuration: hoverRating ? '2s' : 'none' }}>
                              {label.text}
                            </span>
                          );
                        })()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-mono text-slate-500 animate-pulse" style={{ animationDuration: '3s' }}>
                      <span className="text-amber-400">//</span> {t('feedback.rating.hoverPrompt')}
                    </span>
                  )}
                </div>

                {/* Interactive Feedback */}
                {formData.rating > 0 && (
                  <div className="flex justify-between items-center text-xs font-mono animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
                    <span className="text-emerald-400">✓ ✓ {t('feedback.rating.saved')}</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('rating', 0);
                        setHoverRating(0);
                      }}
                      className="text-slate-500 hover:text-red-400 transition-colors duration-200 underline"
                    >
                      Clear rating
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-xs font-mono text-slate-400 text-center leading-relaxed">
                <span className="text-amber-400">//</span>  {t('feedback.rating.prompt')}
              </p>
            </div>

            {/* Enhanced Location & Region */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium font-mono text-purple-400 flex items-center gap-2">
                  <span className="text-amber-400">$</span> {t('feedback.location.label')}
                  {isDetectingLocation && (
                    <span className="text-xs text-amber-400 bg-amber-900/20 px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1">
                      <Wifi className="h-3 w-3 animate-pulse" />
                      Detecting...
                    </span>
                  )}
                </div>

                {/* Manual Override Button - only show when auto-detected */}
                {!isDetectingLocation && detectedRegion && (
                  <button
                    type="button"
                    onClick={() => {
                      setDetectedRegion(null);
                      setLocationData(null);
                      handleInputChange('region', '');
                    }}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 font-mono underline"
                  >
                    Manual override
                  </button>
                )}
              </div>

              {/* Auto-detected Location Display - NOT CLICKABLE */}
              {locationData && !isDetectingLocation && detectedRegion && (
                <div id="location-info" className="bg-slate-800/50 border border-emerald-500/30 rounded-md p-3 space-y-2 cursor-default">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-mono text-emerald-400">{t('feedback.location.autoDetected')}</span>
                    </div>
                    {getLocationAccuracy(locationData) && (
                      <span className={`text-xs font-mono ${getLocationAccuracy(locationData).color}`}>
                        {getLocationAccuracy(locationData).text}
                      </span>
                    )}
                  </div>
                  
                  {/* Formatted Location String like "Bengaluru, India, Asia Pacific" */}
                  <div className="text-base font-mono text-white bg-slate-700/50 rounded px-3 py-2 border border-slate-600">
                    {formatLocationString(locationData)}
                  </div>
                  
                  {/* Technical Details (collapsible) */}
                  <details className="text-xs font-mono text-slate-400">
                    <summary className="cursor-pointer hover:text-slate-300 transition-colors">
                      <span className="text-amber-400">//</span> {t('feedback.location.technicalDetails')}
                    </summary>
                    <div className="mt-2 pl-4 space-y-1 border-l border-slate-600">
                      <div>{t('feedback.location.method')}: {locationData.detectionMethod}</div>
                      {locationData.timezone && <div>{t('feedback.location.timezone')}: {locationData.timezone}</div>}
                      {locationData.detectionDetails?.browser && <div>{t('feedback.location.browser')}: {locationData.detectionDetails.browser}</div>}
                      {locationData.detectionDetails?.os && <div>{t('feedback.location.os')}: {locationData.detectionDetails.os}</div>}
                    </div>
                  </details>
                </div>
              )}

              {/* Manual Region Selection - only show when NOT auto-detected */}
              {(!detectedRegion || !locationData) && (
                <div className="space-y-2">
                  <label htmlFor="region-select" className="text-sm font-medium font-mono text-purple-400 flex items-center gap-2">
                    <span className="text-amber-400">$</span>  {t('feedback.region.label')}
                  </label>
                  <Select 
                    value={formData.region} 
                    onValueChange={(value) => handleInputChange('region', value)}
                    name="region"
                  >
                    <SelectTrigger id="region-select" name="region" className="bg-slate-800 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20 font-mono">
                      <SelectValue placeholder={t('feedback.region.placeholder')}/>
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="Americas" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400">🌎</span> {t('feedback.region.options.americas')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Europe" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">🌍</span> {t('feedback.region.options.europe')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Asia Pacific" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400">🌏</span>{t('feedback.region.options.asiaPacific')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Africa" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400">🌍</span> {t('feedback.region.options.africa')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Australia/Oceania" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400">🏝️</span> {t('feedback.region.options.oceania')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Middle East" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-400">🕌</span>{t('feedback.region.options.middleEast')}
                        </div>
                      </SelectItem>
                      <SelectItem value="Other" className="text-white hover:bg-slate-700 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">🌐</span> {t('feedback.region.options.other')}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs font-mono text-slate-500">
                    <span className="text-amber-400">//</span> {t('feedback.region.help')}
                  </p>
                </div>
              )}
            </div>

            {/* Feedback Type */}
            <div className="space-y-2">
              <label htmlFor="feedback-type" className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2">
                <span className="text-amber-400">$</span> {t('feedback.type.label')} 
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  formData.feedbackType 
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                    : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
                }`} style={{ animationDuration: formData.feedbackType ? 'none' : '2.5s' }} />
              </label>
              <Select 
                value={formData.feedbackType} 
                onValueChange={(value) => handleInputChange('feedbackType', value)}
                name="feedbackType"
              >
                <SelectTrigger id="feedback-type" name="feedbackType" className="bg-slate-800 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20 font-mono">
                  <SelectValue placeholder="Select feedback type..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Bug" className="text-white hover:bg-slate-700 font-mono">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400">🐛</span>  {t('feedback.type.bug')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Feature Request" className="text-white hover:bg-slate-700 font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">✨</span> {t('feedback.type.feature')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Suggestion" className="text-white hover:bg-slate-700 font-mono">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                      <span className="text-purple-400">💡</span>{t('feedback.type.suggestion')}
                    </div>
                  </SelectItem>
                  <SelectItem value="Other" className="text-white hover:bg-slate-700 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-amber-400" />
                      <span className="text-amber-400">📝</span> {t('feedback.type.other')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Detailed Feedback */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="detailed-feedback" className="text-sm font-medium font-mono text-emerald-400 flex items-center gap-2">
                  <span className="text-amber-400">$</span> {t('feedback.detailed.label')}
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    formData.detailedFeedback 
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                      : 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50'
                  }`} style={{ animationDuration: formData.detailedFeedback ? 'none' : '2.5s' }} />
                </label>
                {timeSpentOnSite > 0 && (
                  <span className="text-xs font-mono text-amber-400 bg-amber-900/20 px-2 py-1 rounded border border-amber-500/30">
                    ⏱️ {t('feedback.timeOnSite', { time: formatTimeSpent(timeSpentOnSite) })}
                  </span>
                )}
              </div>
              
              <textarea
                id="detailed-feedback"
                name="detailedFeedback"
                autoComplete="off"
                placeholder="// Type your detailed feedback here..."
                value={formData.detailedFeedback}
                onChange={(e) => handleInputChange('detailedFeedback', e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200 font-mono"
                required
              />
            </div>



            {/* Only show error status - success is handled by full-screen animation */}

            {submitStatus === 'error' && (
              <div className="relative p-4 bg-red-900/20 border border-red-500/30 rounded-md animate-in slide-in-from-top-2 shake duration-500">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                  <div className="flex-1">
                    <span className="text-sm text-red-400 font-mono font-semibold">
                      <span className="text-amber-400">//</span> {t('feedback.error.title')}
                    </span>
                    <div className="text-xs text-red-300/80 font-mono mt-1">
                       {t('feedback.error.subtitle')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button 
              type="submit" 
              className={`w-full h-12 font-mono font-semibold border shadow-lg transition-all duration-500 transform ${
                isSubmitting 
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 border-amber-400/50 shadow-amber-500/25 scale-95 animate-pulse'
                  : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-400 text-white border-red-400/50 shadow-red-500/25 animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 border-emerald-400/50 shadow-emerald-500/25 hover:scale-105 hover:shadow-emerald-500/40'
              }`}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-mono">{t('feedback.processing')}</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="flex items-center gap-2 animate-in shake duration-300">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-mono">{t('feedback.retry')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="font-mono">{t('feedback.submit')}</span>
                </div>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
              <Badge variant="outline" className="text-xs bg-slate-800 border-emerald-500/30 text-emerald-400 font-mono">
                🔒 Secure
              </Badge>
              <span><span className="text-amber-400">//</span>{t('feedback.helpsImprove')}</span>
            </div>
            
            {/* Development Preview Button */}
            {shouldLog && (
              <Button
                type="button"
                onClick={() => setShowFullScreenSuccess(true)}
                className="w-full h-8 text-xs bg-amber-600 hover:bg-amber-500 text-slate-900 font-mono border border-amber-500/50"
              >
                                 {t('feedback.previewAnimation')}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
    </>
  );
};

export default FeedbackModal;