import React from 'react';
import { showSettingsDevChrome } from '../showSettingsDevChrome';

type SettingsSectionHeaderProps = {
  title: string;
  description: string;
  accentClassName?: string;
};

export const SettingsSectionHeader = ({
  title,
  description,
  accentClassName = 'text-emerald-400',
}: SettingsSectionHeaderProps) => (
  <>
    <div
      className={`flex items-center gap-2 text-sm font-mono mb-1 ${accentClassName}`}
    >
      {showSettingsDevChrome && <span className="text-amber-400">$</span>}
      <span>{title}</span>
    </div>
    <div className="text-xs font-mono text-slate-500 mb-2">
      {showSettingsDevChrome && (
        <>
          <span className="text-amber-400">//</span>{' '}
        </>
      )}
      {description}
    </div>
  </>
);
