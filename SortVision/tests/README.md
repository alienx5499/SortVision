# Tests

## Tiers

| Tier                   | Command                                                                      | What it is                                                                                                                                 | CI                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Deterministic gate** | `pnpm run test:unit`                                                         | `node:test` over `tests/unit/**`. No app server; mocks and pure logic.                                                                     | **Format and lint** job                                                                                            |
| **Synthetic HTTP QA**  | `pnpm test`, `pnpm run test:ci`, `pnpm run test:quick`, `pnpm run test:prod` | `tests/qa/quality-assurance.ts`: fetches a running site (local or production), sweeps routes, samples sitemaps/links in `--extended` mode. | **Test** job runs `test:ci` (server + extended). **Production validation** runs `--production` on `main`/`master`. |

Treat **`test:unit`** as the contract for “did we break isolated behavior?” Treat **`test` / `test:ci`** as “does the deployed surface look healthy?” — sampling and network timing mean they complement unit tests; they do not replace them.

## Warnings vs failures (QA script)

The QA runner exits **1** only when a check is logged as **FAIL**. **WARN** (e.g. missing optional `sitemap-index`, soft security-header gaps on HTTP, flaky seeds) increments warning counts and the summary but **does not fail the process**. Extended **sitemap** and **internal link** suites still **FAIL** individual URL checks when status codes are wrong — only the explicitly WARN paths are non-blocking.

## Layout

- `unit/` — node:test suites (API route contracts, helpers, etc.).
- `qa/quality-assurance.ts` — HTTP integration / smoke / extended crawls.
- `support/` — shared parsers and helpers for QA.
