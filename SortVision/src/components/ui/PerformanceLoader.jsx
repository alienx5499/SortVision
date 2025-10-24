/**
 * Performance-Optimized Loading Component
 * 
 * This component is designed to minimize CLS (Cumulative Layout Shift)
 * and improve loading performance with fixed dimensions and optimized animations.
 */

import React, { useState, useEffect, memo } from 'react';

// Memoized sorting bars to prevent unnecessary re-renders
const SortingBars = memo(() => {
  const bars = [
    { height: 20, delay: 0 },
    { height: 35, delay: 0.1 },
    { height: 15, delay: 0.2 },
    { height: 45, delay: 0.3 },
    { height: 25, delay: 0.4 },
    { height: 40, delay: 0.5 },
    { height: 30, delay: 0.6 },
  ];

  return (
    <div className="flex items-end gap-1 mb-8">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="w-3 bg-linear-to-t from-emerald-500 to-emerald-300 rounded-t-sm animate-sort-bounce"
          style={{
            height: `${bar.height}px`,
            animationDelay: `${bar.delay}s`,
            animationDuration: '1.5s',
          }}
        />
      ))}
    </div>
  );
});

SortingBars.displayName = 'SortingBars';

// Memoized background particles with deterministic positioning
const BackgroundParticles = memo(() => {
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
  ];

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
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
});

BackgroundParticles.displayName = 'BackgroundParticles';

// Main performance-optimized loading component
const PerformanceLoader = memo(() => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing SortVision');
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Show particles only after client mount to avoid hydration mismatch
    const particlesTimer = setTimeout(() => setShowParticles(true), 2500);

    const steps = [
      { progress: 20, text: 'Loading algorithms' },
      { progress: 40, text: 'Preparing visualizations' },
      { progress: 60, text: 'Setting up interface' },
      { progress: 80, text: 'Optimizing performance' },
      { progress: 100, text: 'Ready to sort!' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => {
      clearInterval(interval);
      clearTimeout(particlesTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles - only render after client mount */}
      {showParticles && <BackgroundParticles />}

      <div className="text-center z-10 w-full max-w-md px-4">
        {/* Logo animation - fixed height to prevent CLS */}
        <div className="mb-8 h-20 flex flex-col justify-center">
          <h1 className="text-4xl font-bold font-mono mb-2 h-12 flex items-center justify-center">
            <span className="text-emerald-400 animate-pulse">Sort</span>
            <span
              className="text-blue-400 animate-pulse"
              style={{ animationDelay: '0.2s' }}
            >
              Vision
            </span>
          </h1>
          <div className="text-sm text-slate-500 font-mono animate-fade-in h-6 flex items-center justify-center">
            Algorithm Visualizer
          </div>
        </div>

        {/* Animated sorting bars - fixed height */}
        <div className="flex justify-center h-12 items-end mb-8">
          <SortingBars />
        </div>

        {/* Loading text with typewriter effect - fixed height */}
        <div className="mb-6 h-16 flex flex-col justify-center">
          <div className="text-emerald-400 font-mono text-lg mb-2 animate-pulse h-8 flex items-center justify-center">
            <span>{loadingText}</span>
            <span className="animate-ping ml-1">...</span>
          </div>
        </div>

        {/* Progress bar - fixed height */}
        <div className="w-64 mx-auto h-12">
          <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-2 h-4 flex items-center justify-center">
            {progress}% complete
          </div>
        </div>

        {/* Loading spinner - fixed height */}
        <div className="mt-8 flex justify-center h-8">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-emerald-500/30 rounded-full animate-spin border-t-emerald-500" />
            <div
              className="absolute inset-0 w-8 h-8 border-2 border-blue-500/30 rounded-full animate-spin border-r-blue-500"
              style={{
                animationDirection: 'reverse',
                animationDuration: '0.8s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

PerformanceLoader.displayName = 'PerformanceLoader';

export default PerformanceLoader;
