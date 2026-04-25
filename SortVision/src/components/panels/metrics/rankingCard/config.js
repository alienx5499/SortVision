export const DEFAULT_SCHEME = {
  panelBg: 'from-slate-500/5 via-slate-500/10 to-slate-500/5',
  accent: 'from-slate-500/10 to-slate-400/10',
  border: 'border-slate-500',
  text: 'text-slate-500',
  hoverText: 'text-slate-400',
  rankBadge:
    'bg-slate-500/10 text-slate-500 group-hover:bg-slate-500/20 group-hover:text-slate-400',
  perfBar: 'bg-slate-500 group-hover:bg-slate-400',
  bottomLine: 'from-slate-500/50 via-slate-400/50 to-slate-500/50',
};

export const WINNER_SCHEME = {
  panelBg: 'from-yellow-500/5 via-yellow-500/10 to-yellow-500/5',
  accent: 'from-yellow-500/10 to-amber-500/10',
  border: 'border-yellow-500',
  text: 'text-yellow-500',
  hoverText: 'text-yellow-400',
  rankBadge:
    'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 group-hover:text-yellow-400',
  perfBar: 'bg-yellow-500 group-hover:bg-yellow-400',
  bottomLine: 'from-yellow-500/50 via-amber-500/50 to-yellow-500/50',
};

const GREEN_SCHEME = {
  panelBg: 'from-green-500/5 via-green-500/10 to-green-500/5',
  accent: 'from-green-500/10 to-emerald-500/10',
  border: 'border-green-500',
  text: 'text-green-500',
  hoverText: 'text-green-400',
  rankBadge:
    'bg-green-500/10 text-green-500 group-hover:bg-green-500/20 group-hover:text-green-400',
  perfBar: 'bg-green-500 group-hover:bg-green-400',
  bottomLine: 'from-green-500/50 via-emerald-500/50 to-green-500/50',
};

const CYAN_SCHEME = {
  panelBg: 'from-cyan-500/5 via-cyan-500/10 to-cyan-500/5',
  accent: 'from-cyan-500/10 to-blue-500/10',
  border: 'border-cyan-500',
  text: 'text-cyan-500',
  hoverText: 'text-cyan-400',
  rankBadge:
    'bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-400',
  perfBar: 'bg-cyan-500 group-hover:bg-cyan-400',
  bottomLine: 'from-cyan-500/50 via-blue-500/50 to-cyan-500/50',
};

const RED_SCHEME = {
  panelBg: 'from-red-500/5 via-red-500/10 to-red-500/5',
  accent: 'from-red-500/10 to-orange-500/10',
  border: 'border-red-500',
  text: 'text-red-500',
  hoverText: 'text-red-400',
  rankBadge:
    'bg-red-500/10 text-red-500 group-hover:bg-red-500/20 group-hover:text-red-400',
  perfBar: 'bg-red-500 group-hover:bg-red-400',
  bottomLine: 'from-red-500/50 via-orange-500/50 to-red-500/50',
};

export const ALGO_SCHEME_MAP = {
  quick: GREEN_SCHEME,
  merge: GREEN_SCHEME,
  heap: GREEN_SCHEME,
  radix: CYAN_SCHEME,
  bucket: CYAN_SCHEME,
  insertion: RED_SCHEME,
  selection: RED_SCHEME,
  bubble: RED_SCHEME,
};
