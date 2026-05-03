import {
  ALGORITHM_TABS,
  CONTRIBUTION_SECTIONS,
  type AlgorithmTab,
  type ContributionSection,
} from './segments.ts';

export function isAlgorithmTab(
  tab: string | null | undefined
): tab is AlgorithmTab {
  return tab != null && (ALGORITHM_TABS as readonly string[]).includes(tab);
}

export function isContributionSection(
  section: string | null | undefined
): section is ContributionSection {
  return (
    section != null &&
    (CONTRIBUTION_SECTIONS as readonly string[]).includes(section)
  );
}

/** Map UI tab key to a contributions path segment; unknown keys → overview. */
export function resolveContributionSectionFromTab(
  tab: string
): ContributionSection {
  return isContributionSection(tab) ? tab : 'overview';
}
