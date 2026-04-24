import React from 'react';
import { Building, Globe, Mail, MapPin, Users } from 'lucide-react';

const OverviewProfileDetails = ({ profileData, t }) => {
  if (!profileData) return null;

  return (
    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <Users className="w-5 h-5 text-emerald-400" />
        {t('contributions.contributorDetail.profileDetails')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {profileData.company && (
          <div className="flex items-center gap-2 text-slate-300">
            <Building className="w-4 h-4 text-slate-400" />
            <span>{profileData.company}</span>
          </div>
        )}
        {profileData.location && (
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{profileData.location}</span>
          </div>
        )}
        {profileData.email && (
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{profileData.email}</span>
          </div>
        )}
        {profileData.blog && (
          <div className="flex items-center gap-2 text-slate-300">
            <Globe className="w-4 h-4 text-slate-400" />
            <a
              href={profileData.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              {profileData.blog}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewProfileDetails;
