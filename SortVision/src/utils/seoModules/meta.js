/**
 * SEO meta tag helpers.
 */

import { algorithms, globalKeywords, getLocalizedContent } from './constants';

/**
 * Generate meta tags for a specific algorithm page
 * @param {string} algorithmName - The algorithm identifier
 * @returns {Object} - Object containing meta tags for SEO
 */
export const getAlgorithmMetaTags = (algorithmName, language = 'en') => {
  const algorithm = algorithms[algorithmName] || {
    name: 'Sorting Algorithm',
    description:
      'Interactive visualization of sorting algorithms with data structures and algorithms education',
    complexity: 'Varies',
    keywords: globalKeywords.slice(0, 10).join(', '),
    seo_title: 'Sorting Algorithm Visualizer | Interactive DSA Learning Tool',
    seo_description:
      'Interactive visualization of sorting algorithms with real-time performance metrics and educational content for data structures and algorithms learning',
  };

  // Get language-specific content with algorithm name interpolation
  const content = getLocalizedContent(language, 'algorithm', {
    algorithm: algorithm.name,
  });

  return {
    title: content.title,
    description: content.description,
    keywords: `${content.keywords}, ${globalKeywords.slice(0, 15).join(', ')}`,
    ogTitle: content.title,
    ogDescription: content.description,
    twitterTitle: content.title,
    twitterDescription: content.description,
  };
};

/**
 * Generate enhanced meta tags for the homepage
 * @returns {Object} - Object containing homepage meta tags for SEO
 */
export const getHomepageMetaTags = (language = 'en') => {
  const content = getLocalizedContent(language, 'homepage');

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    ogTitle: content.title,
    ogDescription: content.description,
    twitterTitle: content.title,
    twitterDescription: content.description,
  };
};

/**
 * Generate meta tags for the contributions page
 * @param {string} language - Language code for localized content
 * @returns {Object} - Object containing contributions page meta tags for SEO
 */
export const getContributionsMetaTags = (language = 'en') => {
  const contributionsTranslations = {
    en: {
      title:
        'Contribute to SortVision - Open Source Algorithm Visualizer Project',
      description:
        "Join the SortVision open source community! Contribute to the world's best algorithm visualizer. View contributor stats, access contribution guides, and help improve algorithm education for developers worldwide.",
      keywords:
        'SortVision contributions, open source algorithm visualizer, contribute to SortVision, GitHub contributions, algorithm visualizer contributors, open source DSA project, algorithm visualization development, programming education contributions, computer science open source',
    },
    es: {
      title:
        'Contribuye a SortVision - Proyecto de Visualizador de Algoritmos de Código Abierto',
      description:
        '¡Únete a la comunidad de código abierto de SortVision! Contribuye al mejor visualizador de algoritmos del mundo. Ve estadísticas de contribuidores, accede a guías de contribución y ayuda a mejorar la educación en algoritmos para desarrolladores de todo el mundo.',
      keywords:
        'contribuciones SortVision, visualizador de algoritmos de código abierto, contribuir a SortVision, contribuciones GitHub, contribuidores del visualizador de algoritmos, proyecto DSA de código abierto, desarrollo de visualización de algoritmos, contribuciones de educación en programación, código abierto de ciencias de la computación',
    },
    hi: {
      title:
        'SortVision में योगदान दें - ओपन सोर्स एल्गोरिदम विज़ुअलाइज़र प्रोजेक्ट',
      description:
        'SortVision ओपन सोर्स कम्युनिटी में शामिल हों! दुनिया के सबसे अच्छे एल्गोरिदम विज़ुअलाइज़र में योगदान दें। योगदानकर्ता आंकड़े देखें, योगदान गाइड तक पहुंचें और दुनिया भर के डेवलपर्स के लिए एल्गोरिदम शिक्षा में सुधार करने में मदद करें।',
      keywords:
        'SortVision योगदान, ओपन सोर्स एल्गोरिदम विज़ुअलाइज़र, SortVision में योगदान, GitHub योगदान, एल्गोरिदम विज़ुअलाइज़र योगदानकर्ता, ओपन सोर्स DSA प्रोजेक्ट, एल्गोरिदम विज़ुअलाइज़ेशन डेवलपमेंट, प्रोग्रामिंग शिक्षा योगदान, कंप्यूटर विज्ञान ओपन सोर्स',
    },
    fr: {
      title:
        "Contribuez à SortVision - Projet de Visualiseur d'Algorithmes Open Source",
      description:
        "Rejoignez la communauté open source de SortVision ! Contribuez au meilleur visualiseur d'algorithmes au monde. Consultez les statistiques des contributeurs, accédez aux guides de contribution et aidez à améliorer l'éducation algorithmique pour les développeurs du monde entier.",
      keywords:
        "contributions SortVision, visualiseur d'algorithmes open source, contribuer à SortVision, contributions GitHub, contributeurs du visualiseur d'algorithmes, projet DSA open source, développement de visualisation d'algorithmes, contributions éducation programmation, open source informatique",
    },
    de: {
      title:
        'Beitragen zu SortVision - Open Source Algorithmus-Visualisierer Projekt',
      description:
        'Treten Sie der SortVision Open Source Community bei! Tragen Sie zum weltweit besten Algorithmus-Visualisierer bei. Sehen Sie sich Mitwirkenden-Statistiken an, greifen Sie auf Beitragsleitfäden zu und helfen Sie dabei, die Algorithmus-Ausbildung für Entwickler weltweit zu verbessern.',
      keywords:
        'SortVision Beiträge, Open Source Algorithmus-Visualisierer, zu SortVision beitragen, GitHub Beiträge, Algorithmus-Visualisierer Mitwirkende, Open Source DSA Projekt, Algorithmus-Visualisierung Entwicklung, Programmierausbildung Beiträge, Informatik Open Source',
    },
    zh: {
      title: '为SortVision贡献 - 开源算法可视化器项目',
      description:
        '加入SortVision开源社区！为世界上最好的算法可视化器做出贡献。查看贡献者统计信息，访问贡献指南，并帮助改善全球开发者的算法教育。',
      keywords:
        'SortVision贡献, 开源算法可视化器, 为SortVision贡献, GitHub贡献, 算法可视化器贡献者, 开源DSA项目, 算法可视化开发, 编程教育贡献, 计算机科学开源',
    },
  };

  const content =
    contributionsTranslations[language] || contributionsTranslations.en;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    ogTitle: content.title,
    ogDescription: content.description,
    twitterTitle: content.title,
    twitterDescription: content.description,
  };
};

/**
 * Generate meta tags for the SSOC leaderboard page
 * @returns {Object} - Object containing SSOC leaderboard page meta tags for SEO
 */
export const getSSOCMetaTags = () => {
  return {
    title: 'SSOC Leaderboard - Social Summer of Code Contributors',
    description:
      'View the Social Summer of Code (SSOC) leaderboard for SortVision contributors. Track progress, points, and achievements of SSOC participants contributing to the algorithm visualizer project.',
    keywords:
      'SSOC leaderboard, Social Summer of Code, SSOC contributors, open source leaderboard, algorithm visualizer contributors, SSOC points, SSOC achievements, open source program, student contributions',
    ogTitle: 'SSOC Leaderboard | Social Summer of Code Contributors',
    ogDescription:
      "Track SSOC participants' contributions to SortVision. View points, achievements, and rankings in the Social Summer of Code program.",
    twitterTitle: 'SSOC Leaderboard - Social Summer of Code Contributors',
    twitterDescription:
      'Follow the progress of SSOC participants contributing to SortVision. Real-time leaderboard with points and achievements.',
  };
};
