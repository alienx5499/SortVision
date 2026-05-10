import React from 'react';
import { Filter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';

type ContributorListFiltersProps = {
  filter: string;
  setFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
};

export const ContributorListFilters = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  t,
}: ContributorListFiltersProps) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
    <div className="flex-1">
      <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
        <Filter className="mr-2 size-3 text-emerald-400" />
        {t('contributions.list.filterByType')}
      </label>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full h-10 bg-slate-800/90 border-slate-700 text-emerald-400 font-mono">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-800/95 border-slate-700 text-emerald-400 font-mono">
          <SelectItem value="all" className="font-mono">
            {t('contributions.list.allContributors')}
          </SelectItem>
          <SelectItem value="admins" className="font-mono">
            {t('contributions.list.projectAdmins')}
          </SelectItem>
          <SelectItem value="community" className="font-mono">
            {t('contributions.list.community')}
          </SelectItem>
          <SelectItem value="bots" className="font-mono">
            {t('contributions.list.bots')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="flex-1">
      <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
        <Search className="mr-2 size-3 text-emerald-400" />
        {t('contributions.list.searchContributors')}
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={t('contributions.list.typeUsername')}
          className="w-full h-10 bg-slate-800/90 border border-slate-700 rounded-md px-3 text-emerald-400 font-mono text-sm placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-500" />
      </div>
    </div>
  </div>
);
