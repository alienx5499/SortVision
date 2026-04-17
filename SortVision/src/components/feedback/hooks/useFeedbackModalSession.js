import { useState, useEffect, useCallback } from 'react';

const SESSION_KEY = 'sortvision_session_id';
const SESSION_START_KEY = 'sortvision_session_start';

function readOrCreateSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomBytes = new Uint8Array(4);
    crypto.getRandomValues(randomBytes);
    const randomString = Array.from(randomBytes, byte => byte.toString(36))
      .join('')
      .toUpperCase();
    id = `sess_${timestamp}_${randomString}`;
    localStorage.setItem(SESSION_KEY, id);
    localStorage.setItem(SESSION_START_KEY, Date.now().toString());
  }
  return id;
}

function readSessionStartMs() {
  const stored = localStorage.getItem(SESSION_START_KEY);
  return stored ? parseInt(stored, 10) : Date.now();
}

export function useFeedbackModalSession(isOpen) {
  const [sessionId] = useState(readOrCreateSessionId);
  const [persistentSessionStart] = useState(readSessionStartMs);
  const [timeSpentOnSite, setTimeSpentOnSite] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const tick = () => {
      setTimeSpentOnSite(
        Math.round((Date.now() - persistentSessionStart) / 1000)
      );
    };
    tick();
    const interval = setInterval(tick, 10000);
    return () => clearInterval(interval);
  }, [isOpen, persistentSessionStart]);

  const formatTimeSpent = useCallback(seconds => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }, []);

  return {
    sessionId,
    persistentSessionStart,
    timeSpentOnSite,
    formatTimeSpent,
  };
}
