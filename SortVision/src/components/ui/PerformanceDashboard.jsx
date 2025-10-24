'use client';

/**
 * Performance Dashboard Component
 * 
 * A visual dashboard to monitor performance metrics in real-time
 * Only shows in development mode for debugging
 */

import { useState, useEffect } from 'react';

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    LCP: null,
    FID: null,
    CLS: null,
    FCP: null,
    TTFB: null,
  });

  const [slowResources, setSlowResources] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Toggle visibility with Ctrl+Shift+P (or Cmd+Shift+P on Mac)
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: {
          value: metric.value,
          id: metric.id,
          timestamp: new Date().toLocaleTimeString(),
        }
      }));
    };

    // Monitor performance entries
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          reportWebVitals({
            name: 'LCP',
            value: entry.startTime,
            id: entry.id,
          });
        }

        if (entry.entryType === 'first-input') {
          reportWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: entry.id,
          });
        }

        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          reportWebVitals({
            name: 'CLS',
            value: entry.value,
            id: entry.id,
          });
        }

        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            reportWebVitals({
              name: 'FCP',
              value: entry.startTime,
              id: entry.id,
            });
          }
        }
      }
    });

    // Monitor TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      reportWebVitals({
        name: 'TTFB',
        value: navigationEntry.responseStart - navigationEntry.requestStart,
        id: 'navigation',
      });
    }

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Monitor resource loading performance
    const monitorResourcePerformance = () => {
      const resources = performance.getEntriesByType('resource');
      const slow = resources.filter(resource => resource.duration > 1000);
      setSlowResources(slow);
    };

    window.addEventListener('load', () => {
      setTimeout(monitorResourcePerformance, 2000);
    });

    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible]);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Show toggle button when dashboard is hidden
  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-mono"
          title="Toggle Performance Dashboard (Ctrl+Shift+P)"
        >
          🚀 Perf
        </button>
      </div>
    );
  }

  const getMetricColor = (name, value) => {
    if (!value) return 'text-gray-500';
    
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'text-gray-500';

    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatValue = (name, value) => {
    if (!value) return 'N/A';
    
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    
    return `${Math.round(value)}ms`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold">🚀 Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        {Object.entries(metrics).map(([name, data]) => (
          <div key={name} className="flex justify-between items-center">
            <span className="font-mono">{name}:</span>
            <span className={`font-mono ${getMetricColor(name, data?.value)}`}>
              {formatValue(name, data?.value)}
            </span>
          </div>
        ))}
      </div>

      {slowResources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <div className="text-xs text-yellow-400 mb-1">
            ⚠️ Slow Resources ({slowResources.length})
          </div>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {slowResources.slice(0, 3).map((resource, i) => (
              <div key={i} className="text-xs text-gray-300 truncate">
                {resource.name.split('/').pop()}: {Math.round(resource.duration)}ms
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400">
        Press <kbd className="bg-gray-700 px-1 rounded">Ctrl+Shift+P</kbd> to toggle or click the 🚀 Perf button
      </div>
    </div>
  );
};

export default PerformanceDashboard;
