import { useCallback, useEffect, useState } from 'react';
import { fetchLeaderboardData } from './githubService';
import type { LeaderboardParticipant } from './leaderboardTypes';

export function useLeaderboardListData() {
  const [participants, setParticipants] = useState<LeaderboardParticipant[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    const data = (await fetchLeaderboardData()) as LeaderboardParticipant[];
    setParticipants(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void reload();
    }, 0);
    return () => window.clearTimeout(id);
  }, [reload]);

  return { participants, isLoading, reload };
}
