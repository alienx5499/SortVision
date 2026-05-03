import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Hourglass,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export const EFFICIENCY_TEXT_COLOR_CLASSES: Record<string, string> = {
  red: 'text-red-500 hover:text-red-400',
  orange: 'text-orange-500 hover:text-orange-400',
  yellow: 'text-yellow-500 hover:text-yellow-400',
  blue: 'text-blue-500 hover:text-blue-400',
  indigo: 'text-green-500 hover:text-green-400',
  pink: 'text-pink-500 hover:text-pink-400',
  default: 'text-green-500 hover:text-green-400',
};

export type EfficiencyBand =
  | 'high'
  | 'medium-high'
  | 'medium'
  | 'medium-low'
  | 'low';

export const EFFICIENCY_ICON_CONFIG: Record<
  EfficiencyBand,
  { Icon: LucideIcon; iconClass: string; hoverClass: string }
> = {
  high: {
    Icon: Rocket,
    iconClass: 'text-green-500',
    hoverClass: 'hover:rotate-12',
  },
  'medium-high': {
    Icon: CheckCircle2,
    iconClass: 'text-blue-500',
    hoverClass: 'hover:scale-110',
  },
  medium: {
    Icon: Clock,
    iconClass: 'text-yellow-500',
    hoverClass: 'hover:rotate-45',
  },
  'medium-low': {
    Icon: Hourglass,
    iconClass: 'text-orange-500',
    hoverClass: 'hover:rotate-180',
  },
  low: {
    Icon: AlertTriangle,
    iconClass: 'text-red-500',
    hoverClass: 'hover:scale-110',
  },
};

export const EFFICIENCY_LEVEL_DOTS: Array<{
  key: EfficiencyBand;
  className: string;
  levels: EfficiencyBand[];
}> = [
  {
    key: 'low',
    className: 'bg-red-500 hover:bg-red-400',
    levels: ['low', 'medium-low', 'medium', 'medium-high', 'high'],
  },
  {
    key: 'medium-low',
    className: 'bg-orange-500 hover:bg-orange-400',
    levels: ['medium-low', 'medium', 'medium-high', 'high'],
  },
  {
    key: 'medium',
    className: 'bg-yellow-500 hover:bg-yellow-400',
    levels: ['medium', 'medium-high', 'high'],
  },
  {
    key: 'medium-high',
    className: 'bg-blue-500 hover:bg-blue-400',
    levels: ['medium-high', 'high'],
  },
  {
    key: 'high',
    className: 'bg-green-500 hover:bg-green-400',
    levels: ['high'],
  },
];

const EFFICIENCY_BANDS: readonly EfficiencyBand[] = [
  'high',
  'medium-high',
  'medium',
  'medium-low',
  'low',
] as const;

export function resolveEfficiencyBand(efficiency: string): EfficiencyBand {
  return (EFFICIENCY_BANDS as readonly string[]).includes(efficiency)
    ? (efficiency as EfficiencyBand)
    : 'medium';
}
