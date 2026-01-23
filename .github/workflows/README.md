# CI/CD Workflows

Automated quality assurance and deployment pipelines for SortVision.

## Workflows

### 1. Quality Assurance Pipeline (`quality-assurance.yml`)

**Triggers:** Push/PR to main, master, develop branches

**Jobs:**
- **quality-assurance** (30min timeout)
  - Code linting
  - Application build
  - Comprehensive test suite (600+ tests)
  - SEO validation and sitemap generation
  - Security audit
  - Bundle size analysis

- **lighthouse-audit** (Parallel, 15min timeout)
  - Lighthouse performance tests on 4 key pages
  - Automated performance scoring
  - Artifact upload for historical tracking

- **production-validation** (Only on main/master, 10min timeout)
  - Production site health check
  - Production test suite (58 tests)
  - Response time validation
  - HTTP status verification

### 2. Security Scan (`security-scan.yml`)

**Triggers:** 
- Push/PR to main, master, develop
- Weekly schedule (Sunday midnight)

**Jobs:**
- Dependency vulnerability scan
- Secret detection
- Security audit report generation

## Test Suite

Single comprehensive test file: `tests/quality-assurance.mjs`

### Test Modes:

| Command | Tests | Description |
|---------|-------|-------------|
| `npm test` | 600+ | Complete suite (localhost) |
| `npm run test:quick` | 30 | Quick validation only |
| `npm run test:prod` | 100+ | Production validation |

### Coverage:
- **Quick Validation** (30 tests): Core pages, SEO files, sample algorithms
- **Comprehensive** (200 tests): All languages × all algorithms × all tabs
- **Integration** (250 tests): Extended core, deep SEO, security, headers, edge cases
- **Performance** (120 tests): Multi-run performance validation across all languages
- **Total:** 600+ tests

## Artifacts

### Retention Periods:
- Test results: 30 days
- Security audits: 90 days
- Lighthouse reports: Permanent (via temporary public storage)

## Status Badges

Add to README.md:

```markdown
![Quality Assurance](https://github.com/YOUR_USERNAME/SortVision/workflows/Quality%20Assurance%20Pipeline/badge.svg)
![Security Scan](https://github.com/YOUR_USERNAME/SortVision/workflows/Security%20Scan/badge.svg)
```

## Configuration

### Environment Variables:
- `NODE_VERSION`: '22'
- `NEXT_PUBLIC_SITE_URL`: https://www.sortvision.com

### Timeouts:
- Quality Assurance: 30 minutes
- Lighthouse: 15 minutes
- Production Validation: 10 minutes
- Security Scan: 10 minutes

## Local Testing

Run tests locally:

```bash
# Complete test suite
npm test

# Quick validation (30 tests)
npm run test:quick

# Production validation
npm run test:prod

# Other checks
npm run lint
npm run build
npm run generate-sitemap
npm audit --production
```

## Troubleshooting

### Build Failures:
1. Check Node version (requires 22+)
2. Clear cache: `npm ci`
3. Verify dependencies: `npm audit`

### Test Failures:
1. Ensure dev server starts: `npm run dev`
2. Check port 3000 is free
3. Review test output for details
4. Check specific failed URLs

### Production Validation Failures:
1. Verify site is deployed
2. Check DNS resolution
3. Test manually: `curl https://www.sortvision.com`

## Maintenance

### Weekly:
- Review security scan results
- Check for dependency updates

### Monthly:
- Review Lighthouse trends
- Analyze bundle size changes
- Update workflow versions

## Contact

For CI/CD issues, check:
1. GitHub Actions logs
2. Uploaded artifacts
3. GITHUB_STEP_SUMMARY reports
