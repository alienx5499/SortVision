export type RepositoryHealthSnapshot = {
  issues: {
    open: number;
    closed: number;
    recentlyUpdated: number;
  };
  pullRequests: {
    open: number;
    merged: number;
    closed: number;
  };
  repository: {
    size: number;
    language: string;
    stars: number;
  };
  releases: {
    latest: RepositoryReleaseSummary | null;
  };
};

export type RepositoryReleaseSummary = {
  name: string | null;
  tag_name: string;
  published_at: string;
  html_url: string;
};

export type RepositoryHealthState = RepositoryHealthSnapshot & {
  loading: boolean;
  error: string | null;
};

export const emptyRepositoryHealthSnapshot = (): RepositoryHealthSnapshot => ({
  issues: { open: 0, closed: 0, recentlyUpdated: 0 },
  pullRequests: { open: 0, merged: 0, closed: 0 },
  repository: {
    size: 0,
    language: 'JavaScript',
    stars: 0,
  },
  releases: { latest: null },
});

export const fallbackRepositoryHealthSnapshot =
  (): RepositoryHealthSnapshot => ({
    issues: { open: 0, closed: 0, recentlyUpdated: 0 },
    pullRequests: { open: 0, merged: 0, closed: 0 },
    repository: {
      size: 2,
      language: 'JavaScript',
      stars: 0,
    },
    releases: { latest: null },
  });
