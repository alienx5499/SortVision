import { seoTranslations, algorithms, globalKeywords } from './data';

const getLocalizedContent = (language, section, params = {}) => {
  const translations = seoTranslations[language] || seoTranslations.en;
  const content = translations[section] || seoTranslations.en[section];

  const interpolate = text => {
    if (typeof text !== 'string') return text;
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  };

  const result = {};
  for (const [key, value] of Object.entries(content)) {
    result[key] = interpolate(value);
  }

  return result;
};

export const getAlgorithmMetaTags = (algorithmName, language = 'en') => {
  const algorithm = algorithms[algorithmName] || {
    name: 'Sorting Algorithm',
    keywords: globalKeywords.slice(0, 10).join(', '),
  };

  const content = getLocalizedContent(language, 'algorithm', {
    algorithm: algorithm.name,
  });

  return {
    baseTitle: String(content.title || '')
      .split('|')[0]
      .trim(),
    baseDescription: String(content.description || '').trim(),
  };
};

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
        'Contribuye a SortVision - Proyecto de Visualizador de Algoritmos de Codigo Abierto',
      description:
        'Unete a la comunidad de codigo abierto de SortVision! Contribuye al mejor visualizador de algoritmos del mundo. Ve estadisticas de contribuidores, accede a guias de contribucion y ayuda a mejorar la educacion en algoritmos para desarrolladores de todo el mundo.',
      keywords:
        'contribuciones SortVision, visualizador de algoritmos de codigo abierto, contribuir a SortVision, contribuciones GitHub, contribuidores del visualizador de algoritmos, proyecto DSA de codigo abierto, desarrollo de visualizacion de algoritmos, contribuciones de educacion en programacion, codigo abierto de ciencias de la computacion',
    },
    hi: {
      title:
        'SortVision में योगदान दें - ओपन सोर्स एल्गोरिदम विजुअलाइजर प्रोजेक्ट',
      description:
        'SortVision ओपन सोर्स कम्युनिटी में शामिल हों! दुनिया के सबसे अच्छे एल्गोरिदम विजुअलाइजर में योगदान दें। योगदानकर्ता आंकड़े देखें, योगदान गाइड तक पहुंचें और दुनिया भर के डेवलपर्स के लिए एल्गोरिदम शिक्षा में सुधार करने में मदद करें।',
      keywords:
        'SortVision योगदान, ओपन सोर्स एल्गोरिदम विजुअलाइजर, SortVision में योगदान, GitHub योगदान, एल्गोरिदम विजुअलाइजर योगदानकर्ता, ओपन सोर्स DSA प्रोजेक्ट, एल्गोरिदम विजुअलाइजेशन डेवलपमेंट, प्रोग्रामिंग शिक्षा योगदान, कंप्यूटर विज्ञान ओपन सोर्स',
    },
    fr: {
      title:
        "Contribuez a SortVision - Projet de Visualiseur d'Algorithmes Open Source",
      description:
        "Rejoignez la communaute open source de SortVision ! Contribuez au meilleur visualiseur d'algorithmes au monde. Consultez les statistiques des contributeurs, accedez aux guides de contribution et aidez a ameliorer l'education algorithmique pour les developpeurs du monde entier.",
      keywords:
        "contributions SortVision, visualiseur d'algorithmes open source, contribuer a SortVision, contributions GitHub, contributeurs du visualiseur d'algorithmes, projet DSA open source, developpement de visualisation d'algorithmes, contributions education programmation, open source informatique",
    },
    de: {
      title:
        'Beitragen zu SortVision - Open Source Algorithmus-Visualisierer Projekt',
      description:
        'Treten Sie der SortVision Open Source Community bei! Tragen Sie zum weltweit besten Algorithmus-Visualisierer bei. Sehen Sie sich Mitwirkenden-Statistiken an, greifen Sie auf Beitragsleitfaden zu und helfen Sie dabei, die Algorithmus-Ausbildung fur Entwickler weltweit zu verbessern.',
      keywords:
        'SortVision Beitrage, Open Source Algorithmus-Visualisierer, zu SortVision beitragen, GitHub Beitrage, Algorithmus-Visualisierer Mitwirkende, Open Source DSA Projekt, Algorithmus-Visualisierung Entwicklung, Programmierausbildung Beitrage, Informatik Open Source',
    },
    zh: {
      title: '为SortVision贡献 - 开源算法可视化器项目',
      description:
        '加入SortVision开源社区，为算法可视化教育项目贡献代码与文档。查看贡献者统计、提交记录和贡献指南，帮助全球开发者更高效学习排序算法与DSA核心概念。',
      keywords:
        'SortVision贡献, 开源算法可视化器, 为SortVision贡献, GitHub贡献, 算法可视化器贡献者, 开源DSA项目, 算法可视化开发, 编程教育贡献, 计算机科学开源',
    },
    bn: {
      title: 'SortVision-এ অবদান রাখুন - ওপেন সোর্স অ্যালগরিদম ভিজ্যুয়ালাইজার',
      description:
        'SortVision ওপেন সোর্স কমিউনিটিতে যোগ দিন এবং অ্যালগরিদম শিক্ষাকে আরও শক্তিশালী করতে কোড, ডকুমেন্টেশন ও আইডিয়া দিয়ে অবদান রাখুন। কন্ট্রিবিউটর স্ট্যাটস, গাইডলাইন এবং প্রকল্প আপডেট দেখে কাজ শুরু করুন।',
      keywords:
        'SortVision অবদান, ওপেন সোর্স অ্যালগরিদম ভিজ্যুয়ালাইজার, SortVision-এ কন্ট্রিবিউট, GitHub অবদান, অ্যালগরিদম ভিজ্যুয়ালাইজার কন্ট্রিবিউটর, ওপেন সোর্স DSA প্রজেক্ট, প্রোগ্রামিং শিক্ষা অবদান',
    },
    ja: {
      title:
        'SortVision への貢献 - オープンソースのアルゴリズム可視化プロジェクト',
      description:
        'SortVision のオープンソースコミュニティに参加して、アルゴリズム学習のための可視化プラットフォームを改善しましょう。貢献ガイド、統計、更新情報を確認してすぐに参加できます。',
      keywords:
        'SortVision 貢献, オープンソース アルゴリズム可視化, SortVision に貢献, GitHub 貢献, アルゴリズム可視化 コントリビューター, DSA 学習プロジェクト, プログラミング教育',
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

export const getSSOCMetaTags = () => ({
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
});
