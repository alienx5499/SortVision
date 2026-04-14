import React from 'react';

const AlgorithmSchemas = ({
  algorithm,
  tab,
  baseUrl,
  geoSummary,
  keywords,
}) => {
  if (!algorithm) return null;

  const algorithmName =
    algorithm.charAt(0).toUpperCase() + algorithm.slice(1) + ' Sort';
  const algorithmPath = `${baseUrl}/algorithms/${tab}/${algorithm}`;

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${algorithmName} Algorithm Visualization and Tutorial`,
    description: geoSummary,
    keywords,
    author: {
      '@type': 'Person',
      name: 'Prabal Patra',
      url: 'https://github.com/alienx5499',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SortVision',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
      },
    },
    datePublished: '2024-03-26',
    dateModified: '2025-10-22',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': algorithmPath,
    },
    educationalUse: 'Interactive Visualization',
    timeRequired: 'PT10M',
  };

  const breadcrumbSchema = {
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
        name: algorithmName,
        item: algorithmPath,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `When should I use ${algorithmName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${algorithmName} is useful when its trade-offs align with dataset size, stability requirements, and implementation constraints.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the time complexity of ${algorithmName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${algorithmName} complexity depends on input order and implementation details; review best, average, and worst cases on the metrics tab.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(techArticleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </>
  );
};

export default AlgorithmSchemas;
