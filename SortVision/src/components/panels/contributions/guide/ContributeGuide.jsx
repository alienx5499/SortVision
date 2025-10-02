import React, { useState } from 'react';
import {
  Terminal,
  GitBranch,
  GitPullRequest,
  Code,
  FileText,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';

/**
 * Contribute Guide Component
 *
 * A comprehensive guide for new contributors with:
 * - Step-by-step contribution process
 * - Interactive checklist
 * - Animated background effects
 * - Terminal-style design
 * - Quick reference links
 */
const ContributeGuide = () => {
  const { t } = useLanguage();
  const [checkedSteps, setCheckedSteps] = useState(new Set());
  const [expandedSteps, setExpandedSteps] = useState(new Set());
  const [visiblePhase, setVisiblePhase] = useState(1); // 1: Getting Started, 2: Development, 3: Submission

  const toggleStep = stepId => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(stepId)) {
      newChecked.delete(stepId);
    } else {
      newChecked.add(stepId);
    }
    setCheckedSteps(newChecked);
  };

  const toggleExpanded = stepId => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const nextPhase = () => {
    if (visiblePhase < 3) {
      setVisiblePhase(visiblePhase + 1);
    }
  };

  const prevPhase = () => {
    if (visiblePhase > 1) {
      setVisiblePhase(visiblePhase - 1);
    }
  };

  const steps = [
    {
      id: 'fork',
      icon: GitBranch,
      title: t('contributions.guide.forkRepository'),
      description: t('contributions.guide.createCopy'),
      command: 'git clone https://github.com/YOUR_USERNAME/SortVision.git',
      color: 'emerald',
      phase: 1,
    },
    {
      id: 'setup',
      icon: Terminal,
      title: t('contributions.guide.setupEnvironment'),
      description: t('contributions.guide.installDependencies'),
      command: 'npm install && npm run dev',
      color: 'blue',
      phase: 2,
    },
    {
      id: 'branch',
      icon: Code,
      title: t('contributions.guide.createBranch'),
      description: t('contributions.guide.createNewBranch'),
      command: 'git checkout -b feature/your-feature-name',
      color: 'purple',
      phase: 2,
    },
    {
      id: 'code',
      icon: FileText,
      title: t('contributions.guide.makeChanges'),
      description: t('contributions.guide.implementFeature'),
      command: '// Write clean, documented code',
      color: 'yellow',
      phase: 2,
    },
    {
      id: 'commit',
      icon: CheckCircle,
      title: t('contributions.guide.commitPush'),
      description: t('contributions.guide.commitChanges'),
      command: 'git commit -m "feat: add your feature"',
      color: 'green',
      phase: 3,
    },
    {
      id: 'pr',
      icon: GitPullRequest,
      title: t('contributions.guide.createPR'),
      description: t('contributions.guide.submitChanges'),
      command: 'Open PR on GitHub with detailed description',
      color: 'pink',
      phase: 3,
    },
  ];

  // Get visible steps based on current phase
  const visibleSteps = steps.filter(step => step.phase <= visiblePhase);

  // Phase information
  const phases = [
    {
      id: 1,
      title: t('contributions.guide.gettingStarted'),
      description: t('contributions.guide.createCopy'),
    },
    {
      id: 2,
      title: t('contributions.guide.development'),
      description: t('contributions.guide.installDependencies'),
    },
    {
      id: 3,
      title: t('contributions.guide.submission'),
      description: t('contributions.guide.submitChanges'),
    },
  ];

  const currentPhase = phases.find(p => p.id === visiblePhase);
  const canGoNext = visiblePhase < 3;
  const canGoPrev = visiblePhase > 1;

  // Check if current phase is completed
  const currentPhaseSteps = steps.filter(step => step.phase === visiblePhase);
  const currentPhaseCompleted =
    currentPhaseSteps.every(step => checkedSteps.has(step.id)) &&
    currentPhaseSteps.length > 0;

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/guide overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/guide:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/guide:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="font-mono text-sm text-slate-400 mb-6 flex items-center relative z-10 group-hover/guide:text-emerald-400 transition-colors duration-300">
          <Terminal
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('contributions.guide.contributionGuide')}
          </span>
        </div>

        {/* Phase Navigation */}
        <div className="mb-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-mono text-lg font-bold text-white mb-1">
                {t('contributions.guide.phase')} {visiblePhase}: {currentPhase?.title}
              </h3>
              <p className="font-mono text-sm text-slate-400">
                {currentPhase?.description}
              </p>
            </div>
            <div className="flex space-x-2">
              {canGoPrev && (
                <button
                  onClick={prevPhase}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded font-mono text-xs transition-all duration-300"
                >
                  {t('contributions.guide.previous')}
                </button>
              )}
              {canGoNext && (
                <button
                  onClick={nextPhase}
                  className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded font-mono text-xs transition-all duration-300"
                >
                  {t('contributions.guide.nextPhase')}
                </button>
              )}
            </div>
          </div>

          {/* Phase Progress Dots */}
          <div className="flex items-center space-x-4 mb-4">
            {phases.map(phase => (
              <div key={phase.id} className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    phase.id <= visiblePhase
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-600'
                  }`}
                ></div>
                <span
                  className={`font-mono text-xs transition-colors duration-300 ${
                    phase.id === visiblePhase
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {phase.title}
                </span>
                {phase.id < 3 && (
                  <div
                    className={`w-8 h-px transition-colors duration-300 ${
                      phase.id < visiblePhase
                        ? 'bg-emerald-500/50'
                        : 'bg-slate-600'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-slate-400">
              Overall Progress
            </span>
            <span className="font-mono text-xs text-emerald-400">
              {checkedSteps.size}/{steps.length} steps completed
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${(checkedSteps.size / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8 relative z-10">
          {visibleSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isChecked={checkedSteps.has(step.id)}
              isExpanded={expandedSteps.has(step.id)}
              onToggle={() => toggleStep(step.id)}
              onToggleExpanded={() => toggleExpanded(step.id)}
            />
          ))}
        </div>

        {/* Phase Completion Message */}
        {currentPhaseCompleted && canGoNext && (
          <div className="mb-6 relative z-10 animate-fade-up animate-once">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {t('contributions.guide.phaseComplete', { phase: visiblePhase })}
                </span>
              </div>
              <p className="text-slate-300 font-mono text-xs mb-3">
                {t('contributions.guide.greatWork')}
              </p>
              <button
                onClick={nextPhase}
                className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded font-mono text-sm transition-all duration-300 animate-pulse"
              >
{t('contributions.guide.continueTo', { phase: phases.find(p => p.id === visiblePhase + 1)?.title })}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Individual Step Card Component
const StepCard = ({
  step,
  index,
  isChecked,
  isExpanded,
  onToggle,
  onToggleExpanded,
}) => {
  const colorClasses = {
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    green: 'text-green-400 border-green-500/30 bg-green-500/10',
    pink: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
  };

  const colors = colorClasses[step.color] || colorClasses.emerald;
  const Icon = step.icon;
  const delay = index * 100;

  return (
    <div
      className={`group/step relative p-4 rounded-lg border border-slate-700 bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] animate-fade-up animate-once overflow-hidden ${
        isChecked ? 'border-emerald-500/50 bg-emerald-500/5' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Step shimmer effect */}
      <div className="absolute inset-0 w-0 group-hover/step:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="flex items-start space-x-4 relative z-10">
        {/* Step Number & Icon */}
        <div className="flex items-center space-x-3">
          <button
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

        {/* Step Content */}
        <div className="flex-1">
          <div className="cursor-pointer" onClick={onToggleExpanded}>
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

          {/* Expandable Command Section */}
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

export default ContributeGuide;
