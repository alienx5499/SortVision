import { useCallback, useEffect, useRef } from 'react';

type RetryTask = () => void;

type RetryScheduler = {
  schedule: (task: RetryTask, delayMs: number) => void;
  cancelAll: () => void;
};

export function useRetryScheduler(): RetryScheduler {
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const cancelAll = useCallback(() => {
    for (const timeoutId of timeoutsRef.current) {
      clearTimeout(timeoutId);
    }
    timeoutsRef.current.clear();
  }, []);

  const schedule = useCallback((task: RetryTask, delayMs: number) => {
    const timeoutId = setTimeout(() => {
      timeoutsRef.current.delete(timeoutId);
      task();
    }, delayMs);
    timeoutsRef.current.add(timeoutId);
  }, []);

  useEffect(() => cancelAll, [cancelAll]);

  return { schedule, cancelAll };
}
