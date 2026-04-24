import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/formatters';

const ContributorDetailHeader = ({
  contributor,
  contributorType,
  profileData,
  onClose,
}) => (
  <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 border-b border-slate-700">
    <div className="absolute top-4 left-4 flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
    </div>

    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
    </div>

    <div className="relative z-10 flex items-start justify-between pt-6">
      <motion.div
        className="flex items-start gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
        >
          <img
            src={contributor.avatar_url}
            alt={contributor.login}
            className={`w-16 h-16 rounded-lg border-2 border-${contributorType.color}-500/50 shadow-lg`}
          />
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-${contributorType.color}-500/20 border-2 border-${contributorType.color}-500 flex items-center justify-center`}
          >
            <contributorType.icon className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-2 font-mono text-sm">
            <span className="text-emerald-400">$</span>
            <span className="text-slate-400">whoami</span>
            <span className="text-white">→</span>
            <span className="text-emerald-400">{contributor.login}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-white font-mono">
              {contributor.login}
            </h2>
            <div
              className={`px-3 py-1 rounded-md text-xs border border-${contributorType.color}-500/30 bg-${contributorType.color}-500/10 text-${contributorType.color}-400 flex items-center gap-1 font-mono`}
            >
              <contributorType.icon className="w-3 h-3" />
              {contributorType.label}
            </div>
          </div>

          {profileData?.name && (
            <p className="text-slate-300 font-medium mb-1">
              {profileData.name}
            </p>
          )}
          {profileData?.bio && (
            <p className="text-slate-400 text-sm mt-1 max-w-md font-mono">
              {profileData.bio}
            </p>
          )}

          <div className="flex items-center gap-6 mt-3 text-sm font-mono">
            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-emerald-400">commits:</span>
              <span className="text-white">{contributor.contributions}</span>
            </div>
            {profileData?.created_at && (
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-emerald-400">joined:</span>
                <span className="text-white">
                  {formatDate(profileData.created_at)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-emerald-400">status:</span>
              <span className="text-green-400">active</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <button
        onClick={onClose}
        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600 bg-slate-800/50"
        title="Close (Esc)"
      >
        <X className="w-5 h-5 text-slate-400" />
      </button>
    </div>
  </div>
);

export default ContributorDetailHeader;
