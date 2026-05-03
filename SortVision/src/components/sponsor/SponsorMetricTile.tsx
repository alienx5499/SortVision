import type { LucideIcon } from 'lucide-react';

export type SponsorMetricTileProps = {
  icon: LucideIcon;
  iconClassName: string;
  value: string | number | null;
  caption: string;
  loading: boolean;
  valueClassName?: string;
};

export function SponsorMetricTile({
  icon: Icon,
  iconClassName,
  value,
  caption,
  loading,
  valueClassName = 'text-slate-100',
}: SponsorMetricTileProps) {
  return (
    <div className="flex min-h-[5.25rem] flex-col items-center justify-center rounded-xl border border-slate-700/70 bg-gradient-to-b from-slate-800/90 to-slate-900/70 px-2 py-2.5 text-center shadow-inner shadow-black/20">
      <Icon
        className={`mb-1.5 h-4 w-4 shrink-0 ${iconClassName}`}
        aria-hidden
      />
      <p
        className={`font-mono text-lg font-bold tabular-nums leading-tight ${valueClassName} ${
          loading ? 'animate-pulse text-slate-600' : ''
        }`}
      >
        {loading ? '—' : value}
      </p>
      <p className="mt-1 max-w-[9rem] text-center text-[0.65rem] font-medium uppercase leading-tight tracking-wide text-slate-500">
        {caption}
      </p>
    </div>
  );
}
