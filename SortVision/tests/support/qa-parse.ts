/**
 * Pure helpers shared by `tests/qa/quality-assurance.ts` and
 * `tests/unit/support/qa-parse.test.ts`.
 */

export function gradeFromPassRate(passRate: unknown) {
  if (typeof passRate !== 'number' || !Number.isFinite(passRate)) return '—';
  if (passRate === 100) return 'S+';
  if (passRate >= 98) return 'S';
  if (passRate >= 95) return 'A+';
  if (passRate >= 90) return 'A';
  if (passRate >= 85) return 'B+';
  if (passRate >= 80) return 'B';
  return 'C';
}

export function safeUrlToPath(u: string): string | null {
  try {
    const parsed = new URL(u);
    return parsed.pathname + (parsed.search || '');
  } catch {
    return null;
  }
}

export function extractInternalPathsFromHtml(html: string): string[] {
  const paths = new Set<string>();
  const hrefRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = (match[1] || '').trim();
    if (!href) continue;
    if (href.startsWith('#')) continue;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (
      href.startsWith('javascript:') ||
      href.startsWith('data:') ||
      href.startsWith('vbscript:')
    )
      continue;

    if (href.startsWith('/')) {
      paths.add(href);
      continue;
    }

    const maybePath = safeUrlToPath(href);
    if (maybePath) paths.add(maybePath);
  }
  return Array.from(paths);
}

export function extractLocsFromXml(xml: string) {
  const locs: string[] = [];
  const locRegex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    locs.push(match[1]);
  }
  return locs;
}

export function sampleArray<T>(arr: T[], count: number): T[] {
  if (arr.length <= count) return arr;
  const out: T[] = [];
  const seen = new Set();
  while (out.length < count && seen.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (seen.has(idx)) continue;
    seen.add(idx);
    out.push(arr[idx]);
  }
  return out;
}
