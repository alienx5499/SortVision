import { Star, X } from 'lucide-react';
import { Github } from '@/components/ui/OptimizedIcons';
import StarOnGithub from '@/components/mvpblocks/star-on-github.jsx';
import { Z_INDEX } from '@/utils/zIndex';
import { isGithubPopupTestMode } from '../utils/popupFlags';

export function StarOnGithubPopupView({
  repoStats,
  timeSpent,
  handleLater,
  handleDismiss,
  handleStarClick,
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.GITHUB_STAR_BACKDROP }}
        onClick={handleLater}
      />

      <div
        className="fixed inset-0 flex items-center justify-center animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.GITHUB_STAR_MODAL }}
      >
        <div className="w-[380px] max-w-[90vw] bg-slate-900 border border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-gradient" />
          <div className="relative p-6">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group hover:rotate-90 transform"
              aria-label="Close popup"
            >
              <X className="h-4 w-4 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
            </button>

            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="relative mx-auto w-10 h-10 mb-1">
                  <Star className="w-6 h-6 text-emerald-400 absolute inset-0 m-auto" />
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400/10 animate-ping [animation-delay:0.5s]" />
                </div>
                <h3 className="text-xl font-bold font-mono text-white relative group">
                  Enjoying SortVision?
                  {isGithubPopupTestMode() && (
                    <span className="ml-2 text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded border border-purple-600/30 font-mono">
                      TEST MODE
                    </span>
                  )}
                </h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  You've been exploring algorithms for a while! If you're
                  finding SortVision helpful, consider giving us a star on
                  GitHub. It helps us reach more learners like you!
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 text-left border border-slate-700 relative overflow-hidden">
                <div className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-300" />
                    <h4 className="font-semibold text-sm text-white">
                      Why star us?
                    </h4>
                  </div>
                  <div className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-700 text-slate-300">
                    Live:{' '}
                    <span className="text-emerald-400 font-semibold">
                      {repoStats.starFormatted}
                    </span>{' '}
                    stars
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Support open-source education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Help others discover this tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Show appreciation for free learning resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>
                      Join our community of{' '}
                      <span className="font-semibold text-emerald-400">
                        {repoStats.starFormatted}+ developers
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div onClick={handleStarClick} className="cursor-pointer">
                  <StarOnGithub />
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleLater}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Don't show again
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 border-t border-slate-700 pt-4">
                🎯 You've spent {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                exploring algorithms
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
