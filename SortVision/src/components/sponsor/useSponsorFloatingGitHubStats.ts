import { useEffect, useState } from 'react';
import { getGithubApiHeaders } from '@/utils/githubApi';
import { SPONSOR_REPO_SLUG } from './sponsorFloatingConstants';

export type SponsorFloatingGitHubStats = {
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  pushedAt: string | null;
  contributors: number | null;
};

export function useSponsorFloatingGitHubStats(
  isOpen: boolean
): SponsorFloatingGitHubStats {
  const [stars, setStars] = useState<number | null>(null);
  const [forks, setForks] = useState<number | null>(null);
  const [openIssues, setOpenIssues] = useState<number | null>(null);
  const [pushedAt, setPushedAt] = useState<string | null>(null);
  const [contributors, setContributors] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    const fetchRepo = async () => {
      try {
        const res = await fetch(`/api/github/repos/${SPONSOR_REPO_SLUG}`, {
          headers: getGithubApiHeaders(),
        });
        if (!res.ok || cancelled) return;
        const data: unknown = await res.json();
        if (!cancelled && data && typeof data === 'object') {
          const d = data as Record<string, unknown>;
          if (typeof d.stargazers_count === 'number') {
            setStars(d.stargazers_count);
          }
          if (typeof d.forks_count === 'number') {
            setForks(d.forks_count);
          }
          if (typeof d.open_issues_count === 'number') {
            setOpenIssues(d.open_issues_count);
          }
          if (typeof d.pushed_at === 'string') {
            setPushedAt(d.pushed_at);
          }
        }
      } catch {
        /* ignore */
      }
    };

    const fetchContributors = async () => {
      try {
        let total = 0;
        let page = 1;
        while (!cancelled) {
          const res = await fetch(
            `/api/github/repos/${SPONSOR_REPO_SLUG}/contributors?per_page=100&page=${page}&anon=false`,
            { headers: getGithubApiHeaders() }
          );
          if (!res.ok) break;
          const data: unknown = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          total += data.length;
          if (data.length < 100) break;
          page += 1;
        }
        if (!cancelled) {
          setContributors(Math.max(0, total - 1));
        }
      } catch {
        if (!cancelled) setContributors(null);
      }
    };

    fetchRepo();
    fetchContributors();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  return { stars, forks, openIssues, pushedAt, contributors };
}
