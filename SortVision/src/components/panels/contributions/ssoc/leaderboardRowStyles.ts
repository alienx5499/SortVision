export function getTopThreeStyles(index: number): string {
  switch (index) {
    case 0:
      return 'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent';
    case 1:
      return 'bg-gradient-to-r from-slate-400/10 via-transparent to-transparent';
    case 2:
      return 'bg-gradient-to-r from-amber-700/10 via-transparent to-transparent';
    default:
      return '';
  }
}

export function getRankStyles(index: number): string {
  switch (index) {
    case 0:
      return 'text-yellow-400 animate-text-shimmer bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-clip-text text-transparent bg-[length:200%_100%]';
    case 1:
      return 'text-slate-300 animate-text-shimmer bg-gradient-to-r from-slate-500 via-slate-200 to-slate-500 bg-clip-text text-transparent bg-[length:200%_100%]';
    case 2:
      return 'text-amber-600 animate-text-shimmer bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 bg-clip-text text-transparent bg-[length:200%_100%]';
    default:
      return 'text-indigo-300 hover:text-indigo-200 transition-colors duration-200';
  }
}
