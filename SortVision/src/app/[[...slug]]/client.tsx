'use client';

import { useState, useEffect, Suspense, lazy, startTransition } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeTheme } from '../../utils/themeUtils';
import { buildClientRoutePatterns } from '@/config/routes';

const App = lazy(() => import('../../App'));
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

import PerformanceLoader from '../../components/ui/PerformanceLoader';

const LoadingFallback = PerformanceLoader;
const BASE_ROUTE_PATTERNS = buildClientRoutePatterns(false);
const LOCALIZED_ROUTE_PATTERNS = buildClientRoutePatterns(true);

export function ClientOnly() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    initializeTheme();
    startTransition(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return <LoadingFallback />;
  }

  const shouldRenderAnalytics =
    typeof document !== 'undefined' &&
    !document.documentElement.hasAttribute('data-prerender');

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {BASE_ROUTE_PATTERNS.map(path => (
            <Route key={`base-${path}`} path={path} element={<App />} />
          ))}
          {LOCALIZED_ROUTE_PATTERNS.map(path => (
            <Route key={`localized-${path}`} path={path} element={<App />} />
          ))}

          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
      {shouldRenderAnalytics && (
        <Suspense fallback={null}>
          <SpeedInsights debug={process.env.NODE_ENV !== 'production'} />
          <Analytics
            beforeSend={event => {
              if (!('url' in event) || typeof event.url !== 'string')
                return event;
              if (event.url.includes('/algorithms/test')) return null;

              const url = new URL(event.url);
              if (url.searchParams.has('token')) {
                url.searchParams.set('token', '[REDACTED]');
              }

              return {
                ...event,
                url: url.toString(),
              };
            }}
          />
        </Suspense>
      )}
    </BrowserRouter>
  );
}
