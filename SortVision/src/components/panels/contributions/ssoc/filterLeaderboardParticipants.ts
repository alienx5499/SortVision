import { FILTER_OPTIONS } from './config';
import type {
  LeaderboardParticipant,
  RankedLeaderboardParticipant,
} from './leaderboardTypes';

export function filterLeaderboardParticipants(
  participants: LeaderboardParticipant[],
  filter: string,
  searchTerm: string
): RankedLeaderboardParticipant[] {
  const ranked = participants
    .filter(p => p.totalPoints > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((participant, sortedIndex) => ({
      ...participant,
      originalRank: sortedIndex,
    }));

  const q = searchTerm.toLowerCase();

  return ranked.filter(participant => {
    const matchesSearch =
      searchTerm === '' ||
      participant.contributorName.toLowerCase().includes(q) ||
      participant.githubId.toLowerCase().includes(q);

    switch (filter) {
      case FILTER_OPTIONS.TOP_10:
        return matchesSearch && participant.originalRank < 10;
      case FILTER_OPTIONS.ADVANCED:
        return matchesSearch && participant.advancedIssues > 0;
      case FILTER_OPTIONS.INTERMEDIATE:
        return matchesSearch && participant.intermediateIssues > 0;
      case FILTER_OPTIONS.BEGINNER:
        return matchesSearch && participant.beginnerIssues > 0;
      default:
        return matchesSearch;
    }
  });
}
