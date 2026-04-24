import React, { useEffect, useMemo, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getGithubApiHeaders } from '@/utils/githubApi';

const DEVELOPER_USERNAME = 'alienx5499';
const GITHUB_PROFILE = `https://github.com/${DEVELOPER_USERNAME}`;
const REPO = 'alienx5499/SortVision';
const GITHUB_SPONSORS = 'https://github.com/sponsors/alienx5499';
const BUY_ME_A_COFFEE = 'https://buymeacoffee.com/alienx5499';
const GITHUB_REPO = `https://github.com/${REPO}`;

const DATE_LOCALES = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  hi: 'hi-IN',
  bn: 'bn-BD',
  de: 'de-DE',
  zh: 'zh-CN',
  ja: 'ja-JP',
  jp: 'ja-JP',
};

function formatRepoDate(iso, locale) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return null;
  }
}

function MetricTile({
  icon: Icon,
  iconClassName,
  value,
  caption,
  valueClassName = 'text-slate-100',
  loading,
}) {
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

/**
 * Sponsor dialog — original emerald shell (header, wide card) with personal copy + live GitHub stats.
 */
const SponsorFloatingModal = ({ isOpen, onClose }) => {
  const { t, language, getLocalizedUrl } = useLanguage();
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [openIssues, setOpenIssues] = useState(null);
  const [pushedAt, setPushedAt] = useState(null);
  const [contributors, setContributors] = useState(null);

  const dateLocale = DATE_LOCALES[language] ?? 'en-US';
  const lastPushText = formatRepoDate(pushedAt, dateLocale);

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
    let cancelled = false;

    const fetchRepo = async () => {
      try {
        const res = await fetch(`/api/github/repos/${REPO}`, {
          headers: getGithubApiHeaders(),
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled && data && typeof data === 'object') {
          if (typeof data.stargazers_count === 'number') {
            setStars(data.stargazers_count);
          }
          if (typeof data.forks_count === 'number') {
            setForks(data.forks_count);
          }
          if (typeof data.open_issues_count === 'number') {
            setOpenIssues(data.open_issues_count);
          }
          if (typeof data.pushed_at === 'string') {
            setPushedAt(data.pushed_at);
          }
        }
      } catch {
        /* ignore */
      }
    };

    const fetchContributors = async () => {
      try {
        let total = 0;
        let page = 1;
        while (!cancelled) {
          const res = await fetch(
            `/api/github/repos/${REPO}/contributors?per_page=100&page=${page}&anon=false`,
            { headers: getGithubApiHeaders() }
          );
          if (!res.ok) break;
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          total += data.length;
          if (data.length < 100) break;
          page += 1;
        }
        if (!cancelled) {
          setContributors(Math.max(0, total - 1));
        }
      } catch {
        if (!cancelled) setContributors(null);
      }
    };

    fetchRepo();
    fetchContributors();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => {
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
          <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
        </button>

        <CardHeader className="text-center pr-12 pb-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart
              className="h-7 w-7 text-emerald-400 animate-pulse"
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
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-semibold underline decoration-emerald-400/50 underline-offset-[3px] transition-colors hover:text-emerald-300 hover:decoration-emerald-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
            >
              {DEVELOPER_USERNAME}
            </a>
            {t('main.sponsorModal.openerIntroSuffix')}
            {contributors !== null ? (
              <Link
                to={getLocalizedUrl('contributions/overview')}
                onClick={onClose}
                className="text-purple-400 underline decoration-purple-400/45 underline-offset-[3px] transition-colors hover:text-fuchsia-300 hover:decoration-fuchsia-300/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
              >
                {t('main.sponsorModal.openerContributorsKnown', {
                  count: contributors,
                })}
              </Link>
            ) : (
              <Link
                to={getLocalizedUrl('contributions/overview')}
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
            <MetricTile
              icon={Star}
              iconClassName="fill-yellow-400 text-yellow-400"
              value={stars}
              caption={t('main.sponsorModal.statStarsCaption')}
              loading={stars === null}
              valueClassName="text-yellow-400"
            />
            <MetricTile
              icon={Users}
              iconClassName="text-purple-400"
              value={contributors}
              caption={t('main.sponsorModal.statContributorsCaption')}
              loading={contributors === null}
              valueClassName="text-purple-400"
            />
            <MetricTile
              icon={GitFork}
              iconClassName="text-sky-400"
              value={forks}
              caption={t('main.sponsorModal.statForksCaption')}
              loading={forks === null}
              valueClassName="text-sky-300"
            />
            <MetricTile
              icon={CircleDot}
              iconClassName="text-orange-400"
              value={openIssues}
              caption={t('main.sponsorModal.statIssuesCaption')}
              loading={openIssues === null}
              valueClassName="text-orange-300"
            />
            <MetricTile
              icon={Clock}
              iconClassName="text-slate-400"
              value={lastPushText}
              caption={t('main.sponsorModal.statUpdatedCaption')}
              loading={!lastPushText}
              valueClassName="text-sm text-slate-200"
            />
            <MetricTile
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
              className="w-full sm:flex-1 h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-900 border border-emerald-400/50 shadow-emerald-500/25 hover:scale-105 hover:shadow-emerald-500/40 font-mono"
            >
              <a
                href={GITHUB_SPONSORS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <Heart className="h-5 w-5 fill-slate-900/20 shrink-0" />
                {t('main.sponsor')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:flex-1 h-12 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 font-mono"
            >
              <a
                href={BUY_ME_A_COFFEE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <Coffee className="h-5 w-5 shrink-0" />
                {t('main.buyMeACoffee')}
              </a>
            </Button>
          </div>

          <a
            href={GITHUB_REPO}
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
};

export default SponsorFloatingModal;
