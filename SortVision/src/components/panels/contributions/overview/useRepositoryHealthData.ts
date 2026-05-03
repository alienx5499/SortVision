import { useCallback, useEffect, useState } from 'react';
import {
  fetchRepositoryHealthSnapshot,
  getDefaultRepositoryHealthConfig,
} from './repositoryHealthService';
import type { RepositoryHealthState } from './repositoryHealthTypes';
import {
  emptyRepositoryHealthSnapshot,
  fallbackRepositoryHealthSnapshot,
} from './repositoryHealthTypes';

const initialState: RepositoryHealthState = {
  ...emptyRepositoryHealthSnapshot(),
  loading: true,
  error: null,
};

export function useRepositoryHealthData(
  authenticatedFetch: (url: string) => Promise<unknown>
) {
  const [healthData, setHealthData] =
    useState<RepositoryHealthState>(initialState);

  const { repoOwner, repoName, apiBaseUrl } =
    getDefaultRepositoryHealthConfig();

  const fetchHealthData = useCallback(async () => {
    try {
      setHealthData(prev => ({ ...prev, loading: true, error: null }));

      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Repository Health: Fetching health data...');
      }

      const snapshot = await fetchRepositoryHealthSnapshot({
        repoOwner,
        repoName,
        apiBaseUrl,
        authenticatedFetch,
      });

      setHealthData({
        ...snapshot,
        loading: false,
        error: null,
      });

      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Repository Health: Data updated successfully');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Repository Health: Error fetching data:', error);
      setHealthData({
        ...fallbackRepositoryHealthSnapshot(),
        loading: false,
        error: message,
      });
    }
  }, [apiBaseUrl, authenticatedFetch, repoName, repoOwner]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void fetchHealthData();
    }, 0);
    return () => window.clearTimeout(id);
  }, [fetchHealthData]);

  return { healthData, fetchHealthData };
}
