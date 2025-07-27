 'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { initializeTheme } from '../../utils/themeUtils'

// Lazy load App and analytics components  
const App = lazy(() => import('../../App.jsx'))
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react')
    .then(module => ({ default: module.SpeedInsights }))
    .catch((error) => {
      console.warn('Speed Insights failed to load:', error)
      return { default: () => null }
    })
)

const Analytics = lazy(() =>
  import('@vercel/analytics/react')
    .then(module => ({ default: module.Analytics }))
    .catch((error) => {
      console.warn('Analytics failed to load:', error)
      return { default: () => null }
    })
)

const beforeSend = (event) => {
  if (event.url.includes('/algorithms/test')) return null
  const url = new URL(event.url)
  if (url.searchParams.has('token')) url.searchParams.set('token', '[REDACTED]')
  return { ...event, url: url.toString() }
}

const LoadingFallback = () => {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState(t('app.init'))
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    setShowParticles(true)

    const steps = [
      { progress: 20, text: t('app.load1') },
      { progress: 40, text: t('app.load2') },
      { progress: 60, text: t('app.load3') },
      { progress: 80, text: t('app.load4') },
      { progress: 100, text: t('app.load5') }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setLoadingText(steps[currentStep].text)
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [t])

  const SortingBars = () => {
    const bars = [
      { height: 20, delay: 0 },
      { height: 35, delay: 0.1 },
      { height: 15, delay: 0.2 },
      { height: 45, delay: 0.3 },
      { height: 25, delay: 0.4 },
      { height: 40, delay: 0.5 },
      { height: 30, delay: 0.6 },
    ]
    return (
      <div className="flex items-end gap-1 mb-8">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="w-3 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-sm animate-sort-bounce"
            style={{
              height: `${bar.height}px`,
              animationDelay: `${bar.delay}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>
    )
  }

  const BackgroundParticles = () => {
    const particles = [
      { left: 10, top: 20, delay: 0.5, duration: 3 },
      { left: 85, top: 75, delay: 1.2, duration: 2.5 },
      { left: 25, top: 60, delay: 0.8, duration: 3.5 },
      { left: 70, top: 15, delay: 1.8, duration: 2.8 },
      { left: 45, top: 80, delay: 0.3, duration: 3.2 },
      { left: 90, top: 40, delay: 1.5, duration: 2.2 },
      { left: 15, top: 85, delay: 0.9, duration: 2.9 },
      { left: 55, top: 25, delay: 1.1, duration: 3.1 },
      { left: 35, top: 70, delay: 0.6, duration: 2.7 },
      { left: 80, top: 55, delay: 1.4, duration: 3.3 },
      { left: 5, top: 45, delay: 0.4, duration: 2.6 },
      { left: 65, top: 90, delay: 1.7, duration: 2.4 },
      { left: 30, top: 10, delay: 0.7, duration: 3.4 },
      { left: 75, top: 65, delay: 1.3, duration: 2.3 },
      { left: 50, top: 35, delay: 1.0, duration: 3.0 },
      { left: 20, top: 95, delay: 0.2, duration: 2.8 },
      { left: 95, top: 30, delay: 1.6, duration: 2.5 },
      { left: 40, top: 50, delay: 0.9, duration: 3.2 },
      { left: 60, top: 85, delay: 1.2, duration: 2.9 },
      { left: 85, top: 5, delay: 0.8, duration: 3.1 }
    ]

    return (
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {showParticles && <BackgroundParticles />}

      <div className="text-center z-10 w-full max-w-md px-4">
        <div className="mb-8 h-20 flex flex-col justify-center">
          <h1 className="text-4xl font-bold font-mono mb-2 h-12 flex items-center justify-center">
            <span className="text-emerald-400 animate-pulse">Sort</span>
            <span className="text-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}>Vision</span>
          </h1>
          <div className="text-sm text-slate-500 font-mono animate-fade-in h-6 flex items-center justify-center">
            {t('app.subtitle')}
          </div>
        </div>

        <div className="flex justify-center h-12 items-end mb-8">
          <SortingBars />
        </div>

        <div className="mb-6 h-16 flex flex-col justify-center">
          <div className="text-emerald-400 font-mono text-lg mb-2 animate-pulse h-8 flex items-center justify-center">
            <span>{loadingText}</span>
            <span className="animate-ping ml-1">...</span>
          </div>
        </div>

        <div className="w-64 mx-auto h-12">
          <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-2 h-4 flex items-center justify-center">
            {progress}% {t('app.complete')}
          </div>
        </div>

        <div className="mt-8 flex justify-center h-8">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-emerald-500/30 rounded-full animate-spin border-t-emerald-500" />
            <div className="absolute inset-0 w-8 h-8 border-2 border-blue-500/30 rounded-full animate-spin border-r-blue-500" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClientOnly() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    initializeTheme()
    setIsMounted(true)
  }, [])

  if (!isMounted) return <LoadingFallback />

  const shouldRenderAnalytics = typeof document !== 'undefined' && !document.documentElement.hasAttribute('data-prerender');

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/algorithms/config/:algorithmName" element={<App />} />
          <Route path="/algorithms/details/:algorithmName" element={<App />} />
          <Route path="/algorithms/metrics/:algorithmName" element={<App />} />
          <Route path="/algorithms/:algorithmName" element={<App />} />
          <Route path="/contributions/overview" element={<App />} />
          <Route path="/contributions/overview/:contributorId" element={<App />} />
          <Route path="/contributions/guide" element={<App />} />
          <Route path="/contributions/ssoc" element={<App />} />
          <Route path="/contributions" element={<App />} />
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
  )
}
