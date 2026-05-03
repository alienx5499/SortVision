import {
  BASE_URL,
  DEFAULT_LANGUAGE,
  HREFLANG_REGION_ALIASES,
  SUPPORTED_LANGUAGES,
} from './constants';
import { normalizeLanguage } from '@/config/i18n';

export const ensureMinimumDescriptionLength = (
  description: string,
  language: string,
  contextLabel = 'page'
): string => {
  if (!description) return description;
  const MIN_LENGTH = 150;
  const MAX_LENGTH = 165;
  if (description.length >= MIN_LENGTH) {
    return description.length > MAX_LENGTH
      ? `${description.slice(0, MAX_LENGTH - 1).trimEnd()}…`
      : description;
  }

  const EXPANSION_BY_LANGUAGE = {
    en:
      contextLabel === 'homepage'
        ? ' Explore sorting animations, compare runtime behavior, and strengthen DSA interview preparation.'
        : ` Explore this ${contextLabel} with interactive visuals and interview-focused DSA guidance.`,
    es:
      contextLabel === 'homepage'
        ? ' Explora animaciones de ordenamiento, compara rendimiento y fortalece tu preparación para entrevistas DSA.'
        : ' Explora esta página con visualización interactiva y guía práctica para entrevistas DSA.',
    hi:
      contextLabel === 'homepage'
        ? ' सॉर्टिंग एनीमेशन देखें, प्रदर्शन की तुलना करें और DSA इंटरव्यू तैयारी मजबूत करें।'
        : ' इस पेज को इंटरएक्टिव विजुअल्स और इंटरव्यू-केंद्रित DSA मार्गदर्शन के साथ समझें।',
    fr:
      contextLabel === 'homepage'
        ? ' Explorez les animations de tri, comparez les performances et renforcez votre préparation DSA.'
        : ' Explorez cette page avec des visuels interactifs et des conseils DSA orientés entretien.',
    de:
      contextLabel === 'homepage'
        ? ' Entdecke Sortieranimationen, vergleiche Laufzeiten und verbessere deine DSA-Interviewvorbereitung.'
        : ' Entdecke diese Seite mit interaktiven Visualisierungen und DSA-Interviewhilfe.',
    zh:
      contextLabel === 'homepage'
        ? ' 通过交互式排序动画对比性能表现，系统提升你的 DSA 面试准备效率。'
        : ' 通过交互式可视化学习本页面内容，并获得面试导向的 DSA 学习指引。',
    bn:
      contextLabel === 'homepage'
        ? ' ইন্টারঅ্যাকটিভ সোর্টিং অ্যানিমেশন দেখে পারফরম্যান্স তুলনা করুন এবং DSA ইন্টারভিউ প্রস্তুতি বাড়ান।'
        : ' ইন্টারঅ্যাকটিভ ভিজুয়াল ও ইন্টারভিউ-কেন্দ্রিক DSA গাইডসহ এই পেজটি অন্বেষণ করুন।',
    ja:
      contextLabel === 'homepage'
        ? ' ソートのアニメーションで挙動と性能を比較し、DSA面接対策を効果的に進められます。'
        : ' このページをインタラクティブ表示で学び、面接向けDSA理解を深められます。',
  };

  const expansion =
    EXPANSION_BY_LANGUAGE[language as keyof typeof EXPANSION_BY_LANGUAGE] ??
    EXPANSION_BY_LANGUAGE.en;
  const needed = MIN_LENGTH - description.length;
  const safeAppend = expansion.slice(0, Math.max(needed + 8, 0));
  const merged = `${description}${safeAppend}`.trim();

  return merged.length > MAX_LENGTH
    ? `${merged.slice(0, MAX_LENGTH - 1).trimEnd()}…`
    : merged;
};

export type MetadataSearchParams = Record<
  string,
  string | string[] | undefined
>;

export const resolveLanguageAndSlug = (
  slug: string[] | undefined,
  searchParams: MetadataSearchParams | undefined
) => {
  const slugParts = Array.isArray(slug) ? [...slug] : [];
  let language = DEFAULT_LANGUAGE;

  const fromSlug = normalizeLanguage(slugParts[0]);
  if (fromSlug && SUPPORTED_LANGUAGES.includes(fromSlug)) {
    language = fromSlug;
    slugParts.shift();
  }

  const fromSearch = normalizeLanguage(searchParams?.lang);
  if (
    language === DEFAULT_LANGUAGE &&
    fromSearch &&
    SUPPORTED_LANGUAGES.includes(fromSearch)
  ) {
    language = fromSearch;
  }

  return { language, slug: slugParts };
};

export const generateHreflangAlternates = (
  basePath: string
): Record<string, string> => {
  const alternates: Record<string, string> = {};
  const seen = new Set<string>();

  const add = (hreflangCode: string, langForPath: string) => {
    const path =
      hreflangCode === DEFAULT_LANGUAGE
        ? basePath
        : `/${langForPath}${basePath}`;
    const fullUrl = `${BASE_URL}${path}`;

    if (!seen.has(hreflangCode)) {
      alternates[hreflangCode] = fullUrl;
      seen.add(hreflangCode);
    }
  };

  add(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE);

  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang === DEFAULT_LANGUAGE) return;
    add(lang, lang);
  });

  SUPPORTED_LANGUAGES.forEach(lang => {
    const aliases =
      HREFLANG_REGION_ALIASES[lang as keyof typeof HREFLANG_REGION_ALIASES] ??
      [];
    aliases.forEach(alias => add(alias, lang));
  });

  alternates['x-default'] = `${BASE_URL}${basePath}`;

  return alternates;
};
