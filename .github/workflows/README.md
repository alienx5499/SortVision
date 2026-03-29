# SortVision — GitHub Actions

Workflows are split by responsibility. **Node.js 24** is used in CI to match [`SortVision/package.json` engines](../../SortVision/package.json). Third-party actions are pinned to **commit SHAs** (comments note the tag) for reproducible builds.

## Workflows

### `continuous-integration.yml`

**Triggers:** pull request, push to `main` / `master` / `develop`, merge queue, manual dispatch.

| Job | Purpose |
|-----|---------|
| **Formatting** | Prettier (`pnpm run format:check`) |
| **Lint** | ESLint |
| **Build** | Single `pnpm run build`; uploads `SortVision/.next` as artifact `next-build` (no duplicate builds downstream). |
| **Build and test** | After **Build**: `pnpm install` + download `next-build`, **`next start`**, `pnpm test`, PR QA comment + `qa-pr-comment` artifact. Runs **in parallel** with **Lighthouse**. |
| **Lighthouse** | After **Build**: install + download `next-build`, **`next start`**, mobile + desktop Lighthouse ([`lighthouserc.json`](../../SortVision/lighthouserc.json), [`lighthouserc.desktop.json`](../../SortVision/lighthouserc.desktop.json)); job summary via [`lighthouse-ci-summary.cjs`](../../SortVision/scripts/lighthouse-ci-summary.cjs). |
| **Production validation** | On `main` / `master` only, after **Build and test** and **Lighthouse**: production smoke tests and HTTP checks |

Shared setup: [`setup-sortvision`](../actions/setup-sortvision/action.yml) (pnpm, Node, `pnpm install`). Consumer jobs use [`restore-next-build`](../actions/restore-next-build/action.yml) after **Build** to unpack `next-build.tar.gz` into `SortVision/.next`.

### `extended-quality-assurance.yml`

**Triggers:** nightly (`0 2 * * *` UTC), `workflow_dispatch`.

Longer validation: format, lint, build, `pnpm run test:extended`, sitemap, **pnpm audit** (fails on high/critical for production deps), bundle notes, artifacts.

### `security-scan.yml`

**Triggers:** push/PR, **merge queue** (`merge_group`), weekly schedule.

- **pnpm audit** for production dependencies: **fails on high and critical** (moderate/low: review locally or via Dependabot).
- **TruffleHog** (pinned release) for verified secrets.
- **Dependency review** on pull requests (`fail-on-severity: moderate`).

### CodeQL (GitHub default setup)

This repo does **not** use a custom `codeql.yml` workflow. Enable **Code scanning** with **Default setup** under **Settings → Code security and analysis → Code scanning**. Results and status appear under the **Security** tab; required checks (if any) use the names GitHub shows for that setup (not the old workflow job `Analyze (JavaScript)`).

### `typos.yml`

**Triggers:** PR (path-filtered), push (path-filtered), **merge queue** (`merge_group`). Path filters do not apply to `merge_group` (GitHub runs the full workflow for the queued merge ref).

Spell check using [typos](https://github.com/crate-ci/typos); large i18n and lockfiles are excluded in [`_typos.toml`](../../_typos.toml).

### `dependabot-auto-merge.yml`

Runs **after** [`Continuous integration`](continuous-integration.yml) completes successfully (`workflow_run`), resolves the PR from the CI commit, and enables **`gh pr merge --auto --squash`** only when the PR author is Dependabot (**`dependabot[bot]`** or **`app/dependabot`**). GitHub then merges once **all** required checks (including Typos, Security Scan, CodeQL, etc.) pass.

**Do not** add this workflow as a **required** status check (it would run after other checks, not in parallel with them in a useful way).

**Note:** The old `dependabot/fetch-metadata` patch/minor/dev-only filters were removed here because that action only works on `pull_request` events. Tighten what Dependabot opens via [`.github/dependabot.yml`](../../dependabot.yml) (groups, ignore, `update-types`) instead.

## Merge queue (GitHub `merge_group`)

Merge queue uses a **temporary branch** (ref like `refs/heads/gh-readonly-queue/...`) that combines **target branch + one or more queued PRs**. CI must run on that ref, not only on the PR’s branch, or required checks never complete in the queue.

**In this repo**, these workflows include `merge_group: types: [checks_requested]`:

- [`continuous-integration.yml`](continuous-integration.yml) (already had it)
- [`typos.yml`](typos.yml)
- [`security-scan.yml`](security-scan.yml) — audit + TruffleHog run; **Dependency Review** stays `pull_request`-only by design.

**Not** run on merge queue: [`extended-quality-assurance.yml`](extended-quality-assurance.yml) (scheduled/manual only) — too heavy for every queue entry.

**How “PR tests” vs “merge queue tests” relate:** Each PR still gets normal `pull_request` runs. When you click **Merge when ready**, GitHub runs required checks again on the **merge group** commit (integration of `main` + your change, and possibly other queued PRs depending on queue mode). One green merge-group run can clear the next merge for batched queues; if something fails, the queue is blocked or that PR is dropped per GitHub’s rules.

**Enable in GitHub:** **Settings → Rules** (ruleset on `main`) → enable **Merge queue** → choose **Merge method** → list the **same** required status checks as for pull requests. After the first merge-group run, confirm check names match **Settings → Rules** (search for checks).

## Branch protection

Required status check names must match each job’s `name:` field exactly (for example **Formatting**, **Lint**, **Build**, **Build and test**, **Lighthouse**, **Typos**, **Security Vulnerability Scan**). Add CodeQL-related checks only if you require them, using the exact names from **Settings → Rules** after a green run.

## Adding more checks

- **Default PR path:** extend [`continuous-integration.yml`](continuous-integration.yml) or add a job with `needs:` as appropriate.
- **Nightly / manual only:** use [`extended-quality-assurance.yml`](extended-quality-assurance.yml) or a new workflow file.
- **Security:** prefer [`security-scan.yml`](security-scan.yml); CodeQL is managed in **Settings → Code scanning** (default setup).

**Not configured here (optional later):** Knip/depcheck for unused exports, Playwright E2E — useful once you want the extra maintenance cost.

## Badges

```markdown
![CI](https://github.com/OWNER/REPO/workflows/Continuous%20integration/badge.svg)
![Security](https://github.com/OWNER/REPO/workflows/Security%20Scan/badge.svg)
```

## Local parity

```bash
cd SortVision
pnpm run format:check && pnpm run lint && pnpm run build && pnpm test
```
