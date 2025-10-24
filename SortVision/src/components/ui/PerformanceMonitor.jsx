'use client';

/**
 * Performance Monitor Component
 * 
 * This component monitors and reports performance metrics to help
 * identify and resolve performance issues in production.
 */

import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run when performance API is available
    if (typeof window === 'undefined') {
      return;
    }

    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      // Send to analytics service
      if (window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Log to console in development
      console.log('🚀 Performance Metric:', metric);
    };

    // Monitor performance entries
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Monitor LCP (Largest Contentful Paint)
        if (entry.entryType === 'largest-contentful-paint') {
          reportWebVitals({
            name: 'LCP',
            value: entry.startTime,
            id: entry.id,
          });
        }

        // Monitor FID (First Input Delay)
        if (entry.entryType === 'first-input') {
          reportWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: entry.id,
          });
        }

        // Monitor CLS (Cumulative Layout Shift)
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          reportWebVitals({
            name: 'CLS',
            value: entry.value,
            id: entry.id,
          });
        }
      }
    });

    // Observe performance entries
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Monitor resource loading performance
    const monitorResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);

      if (slowResources.length > 0) {
        console.warn('Slow loading resources detected:', slowResources);
        
        // Report to analytics
        if (window.gtag) {
          window.gtag('event', 'slow_resource', {
            event_category: 'Performance',
            event_label: 'Resource Loading',
            value: slowResources.length,
          });
        }
      }
    };

    // Monitor after page load
    window.addEventListener('load', () => {
      setTimeout(monitorResourcePerformance, 2000);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
