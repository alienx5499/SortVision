'use client';

import { useState, useEffect, Suspense, lazy, startTransition } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeTheme } from '../../utils/themeUtils';

// Lazy load App and analytics components
const App = lazy(() => import('../../App.jsx'));
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react')
    .then(module => ({ default: module.SpeedInsights }))
    .catch(error => {
      console.warn('Speed Insights failed to load:', error);
      return { default: () => null };
    })
);

const Analytics = lazy(() =>
  import('@vercel/analytics/react')
    .then(module => ({ default: module.Analytics }))
    .catch(error => {
      console.warn('Analytics failed to load:', error);
      return { default: () => null };
    })
);

// Custom event handler for analytics
const beforeSend = event => {
  // Ignore events from algorithm testing pages
  if (event.url.includes('/algorithms/test')) {
    return null;
  }

  // Redact sensitive data from URLs
  const url = new URL(event.url);
  if (url.searchParams.has('token')) {
    url.searchParams.set('token', '[REDACTED]');
  }

  return {
    ...event,
    url: url.toString(),
  };
};

// Import optimized loading component
import PerformanceLoader from '../../components/ui/PerformanceLoader';

// Use optimized loading component
const LoadingFallback = PerformanceLoader;

export function ClientOnly() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize theme immediately when client mounts
    initializeTheme();
    // Use startTransition for client-only mounting pattern
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  // Prevent SSR by only rendering after mount
  if (!isMounted) {
    return <LoadingFallback />;
  }

  // Render analytics if not in prerender mode
  const shouldRenderAnalytics =
    typeof document !== 'undefined' &&
    !document.documentElement.hasAttribute('data-prerender');

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* English routes (default) */}
          <Route path="/" element={<App />} />
          <Route path="/algorithms/config/:algorithmName" element={<App />} />
          <Route path="/algorithms/details/:algorithmName" element={<App />} />
          <Route path="/algorithms/metrics/:algorithmName" element={<App />} />
          <Route path="/algorithms/:algorithmName" element={<App />} />
          <Route path="/contributions/overview" element={<App />} />
          <Route
            path="/contributions/overview/:contributorId"
            element={<App />}
          />
          <Route path="/contributions/guide" element={<App />} />
          <Route path="/contributions/ssoc" element={<App />} />
          <Route path="/contributions" element={<App />} />

          {/* Multi-language routes */}
          <Route path="/:lang" element={<App />} />
          <Route
            path="/:lang/algorithms/config/:algorithmName"
            element={<App />}
          />
          <Route
            path="/:lang/algorithms/details/:algorithmName"
            element={<App />}
          />
          <Route
            path="/:lang/algorithms/metrics/:algorithmName"
            element={<App />}
          />
          <Route path="/:lang/algorithms/:algorithmName" element={<App />} />
          <Route path="/:lang/contributions/overview" element={<App />} />
          <Route
            path="/:lang/contributions/overview/:contributorId"
            element={<App />}
          />
          <Route path="/:lang/contributions/guide" element={<App />} />
          <Route path="/:lang/contributions/ssoc" element={<App />} />
          <Route path="/:lang/contributions" element={<App />} />

          {/* Catch-all route */}
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
      {shouldRenderAnalytics && (
        <Suspense fallback={null}>
          <SpeedInsights debug={process.env.NODE_ENV !== 'production'} />
          <Analytics beforeSend={beforeSend} />
        </Suspense>
      )}
    </BrowserRouter>
  );
}
