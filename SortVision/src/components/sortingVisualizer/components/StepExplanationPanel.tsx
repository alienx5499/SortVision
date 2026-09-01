import {
  Activity,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  Pause,
  Square,
} from 'lucide-react';
import { getStepExplanation } from '../stepExplanation';
import type { StepExplanationInput } from '../stepExplanation';

function statusColor(status: ReturnType<typeof getStepExplanation>['status']) {
  if (status === 'running') return 'text-emerald-300 bg-emerald-500/10';
  if (status === 'paused') return 'text-amber-300 bg-amber-500/10';
  if (status === 'stopped') return 'text-red-300 bg-red-500/10';
  return 'text-slate-300 bg-slate-700/40';
}

function StatusIcon({
  status,
}: {
  status: ReturnType<typeof getStepExplanation>['status'];
}) {
  if (status === 'paused') return <Pause className="size-3.5" />;
  if (status === 'stopped') return <Square className="size-3.5" />;
  return <Activity className="size-3.5" />;
}

export default function StepExplanationPanel(props: StepExplanationInput) {
  const explanation = getStepExplanation(props);

  return (
    <>
      <section className="relative group h-full">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-blue-500/15 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative h-full bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:10px_10px]"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="size-4 text-cyan-300 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-mono text-sm text-cyan-200 truncate">
                    Learning Mode
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    {explanation.algorithmLabel}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-mono ${statusColor(explanation.status)}`}
              >
                <StatusIcon status={explanation.status} />
                {explanation.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-100">
                {explanation.title}
              </p>
              <p className="text-xs leading-5 text-slate-300">
                {explanation.detail}
              </p>
              <p className="text-xs leading-5 text-slate-400">
                {explanation.beginnerSummary}
              </p>
            </div>

            {explanation.values.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                  Live values
                </p>
                <div className="flex flex-wrap gap-2">
                  {explanation.values.map(value => (
                    <span
                      key={value}
                      className="rounded border border-slate-700 bg-slate-950/80 px-2 py-1 text-[11px] text-emerald-300 font-mono"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded border border-slate-800 bg-slate-950/50 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                <Activity className="size-3.5 text-emerald-300" />
                Current step
              </div>
              <p className="text-xs leading-5 text-slate-300">
                {explanation.currentFocus}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative group xl:col-span-2">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:10px_10px]"></div>
          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1.2fr_1.1fr_1.2fr_1fr]">
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                <HelpCircle className="size-3.5 text-cyan-300" />
                Decision rule
              </div>
              <p className="text-xs leading-5 text-slate-300">
                {explanation.decisionRule}
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                How to read highlights
              </p>
              <ul className="space-y-1.5">
                {explanation.highlightLegend.map(item => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs leading-5 text-slate-400"
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                Why this works
              </p>
              <p className="text-xs leading-5 text-slate-400">
                {explanation.reason}
              </p>
            </section>

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500 font-mono">
                <ListChecks className="size-3.5 text-cyan-300" />
                Mini walkthrough
              </div>
              <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
                {explanation.walkthrough.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 text-xs leading-5 text-slate-400"
                  >
                    <span className="font-mono text-emerald-300">
                      {index + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-2 md:col-span-2 xl:col-span-1">
              <p className="text-[11px] uppercase tracking-wide text-cyan-300 font-mono">
                Next
              </p>
              <p className="text-xs leading-5 text-slate-300">
                {explanation.nextStep}
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
