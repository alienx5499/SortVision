import { GITHUB_API_CONFIG, POINTS_CONFIG } from '../config';
import { fetchGitHubRepoJson } from '../leaderboardGitHubGateway';
import type { GitHubIssue } from '../leaderboardGithubTypes';
import type { ContributorExportDetail } from './leaderboardExportTypes';

const verboseLog =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true'
    ? console.log.bind(console)
    : () => {};

/**
 * Fetches per-user issue + merged PR detail used only for CSV export enrichment.
 */
export async function fetchContributorExportDetail(
  githubId: string
): Promise<ContributorExportDetail> {
  try {
    verboseLog(`\n🔍 Fetching export detail for: ${githubId}`);

    const assignedIssues = (await fetchGitHubRepoJson(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&assignee=${githubId}&per_page=100`
    )) as GitHubIssue[];

    verboseLog(
      `📋 Closed issues assigned to ${githubId}: ${assignedIssues.length}`
    );

    let beginnerIssues = 0;
    let intermediateIssues = 0;
    let advancedIssues = 0;
    let totalPoints = 0;
    const userIssues: GitHubIssue[] = [];

    assignedIssues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        const labelNames = labels.join(', ');

        verboseLog(
          `  - Issue #${issue.number}: "${issue.title}" [${labelNames}]`
        );

        if (labels.includes('SSoC25')) {
          userIssues.push(issue);

          if (labels.includes('Beginner')) {
            beginnerIssues++;
            totalPoints += POINTS_CONFIG.Beginner;
            verboseLog(
              `    ✅ Beginner issue (+${POINTS_CONFIG.Beginner} points)`
            );
          } else if (labels.includes('Intermediate')) {
            intermediateIssues++;
            totalPoints += POINTS_CONFIG.Intermediate;
            verboseLog(
              `    ✅ Intermediate issue (+${POINTS_CONFIG.Intermediate} points)`
            );
          } else if (
            labels.includes('Advanced') ||
            labels.includes('Advance')
          ) {
            advancedIssues++;
            totalPoints += POINTS_CONFIG.Advanced;
            verboseLog(
              `    ✅ Advanced issue (+${POINTS_CONFIG.Advanced} points)`
            );
          } else {
            verboseLog(`    ⚠️ SSoC25 issue but no difficulty label`);
          }
        } else {
          verboseLog(`    ❌ Not an SSoC25 issue`);
        }
      }
    });

    verboseLog(`📊 Results for ${githubId}:`);
    verboseLog(
      `  - Beginner: ${beginnerIssues} issues (${
        beginnerIssues * POINTS_CONFIG.Beginner
      } points)`
    );
    verboseLog(
      `  - Intermediate: ${intermediateIssues} issues (${
        intermediateIssues * POINTS_CONFIG.Intermediate
      } points)`
    );
    verboseLog(
      `  - Advanced: ${advancedIssues} issues (${
        advancedIssues * POINTS_CONFIG.Advanced
      } points)`
    );
    verboseLog(`  - Total: ${totalPoints} points`);

    let prs: ContributorExportDetail['prs'] = [];
    try {
      const allPrs = (await fetchGitHubRepoJson(
        `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/pulls?creator=${githubId}&state=closed&per_page=100`
      )) as ContributorExportDetail['prs'];

      const ssocPrs = allPrs.filter(pr => {
        if (!pr.merged_at) return false;

        const title = (pr.title || '').toLowerCase();
        const body = (pr.body || '').toLowerCase();

        const issueNumbers = userIssues.map(issue => issue.number);
        const referencesIssue = issueNumbers.some(issueNum => {
          if (issueNum === undefined) return false;
          const patterns = [
            new RegExp(`#${issueNum}\\b`, 'i'),
            new RegExp(`close[sd]?\\s+#${issueNum}\\b`, 'i'),
            new RegExp(`fix(es|ed)?\\s+#${issueNum}\\b`, 'i'),
            new RegExp(`resolve[sd]?\\s+#${issueNum}\\b`, 'i'),
            new RegExp(`address(es|ed)?\\s+#${issueNum}\\b`, 'i'),
            new RegExp(`implement[sd]?\\s+#${issueNum}\\b`, 'i'),
          ];

          return patterns.some(
            pattern => pattern.test(body) || pattern.test(title)
          );
        });

        if (referencesIssue) return true;

        return (
          title.includes('ssoc') ||
          body.includes('ssoc') ||
          title.includes('s4') ||
          body.includes('s4')
        );
      });
      prs = ssocPrs;
    } catch (error) {
      console.warn(`Failed to fetch PRs for ${githubId}:`, error);
    }

    return {
      issues: userIssues,
      prs,
      beginnerIssues,
      intermediateIssues,
      advancedIssues,
      totalPoints,
      totalIssues: userIssues.length,
    };
  } catch (error) {
    console.error(`Error fetching export detail for ${githubId}:`, error);
    return {
      issues: [],
      prs: [],
      beginnerIssues: 0,
      intermediateIssues: 0,
      advancedIssues: 0,
      totalPoints: 0,
      totalIssues: 0,
    };
  }
}
