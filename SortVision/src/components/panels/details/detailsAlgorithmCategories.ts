import type { DetailsAlgorithmCategoryDefinition } from './detailsAlgorithmSelectorTypes';

export const DETAILS_ALGORITHM_CATEGORIES: DetailsAlgorithmCategoryDefinition[] =
  [
    {
      group: 'basic',
      groupClass: 'group/basic',
      titleKey: 'details.basicSorts',
      activeWhen: ['bubble', 'insertion', 'selection'],
      boxActive:
        'bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/30 shadow-lg shadow-red-500/10',
      boxIdle:
        'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10',
      titleAccentClass: 'text-red-400',
      titleHoverClass: 'group-hover/basic:text-red-300',
      underlineGradient: 'from-red-400/0 via-red-400/70 to-red-400/0',
      cornerGradient: 'from-red-500/20 to-orange-500/20',
      particleClasses: [
        'bg-red-500/50',
        'bg-orange-500/50',
        'bg-yellow-500/50',
      ],
      line1Via: 'via-red-500/30',
      line2Via: 'via-orange-500/30',
      algorithms: [
        {
          id: 'bubble',
          label: 'Bubble',
          padClass: 'px-2',
          dotSelected:
            'bg-red-400 scale-110 animate-pulse shadow-md shadow-red-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-red-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10',
          btnIdle:
            'text-slate-400 hover:text-red-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-red-400/5',
        },
        {
          id: 'insertion',
          label: 'Insertion',
          padClass: 'px-2',
          dotSelected:
            'bg-orange-400 scale-110 animate-pulse shadow-md shadow-orange-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-orange-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10',
          btnIdle:
            'text-slate-400 hover:text-orange-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-orange-400/5',
        },
        {
          id: 'selection',
          label: 'Selection',
          padClass: 'px-2',
          dotSelected:
            'bg-yellow-400 scale-110 animate-pulse shadow-md shadow-yellow-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-yellow-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-lg shadow-yellow-500/10',
          btnIdle:
            'text-slate-400 hover:text-yellow-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-yellow-400/5',
        },
      ],
    },
    {
      group: 'efficient',
      groupClass: 'group/efficient',
      titleKey: 'details.efficientSorts',
      activeWhen: ['quick', 'merge', 'heap'],
      boxActive:
        'bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 shadow-lg shadow-blue-500/10',
      boxIdle:
        'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10',
      titleAccentClass: 'text-blue-400',
      titleHoverClass: 'group-hover/efficient:text-blue-300',
      underlineGradient: 'from-blue-400/0 via-blue-400/70 to-blue-400/0',
      cornerGradient: 'from-green-500/20 to-blue-500/20',
      particleClasses: ['bg-green-500/50', 'bg-teal-500/50', 'bg-blue-500/50'],
      line1Via: 'via-green-500/30',
      line2Via: 'via-blue-500/30',
      algorithms: [
        {
          id: 'quick',
          label: 'Quick',
          padClass: 'px-3',
          dotSelected:
            'bg-green-400 scale-110 animate-pulse shadow-md shadow-green-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-green-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-green-500/20 text-green-300 border border-green-500/30 shadow-lg shadow-green-500/10',
          btnIdle:
            'text-slate-400 hover:text-green-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-green-400/5',
        },
        {
          id: 'merge',
          label: 'Merge',
          padClass: 'px-3',
          dotSelected:
            'bg-blue-400 scale-110 animate-pulse shadow-md shadow-blue-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-blue-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10',
          btnIdle:
            'text-slate-400 hover:text-blue-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-blue-400/5',
        },
        {
          id: 'heap',
          label: 'Heap',
          padClass: 'px-3',
          dotSelected:
            'bg-indigo-400 scale-110 animate-pulse shadow-md shadow-indigo-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-indigo-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10',
          btnIdle:
            'text-slate-400 hover:text-indigo-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-indigo-400/5',
        },
      ],
    },
    {
      group: 'special',
      groupClass: 'group/special',
      titleKey: 'details.specialSorts',
      activeWhen: ['radix', 'bucket'],
      boxActive:
        'bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 shadow-lg shadow-purple-500/10',
      boxIdle:
        'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10',
      titleAccentClass: 'text-purple-400',
      titleHoverClass: 'group-hover/special:text-purple-300',
      underlineGradient: 'from-purple-400/0 via-purple-400/70 to-purple-400/0',
      cornerGradient: 'from-indigo-500/20 to-purple-500/20',
      particleClasses: [
        'bg-indigo-500/50',
        'bg-purple-500/50',
        'bg-pink-500/50',
      ],
      line1Via: 'via-indigo-500/30',
      line2Via: 'via-purple-500/30',
      algorithms: [
        {
          id: 'radix',
          label: 'Radix',
          padClass: 'px-3',
          dotSelected:
            'bg-cyan-400 scale-110 animate-pulse shadow-md shadow-cyan-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-cyan-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10',
          btnIdle:
            'text-slate-400 hover:text-cyan-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-cyan-400/5',
        },
        {
          id: 'bucket',
          label: 'Bucket',
          padClass: 'px-3',
          dotSelected:
            'bg-pink-400 scale-110 animate-pulse shadow-md shadow-pink-500/50',
          dotIdle:
            'bg-slate-600 hover:bg-pink-400/70 hover:scale-125 hover:rotate-12',
          btnSelected:
            'bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10',
          btnIdle:
            'text-slate-400 hover:text-pink-300 hover:-translate-y-1 hover:shadow-md',
          shimmerVia: 'via-pink-400/5',
        },
      ],
    },
  ];
