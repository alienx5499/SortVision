/**
 * SEO Utilities for SortVision
 *
 * This file contains utility functions for Search Engine Optimization,
 * including dynamic generation of metadata and sitemaps.
 */

// Language-specific SEO content - Easily extensible for new languages
const seoTranslations = {
  en: {
    homepage: {
      title: 'SortVision - Interactive Sorting Algorithm Visualizer',
      description: 'Interactive visualization of sorting algorithms including bubble sort, merge sort, quick sort, and more. Learn data structures and algorithms with real-time performance metrics and educational content.',
      keywords: 'sorting algorithm visualizer, DSA learning, data structures algorithms, coding interview prep, merge sort, quick sort, heap sort, bubble sort, computer science education, algorithm animation, interactive learning, programming tutorial, software engineering'
    },
    algorithm: {
      title: '{algorithm} Sort Visualizer - SortVision',
      description: 'Master {algorithm} sort algorithm with SortVision\'s interactive visualizer. Step-by-step animations, performance analysis, and comprehensive DSA learning for coding interviews.',
      keywords: '{algorithm} sort, sorting algorithm visualizer, DSA learning, algorithm animation, computer science education'
    }
  },
  es: {
    homepage: {
      title: 'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento',
      description: 'Visualización interactiva de algoritmos de ordenamiento incluyendo bubble sort, merge sort, quick sort y más. Aprende estructuras de datos y algoritmos con métricas de rendimiento en tiempo real y contenido educativo.',
      keywords: 'visualizador de algoritmos de ordenamiento, aprendizaje de DSA, estructuras de datos algoritmos, preparación para entrevistas de programación, merge sort, quick sort, heap sort, bubble sort, educación en ciencias de la computación, animación de algoritmos, aprendizaje interactivo, tutorial de programación, ingeniería de software'
    },
    algorithm: {
      title: 'Visualizador de {algorithm} Sort - SortVision',
      description: 'Domina el algoritmo {algorithm} sort con el visualizador interactivo de SortVision. Animaciones paso a paso, análisis de rendimiento y aprendizaje integral de DSA para entrevistas de programación.',
      keywords: '{algorithm} sort, visualizador de algoritmos de ordenamiento, aprendizaje de DSA, animación de algoritmos, educación en ciencias de la computación'
    }
  },
  hi: {
    homepage: {
      title: 'SortVision - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      description: 'बबल सॉर्ट, मर्ज सॉर्ट, क्विक सॉर्ट और अधिक सहित सॉर्टिंग एल्गोरिदम का इंटरैक्टिव विज़ुअलाइज़ेशन। रियल-टाइम प्रदर्शन मेट्रिक्स और शैक्षिक सामग्री के साथ डेटा स्ट्रक्चर और एल्गोरिदम सीखें।',
      keywords: 'सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, डेटा स्ट्रक्चर एल्गोरिदम, कोडिंग इंटरव्यू तैयारी, मर्ज सॉर्ट, क्विक सॉर्ट, हीप सॉर्ट, बबल सॉर्ट, कंप्यूटर विज्ञान शिक्षा, एल्गोरिदम एनीमेशन, इंटरैक्टिव सीखना, प्रोग्रामिंग ट्यूटोरियल, सॉफ्टवेयर इंजीनियरिंग'
    },
    algorithm: {
      title: '{algorithm} सॉर्ट विज़ुअलाइज़र - SortVision',
      description: 'SortVision के इंटरैक्टिव विज़ुअलाइज़र के साथ {algorithm} सॉर्ट एल्गोरिदम में महारत हासिल करें। चरण-दर-चरण एनीमेशन, प्रदर्शन विश्लेषण, और कोडिंग इंटरव्यू के लिए व्यापक DSA सीखना।',
      keywords: '{algorithm} सॉर्ट, सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, एल्गोरिदम एनीमेशन, कंप्यूटर विज्ञान शिक्षा'
    }
  },
  fr: {
    homepage: {
      title: 'SortVision - Visualiseur Interactif d\'Algorithmes de Tri',
      description: 'Visualisation interactive des algorithmes de tri incluant le tri à bulles, le tri par fusion, le tri rapide et plus. Apprenez les structures de données et algorithmes avec des métriques de performance en temps réel et du contenu éducatif.',
      keywords: 'visualiseur d\'algorithmes de tri, apprentissage DSA, structures de données algorithmes, préparation entretien programmation, tri par fusion, tri rapide, tri par tas, tri à bulles, éducation informatique, animation d\'algorithmes, apprentissage interactif, tutoriel programmation, ingénierie logicielle'
    },
    algorithm: {
      title: 'Visualiseur de Tri {algorithm} - SortVision',
      description: 'Maîtrisez l\'algorithme de tri {algorithm} avec le visualiseur interactif de SortVision. Animations étape par étape, analyse de performance et apprentissage DSA complet pour les entretiens de programmation.',
      keywords: 'tri {algorithm}, visualiseur d\'algorithmes de tri, apprentissage DSA, animation d\'algorithmes, éducation informatique'
    }
  },
  de: {
    homepage: {
      title: 'SortVision - Interaktiver Sortieralgorithmus-Visualisierer',
      description: 'Interaktive Visualisierung von Sortieralgorithmen einschließlich Bubble Sort, Merge Sort, Quick Sort und mehr. Lernen Sie Datenstrukturen und Algorithmen mit Echtzeit-Leistungsmetriken und Bildungsinhalten.',
      keywords: 'Sortieralgorithmus-Visualisierer, DSA-Lernen, Datenstrukturen Algorithmen, Programmierinterview-Vorbereitung, Merge Sort, Quick Sort, Heap Sort, Bubble Sort, Informatikausbildung, Algorithmus-Animation, interaktives Lernen, Programmiertutorial, Softwareentwicklung'
    },
    algorithm: {
      title: '{algorithm} Sort Visualisierer - SortVision',
      description: 'Meistern Sie den {algorithm} Sort-Algorithmus mit SortVisions interaktivem Visualisierer. Schritt-für-Schritt-Animationen, Leistungsanalyse und umfassendes DSA-Lernen für Programmierinterviews.',
      keywords: '{algorithm} Sort, Sortieralgorithmus-Visualisierer, DSA-Lernen, Algorithmus-Animation, Informatikausbildung'
    }
  },
  zh: {
    homepage: {
      title: 'SortVision - 交互式排序算法可视化器',
      description: '交互式排序算法可视化，包括冒泡排序、归并排序、快速排序等。通过实时性能指标和教育内容学习数据结构和算法。',
      keywords: '排序算法可视化器, DSA学习, 数据结构算法, 编程面试准备, 归并排序, 快速排序, 堆排序, 冒泡排序, 计算机科学教育, 算法动画, 交互式学习, 编程教程, 软件工程'
    },
    algorithm: {
      title: '{algorithm} 排序可视化器 - SortVision',
      description: '通过SortVision的交互式可视化器掌握{algorithm}排序算法。逐步动画、性能分析和全面的DSA学习，为编程面试做准备。',
      keywords: '{algorithm} 排序, 排序算法可视化器, DSA学习, 算法动画, 计算机科学教育'
    }
  },
  bn: {
    homepage: {
      title: 'SortVision - ইন্টারঅ্যাক্টিভ সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার',
      description: 'বাবল সর্ট, মার্জ সর্ট, কুইক সর্ট এবং আরও অনেক সর্টিং অ্যালগরিদমের ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন। রিয়েল-টাইম পারফরম্যান্স মেট্রিক্স এবং শিক্ষামূলক কন্টেন্টের সাথে ডেটা স্ট্রাকচার এবং অ্যালগরিদম শিখুন।',
      keywords: 'সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার, DSA শেখা, ডেটা স্ট্রাকচার অ্যালগরিদম, কোডিং ইন্টারভিউ প্রস্তুতি, মার্জ সর্ট, কুইক সর্ট, হিপ সর্ট, বাবল সর্ট, কম্পিউটার সায়েন্স শিক্ষা, অ্যালগরিদম অ্যানিমেশন, ইন্টারঅ্যাক্টিভ শেখা, প্রোগ্রামিং টিউটোরিয়াল, সফটওয়্যার ইঞ্জিনিয়ারিং'
    },
    algorithm: {
      title: '{algorithm} সর্ট ভিজ্যুয়ালাইজার - SortVision',
      description: 'SortVision এর ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজারের সাথে {algorithm} সর্ট অ্যালগরিদমে দক্ষতা অর্জন করুন। ধাপে ধাপে অ্যানিমেশন, পারফরম্যান্স বিশ্লেষণ এবং কোডিং ইন্টারভিউের জন্য ব্যাপক DSA শেখা।',
      keywords: '{algorithm} সর্ট, সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার, DSA শেখা, অ্যালগরিদম অ্যানিমেশন, কম্পিউটার সায়েন্স শিক্ষা'
    }
  },
  ja: {
    homepage: {
      title: 'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      description: 'バブルソート、マージソート、クイックソートなどを含むソートアルゴリズムのインタラクティブビジュアライゼーション。リアルタイムパフォーマンスメトリクスと教育コンテンツでデータ構造とアルゴリズムを学習。',
      keywords: 'ソートアルゴリズムビジュアライザー, DSA学習, データ構造アルゴリズム, コーディング面接準備, マージソート, クイックソート, ヒープソート, バブルソート, コンピュータサイエンス教育, アルゴリズムアニメーション, インタラクティブ学習, プログラミングチュートリアル, ソフトウェアエンジニアリング, ソートアルゴリズム, アルゴリズムビジュアライゼーション, ソートビジュアライザー, アルゴリズム学習, プログラミング教育'
    },
    algorithm: {
      title: '{algorithm} ソートビジュアライザー - SortVision',
      description: 'SortVisionのインタラクティブビジュアライザーで{algorithm}ソートアルゴリズムをマスター。ステップバイステップアニメーション、パフォーマンス分析、コーディング面接のための包括的なDSA学習。',
      keywords: '{algorithm} ソート, ソートアルゴリズムビジュアライザー, DSA学習, アルゴリズムアニメーション, コンピュータサイエンス教育, ソートアルゴリズム学習, プログラミング教育'
    }
  },
  jp: {
    homepage: {
      title: 'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      description: 'バブルソート、マージソート、クイックソートなどを含むソートアルゴリズムのインタラクティブビジュアライゼーション。リアルタイムパフォーマンスメトリクスと教育コンテンツでデータ構造とアルゴリズムを学習。',
      keywords: 'ソートアルゴリズムビジュアライザー, DSA学習, データ構造アルゴリズム, コーディング面接準備, マージソート, クイックソート, ヒープソート, バブルソート, コンピュータサイエンス教育, アルゴリズムアニメーション, インタラクティブ学習, プログラミングチュートリアル, ソフトウェアエンジニアリング, ソートアルゴリズム, アルゴリズムビジュアライゼーション, ソートビジュアライザー, アルゴリズム学習, プログラミング教育'
    },
    algorithm: {
      title: '{algorithm} ソートビジュアライザー - SortVision',
      description: 'SortVisionのインタラクティブビジュアライザーで{algorithm}ソートアルゴリズムをマスター。ステップバイステップアニメーション、パフォーマンス分析、コーディング面接のための包括的なDSA学習。',
      keywords: '{algorithm} ソート, ソートアルゴリズムビジュアライザー, DSA学習, アルゴリズムアニメーション, コンピュータサイエンス教育, ソートアルゴリズム学習, プログラミング教育'
    }
  }
};

// Utility function to get language-specific content with interpolation
const getLocalizedContent = (language, section, params = {}) => {
  const translations = seoTranslations[language] || seoTranslations.en;
  const content = translations[section] || seoTranslations.en[section];
  
  // Handle interpolation for dynamic content
  const interpolate = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  };
  
  // Interpolate all string values
  const result = {};
  for (const [key, value] of Object.entries(content)) {
    result[key] = interpolate(value);
  }
  
  return result;
};

// Supported languages configuration
export const supportedLanguages = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  jp: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' }
};

// Sorting algorithm information for SEO
export const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'A simple comparison sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    keywords:
      'bubble sort visualization, bubble sort visualizer, bubble sort animation, visualize bubble sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, comparison sort, swapping algorithm, in-place sorting algorithm, sorting animation, learn sorting, bubble sort tutorial, sorting algorithm visualization, computer science education, programming tutorial',
    seo_title:
      'Bubble Sort Visualization | Interactive Algorithm Animation | SortVision',
    seo_description:
      'Master Bubble Sort with interactive visualizations and animations. Learn how this simple comparison-based sorting algorithm works step-by-step. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics.',
  },
  insertion: {
    name: 'Insertion Sort',
    description:
      'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly taking the next unsorted item and inserting it into its correct position in the already sorted part.',
    complexity: 'O(n²)',
    keywords:
      'insertion sort visualization, insertion sort visualizer, insertion sort animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, efficient for small data sets, online algorithm, in-place sorting algorithm, sorting animation, learn sorting, insertion sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Insertion Sort Visualization | Interactive Algorithm Learning | SortVision',
    seo_description:
      'Master Insertion Sort with interactive visualizations and animations. Learn how this adaptive sorting algorithm efficiently sorts small datasets. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics.',
  },
  selection: {
    name: 'Selection Sort',
    description:
      'A sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
    complexity: 'O(n²)',
    keywords:
      'selection sort visualization, selection sort visualizer, selection sort animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, in-place comparison sort, simple sorting algorithm, sorting animation, learn sorting, selection sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Selection Sort Visualization | Interactive Algorithm Animation | SortVision',
    seo_description:
      'Master Selection Sort with interactive visualizations and animations. Learn how this simple in-place sorting algorithm finds the minimum element in each pass. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics.',
  },
  merge: {
    name: 'Merge Sort',
    description:
      'An efficient, stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    complexity: 'O(n log n)',
    keywords:
      'merge sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, divide and conquer, efficient sorting, stable sort, sorting animation, learn sorting, merge sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Merge Sort Visualizer | Efficient DSA Divide-and-Conquer Algorithm',
    seo_description:
      'See Merge Sort in action with our interactive DSA visualizer. Learn this efficient divide-and-conquer algorithm with step-by-step animation and performance tracking.',
  },
  quick: {
    name: 'Quick Sort',
    description:
      'An efficient, in-place sorting algorithm that uses the divide-and-conquer strategy with a pivot element to partition the array.',
    complexity: 'O(n log n) average, O(n²) worst case',
    keywords:
      'quick sort visualization, quick sort visualizer, quicksort visualization, quicksort visualizer, quick sort animation, quick sort calculator, quick sort partition visualization, partition visualization, quick sort algorithm visualization, quick sort visual, quicksort visual, quicksort visualisation, quick sort visualisation, quick sort dsa, quicksort algorithm animation, quick sort animation, quicksort algorithm visualization, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, pivot, partitioning, divide and conquer, efficient sorting, sorting animation, learn sorting, quick sort tutorial, computer science education, programming tutorial',
    seo_title: 'Quick Sort Visualization | Interactive Quicksort Algorithm | SortVision',
    seo_description:
      'Master Quick Sort with interactive visualizations and animations. Learn how this efficient divide-and-conquer algorithm uses pivot elements and partitioning. Perfect for understanding O(n log n) sorting algorithms with real-time performance metrics.',
  },
  heap: {
    name: 'Heap Sort',
    description:
      'A comparison-based sorting algorithm that uses a binary heap data structure to build a heap and then repeatedly extracts the maximum element.',
    complexity: 'O(n log n)',
    keywords:
      'heap sort algorithm visualization, heap sort visualization, heap sort visualizer, heap sort animation, heapsort visualization, heapify animation, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, binary heap, efficient sorting, in-place algorithm, sorting animation, learn sorting, heap sort tutorial, computer science education, programming tutorial',
    seo_title: 'Heap Sort Visualization | Binary Heap-Based Algorithm | SortVision',
    seo_description:
      'Master Heap Sort with interactive visualizations and animations. Learn how this binary heap-based algorithm efficiently sorts data with O(n log n) complexity. Perfect for understanding heap data structures and sorting algorithms.',
  },
  radix: {
    name: 'Radix Sort',
    description:
      'A non-comparative integer sorting algorithm that sorts data by processing individual digits, starting from the least significant digit to the most significant.',
    complexity: 'O(nk) where k is the number of digits',
    keywords:
      'radix sort visualization, radix sort visualizer, radix sort animation, radix sort online, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, digit-by-digit sort, non-comparative sort, linear time, sorting animation, learn sorting, radix sort tutorial, computer science education, programming tutorial, radix sort gif, radix sort calculator, radix sort algo, radix sort algorithms, radix sort worst case time complexity, radix sort big o',
    seo_title: 'Radix Sort Visualization | Interactive Radix Sort Algorithm | SortVision',
    seo_description:
      'Master Radix Sort with interactive visualizations and animations. Learn how this non-comparative sorting algorithm processes data digit by digit. Perfect for understanding linear-time sorting algorithms with real-time performance metrics.',
  },
  bucket: {
    name: 'Bucket Sort',
    description:
      'A distribution sorting algorithm that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.',
    complexity: 'O(n + k) average case, O(n²) worst case',
    keywords:
      'bucket sort, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, distribution sort, bucket algorithm, uniformly distributed data, sorting animation, learn sorting, bucket sort tutorial, computer science education, programming tutorial',
    seo_title:
      'Bucket Sort Visualizer | Distribution-Based DSA Sorting Algorithm',
    seo_description:
      'Learn Bucket Sort algorithm with our interactive DSA visualizer. See how this distribution-based sorting algorithm efficiently sorts uniformly distributed data into buckets.',
  },
};

// Global keywords for the application
export const globalKeywords = [
  'sorting visualizer',
  'algorithm visualizer',
  'dsa sorting',
  'data structures and algorithms',
  'sorting algorithms',
  'algorithm animation',
  'computer science education',
  'programming tutorial',
  'sorting algorithm comparison',
  'interactive learning',
  'algorithm complexity',
  'sorting performance',
  'coding interview prep',
  'algorithm practice',
  'programming education',
  'software engineering',
  'algorithm tutorial',
  'data structure visualization',
  'sorting techniques',
  'algorithm analysis',
  'computational thinking',
  'programming concepts',
  'algorithm implementation',
  'sorting algorithm tutorial',
  'algorithm learning tool',
  'interactive algorithm visualization',
  'sorting algorithm animation',
  'algorithm step by step',
  'sorting algorithm explained',
  'algorithm education platform',
];

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
    algorithm: algorithm.name 
  });
  
  return {
    title: content.title,
    description: content.description,
    keywords: `${content.keywords}, ${globalKeywords
      .slice(0, 15)
      .join(', ')}`,
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
      title: 'Contribute to SortVision - Open Source Algorithm Visualizer Project',
      description: "Join the SortVision open source community! Contribute to the world's best algorithm visualizer. View contributor stats, access contribution guides, and help improve algorithm education for developers worldwide.",
      keywords: 'SortVision contributions, open source algorithm visualizer, contribute to SortVision, GitHub contributions, algorithm visualizer contributors, open source DSA project, algorithm visualization development, programming education contributions, computer science open source'
    },
    es: {
      title: 'Contribuye a SortVision - Proyecto de Visualizador de Algoritmos de Código Abierto',
      description: '¡Únete a la comunidad de código abierto de SortVision! Contribuye al mejor visualizador de algoritmos del mundo. Ve estadísticas de contribuidores, accede a guías de contribución y ayuda a mejorar la educación en algoritmos para desarrolladores de todo el mundo.',
      keywords: 'contribuciones SortVision, visualizador de algoritmos de código abierto, contribuir a SortVision, contribuciones GitHub, contribuidores del visualizador de algoritmos, proyecto DSA de código abierto, desarrollo de visualización de algoritmos, contribuciones de educación en programación, código abierto de ciencias de la computación'
    },
    hi: {
      title: 'SortVision में योगदान दें - ओपन सोर्स एल्गोरिदम विज़ुअलाइज़र प्रोजेक्ट',
      description: 'SortVision ओपन सोर्स कम्युनिटी में शामिल हों! दुनिया के सबसे अच्छे एल्गोरिदम विज़ुअलाइज़र में योगदान दें। योगदानकर्ता आंकड़े देखें, योगदान गाइड तक पहुंचें और दुनिया भर के डेवलपर्स के लिए एल्गोरिदम शिक्षा में सुधार करने में मदद करें।',
      keywords: 'SortVision योगदान, ओपन सोर्स एल्गोरिदम विज़ुअलाइज़र, SortVision में योगदान, GitHub योगदान, एल्गोरिदम विज़ुअलाइज़र योगदानकर्ता, ओपन सोर्स DSA प्रोजेक्ट, एल्गोरिदम विज़ुअलाइज़ेशन डेवलपमेंट, प्रोग्रामिंग शिक्षा योगदान, कंप्यूटर विज्ञान ओपन सोर्स'
    },
    fr: {
      title: 'Contribuez à SortVision - Projet de Visualiseur d\'Algorithmes Open Source',
      description: 'Rejoignez la communauté open source de SortVision ! Contribuez au meilleur visualiseur d\'algorithmes au monde. Consultez les statistiques des contributeurs, accédez aux guides de contribution et aidez à améliorer l\'éducation algorithmique pour les développeurs du monde entier.',
      keywords: 'contributions SortVision, visualiseur d\'algorithmes open source, contribuer à SortVision, contributions GitHub, contributeurs du visualiseur d\'algorithmes, projet DSA open source, développement de visualisation d\'algorithmes, contributions éducation programmation, open source informatique'
    },
    de: {
      title: 'Beitragen zu SortVision - Open Source Algorithmus-Visualisierer Projekt',
      description: 'Treten Sie der SortVision Open Source Community bei! Tragen Sie zum weltweit besten Algorithmus-Visualisierer bei. Sehen Sie sich Mitwirkenden-Statistiken an, greifen Sie auf Beitragsleitfäden zu und helfen Sie dabei, die Algorithmus-Ausbildung für Entwickler weltweit zu verbessern.',
      keywords: 'SortVision Beiträge, Open Source Algorithmus-Visualisierer, zu SortVision beitragen, GitHub Beiträge, Algorithmus-Visualisierer Mitwirkende, Open Source DSA Projekt, Algorithmus-Visualisierung Entwicklung, Programmierausbildung Beiträge, Informatik Open Source'
    },
    zh: {
      title: '为SortVision贡献 - 开源算法可视化器项目',
      description: '加入SortVision开源社区！为世界上最好的算法可视化器做出贡献。查看贡献者统计信息，访问贡献指南，并帮助改善全球开发者的算法教育。',
      keywords: 'SortVision贡献, 开源算法可视化器, 为SortVision贡献, GitHub贡献, 算法可视化器贡献者, 开源DSA项目, 算法可视化开发, 编程教育贡献, 计算机科学开源'
    }
  };

  const content = contributionsTranslations[language] || contributionsTranslations.en;
  
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

/**
 * Generate schema markup for algorithm pages
 * @param {string} algorithmName - The algorithm identifier
 * @param {string} path - Current URL path
 * @returns {Object} - Schema.org JSON-LD markup
 */
export const getAlgorithmSchema = (algorithmName, path) => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${algorithm.name} Algorithm Visualization and Tutorial`,
    description: algorithm.seo_description,
    keywords: algorithm.keywords,
    author: {
      '@type': 'Person',
      name: 'alienX',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SortVision',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.sortvision.com/favicon.svg',
      },
    },
    datePublished: '2024-03-26',
    dateModified: '2024-03-26',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.sortvision.com${path}`,
    },
    about: {
      '@type': 'Thing',
      name: algorithm.name,
      description: algorithm.description,
    },
    educationalUse: 'Interactive Visualization',
    timeRequired: 'PT10M',
  };
};

/**
 * Generate SEO-friendly URLs for all supported algorithms
 * @returns {Array} - Array of URL objects for sitemap
 */
export const getAllAlgorithmUrls = () => {
  return Object.keys(algorithms).map(key => ({
    url: `/algorithms/${key}`,
    title: algorithms[key].name,
    description: algorithms[key].seo_description,
    lastModified: new Date().toISOString().split('T')[0],
  }));
};

/**
 * Format SEO title based on page type
 * @param {string} algorithm - Optional algorithm name
 * @returns {string} - Formatted page title
 */
export const formatPageTitle = (algorithm = null) => {
  if (algorithm && algorithms[algorithm]) {
    return `${algorithms[algorithm].name} Visualizer | SortVision - Learn How ${algorithms[algorithm].name} Works`;
  }
  return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
};

export const generateCanonicalUrl = pathname => {
  const baseUrl = 'https://www.sortvision.com';

  // Clean pathname - remove trailing slashes and ensure proper format
  let cleanPath = pathname.replace(/\/+$/, '') || '/';

  // Remove any query parameters and hash fragments for canonical URL
  cleanPath = cleanPath.split('?')[0].split('#')[0];

  // Handle new path-based routing structure
  const pathParts = cleanPath.split('/').filter(Boolean);

  // Handle algorithm paths with tab structure: /algorithms/{tab}/{algorithm}
  if (pathParts[0] === 'algorithms') {
    if (pathParts.length === 3) {
      // Format: /algorithms/config/bubble or /algorithms/details/bubble
      const tab = pathParts[1];
      const algorithmParam = pathParts[2];
      const validTabs = ['config', 'details', 'metrics'];
      const validAlgorithms = Object.keys(algorithms);

      if (
        validTabs.includes(tab) &&
        validAlgorithms.includes(algorithmParam.toLowerCase())
      ) {
        cleanPath = `/algorithms/${tab}/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else if (pathParts.length === 2) {
      // Legacy format: /algorithms/bubble -> redirect to /algorithms/config/bubble
      const algorithmParam = pathParts[1];
      const validAlgorithms = Object.keys(algorithms);
      if (validAlgorithms.includes(algorithmParam.toLowerCase())) {
        cleanPath = `/algorithms/config/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else {
      cleanPath = '/';
    }
  }
  // Handle contribution paths: /contributions/{section}
  else if (pathParts[0] === 'contributions') {
    if (pathParts.length === 2) {
      const section = pathParts[1];
      const validSections = ['overview', 'guide', 'ssoc'];
      if (validSections.includes(section)) {
        cleanPath = `/contributions/${section}`;
      } else {
        cleanPath = '/contributions/overview';
      }
    } else if (pathParts.length === 1) {
      cleanPath = '/contributions/overview';
    }
  }

  // Handle edge cases for common URL variations
  const urlMappings = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/main': '/',
    '/sorting': '/',
    '/visualizer': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
  };

  if (urlMappings[cleanPath]) {
    cleanPath = urlMappings[cleanPath];
  }

  // Always return clean URL
  return `${baseUrl}${cleanPath}`;
};

/**
 * Validate if a URL path is canonical
 * @param {string} pathname - The pathname to validate
 * @returns {boolean} - Whether the path is in canonical format
 */
export const isCanonicalPath = pathname => {
  const canonical = generateCanonicalUrl(pathname);
  const current = `https://www.sortvision.com${pathname}`;
  return canonical === current;
};
