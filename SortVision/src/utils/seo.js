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
      title: 'SortVision - Interactive Sorting Algorithm Visualizer | Time Complexity & Animation',
      description: 'Master sorting algorithms with interactive visualizations, animations, and time complexity analysis. Learn bubble sort, merge sort, quick sort, heap sort with real-time performance metrics. Perfect for coding interviews and DSA learning.',
      keywords: 'sorting algorithms, sorting algorithm visualizer, sorting algorithms time complexity, sorting algorithms animation, sorting algorithms visualization, sorting algorithms merge sort, sorting algorithms visualized, sorting algorithms python, sorting algorithms java, sorting algorithms cheat sheet, sorting algorithms for interviews, data structures and algorithms, data structures and algorithms in python, data structures and algorithms course, data structures and algorithms in java, data structures and algorithms python, data structures and algorithms cheat sheet, data structures and algorithms for interviews, algorithm visualization, algorithm visualization tool, algorithm visualization project, algorithm visualization online, algorithm visualization website, algorithm visualizer, DSA learning, data structures algorithms, coding interview prep, merge sort, quick sort, heap sort, bubble sort, computer science education, algorithm animation, interactive learning, programming tutorial, software engineering, sorting algorithms for beginners, sorting algorithms examples'
    },
    algorithm: {
      title: '{algorithm} Sort Visualizer - Time Complexity & Animation | SortVision',
      description: 'Master {algorithm} sort algorithm with interactive visualizations, animations, and time complexity analysis. Step-by-step performance tracking, comparisons, and comprehensive DSA learning for coding interviews.',
      keywords: '{algorithm} sort, {algorithm} sort visualization, {algorithm} sort animation, {algorithm} sort time complexity, sorting algorithm visualizer, DSA learning, algorithm animation, computer science education, sorting algorithms for beginners, algorithm examples'
    }
  },
  es: {
    homepage: {
      title: 'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento | Complejidad Temporal y Animación',
      description: 'Domina algoritmos de ordenamiento con visualizaciones interactivas, animaciones y análisis de complejidad temporal. Aprende bubble sort, merge sort, quick sort, heap sort con métricas de rendimiento en tiempo real. Perfecto para entrevistas de programación y aprendizaje de DSA.',
      keywords: 'algoritmos de ordenamiento, visualizador de algoritmos de ordenamiento, algoritmos de ordenamiento complejidad temporal, algoritmos de ordenamiento animación, algoritmos de ordenamiento visualización, algoritmos de ordenamiento merge sort, algoritmos de ordenamiento python, algoritmos de ordenamiento java, algoritmos de ordenamiento hoja de trucos, algoritmos de ordenamiento para entrevistas, estructuras de datos y algoritmos, estructuras de datos y algoritmos en python, estructuras de datos y algoritmos curso, estructuras de datos y algoritmos en java, estructuras de datos y algoritmos python, estructuras de datos y algoritmos hoja de trucos, estructuras de datos y algoritmos para entrevistas, visualización de algoritmos, herramienta de visualización de algoritmos, proyecto de visualización de algoritmos, visualización de algoritmos en línea, sitio web de visualización de algoritmos, visualizador de algoritmos, aprendizaje DSA, algoritmos de estructuras de datos, preparación para entrevistas de programación, merge sort, quick sort, heap sort, bubble sort, educación en ciencias de la computación, animación de algoritmos, aprendizaje interactivo, tutorial de programación, ingeniería de software, algoritmos de ordenamiento para principiantes, ejemplos de algoritmos de ordenamiento'
    },
    algorithm: {
      title: 'Visualizador de {algorithm} Sort - Complejidad Temporal y Animación | SortVision',
      description: 'Domina el algoritmo {algorithm} sort con visualizaciones interactivas, animaciones y análisis de complejidad temporal. Seguimiento paso a paso del rendimiento, comparaciones y aprendizaje integral de DSA para entrevistas de programación.',
      keywords: '{algorithm} sort, {algorithm} sort visualización, {algorithm} sort animación, {algorithm} sort complejidad temporal, visualizador de algoritmos de ordenamiento, aprendizaje DSA, animación de algoritmos, educación en ciencias de la computación, algoritmos de ordenamiento para principiantes, ejemplos de algoritmos'
    }
  },
  hi: {
    homepage: {
      title: 'SortVision - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र | टाइम कॉम्प्लेक्सिटी और एनीमेशन',
      description: 'इंटरैक्टिव विज़ुअलाइज़ेशन, एनीमेशन और टाइम कॉम्प्लेक्सिटी विश्लेषण के साथ सॉर्टिंग एल्गोरिदम में महारत हासिल करें। बबल सॉर्ट, मर्ज सॉर्ट, क्विक सॉर्ट, हीप सॉर्ट रियल-टाइम प्रदर्शन मेट्रिक्स के साथ सीखें। कोडिंग इंटरव्यू और DSA सीखने के लिए परफेक्ट।',
      keywords: 'सॉर्टिंग एल्गोरिदम, सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, सॉर्टिंग एल्गोरिदम टाइम कॉम्प्लेक्सिटी, सॉर्टिंग एल्गोरिदम एनीमेशन, सॉर्टिंग एल्गोरिदम विज़ुअलाइज़ेशन, सॉर्टिंग एल्गोरिदम मर्ज सॉर्ट, सॉर्टिंग एल्गोरिदम पायथन, सॉर्टिंग एल्गोरिदम जावा, सॉर्टिंग एल्गोरिदम चीट शीट, सॉर्टिंग एल्गोरिदम इंटरव्यू के लिए, डेटा स्ट्रक्चर और एल्गोरिदम, डेटा स्ट्रक्चर और एल्गोरिदम पायथन में, डेटा स्ट्रक्चर और एल्गोरिदम कोर्स, डेटा स्ट्रक्चर और एल्गोरिदम जावा में, डेटा स्ट्रक्चर और एल्गोरिदम पायथन, डेटा स्ट्रक्चर और एल्गोरिदम चीट शीट, डेटा स्ट्रक्चर और एल्गोरिदम इंटरव्यू के लिए, एल्गोरिदम विज़ुअलाइज़ेशन, एल्गोरिदम विज़ुअलाइज़ेशन टूल, एल्गोरिदम विज़ुअलाइज़ेशन प्रोजेक्ट, एल्गोरिदम विज़ुअलाइज़ेशन ऑनलाइन, एल्गोरिदम विज़ुअलाइज़ेशन वेबसाइट, एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, डेटा स्ट्रक्चर एल्गोरिदम, कोडिंग इंटरव्यू तैयारी, मर्ज सॉर्ट, क्विक सॉर्ट, हीप सॉर्ट, बबल सॉर्ट, कंप्यूटर विज्ञान शिक्षा, एल्गोरिदम एनीमेशन, इंटरैक्टिव सीखना, प्रोग्रामिंग ट्यूटोरियल, सॉफ्टवेयर इंजीनियरिंग, शुरुआती के लिए सॉर्टिंग एल्गोरिदम, सॉर्टिंग एल्गोरिदम उदाहरण'
    },
    algorithm: {
      title: '{algorithm} सॉर्ट विज़ुअलाइज़र - टाइम कॉम्प्लेक्सिटी और एनीमेशन | SortVision',
      description: 'इंटरैक्टिव विज़ुअलाइज़ेशन, एनीमेशन और टाइम कॉम्प्लेक्सिटी विश्लेषण के साथ {algorithm} सॉर्ट एल्गोरिदम में महारत हासिल करें। चरण-दर-चरण प्रदर्शन ट्रैकिंग, तुलना, और कोडिंग इंटरव्यू के लिए व्यापक DSA सीखना।',
      keywords: '{algorithm} सॉर्ट, {algorithm} सॉर्ट विज़ुअलाइज़ेशन, {algorithm} सॉर्ट एनीमेशन, {algorithm} सॉर्ट टाइम कॉम्प्लेक्सिटी, सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, एल्गोरिदम एनीमेशन, कंप्यूटर विज्ञान शिक्षा, शुरुआती के लिए सॉर्टिंग एल्गोरिदम, एल्गोरिदम उदाहरण'
    }
  },
  fr: {
    homepage: {
      title: 'SortVision - Visualiseur Interactif d\'Algorithmes de Tri | Complexité Temporelle et Animation',
      description: 'Maîtrisez les algorithmes de tri avec des visualisations interactives, des animations et une analyse de complexité temporelle. Apprenez le tri à bulles, le tri par fusion, le tri rapide, le tri par tas avec des métriques de performance en temps réel. Parfait pour les entretiens de programmation et l\'apprentissage DSA.',
      keywords: 'algorithmes de tri, visualiseur d\'algorithmes de tri, algorithmes de tri complexité temporelle, algorithmes de tri animation, algorithmes de tri visualisation, algorithmes de tri tri par fusion, algorithmes de tri python, algorithmes de tri java, algorithmes de tri aide-mémoire, algorithmes de tri pour entretiens, structures de données et algorithmes, structures de données et algorithmes en python, structures de données et algorithmes cours, structures de données et algorithmes en java, structures de données et algorithmes python, structures de données et algorithmes aide-mémoire, structures de données et algorithmes pour entretiens, visualisation d\'algorithmes, outil de visualisation d\'algorithmes, projet de visualisation d\'algorithmes, visualisation d\'algorithmes en ligne, site web de visualisation d\'algorithmes, visualiseur d\'algorithmes, apprentissage DSA, algorithmes de structures de données, préparation entretien programmation, tri par fusion, tri rapide, tri par tas, tri à bulles, éducation informatique, animation d\'algorithmes, apprentissage interactif, tutoriel programmation, ingénierie logicielle, algorithmes de tri pour débutants, exemples d\'algorithmes de tri'
    },
    algorithm: {
      title: 'Visualiseur de Tri {algorithm} - Complexité Temporelle et Animation | SortVision',
      description: 'Maîtrisez l\'algorithme de tri {algorithm} avec des visualisations interactives, des animations et une analyse de complexité temporelle. Suivi des performances étape par étape, comparaisons et apprentissage DSA complet pour les entretiens de programmation.',
      keywords: 'tri {algorithm}, tri {algorithm} visualisation, tri {algorithm} animation, tri {algorithm} complexité temporelle, visualiseur d\'algorithmes de tri, apprentissage DSA, animation d\'algorithmes, éducation informatique, algorithmes de tri pour débutants, exemples d\'algorithmes'
    }
  },
  de: {
    homepage: {
      title: 'SortVision - Interaktiver Sortieralgorithmus-Visualisierer | Zeitkomplexität und Animation',
      description: 'Meistern Sie Sortieralgorithmen mit interaktiven Visualisierungen, Animationen und Zeitkomplexitätsanalyse. Lernen Sie Bubble Sort, Merge Sort, Quick Sort, Heap Sort mit Echtzeit-Leistungsmetriken. Perfekt für Programmierinterviews und DSA-Lernen.',
      keywords: 'Sortieralgorithmen, Sortieralgorithmus-Visualisierer, Sortieralgorithmen Zeitkomplexität, Sortieralgorithmen Animation, Sortieralgorithmen Visualisierung, Sortieralgorithmen Merge Sort, Sortieralgorithmen Python, Sortieralgorithmen Java, Sortieralgorithmen Spickzettel, Sortieralgorithmen für Interviews, Datenstrukturen und Algorithmen, Datenstrukturen und Algorithmen in Python, Datenstrukturen und Algorithmen Kurs, Datenstrukturen und Algorithmen in Java, Datenstrukturen und Algorithmen Python, Datenstrukturen und Algorithmen Spickzettel, Datenstrukturen und Algorithmen für Interviews, Algorithmus-Visualisierung, Algorithmus-Visualisierungstool, Algorithmus-Visualisierungsprojekt, Algorithmus-Visualisierung online, Algorithmus-Visualisierungswebsite, Algorithmus-Visualisierer, DSA-Lernen, Datenstrukturen Algorithmen, Programmierinterview-Vorbereitung, Merge Sort, Quick Sort, Heap Sort, Bubble Sort, Informatikausbildung, Algorithmus-Animation, interaktives Lernen, Programmiertutorial, Softwareentwicklung, Sortieralgorithmen für Anfänger, Sortieralgorithmen Beispiele'
    },
    algorithm: {
      title: '{algorithm} Sort Visualisierer - Zeitkomplexität und Animation | SortVision',
      description: 'Meistern Sie den {algorithm} Sort-Algorithmus mit interaktiven Visualisierungen, Animationen und Zeitkomplexitätsanalyse. Schritt-für-Schritt-Leistungsverfolgung, Vergleiche und umfassendes DSA-Lernen für Programmierinterviews.',
      keywords: '{algorithm} Sort, {algorithm} Sort Visualisierung, {algorithm} Sort Animation, {algorithm} Sort Zeitkomplexität, Sortieralgorithmus-Visualisierer, DSA-Lernen, Algorithmus-Animation, Informatikausbildung, Sortieralgorithmen für Anfänger, Algorithmus-Beispiele'
    }
  },
  zh: {
    homepage: {
      title: 'SortVision - 交互式排序算法可视化器 | 时间复杂度和动画',
      description: '通过交互式可视化、动画和时间复杂度分析掌握排序算法。学习冒泡排序、归并排序、快速排序、堆排序，实时性能指标。完美适用于编程面试和DSA学习。',
      keywords: '排序算法, 排序算法可视化器, 排序算法时间复杂度, 排序算法动画, 排序算法可视化, 排序算法归并排序, 排序算法Python, 排序算法Java, 排序算法速查表, 排序算法面试, 数据结构和算法, 数据结构和算法Python, 数据结构和算法课程, 数据结构和算法Java, 数据结构和算法Python, 数据结构和算法速查表, 数据结构和算法面试, 算法可视化, 算法可视化工具, 算法可视化项目, 算法可视化在线, 算法可视化网站, 算法可视化器, DSA学习, 数据结构算法, 编程面试准备, 归并排序, 快速排序, 堆排序, 冒泡排序, 计算机科学教育, 算法动画, 交互式学习, 编程教程, 软件工程, 排序算法初学者, 排序算法示例'
    },
    algorithm: {
      title: '{algorithm} 排序可视化器 - 时间复杂度和动画 | SortVision',
      description: '通过交互式可视化、动画和时间复杂度分析掌握{algorithm}排序算法。逐步性能跟踪、比较和全面的DSA学习，为编程面试做准备。',
      keywords: '{algorithm} 排序, {algorithm} 排序可视化, {algorithm} 排序动画, {algorithm} 排序时间复杂度, 排序算法可视化器, DSA学习, 算法动画, 计算机科学教育, 排序算法初学者, 算法示例'
    }
  },
  bn: {
    homepage: {
      title: 'SortVision - ইন্টারঅ্যাক্টিভ সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার | টাইম কমপ্লেক্সিটি এবং অ্যানিমেশন',
      description: 'ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন, অ্যানিমেশন এবং টাইম কমপ্লেক্সিটি বিশ্লেষণের সাথে সর্টিং অ্যালগরিদমে দক্ষতা অর্জন করুন। রিয়েল-টাইম পারফরম্যান্স মেট্রিক্সের সাথে বাবল সর্ট, মার্জ সর্ট, কুইক সর্ট, হিপ সর্ট শিখুন। কোডিং ইন্টারভিউ এবং DSA শেখার জন্য পারফেক্ট।',
      keywords: 'সর্টিং অ্যালগরিদম, সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার, সর্টিং অ্যালগরিদম টাইম কমপ্লেক্সিটি, সর্টিং অ্যালগরিদম অ্যানিমেশন, সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজেশন, সর্টিং অ্যালগরিদম মার্জ সর্ট, সর্টিং অ্যালগরিদম পাইথন, সর্টিং অ্যালগরিদম জাভা, সর্টিং অ্যালগরিদম চিট শীট, সর্টিং অ্যালগরিদম ইন্টারভিউর জন্য, ডেটা স্ট্রাকচার এবং অ্যালগরিদম, ডেটা স্ট্রাকচার এবং অ্যালগরিদম পাইথনে, ডেটা স্ট্রাকচার এবং অ্যালগরিদম কোর্স, ডেটা স্ট্রাকচার এবং অ্যালগরিদম জাভায়, ডেটা স্ট্রাকচার এবং অ্যালগরিদম পাইথন, ডেটা স্ট্রাকচার এবং অ্যালগরিদম চিট শীট, ডেটা স্ট্রাকচার এবং অ্যালগরিদম ইন্টারভিউর জন্য, অ্যালগরিদম ভিজ্যুয়ালাইজেশন, অ্যালগরিদম ভিজ্যুয়ালাইজেশন টুল, অ্যালগরিদম ভিজ্যুয়ালাইজেশন প্রজেক্ট, অ্যালগরিদম ভিজ্যুয়ালাইজেশন অনলাইন, অ্যালগরিদম ভিজ্যুয়ালাইজেশন ওয়েবসাইট, অ্যালগরিদম ভিজ্যুয়ালাইজার, DSA শেখা, ডেটা স্ট্রাকচার অ্যালগরিদম, কোডিং ইন্টারভিউ প্রস্তুতি, মার্জ সর্ট, কুইক সর্ট, হিপ সর্ট, বাবল সর্ট, কম্পিউটার সায়েন্স শিক্ষা, অ্যালগরিদম অ্যানিমেশন, ইন্টারঅ্যাক্টিভ শেখা, প্রোগ্রামিং টিউটোরিয়াল, সফটওয়্যার ইঞ্জিনিয়ারিং, সর্টিং অ্যালগরিদম শুরুর জন্য, সর্টিং অ্যালগরিদম উদাহরণ'
    },
    algorithm: {
      title: '{algorithm} সর্ট ভিজ্যুয়ালাইজার - টাইম কমপ্লেক্সিটি এবং অ্যানিমেশন | SortVision',
      description: 'ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন, অ্যানিমেশন এবং টাইম কমপ্লেক্সিটি বিশ্লেষণের সাথে {algorithm} সর্ট অ্যালগরিদমে দক্ষতা অর্জন করুন। ধাপে ধাপে পারফরম্যান্স ট্র্যাকিং, তুলনা এবং কোডিং ইন্টারভিউর জন্য ব্যাপক DSA শেখা।',
      keywords: '{algorithm} সর্ট, {algorithm} সর্ট ভিজ্যুয়ালাইজেশন, {algorithm} সর্ট অ্যানিমেশন, {algorithm} সর্ট টাইম কমপ্লেক্সিটি, সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার, DSA শেখা, অ্যালগরিদম অ্যানিমেশন, কম্পিউটার সায়েন্স শিক্ষা, সর্টিং অ্যালগরিদম শুরুর জন্য, অ্যালগরিদম উদাহরণ'
    }
  },
  ja: {
    homepage: {
      title: 'SortVision - インタラクティブソートアルゴリズムビジュアライザー | 時間計算量とアニメーション',
      description: 'インタラクティブビジュアライゼーション、アニメーション、時間計算量分析でソートアルゴリズムをマスター。バブルソート、マージソート、クイックソート、ヒープソートをリアルタイムパフォーマンスメトリクスで学習。コーディング面接とDSA学習に最適。',
      keywords: 'ソートアルゴリズム, ソートアルゴリズムビジュアライザー, ソートアルゴリズム時間計算量, ソートアルゴリズムアニメーション, ソートアルゴリズムビジュアライゼーション, ソートアルゴリズムマージソート, ソートアルゴリズムPython, ソートアルゴリズムJava, ソートアルゴリズムチートシート, ソートアルゴリズム面接, データ構造とアルゴリズム, データ構造とアルゴリズムPython, データ構造とアルゴリズムコース, データ構造とアルゴリズムJava, データ構造とアルゴリズムPython, データ構造とアルゴリズムチートシート, データ構造とアルゴリズム面接, アルゴリズムビジュアライゼーション, アルゴリズムビジュアライゼーションツール, アルゴリズムビジュアライゼーションプロジェクト, アルゴリズムビジュアライゼーションオンライン, アルゴリズムビジュアライゼーションウェブサイト, アルゴリズムビジュアライザー, DSA学習, データ構造アルゴリズム, コーディング面接準備, マージソート, クイックソート, ヒープソート, バブルソート, コンピュータサイエンス教育, アルゴリズムアニメーション, インタラクティブ学習, プログラミングチュートリアル, ソフトウェアエンジニアリング, ソートアルゴリズム初心者, ソートアルゴリズム例'
    },
    algorithm: {
      title: '{algorithm} ソートビジュアライザー - 時間計算量とアニメーション | SortVision',
      description: 'インタラクティブビジュアライゼーション、アニメーション、時間計算量分析で{algorithm}ソートアルゴリズムをマスター。ステップバイステップパフォーマンス追跡、比較、コーディング面接のための包括的なDSA学習。',
      keywords: '{algorithm} ソート, {algorithm} ソートビジュアライゼーション, {algorithm} ソートアニメーション, {algorithm} ソート時間計算量, ソートアルゴリズムビジュアライザー, DSA学習, アルゴリズムアニメーション, コンピュータサイエンス教育, ソートアルゴリズム初心者, アルゴリズム例'
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
      'bubble sort, bubble sort visualization, bubble sort visualizer, bubble sort animation, bubble sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms for beginners, sorting algorithms examples, algorithm visualizer, dsa sorting, data structures algorithms, comparison sort, swapping algorithm, in-place sorting algorithm, sorting animation, learn sorting, bubble sort tutorial, sorting algorithm visualization, computer science education, programming tutorial, sorting algorithms cheat sheet',
    seo_title:
      'Bubble Sort Visualization | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Bubble Sort with interactive visualizations, animations, and time complexity analysis. Learn how this simple comparison-based sorting algorithm works step-by-step. Perfect for understanding O(n²) sorting algorithms with real-time performance metrics and examples.',
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
      'merge sort, sorting algorithms merge sort, merge sort visualization, merge sort animation, merge sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms time complexity, sorting algorithms animation, sorting algorithms visualized, algorithm visualizer, dsa sorting, data structures algorithms, divide and conquer, efficient sorting, stable sort, sorting animation, learn sorting, merge sort tutorial, computer science education, programming tutorial, sorting algorithms examples, sorting algorithms python, sorting algorithms java',
    seo_title:
      'Merge Sort Visualizer | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Merge Sort with interactive visualizations, animations, and time complexity analysis. Learn this efficient divide-and-conquer algorithm with step-by-step animation, performance tracking, and examples. Perfect for Python and Java developers.',
  },
  quick: {
    name: 'Quick Sort',
    description:
      'An efficient, in-place sorting algorithm that uses the divide-and-conquer strategy with a pivot element to partition the array.',
    complexity: 'O(n log n) average, O(n²) worst case',
    keywords:
      'quick sort, quick sort visualization, quick sort visualizer, quicksort visualization, quicksort visualizer, quick sort animation, quick sort time complexity, sorting algorithms, sorting algorithm visualizer, sorting algorithms time complexity, sorting algorithms animation, quick sort calculator, quick sort partition visualization, partition visualization, quick sort algorithm visualization, quick sort visual, quicksort visual, quicksort visualisation, quick sort visualisation, quick sort dsa, quicksort algorithm animation, quicksort algorithm visualization, sorting visualizer, algorithm visualizer, dsa sorting, data structures algorithms, pivot, partitioning, divide and conquer, efficient sorting, sorting animation, learn sorting, quick sort tutorial, computer science education, programming tutorial, sorting algorithms examples',
    seo_title: 'Quick Sort Visualization | Time Complexity & Animation | SortVision',
    seo_description:
      'Master Quick Sort with interactive visualizations, animations, and time complexity analysis. Learn how this efficient divide-and-conquer algorithm uses pivot elements and partitioning. Perfect for understanding O(n log n) sorting algorithms with real-time performance metrics and examples.',
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

// Global keywords for the application - Updated with AnswerThePublic high-volume keywords
export const globalKeywords = [
  'sorting algorithms',
  'sorting algorithm visualizer',
  'sorting algorithms time complexity',
  'sorting algorithms animation',
  'sorting algorithms visualization',
  'sorting algorithms for beginners',
  'sorting algorithms examples',
  'sorting algorithms cheat sheet',
  'sorting visualizer',
  'algorithm visualizer',
  'dsa sorting',
  'data structures and algorithms',
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
      name: 'Prabal Patra',
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

/**
 * GEO: Generate AI-friendly summary for SortVision
 * @param {string} context - Context: 'homepage', 'algorithm', 'comparison'
 * @param {string} algorithmName - Optional algorithm name
 * @returns {string} - AI-friendly natural language summary
 */
export const getGeoSummary = (context = 'homepage', algorithmName = null) => {
  const baseUrl = 'https://www.sortvision.com';
  
  if (context === 'homepage') {
    return `SortVision is an interactive web application that helps users learn sorting algorithms through real-time visualizations, step-by-step animations, and performance metrics. It supports 8 major algorithms (Bubble, Merge, Quick, Insertion, Selection, Heap, Radix, Bucket Sort) with customizable array sizes, speed controls, and educational explanations. Perfect for students learning DSA, developers preparing for coding interviews, and educators teaching computer science. Available at ${baseUrl}`;
  }
  
  if (context === 'algorithm' && algorithmName) {
    const algorithm = algorithms[algorithmName];
    if (!algorithm) return getGeoSummary('homepage');
    
    const algName = algorithm.name;
    return `SortVision's ${algName} visualizer lets you watch this algorithm work in real-time with animated bars, step-by-step comparisons, and performance metrics. Adjust array size and animation speed to understand how ${algName} behaves with different inputs. Includes code implementations in 20+ languages and complexity analysis. Visit ${baseUrl}/algorithms/config/${algorithmName} to try it interactively.`;
  }
  
  if (context === 'comparison') {
    return `SortVision allows side-by-side comparison of sorting algorithms. You can visualize multiple algorithms simultaneously, comparing their execution time, number of comparisons, and visual behavior with the same input data. Perfect for understanding algorithm trade-offs and performance characteristics.`;
  }
  
  return getGeoSummary('homepage');
};

/**
 * GEO: Generate prompt hooks - natural language statements for LLM extraction
 * @param {string} context - Context: 'homepage', 'algorithm'
 * @param {string} algorithmName - Optional algorithm name
 * @returns {Array<string>} - Array of natural language prompt hooks
 */
export const getPromptHooks = (context = 'homepage', algorithmName = null) => {
  const hooks = [];
  
  if (context === 'homepage') {
    hooks.push(
      'SortVision is an interactive platform that helps you learn sorting algorithms visually',
      'You can watch sorting algorithms work in real-time with animated visualizations on SortVision',
      'SortVision supports 8 sorting algorithms: Bubble, Merge, Quick, Insertion, Selection, Heap, Radix, and Bucket Sort',
      'SortVision is perfect for learning DSA concepts, preparing for coding interviews, and teaching computer science',
      'SortVision provides interactive animations where you can control array size, animation speed, and see step-by-step algorithm execution',
      'SortVision shows real-time performance metrics including comparisons, swaps, and time complexity analysis',
      'SortVision offers code implementations in 20+ programming languages for each sorting algorithm',
      'SortVision allows you to compare multiple sorting algorithms side-by-side with the same input data'
    );
  }
  
  if (context === 'algorithm' && algorithmName) {
    const algorithm = algorithms[algorithmName];
    if (algorithm) {
      const algName = algorithm.name;
      hooks.push(
        `SortVision's ${algName} visualizer shows how ${algName} works with real-time animations`,
        `You can adjust parameters and watch ${algName} sort your data interactively on SortVision`,
        `SortVision explains ${algName}'s time complexity, best/worst cases, and implementation details`,
        `SortVision provides code examples for ${algName} in 20+ programming languages`,
        `SortVision's ${algName} tool lets you visualize the step-by-step process of this sorting algorithm`,
        `On SortVision, you can control ${algName}'s animation speed and array size to understand its behavior`
      );
    }
  }
  
  return hooks;
};

/**
 * GEO: Generate enhanced HowTo schema for algorithm learning
 * @param {string} algorithmName - The algorithm identifier
 * @returns {Object} - HowTo schema markup
 */
export const getAlgorithmHowToSchema = (algorithmName) => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;
  
  const algName = algorithm.name;
  const baseUrl = 'https://www.sortvision.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Learn ${algName} with Interactive Visualization on SortVision`,
    description: `Step-by-step guide to understanding ${algName} through SortVision's interactive visualizer`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Access SortVision',
        text: `Visit ${baseUrl}/algorithms/config/${algorithmName} to access the ${algName} visualizer`,
        url: `${baseUrl}/algorithms/config/${algorithmName}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Configure Parameters',
        text: `Adjust array size and animation speed controls to customize your learning experience`,
      },
      {
        '@type': 'HowToStep',
        name: 'Watch Interactive Animation',
        text: `Click Start to see ${algName} work in real-time with animated visualizations showing each comparison and swap`,
      },
      {
        '@type': 'HowToStep',
        name: 'Analyze Performance',
        text: `Observe performance metrics including comparisons, swaps, and time complexity to understand ${algName}'s efficiency`,
      },
      {
        '@type': 'HowToStep',
        name: 'Review Code Implementation',
        text: `Explore code examples in 20+ programming languages to understand ${algName}'s implementation`,
      },
    ],
    totalTime: 'PT10M',
    educationalLevel: 'beginner, intermediate',
  };
};

/**
 * GEO: Generate ItemList schema for algorithm catalog
 * @returns {Object} - ItemList schema markup
 */
export const getAlgorithmCatalogSchema = () => {
  const baseUrl = 'https://www.sortvision.com';
  const algorithmKeys = Object.keys(algorithms);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sorting Algorithms Available on SortVision',
    description: 'Complete list of interactive sorting algorithm visualizations available on SortVision',
    itemListElement: algorithmKeys.map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: algorithms[key].name,
      url: `${baseUrl}/algorithms/config/${key}`,
      description: `Interactive ${algorithms[key].name} visualization with real-time animations and performance metrics`,
    })),
  };
};

/**
 * GEO: Generate learning outcomes schema
 * @returns {Array<string>} - Array of learning outcomes
 */
export const getLearningOutcomes = () => {
  return [
    'Understanding sorting algorithm mechanics and step-by-step execution',
    'Time complexity analysis and Big O notation comprehension',
    'Algorithm comparison skills and performance trade-off evaluation',
    'Coding interview preparation with visual algorithm learning',
    'DSA fundamentals including data structures and algorithmic thinking',
    'Interactive learning through real-time visualizations',
    'Code implementation patterns across multiple programming languages',
  ];
};

/**
 * GEO: Generate comparison context description
 * @param {Array<string>} algorithmNames - Array of algorithm identifiers to compare
 * @returns {string} - Natural language comparison description
 */
export const getComparisonContext = (algorithmNames) => {
  if (!Array.isArray(algorithmNames) || algorithmNames.length === 0) {
    return 'SortVision allows you to compare multiple sorting algorithms side-by-side with the same input data, showing their performance differences through real-time visualizations.';
  }
  
  const algorithmNamesList = algorithmNames
    .map(name => algorithms[name]?.name)
    .filter(Boolean)
    .join(' vs ');
  
  return `SortVision lets you compare ${algorithmNamesList} simultaneously. You can visualize how these algorithms perform on the same data, comparing their execution time, number of comparisons, swaps, and visual behavior to understand their trade-offs and performance characteristics.`;
};
