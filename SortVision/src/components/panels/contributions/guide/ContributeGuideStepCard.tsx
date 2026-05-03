import React from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import type { GuideStep, GuideStepColor } from './contributeGuideTypes';

const COLOR_CLASSES: Record<GuideStepColor, string> = {
  emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  green: 'text-green-400 border-green-500/30 bg-green-500/10',
  pink: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
};

type ContributeGuideStepCardProps = {
  step: GuideStep;
  index: number;
  isChecked: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleExpanded: () => void;
};

export const ContributeGuideStepCard = ({
  step,
  index,
  isChecked,
  isExpanded,
  onToggle,
  onToggleExpanded,
}: ContributeGuideStepCardProps) => {
  const colors = COLOR_CLASSES[step.color] ?? COLOR_CLASSES.emerald;
  const Icon = step.icon;
  const delay = index * 100;

  return (
    <div
      className={`group/step relative p-4 rounded-lg border border-slate-700 bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] animate-fade-up animate-once overflow-hidden ${
        isChecked ? 'border-emerald-500/50 bg-emerald-500/5' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 w-0 group-hover/step:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="flex items-start space-x-4 relative z-10">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onToggle}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              isChecked
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-slate-600 hover:border-emerald-500'
            }`}
          >
            {isChecked ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <span className="font-mono text-xs">{index + 1}</span>
            )}
          </button>

          <div className={`p-2 rounded-md border ${colors}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1">
          <div
            className="cursor-pointer"
            onClick={onToggleExpanded}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleExpanded();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center justify-between">
              <h4
                className={`font-mono text-sm font-bold mb-1 ${
                  isChecked ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {step.title}
              </h4>
              <div
                className={`transform transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <ChevronDown className="w-4 h-4 text-slate-400 hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">{step.description}</p>
          </div>

          {isExpanded && (
            <div className="bg-slate-950 border border-slate-700 rounded p-3 font-mono text-xs animate-fade-down animate-once">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-slate-500">terminal</span>
              </div>
              <div className="text-emerald-400">
                <span className="text-purple-400">$</span> {step.command}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
