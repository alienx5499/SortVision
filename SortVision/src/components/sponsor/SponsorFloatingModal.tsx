'use client';

import { useEffect, useMemo } from 'react';
import {
  Heart,
  Coffee,
  X,
  Star,
  Users,
  GitFork,
  CircleDot,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useLanguage } from '@/context/language';
import { formatSponsorRepoDate } from './formatSponsorRepoDate';
import {
  SPONSOR_BUY_ME_A_COFFEE,
  SPONSOR_DATE_LOCALES,
  SPONSOR_DEVELOPER_USERNAME,
  SPONSOR_GITHUB_PROFILE,
  SPONSOR_GITHUB_REPO,
  SPONSOR_GITHUB_SPONSORS,
} from './sponsorFloatingConstants';
import { SponsorMetricTile } from './SponsorMetricTile';
import { useSponsorFloatingGitHubStats } from './useSponsorFloatingGitHubStats';
import type { SponsorFloatingModalProps } from './sponsorContracts';

export type { SponsorFloatingModalProps } from './sponsorContracts';

export default function SponsorFloatingModal({
  isOpen,
  onClose,
}: SponsorFloatingModalProps) {
  const { t, language, getLocalizedUrl } = useLanguage();
  const { stars, forks, openIssues, pushedAt, contributors } =
    useSponsorFloatingGitHubStats(isOpen);

  const dateLocale = SPONSOR_DATE_LOCALES[language] ?? 'en-US';
  const lastPushText = formatSponsorRepoDate(pushedAt, dateLocale);

  const titleParts = useMemo(() => {
    const raw = t('main.sponsorModal.title');
    const words = String(raw).trim().split(/\s+/).filter(Boolean);
    return {
      first: words[0] ?? '',
      rest: words.slice(1).join(' '),
    };
  }, [t]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-floating-title"
    >
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0 duration-500 ease-out"
        onClick={onClose}
        aria-hidden
      />

      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 duration-500">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
          aria-label="Close"
        >
          <X className="size-4 text-slate-400 hover:text-emerald-400 transition-colors" />
        </button>

        <CardHeader className="text-center pr-12 pb-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart
              className="size-7 text-emerald-400 animate-pulse"
              style={{ animationDuration: '2.5s' }}
              strokeWidth={1.75}
            />
            <CardTitle
              id="sponsor-floating-title"
              className="text-2xl font-bold font-mono text-white"
            >
              <span className="text-emerald-400">{titleParts.first}</span>
              {titleParts.rest ? (
                <span className="text-purple-400"> {titleParts.rest}</span>
              ) : null}
            </CardTitle>
          </div>
          <p className="text-slate-500 font-mono text-xs text-left sm:text-center">
            {t('main.sponsorModal.devLabel')}
          </p>
        </CardHeader>

        <CardContent className="space-y-5 pt-0 px-6 sm:px-8">
          <p className="text-white font-mono text-base font-medium leading-relaxed text-left">
            {t('main.sponsorModal.openerIntroPrefix')}
            <a
              href={SPONSOR_GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-semibold underline decoration-emerald-400/50 underline-offset-[3px] transition-colors hover:text-emerald-300 hover:decoration-emerald-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
            >
              {SPONSOR_DEVELOPER_USERNAME}
            </a>
            {t('main.sponsorModal.openerIntroSuffix')}
            {contributors !== null ? (
              <Link
                href={getLocalizedUrl('contributions/overview')}
                onClick={onClose}
                className="text-purple-400 underline decoration-purple-400/45 underline-offset-[3px] transition-colors hover:text-fuchsia-300 hover:decoration-fuchsia-300/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
              >
                {t('main.sponsorModal.openerContributorsKnown', {
                  count: contributors,
                })}
              </Link>
            ) : (
              <Link
                href={getLocalizedUrl('contributions/overview')}
                onClick={onClose}
                className="text-purple-400 underline decoration-purple-400/45 underline-offset-[3px] transition-colors hover:text-fuchsia-300 hover:decoration-fuchsia-300/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
              >
                {t('main.sponsorModal.openerContributorsUnknown')}
              </Link>
            )}
            {t('main.sponsorModal.openerOutro')}
          </p>

          <div className="space-y-3">
            <p className="text-slate-400 font-mono text-sm leading-relaxed text-left">
              {t('main.sponsorModal.honestLine1')}
              <span className="text-slate-200">
                {t('main.sponsorModal.honestLine1Emphasis')}
              </span>
            </p>
            <p className="text-slate-400 font-mono text-sm leading-relaxed text-left">
              {t('main.sponsorModal.honestLine2')}
              <span className="text-purple-400">
                {t('main.sponsorModal.honestLine2Emphasis')}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <SponsorMetricTile
              icon={Star}
              iconClassName="fill-yellow-400 text-yellow-400"
              value={stars}
              caption={t('main.sponsorModal.statStarsCaption')}
              loading={stars === null}
              valueClassName="text-yellow-400"
            />
            <SponsorMetricTile
              icon={Users}
              iconClassName="text-purple-400"
              value={contributors}
              caption={t('main.sponsorModal.statContributorsCaption')}
              loading={contributors === null}
              valueClassName="text-purple-400"
            />
            <SponsorMetricTile
              icon={GitFork}
              iconClassName="text-sky-400"
              value={forks}
              caption={t('main.sponsorModal.statForksCaption')}
              loading={forks === null}
              valueClassName="text-sky-300"
            />
            <SponsorMetricTile
              icon={CircleDot}
              iconClassName="text-orange-400"
              value={openIssues}
              caption={t('main.sponsorModal.statIssuesCaption')}
              loading={openIssues === null}
              valueClassName="text-orange-300"
            />
            <SponsorMetricTile
              icon={Clock}
              iconClassName="text-slate-400"
              value={lastPushText}
              caption={t('main.sponsorModal.statUpdatedCaption')}
              loading={!lastPushText}
              valueClassName="text-sm text-slate-200"
            />
            <SponsorMetricTile
              icon={Sparkles}
              iconClassName="text-emerald-400"
              value={t('main.sponsorModal.statFree')}
              caption={t('main.sponsorModal.statFreeCaption')}
              loading={false}
              valueClassName="text-emerald-400"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2 px-6 sm:px-8 pb-6">
          <p className="text-sm text-center text-slate-300 font-mono">
            <span className="text-amber-400">//</span>{' '}
            {t('main.sponsorModal.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              asChild
              variant="default"
              size="default"
              className="w-full sm:flex-1 h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-900 border border-emerald-400/50 shadow-emerald-500/25 hover:scale-105 hover:shadow-emerald-500/40 font-mono"
            >
              <a
                href={SPONSOR_GITHUB_SPONSORS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <Heart className="size-5 fill-slate-900/20 shrink-0" />
                {t('main.sponsor')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="default"
              className="w-full sm:flex-1 h-12 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 font-mono"
            >
              <a
                href={SPONSOR_BUY_ME_A_COFFEE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <Coffee className="size-5 shrink-0" />
                {t('main.buyMeACoffee')}
              </a>
            </Button>
          </div>

          <a
            href={SPONSOR_GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-yellow-400 font-mono text-xs transition-colors"
          >
            <Star className="h-3.5 w-3.5 shrink-0" />
            {t('main.sponsorModal.starRepoCta')}
          </a>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono flex-wrap">
            <Badge
              variant="outline"
              className="text-xs bg-slate-800 border-emerald-500/30 text-emerald-400 font-mono"
              aria-hidden
            >
              ♥
            </Badge>
            <span>
              <span className="text-amber-400">//</span>{' '}
              {t('main.sponsorModal.supportLine')}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
