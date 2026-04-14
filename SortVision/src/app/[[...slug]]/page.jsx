import { ClientOnly } from './client';
import {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
  algorithms,
  globalKeywords,
} from '../../utils/seo';
import { buildTitle } from '../../utils/seo/engine/title';
import { buildDescription } from '../../utils/seo/engine/description';
import { buildKeywords } from '../../utils/seo/engine/keywords';
import {
  ROBOTS_DIRECTIVES,
  SUPPORTED_LANGUAGES,
  LANGUAGE_ALIASES,
  MAX_SEO_TITLE_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_OG_DESCRIPTION_LENGTH,
} from '../../utils/seo/constants';

const ALGORITHM_TABS = ['config', 'details', 'metrics'];

const clamp = (value = '', max) => {
  if (value.length <= max) return value;
  const wordSafe = value.slice(0, max).split(' ').slice(0, -1).join(' ');
  return wordSafe.trim() || value.slice(0, max);
};

const toAlgorithmLabel = algorithm =>
  String(algorithms[algorithm]?.name || algorithm || 'Sorting')
    .replace(/\s+Sort$/i, '')
    .trim();

const resolveAlgorithmRoute = slug => {
  if (slug[0] !== 'algorithms') return null;

  const inferredTab = slug[2] ? slug[1] : 'config';
  const rawTab = String(inferredTab || 'config').toLowerCase();
  const tab = ALGORITHM_TABS.includes(rawTab) ? rawTab : 'config';
  const rawAlgorithm = slug[2] || slug[1];
  const algorithm = String(rawAlgorithm || '').toLowerCase();

  if (!algorithm || !algorithms[algorithm]) return null;
  return { algorithm, tab };
};

const escapeJsonLdForInlineScript = value =>
  value.replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');

const zhTemplates = {
  config: label => ({
    title: `${label} 排序可视化（逐步动画）| SortVision`,
    description: `通过逐步动画查看${label}排序的可视化过程，理解算法如何工作。`,
  }),
  details: label => ({
    title: `${label} 排序算法详解 | SortVision`,
    description: `逐步讲解${label}排序算法的原理、过程和示例。`,
  }),
  metrics: label => ({
    title: `${label} 排序时间复杂度解析 | SortVision`,
    description: `讲解${label}排序的时间复杂度，包括最佳、平均和最坏情况。`,
  }),
};

const bnTemplates = {
  config: label => ({
    title: `${label} সর্ট ভিজ্যুয়ালাইজেশন (ধাপে ধাপে অ্যানিমেশন) | SortVision`,
    description: `${label} সর্ট অ্যালগরিদম কীভাবে কাজ করে তা ধাপে ধাপে অ্যানিমেশনের মাধ্যমে দেখুন।`,
  }),
  details: label => ({
    title: `${label} সর্ট অ্যালগরিদম ব্যাখ্যা | SortVision`,
    description: `${label} সর্ট অ্যালগরিদম ধাপে ধাপে ব্যাখ্যা এবং উদাহরণসহ বুঝুন।`,
  }),
  metrics: label => ({
    title: `${label} সর্ট টাইম কমপ্লেক্সিটি ব্যাখ্যা | SortVision`,
    description: `${label} সর্টের টাইম কমপ্লেক্সিটি (best, average, worst case) বিশ্লেষণ।`,
  }),
};

const getLocale = language =>
  language === 'es'
    ? 'es_ES'
    : language === 'hi'
      ? 'hi_IN'
      : language === 'fr'
        ? 'fr_FR'
        : language === 'de'
          ? 'de_DE'
          : language === 'zh'
            ? 'zh_CN'
            : language === 'bn'
              ? 'bn_BD'
              : language === 'ja'
                ? 'ja_JP'
                : 'en_US';

const generateHreflangAlternates = basePath => {
  const alternates = {};
  const seen = new Set();

  const add = (hreflangCode, langForPath) => {
    const path =
      hreflangCode === 'en' ? basePath : `/${langForPath}${basePath}`;
    const fullUrl = `https://www.sortvision.com${path}`;
    if (!seen.has(hreflangCode)) {
      alternates[hreflangCode] = fullUrl;
      seen.add(hreflangCode);
    }
  };

  add('en', 'en');
  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang !== 'en') add(lang, lang);
  });
  alternates['x-default'] = `https://www.sortvision.com${basePath}`;
  return alternates;
};

const buildAlternates = ({ basePath, language }) => ({
  canonical: `https://www.sortvision.com${
    language === 'en' ? basePath : `/${language}${basePath}`
  }`,
  languages: generateHreflangAlternates(basePath),
});

const resolveMetadata = ({ algorithm, tab, language }) => {
  const metaTags = getAlgorithmMetaTags(algorithm, language);
  const algorithmConfig = algorithms[algorithm] || {};
  const label = toAlgorithmLabel(algorithm);
  const deterministicFallback = {
    title: buildTitle({ label, tab }),
    description: buildDescription({ label, tab }),
  };
  const localizedTemplate =
    language === 'zh' && zhTemplates[tab]
      ? zhTemplates[tab](label)
      : language === 'bn' && bnTemplates[tab]
        ? bnTemplates[tab](label)
        : null;

  const englishConfigOverride =
    language === 'en' && tab === 'config' && algorithmConfig.seo_title
      ? {
          title: algorithmConfig.seo_title,
          description: algorithmConfig.seo_description,
        }
      : language === 'en' && tab === 'metrics'
        ? {
            title: `${label} Sort Time Complexity Explained | SortVision`,
            description: `${label} sort time complexity explained with best, average, and worst cases, plus interview-focused performance analysis.`,
          }
        : null;

  const localizedMeta =
    language !== 'en'
      ? {
          title: String(metaTags.baseTitle || '').trim(),
          description: String(metaTags.baseDescription || '').trim(),
        }
      : null;

  const resolvedMeta =
    englishConfigOverride ||
    localizedTemplate ||
    (localizedMeta?.title && localizedMeta?.description
      ? localizedMeta
      : null) ||
    deterministicFallback;
  const fallbackDescription =
    (metaTags.baseDescription || '').trim() ||
    deterministicFallback.description;
  const title = clamp(
    String(resolvedMeta.title || deterministicFallback.title).trim(),
    MAX_SEO_TITLE_LENGTH
  );
  const description = clamp(
    resolvedMeta.description || fallbackDescription,
    MAX_SEO_DESCRIPTION_LENGTH
  );

  const algorithmKeywords = algorithms[algorithm]?.keywords || '';
  const keywords = buildKeywords(label, algorithmKeywords, globalKeywords);

  return {
    title,
    description,
    socialDescription: clamp(description, MAX_OG_DESCRIPTION_LENGTH),
    keywords,
  };
};

const buildSEOFields = ({
  title,
  description,
  algorithm,
  currentUrl,
  language,
}) => ({
  openGraph: {
    type: 'website',
    url: `https://www.sortvision.com${currentUrl}`,
    title,
    description,
    images: [
      {
        url: 'https://www.sortvision.com/og-image.png',
        width: 1200,
        height: 630,
        alt: `${
          algorithms[algorithm]?.name || 'Sorting Algorithm'
        } Visualization - SortVision`,
      },
    ],
    siteName: 'SortVision',
    locale: getLocale(language),
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://www.sortvision.com/og-image.png'],
    creator: '@alienx5499',
    site: '@alienx5499',
  },
});

const parseRouteContext = async ({ params }) => {
  const resolvedParams = await params;
  const slug = [...(resolvedParams.slug || [])];

  let language = 'en';
  const rawLanguage = slug[0];
  const mappedLanguage = LANGUAGE_ALIASES[rawLanguage] || rawLanguage;
  if (slug.length > 0 && SUPPORTED_LANGUAGES.includes(mappedLanguage)) {
    language = mappedLanguage;
    slug.shift();
  }

  return { slug, language };
};

const buildAlgorithmEducationalContent = (algorithm, tab) => {
  const algorithmName =
    algorithms[algorithm]?.name || `${toAlgorithmLabel(algorithm)} Sort`;
  const complexity = algorithms[algorithm]?.complexity || {};

  const faqItems = [
    {
      question: `How does ${algorithmName} work?`,
      answer: `${algorithmName} progressively rearranges values into sorted order through repeated comparison and movement steps shown in the visualizer.`,
    },
    {
      question: `When should I use ${algorithmName}?`,
      answer: `Use ${algorithmName} when its trade-offs match your constraints, especially around runtime behavior, implementation complexity, and memory usage.`,
    },
    {
      question: `What is the time complexity of ${algorithmName}?`,
      answer: `${algorithmName} complexity varies by case. Review the metrics tab for best, average, and worst-case behavior before choosing it for production.`,
    },
    {
      question: `Is ${algorithmName} useful for coding interviews?`,
      answer: `Yes. Interview questions often test your ability to explain ${algorithmName}, compare it to alternatives, and justify it for specific inputs.`,
    },
  ];

  return {
    heading: `${algorithmName} Visualization`,
    intro:
      tab === 'metrics'
        ? `${algorithmName} metrics are shown with best, average, and worst-case analysis so you can compare practical performance before selecting this approach.`
        : `${algorithmName} is explained with step-by-step animation so you can understand exactly how each comparison and movement contributes to sorted output.`,
    explanation: `This guide covers how ${algorithmName} works, where it performs well, common edge cases, and how to reason about it in interview and real-world contexts. You can use this page to build algorithm intuition, verify complexity trade-offs, and compare behavior against other sorting strategies without relying on abstract textbook descriptions.`,
    deepDive: [
      `${algorithmName} execution is easier to learn when you track each array transition instead of memorizing formulas. The visualizer shows exactly which elements are compared, swapped, or moved at every stage, so beginners and experienced developers can quickly identify why a specific input shape changes runtime characteristics.`,
      `For practical engineering work, ${algorithmName} should be evaluated against data distribution, memory budget, and stability expectations. Nearly sorted data, reverse-sorted data, and duplicate-heavy arrays can trigger very different behavior depending on implementation details, which is why side-by-side tab analysis matters for real project decisions.`,
      `For interview preparation, this page helps you explain not just Big O, but also decision criteria: when ${algorithmName} is the right fit, when merge sort or quick sort is stronger, and how to justify trade-offs clearly. Strong answers connect conceptual complexity to observed step-by-step behavior, and that is exactly what this content is designed to support.`,
    ],
    complexity: [
      `Best case: ${complexity.best || 'Refer to metrics tab'}`,
      `Average case: ${complexity.average || 'Refer to metrics tab'}`,
      `Worst case: ${complexity.worst || 'Refer to metrics tab'}`,
      `Space complexity: ${complexity.space || 'Refer to metrics tab'}`,
    ],
    useCases: [
      `Use ${algorithmName} when you need clear execution traceability for learning and debugging.`,
      `Compare ${algorithmName} against merge sort and quick sort for your dataset size and distribution.`,
      `Validate ${algorithmName} behavior on nearly sorted, reverse-sorted, and duplicate-heavy inputs.`,
    ],
    faqItems,
  };
};

const buildSchemaData = ({ slug, language }) => {
  const baseUrl = 'https://www.sortvision.com';
  const algorithmRoute = resolveAlgorithmRoute(slug);

  if (algorithmRoute) {
    const { algorithm, tab } = algorithmRoute;
    const algorithmName =
      algorithms[algorithm]?.name || `${toAlgorithmLabel(algorithm)} Sort`;
    const canonicalPath = `/algorithms/config/${algorithm}`;
    const path = canonicalPath;
    const localizedPath = language === 'en' ? path : `/${language}${path}`;
    const pageUrl = `${baseUrl}${localizedPath}`;
    const educationalContent = buildAlgorithmEducationalContent(algorithm, tab);

    const techArticle = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${algorithmName} Explained`,
      about: algorithmName,
      description: educationalContent.explanation,
      author: {
        '@type': 'Person',
        name: 'Prabal Patra',
      },
      mainEntityOfPage: pageUrl,
    };

    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Algorithms',
          item: `${baseUrl}${language === 'en' ? '/algorithms' : `/${language}/algorithms`}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: algorithmName,
          item: pageUrl,
        },
      ],
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: educationalContent.faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    return {
      scripts: [techArticle, breadcrumbList, faqSchema],
      educationalContent,
    };
  }

  if (slug.length === 0) {
    const webApplication = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SortVision',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      url: baseUrl,
    };

    const homepageFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is SortVision?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SortVision is an interactive platform to learn sorting algorithms with visual step-by-step animations, complexity insights, and practical learning guidance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which sorting algorithms does SortVision support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SortVision supports major sorting algorithms including Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, Heap Sort, Radix Sort, and Bucket Sort.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is SortVision free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. SortVision is free to use and provides open educational content for algorithm learning and interview preparation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does SortVision help with coding interview preparation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SortVision helps candidates understand algorithm behavior, compare time and space complexity, and explain sorting trade-offs clearly during coding interviews.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I compare sorting algorithms on SortVision?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. SortVision provides side-by-side insights through dedicated tabs and related links so you can compare sorting strategies across different input scenarios.',
          },
        },
      ],
    };

    const homepageBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.sortvision.com',
        },
      ],
    };

    return {
      scripts: [webApplication, homepageFaqSchema, homepageBreadcrumbSchema],
      educationalContent: {
        heading: 'Sorting Algorithms Visualization',
        intro:
          'SortVision provides interactive sorting algorithm visualization for students, interview preparation, and practical algorithm understanding.',
        explanation:
          'Explore step-by-step behavior, compare time complexity across algorithms, and learn when each sorting strategy is a good fit.',
        complexity: [],
        useCases: [
          'Learn algorithm fundamentals with visual execution states.',
          'Compare sorting strategy trade-offs before implementation.',
          'Practice interview-style reasoning with concrete examples.',
        ],
        faqItems: [],
      },
    };
  }

  return { scripts: [], educationalContent: null };
};

// Generate metadata dynamically based on the route
export async function generateMetadata({ params, searchParams }) {
  const { slug, language: parsedLanguage } = await parseRouteContext({
    params,
  });
  const resolvedSearchParams = await searchParams;
  let language = parsedLanguage;

  // Fallback to query parameter for backward compatibility
  if (
    language === 'en' &&
    resolvedSearchParams?.lang &&
    SUPPORTED_LANGUAGES.includes(
      LANGUAGE_ALIASES[resolvedSearchParams.lang] || resolvedSearchParams.lang
    )
  ) {
    language =
      LANGUAGE_ALIASES[resolvedSearchParams.lang] || resolvedSearchParams.lang;
  }

  // Handle algorithm pages: /algorithms/{tab}/{algorithm}
  const algorithmRoute = resolveAlgorithmRoute(slug);
  if (algorithmRoute) {
    const { algorithm, tab } = algorithmRoute;
    const resolved = resolveMetadata({ algorithm, tab, language });

    const basePath = `/algorithms/${tab}/${algorithm}`;
    const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;

    // Canonicalize all algorithm tabs to config route to avoid duplicate-page signals.
    const canonicalBasePath = `/algorithms/config/${algorithm}`;
    const seoFields = buildSEOFields({
      title: resolved.title,
      description: resolved.socialDescription,
      algorithm,
      currentUrl,
      language,
    });

    return {
      title: resolved.title,
      description: resolved.description,
      keywords: resolved.keywords,
      authors: [{ name: 'Prabal Patra' }],
      robots: ROBOTS_DIRECTIVES,
      ...seoFields,
      alternates: buildAlternates({ basePath: canonicalBasePath, language }),
    };
  }

  // Handle contributions pages
  if (slug[0] === 'contributions') {
    const section = slug[1] || 'overview';
    const contributorId = slug[2]; // For /contributions/overview/{contributorId}
    let metaTags;

    if (section === 'ssoc') {
      metaTags = getSSOCMetaTags();
    } else if (section === 'overview' && contributorId) {
      // Custom metadata for contributor detail pages
      metaTags = {
        title: `${contributorId} - Contributor Profile | SortVision`,
        description: `View ${contributorId}'s contributions to SortVision. See their pull requests, issues, commits, and impact on our open-source sorting algorithm visualizer.`,
        keywords: `${contributorId}, contributor, open source, SortVision, GitHub profile, contributions, pull requests, commits`,
        ogTitle: `${contributorId} - SortVision Contributor`,
        ogDescription: `Explore ${contributorId}'s contributions to the SortVision project and their impact on algorithm education.`,
        twitterTitle: `${contributorId} - SortVision Contributor`,
        twitterDescription: `Check out ${contributorId}'s contributions to SortVision algorithm visualizer project.`,
      };
    } else {
      metaTags = getContributionsMetaTags(language);
    }

    const basePath = contributorId
      ? `/contributions/${section}/${contributorId}`
      : `/contributions/${section}`;
    const currentUrl = language === 'en' ? basePath : `/${language}${basePath}`;

    return {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      authors: [{ name: 'Prabal Patra' }],
      robots: ROBOTS_DIRECTIVES,
      openGraph: {
        type: 'website',
        url: `https://www.sortvision.com${currentUrl}`,
        title: metaTags.ogTitle,
        description: metaTags.ogDescription,
        images: [
          {
            url: 'https://www.sortvision.com/og-image.png',
            width: 1200,
            height: 630,
            alt: 'SortVision - Open Source Algorithm Visualizer',
          },
        ],
        siteName: 'SortVision',
        locale:
          language === 'es'
            ? 'es_ES'
            : language === 'hi'
              ? 'hi_IN'
              : language === 'fr'
                ? 'fr_FR'
                : language === 'de'
                  ? 'de_DE'
                  : language === 'zh'
                    ? 'zh_CN'
                    : 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTags.twitterTitle,
        description: metaTags.twitterDescription,
        images: ['https://www.sortvision.com/og-image.png'],
        creator: '@alienx5499',
        site: '@alienx5499',
      },
      alternates: buildAlternates({ basePath, language }),
    };
  }

  // Default homepage metadata
  const metaTags = getHomepageMetaTags(language);
  const basePath = '/';
  // Fix: Language homepage URLs should not have trailing slash
  const currentUrl = language === 'en' ? basePath : `/${language}`;

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    authors: [{ name: 'Prabal Patra' }],
    robots: ROBOTS_DIRECTIVES,
    openGraph: {
      type: 'website',
      url: `https://www.sortvision.com${currentUrl}`,
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [
        {
          url: 'https://www.sortvision.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
        },
      ],
      siteName: 'SortVision',
      locale:
        language === 'es'
          ? 'es_ES'
          : language === 'hi'
            ? 'hi_IN'
            : language === 'fr'
              ? 'fr_FR'
              : language === 'de'
                ? 'de_DE'
                : language === 'zh'
                  ? 'zh_CN'
                  : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
      images: ['https://www.sortvision.com/og-image.png'],
      creator: '@alienx5499',
      site: '@alienx5499',
    },
    alternates: buildAlternates({ basePath, language }),
    other: {
      'meta-description': metaTags.description,
    },
  };
}

// Generate static params for known routes (optional for better performance)
export async function generateStaticParams() {
  const params = [];
  const supportedLanguages = SUPPORTED_LANGUAGES;

  // Homepage - all languages
  params.push({ slug: [] }); // English homepage
  supportedLanguages.slice(1).forEach(lang => {
    params.push({ slug: [lang] });
  });

  // Base routes - all languages
  supportedLanguages.forEach(lang => {
    const prefix = lang === 'en' ? [] : [lang];
    params.push({ slug: [...prefix, 'algorithms'] });
    params.push({ slug: [...prefix, 'contributions'] });
  });

  // Generate params for algorithm pages - all languages
  const algorithmNames = Object.keys(algorithms);
  const tabs = ['config', 'details', 'metrics'];

  for (const algorithm of algorithmNames) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];

      // Individual algorithm pages without tab
      params.push({ slug: [...prefix, 'algorithms', algorithm] });

      // Algorithm pages with tabs
      for (const tab of tabs) {
        params.push({ slug: [...prefix, 'algorithms', tab, algorithm] });
      }
    }
  }

  // Generate params for contribution pages - all languages
  const contributionSections = ['overview', 'guide', 'ssoc'];
  for (const section of contributionSections) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({ slug: [...prefix, 'contributions', section] });
    }
  }

  // Add contributor detail pages - all languages
  const commonContributors = [
    'alienx5499',
    'dependabot[bot]',
    'github-actions[bot]',
  ];
  for (const contributor of commonContributors) {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({
        slug: [...prefix, 'contributions', 'overview', contributor],
      });
    }
  }

  // Add common system paths to prevent build errors (but NOT API routes)
  params.push({
    slug: ['.well-known', 'appspecific', 'com.chrome.devtools.json'],
  });
  params.push({ slug: ['favicon.ico'] });
  // Removed API routes - they should be handled by their own files, not the catch-all route

  return params;
}

export default async function Page({ params, searchParams: _searchParams }) {
  const { slug, language } = await parseRouteContext({ params });
  const { scripts, educationalContent } = buildSchemaData({ slug, language });
  const withLocale = path => (language === 'en' ? path : `/${language}${path}`);
  const currentAlgorithm = resolveAlgorithmRoute(slug)?.algorithm || null;
  const relatedAlgorithms = currentAlgorithm
    ? Object.keys(algorithms)
        .filter(key => key !== currentAlgorithm)
        .slice(0, 3)
        .map(key => ({
          key,
          label: algorithms[key]?.name || toAlgorithmLabel(key),
        }))
    : [];

  return (
    <>
      {scripts.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonLdForInlineScript(JSON.stringify(schema)),
          }}
        />
      ))}
      <ClientOnly />
      {educationalContent ? (
        <section
          className="sr-only"
          aria-label="Algorithm educational SEO content"
          aria-hidden="true"
        >
          <h2>{educationalContent.heading}</h2>
          <p className="mb-2">{educationalContent.intro}</p>
          <p className="mb-2">{educationalContent.explanation}</p>
          {educationalContent.deepDive?.map(paragraph => (
            <p key={paragraph} className="mb-2">
              {paragraph}
            </p>
          ))}
          <div className="mb-2">
            <h2>Related Algorithms</h2>
            <p className="mb-1">
              {relatedAlgorithms.length
                ? relatedAlgorithms.map((algo, index) => (
                    <span key={algo.key}>
                      {index === 0 ? 'Compare behavior with ' : ''}
                      {index > 0 && index === relatedAlgorithms.length - 1
                        ? ' and '
                        : index > 0
                          ? ', '
                          : ''}
                      <a
                        className="underline"
                        href={withLocale(`/algorithms/config/${algo.key}`)}
                        tabIndex={-1}
                      >
                        {algo.label}
                      </a>
                    </span>
                  ))
                : 'Explore other sorting algorithms to compare behavior and complexity.'}
              {relatedAlgorithms.length ? '.' : ''}
            </p>
          </div>
          {educationalContent.complexity.length ? (
            <div className="mb-2">
              <h2>Complexity Snapshot</h2>
              <ul className="list-disc pl-5">
                {educationalContent.complexity.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mb-2">
            <h2>When To Use</h2>
            <ul className="list-disc pl-5">
              {educationalContent.useCases.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {educationalContent.faqItems.length ? (
            <div>
              <h2>FAQ</h2>
              {educationalContent.faqItems.map(item => (
                <article key={item.question} className="mt-2">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
