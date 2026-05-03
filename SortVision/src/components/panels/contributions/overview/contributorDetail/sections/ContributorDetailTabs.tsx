import React from 'react';
import { motion } from 'framer-motion';
import { DETAIL_TABS } from '../constants';

const ContributorDetailTabs = ({ activeTab, onTabChange }) => (
  <div className="flex border-b border-slate-700 bg-slate-900/50 relative">
    <div className="absolute left-2 sm:left-4 top-0 bottom-0 flex items-center">
      <span className="text-emerald-400 font-mono text-xs hidden sm:inline">
        ~/contributor
      </span>
      <span className="text-emerald-400 font-mono text-xs sm:hidden">~</span>
      <span className="text-slate-400 font-mono text-xs ml-1">$</span>
    </div>

    <div className="flex ml-20 sm:ml-32 overflow-x-auto">
      {DETAIL_TABS.map(tab => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 font-mono text-xs sm:text-sm transition-all duration-200 relative whitespace-nowrap ${
            activeTab === tab.id
              ? 'text-emerald-400 bg-slate-800/80 border-t-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/40'
          }`}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>

          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
          )}

          <div
            className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
              tab.id === 'overview'
                ? 'bg-blue-400/50'
                : tab.id === 'pulls'
                  ? 'bg-emerald-400/50'
                  : tab.id === 'issues'
                    ? 'bg-red-400/50'
                    : 'bg-purple-400/50'
            }`}
          ></div>
        </motion.button>
      ))}
    </div>
  </div>
);

export default ContributorDetailTabs;
