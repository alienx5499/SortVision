import React from 'react';
import { Filter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FILTER_OPTIONS } from './config';

type LeaderboardListControlsProps = {
  disabled: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export const LeaderboardListControls = ({
  disabled,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: LeaderboardListControlsProps) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
    <div className="flex-1">
      <label
        htmlFor="participant-search"
        className="font-mono text-xs text-slate-400 mb-2 block flex items-center"
      >
        <Search className="mr-2 size-3 text-yellow-400" />
        search participants
      </label>
      <div className="relative">
        <input
          type="text"
          id="participant-search"
          name="participant-search"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search by name or GitHub..."
          className="w-full h-10 bg-slate-800/90 border border-slate-700 rounded-md px-3 text-yellow-400 font-mono text-sm placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-colors"
          disabled={disabled}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-500" />
      </div>
    </div>

    <div className="flex-1 sm:w-48">
      <label
        htmlFor="category-filter"
        className="font-mono text-xs text-slate-400 mb-2 block flex items-center"
      >
        <Filter className="mr-2 size-3 text-yellow-400" />
        filter by category
      </label>
      <Select value={filter} onValueChange={onFilterChange} disabled={disabled}>
        <SelectTrigger
          id="category-filter"
          className="w-full h-10 bg-slate-800/90 border-slate-700 text-yellow-400 font-mono"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-800/95 border-slate-700 text-yellow-400 font-mono">
          <SelectItem value={FILTER_OPTIONS.ALL} className="font-mono">
            All Participants
          </SelectItem>
          <SelectItem value={FILTER_OPTIONS.TOP_10} className="font-mono">
            Top 10
          </SelectItem>
          <SelectItem value={FILTER_OPTIONS.ADVANCED} className="font-mono">
            Advanced Issues
          </SelectItem>
          <SelectItem value={FILTER_OPTIONS.INTERMEDIATE} className="font-mono">
            Intermediate Issues
          </SelectItem>
          <SelectItem value={FILTER_OPTIONS.BEGINNER} className="font-mono">
            Beginner Issues
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
