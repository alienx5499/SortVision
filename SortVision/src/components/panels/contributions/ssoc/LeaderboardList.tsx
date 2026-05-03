import React, { useMemo, useState } from 'react';
import { FILTER_OPTIONS } from './config';
import { filterLeaderboardParticipants } from './filterLeaderboardParticipants';
import { LeaderboardListControls } from './LeaderboardListControls';
import { LeaderboardListFrame } from './LeaderboardListFrame';
import { LeaderboardListLoadingState } from './LeaderboardListLoadingState';
import { LeaderboardListTable } from './LeaderboardListTable';
import { useLeaderboardListData } from './useLeaderboardListData';

type LeaderboardListProps = {
  loading?: boolean;
  onRefresh?: () => void;
};

const LeaderboardList = ({
  loading = false,
  onRefresh,
}: LeaderboardListProps) => {
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const { participants, isLoading, reload } = useLeaderboardListData();

  const busy = loading || isLoading;

  const filteredParticipants = useMemo(
    () => filterLeaderboardParticipants(participants, filter, searchTerm),
    [filter, participants, searchTerm]
  );

  return (
    <LeaderboardListFrame
      busy={busy}
      onRefresh={onRefresh}
      onReloadData={() => void reload()}
    >
      <LeaderboardListControls
        disabled={busy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
      />

      {busy ? (
        <LeaderboardListLoadingState />
      ) : (
        <LeaderboardListTable participants={filteredParticipants} />
      )}
    </LeaderboardListFrame>
  );
};

export default LeaderboardList;
