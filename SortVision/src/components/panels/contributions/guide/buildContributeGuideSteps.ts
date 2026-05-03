import {
  Terminal,
  GitBranch,
  GitPullRequest,
  Code,
  FileText,
  CheckCircle,
} from 'lucide-react';
import type {
  GuidePhase,
  GuideStep,
  TranslateFn,
} from './contributeGuideTypes';

export function buildContributeGuideSteps(t: TranslateFn): GuideStep[] {
  return [
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
}

export function buildContributeGuidePhases(t: TranslateFn): GuidePhase[] {
  return [
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
}
