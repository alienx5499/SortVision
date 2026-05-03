'use client';

/**
 * Performance Monitor Component
 *
 * This component monitors and reports performance metrics to help
 * identify and resolve performance issues in production.
 */

import { useEffect } from 'react';

type WebVitalMetric = {
  name: string;
  value: number;
  id: string;
};

type GtagWindow = Window &
  typeof globalThis & {
    gtag?: (
      command: string,
      event: string,
      params: Record<string, unknown>
    ) => void;
  };

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const w = window as GtagWindow;

    const reportWebVitals = (metric: WebVitalMetric) => {
      if (w.gtag) {
        w.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(
            metric.name === 'CLS' ? metric.value * 1000 : metric.value
          ),
          non_interaction: true,
        });
      }

      console.log('🚀 Performance Metric:', metric);
    };

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const entryId =
          'id' in entry && typeof (entry as { id?: string }).id === 'string'
            ? (entry as { id: string }).id
            : entry.entryType;

        if (entry.entryType === 'largest-contentful-paint') {
          reportWebVitals({
            name: 'LCP',
            value: entry.startTime,
            id: entryId,
          });
        }

        if (entry.entryType === 'first-input') {
          const fid = entry as PerformanceEventTiming;
          reportWebVitals({
            name: 'FID',
            value: fid.processingStart - fid.startTime,
            id: entryId,
          });
        }

        if (entry.entryType === 'layout-shift') {
          const cls = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value: number;
          };
          if (!cls.hadRecentInput) {
            reportWebVitals({
              name: 'CLS',
              value: cls.value,
              id: entryId,
            });
          }
        }
      }
    });

    try {
      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    const monitorResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(
        (resource): resource is PerformanceResourceTiming =>
          'duration' in resource && resource.duration > 1000
      );

      if (slowResources.length > 0) {
        console.warn('Slow loading resources detected:', slowResources);

        if (w.gtag) {
          w.gtag('event', 'slow_resource', {
            event_category: 'Performance',
            event_label: 'Resource Loading',
            value: slowResources.length,
          });
        }
      }
    };

    window.addEventListener('load', () => {
      setTimeout(monitorResourcePerformance, 2000);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
