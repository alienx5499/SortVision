'use client';

import { useEffect, useState } from 'react';

export type ContributorStatAnimatedNumberProps = {
  loading: boolean;
  value: number;
  className: string;
};

export function ContributorStatAnimatedNumber({
  loading,
  value,
  className,
}: ContributorStatAnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (loading) return;
    let start = 0;
    const end = value || 0;
    if (start === end) {
      const timer = setTimeout(() => {
        setDisplayValue(end);
      }, 0);
      return () => clearTimeout(timer);
    }

    const duration = 1200;
    const minStepTime = 20;
    const stepTime = Math.max(Math.floor(duration / end), minStepTime);

    const increment = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayValue(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [loading, value]);

  if (loading) {
    return <div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div>;
  }

  return <div className={className}>{displayValue.toLocaleString()}</div>;
}
