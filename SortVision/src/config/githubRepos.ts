/**
 * Two GitHub repositories (see SortVision/.env.example):
 *
 * - **Main app:** `REPO_OWNER` / `REPO_NAME` (server `process.env` only).
 * - **Feedback issues:** `FEEDBACK_REPO_OWNER` / `FEEDBACK_REPO_NAME` (server `process.env` only).
 *
 * **Browser:** `RootLayout` emits `<script id="sortvision-github-repo-slugs" type="application/json">`.
 * `getGithubRepoSlugs()` reads that JSON on the client (same idea as server-only secrets: no
 * `NEXT_PUBLIC_*`, no `next.config` `env` bridge).
 */

export function getMainGithubRepoFromEnv(
  env: NodeJS.ProcessEnv = process.env
): { owner: string; name: string } {
  return {
    owner: (env.REPO_OWNER ?? '').trim(),
    name: (env.REPO_NAME ?? '').trim(),
  };
}

export function getFeedbackGithubRepoFromEnv(
  env: NodeJS.ProcessEnv = process.env
): { owner: string; name: string } {
  return {
    owner: (env.FEEDBACK_REPO_OWNER ?? '').trim(),
    name: (env.FEEDBACK_REPO_NAME ?? '').trim(),
  };
}

export type GithubRepoSlugBundle = {
  main: { owner: string; name: string };
  feedback: { owner: string; name: string };
};

const EMPTY_MAIN = { owner: '', name: '' };
const EMPTY_FEEDBACK = { owner: '', name: '' };

let cachedClientSlugs: GithubRepoSlugBundle | null = null;

function readSlugsFromDocument(): GithubRepoSlugBundle | null {
  if (typeof document === 'undefined') return null;
  const el = document.getElementById('sortvision-github-repo-slugs');
  const raw = el?.textContent?.trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const rec = parsed as Record<string, unknown>;
    const main = rec.main as Record<string, unknown> | undefined;
    const feedback = rec.feedback as Record<string, unknown> | undefined;
    if (
      typeof main?.owner === 'string' &&
      typeof main?.name === 'string' &&
      typeof feedback?.owner === 'string' &&
      typeof feedback?.name === 'string'
    ) {
      return {
        main: { owner: main.owner.trim(), name: main.name.trim() },
        feedback: {
          owner: feedback.owner.trim(),
          name: feedback.name.trim(),
        },
      };
    }
  } catch {
    // ignore invalid JSON
  }
  return null;
}

/** Main + feedback repo slugs (server from env; client from layout JSON script). */
export function getGithubRepoSlugs(): GithubRepoSlugBundle {
  if (typeof window === 'undefined') {
    return {
      main: getMainGithubRepoFromEnv(),
      feedback: getFeedbackGithubRepoFromEnv(),
    };
  }
  if (cachedClientSlugs) return cachedClientSlugs;
  const fromDoc = readSlugsFromDocument();
  if (fromDoc) {
    cachedClientSlugs = fromDoc;
    return fromDoc;
  }
  return { main: EMPTY_MAIN, feedback: EMPTY_FEEDBACK };
}
