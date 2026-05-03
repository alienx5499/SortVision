import React from 'react';
import { GitCommit, Heart, Users } from 'lucide-react';
import { Github } from '@/components/ui/OptimizedIcons';

const OverviewStatsGrid = ({ contributor, profileData, t }) => {
  const stats = [
    {
      label: t('contributions.contributorDetail.publicRepos'),
      value: profileData?.public_repos || 0,
      icon: Github,
    },
    {
      label: t('contributions.contributorDetail.followers'),
      value: profileData?.followers || 0,
      icon: Users,
    },
    {
      label: t('contributions.contributorDetail.following'),
      value: profileData?.following || 0,
      icon: Heart,
    },
    {
      label: t('contributions.contributorDetail.repoCommits'),
      value: contributor?.contributions || 0,
      icon: GitCommit,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <stat.icon className="w-4 h-4" />
            {stat.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStatsGrid;
