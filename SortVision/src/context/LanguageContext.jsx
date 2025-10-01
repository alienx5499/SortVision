import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translation files
const translations = {
  en: {
    // Settings Modal
    settings: {
      title: 'SortSettings',
      description: 'Customize your visualization preferences',
      description2: 'Adjust sound, theme, and language settings to enhance your experience',
      sound: {
        title: 'Sound',
        description: 'Enable or disable sound effects',
        enabled: 'Sound Enabled',
        disabled: 'Sound Disabled',
        enableDescription: 'Click to enable sound effects',
        disableDescription: 'Click to disable sound effects'
      },
      voiceControl: {
        title: 'Voice Control',
        description: 'Enable or disable voice control',
        enabled: 'Voice Control Enabled',
        disabled: 'Voice Control Disabled',
        enableDescription: 'Click to enable voice control',
        disableDescription: 'Click to disable voice control',
        denied: 'Microphone access denied. Please check browser settings.'
      },
      theme: {
        title: 'Theme',
        description: 'Choose your preferred color theme'
      },
      language: {
        title: 'Language',
        description: 'Select your language'
      },
      keyboardShortcuts: {
        title: 'Keyboard Shortcuts',
        navigation: 'Navigation',
        algorithmControl: 'Algorithm control',
        speedControl: 'Speed control',
        arrayManipulation: 'Array manipulation',
        modalsOverlays: 'Modals & overlays',
        cycleFocus: 'Cycle focus',
        navigatePanels: 'Navigate panels/steps',
        playPause: 'Play/Pause animation',
        resetArray: 'Reset array',
        increaseSpeed: 'Increase speed',
        decreaseSpeed: 'Decrease speed',
        newArray: 'New array',
        shuffleArray: 'Shuffle array',
        showShortcutHelp: 'Show/hide shortcut help',
        toggleChatAssistant: 'Toggle chat assistant',
        toggleFeedbackForm: 'Toggle feedback form',
        toggleSettingsPanel: 'Toggle settings panel',
        showHelp: 'Show this help'
      }
    },
    // Main page
    main: {
      subtitle: 'Interactive visualization of popular sorting algorithms',
      algorithmVisualization: 'Visualization',
      sortingAlgorithmVisualizer: 'Sorting Algorithm Visualizer',
      builtWith: 'Built with',
      by: 'by',
      contributors: 'Contributors',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'Sponsor',
      buyMeACoffee: 'Buy me a coffee',
      twitter: 'Twitter'
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'algorithm visualizer'
      },
      tabs: {
        config: 'config',
        metrics: 'metrics',
        details: 'details',
        overview: 'overview',
        guide: 'guide'
      },
      controls: {
        selectAlgorithm: 'select algorithm',
        algorithm: 'Algorithm',
        arraySize: 'array size',
        animationDelay: 'animation delay',
        elements: 'Elements',
        delay: 'Delay',
        newArray: 'new_array()',
        start: 'start()',
        stop: 'stop()',
        mergeSort: 'merge_sort()',
        ready: 'ready',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        fast: 'Fast',
        slow: 'Slow',
        goodForLearning: 'Good for learning',
        balanced: 'Balanced',
        performanceTest: 'Performance test',
        visualizePatterns: 'Visualize patterns',
        elementsCount: 'elements'
      },
      complexity: {
        efficiencyRating: 'EFFICIENCY RATING',
        timeComplexity: 'TIME COMPLEXITY',
        spaceComplexity: 'SPACE COMPLEXITY',
        bestCase: 'BEST CASE',
        average: 'AVERAGE',
        worstCase: 'WORST CASE',
        high: 'High',
        algorithmComplexity: 'algorithm complexity'
      }
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description: 'Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
      },
      insertion: {
        description: 'Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it into the correct position.'
      },
      selection: {
        description: 'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.'
      },
      quick: {
        description: 'Divide-and-conquer algorithm that picks a \'pivot\' element and partitions the array around the pivot, recursively sorting the sub-arrays.'
      },
      merge: {
        description: 'Divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges the sorted halves.'
      },
      radix: {
        description: 'Non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.'
      },
      heap: {
        description: 'Comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It builds a max heap and repeatedly extracts the maximum element.'
      },
      bucket: {
        description: 'Distribution sort that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.'
      }
    },
    // Metrics
    metrics: {
      currentRunMetrics: 'current run metrics',
      swaps: 'SWAPS',
      memoryOperations: 'Memory operations',
      comparisons: 'COMPARISONS',
      cpuOperations: 'CPU operations',
      timeMs: 'TIME (MS)',
      executionDuration: 'Execution duration',
      swapRatio: 'SWAP RATIO',
      swapsComp: 'swaps/comp',
      timeElement: 'TIME/ELEMENT',
      msElem: 'ms/elem',
      opsMs: 'OPS/MS',
      opsMsUnit: 'ops/ms',
      score: 'SCORE',
      points: 'points',
      performanceBreakdown: 'PERFORMANCE BREAKDOWN',
      time: 'Time',
      potentialImprovement: 'Potential improvement:',
      algorithmComparison: 'algorithm comparison',
      testingAlgorithm: 'Testing algorithm',
      runningTests: 'Running tests...',
      noComparisonData: 'No comparison data available',
      runTestAll: 'Run test_all() to compare algorithm performance',
      testAll: 'test_all()',
      stopTest: 'stop_test()'
    },
    // Chat
    chat: {
      askAboutSorting: 'Ask about sorting'
    },
    // Feedback
    feedback: {
      sendFeedback: 'Send Feedback'
    },
    // Details page
    details: {
      basicSorts: 'BASIC SORTS',
      efficientSorts: 'EFFICIENT SORTS',
      specialSorts: 'SPECIAL SORTS',
      algorithmDetails: '{algorithm}_sort() details',
      algorithmImplementation: '{algorithm} IMPLEMENTATION',
      loadingImplementation: 'Loading {algorithm} implementation',
      relatedAlgorithms: 'Related Algorithms',
      historicalContext: 'Historical Context',
      inventedBy: 'Invented by',
      year: 'Year',
      proTip: 'PRO TIP',
      funFact: 'FUN FACT',
      tips: {
        bubble: "Try increasing the array size to see how bubble sort's performance degrades quadratically!",
        insertion: 'Watch how insertion sort performs exceptionally well on nearly sorted arrays.',
        selection: 'Notice how selection sort always takes the same time regardless of initial order.',
        quick: 'Observe how the pivot selection affects the partitioning process.',
        merge: 'See how merge sort divides the array into smaller subarrays recursively.',
        radix: 'Watch how radix sort processes each digit position independently!',
        heap: 'Notice how heap sort builds a binary heap and repeatedly extracts the maximum element!',
        bucket: 'Watch how bucket sort distributes elements into buckets and sorts them individually!'
      },
      facts: {
        bubble: "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges.",
        insertion: 'Insertion Sort is similar to how many people sort playing cards in their hands.',
        selection: 'Selection Sort makes the minimum number of swaps possible (n-1 in the worst case).',
        quick: 'Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University.',
        merge: 'Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described.',
        radix: 'Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century.',
        heap: 'Heap Sort was invented by J. W. J. Williams in 1964 and is the basis for many priority queue implementations.',
        bucket: 'Bucket Sort is particularly efficient when the input is uniformly distributed across a range.'
      }
    },
    // SEO
    seo: {
      title: 'SortVision - Interactive Sorting Algorithm Visualizer',
      description: 'Interactive visualization of sorting algorithms including bubble sort, merge sort, quick sort, and more. Learn data structures and algorithms with real-time performance metrics and educational content.',
      keywords: 'sorting algorithm visualizer, DSA learning, data structures algorithms, coding interview prep, merge sort, quick sort, heap sort, bubble sort, computer science education, algorithm animation, interactive learning, programming tutorial, software engineering',
      algorithmTitle: '{algorithm} Sort Visualizer - SortVision',
      algorithmDescription: 'Master {algorithm} sort algorithm with SortVision\'s interactive visualizer. Step-by-step animations, performance analysis, and comprehensive DSA learning for coding interviews.',
      ogTitle: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
      ogDescription: 'Master sorting algorithms with interactive visualizations. Perfect for coding interviews, computer science education, and DSA learning.',
      twitterTitle: 'SortVision - Interactive Sorting Algorithm Visualizer',
      twitterDescription: 'Learn sorting algorithms with step-by-step visualizations. Essential for coding interviews and computer science education.'
    },
    // Common
    common: {
      close: 'Close',
      settings: 'Settings',
      select: 'Select',
      enabled: 'Enabled',
      disabled: 'Disabled'
    }
  },
  es: {
    // Settings Modal
    settings: {
      title: 'Configuración',
      description: 'Personaliza tus preferencias de visualización',
      description2: 'Ajusta el sonido, tema e idioma para mejorar tu experiencia',
      sound: {
        title: 'Sonido',
        description: 'Activar o desactivar efectos de sonido',
        enabled: 'Sonido Activado',
        disabled: 'Sonido Desactivado',
        enableDescription: 'Haz clic para activar efectos de sonido',
        disableDescription: 'Haz clic para desactivar efectos de sonido'
      },
      voiceControl: {
        title: 'Control por Voz',
        description: 'Activar o desactivar control por voz',
        enabled: 'Control por Voz Activado',
        disabled: 'Control por Voz Desactivado',
        enableDescription: 'Haz clic para activar control por voz',
        disableDescription: 'Haz clic para desactivar control por voz',
        denied: 'Acceso al micrófono denegado. Por favor revisa la configuración del navegador.'
      },
      theme: {
        title: 'Tema',
        description: 'Elige tu tema de color preferido'
      },
      language: {
        title: 'Idioma',
        description: 'Selecciona tu idioma'
      },
      keyboardShortcuts: {
        title: 'Atajos de Teclado',
        navigation: 'Navegación',
        algorithmControl: 'Control del algoritmo',
        speedControl: 'Control de velocidad',
        arrayManipulation: 'Manipulación de array',
        modalsOverlays: 'Modales y superposiciones',
        cycleFocus: 'Ciclar enfoque',
        navigatePanels: 'Navegar paneles/pasos',
        playPause: 'Reproducir/Pausar animación',
        resetArray: 'Reiniciar array',
        increaseSpeed: 'Aumentar velocidad',
        decreaseSpeed: 'Disminuir velocidad',
        newArray: 'Nuevo array',
        shuffleArray: 'Mezclar array',
        showShortcutHelp: 'Mostrar/ocultar ayuda de atajos',
        toggleChatAssistant: 'Alternar asistente de chat',
        toggleFeedbackForm: 'Alternar formulario de comentarios',
        toggleSettingsPanel: 'Alternar panel de configuración',
        showHelp: 'Mostrar esta ayuda'
      }
    },
    // Main page
    main: {
      subtitle: 'Visualización interactiva de algoritmos de ordenamiento populares',
      algorithmVisualization: 'Visualización',
      sortingAlgorithmVisualizer: 'Visualizador de Algoritmos de Ordenamiento',
      builtWith: 'Construido con',
      by: 'por',
      contributors: 'Contribuidores',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'Patrocinar',
      buyMeACoffee: 'Cómprame un café',
      twitter: 'Twitter'
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'visualizador de algoritmos'
      },
      tabs: {
        config: 'config',
        metrics: 'métricas',
        details: 'detalles',
        overview: 'resumen',
        guide: 'guía'
      },
      controls: {
        selectAlgorithm: 'seleccionar algoritmo',
        algorithm: 'Algoritmo',
        arraySize: 'tamaño del array',
        animationDelay: 'retraso de animación',
        elements: 'Elementos',
        delay: 'Retraso',
        newArray: 'nuevo_array()',
        start: 'iniciar()',
        stop: 'detener()',
        mergeSort: 'ordenamiento_mezcla()',
        ready: 'listo',
        small: 'Pequeño',
        medium: 'Mediano',
        large: 'Grande',
        fast: 'Rápido',
        slow: 'Lento',
        goodForLearning: 'Bueno para aprender',
        balanced: 'Equilibrado',
        performanceTest: 'Prueba de rendimiento',
        visualizePatterns: 'Visualizar patrones',
        elementsCount: 'elementos'
      },
      complexity: {
        efficiencyRating: 'CALIFICACIÓN DE EFICIENCIA',
        timeComplexity: 'COMPLEJIDAD TEMPORAL',
        spaceComplexity: 'COMPLEJIDAD ESPACIAL',
        bestCase: 'MEJOR CASO',
        average: 'PROMEDIO',
        worstCase: 'PEOR CASO',
        high: 'Alto',
        algorithmComplexity: 'complejidad del algoritmo'
      }
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description: 'Algoritmo simple basado en comparaciones que recorre repetidamente la lista, compara elementos adyacentes y los intercambia si están en el orden incorrecto.'
      },
      insertion: {
        description: 'Construye el array ordenado un elemento a la vez comparando cada nuevo elemento con los elementos ya ordenados e insertándolo en la posición correcta.'
      },
      selection: {
        description: 'Encuentra repetidamente el elemento mínimo de la parte no ordenada y lo coloca al principio de la parte no ordenada.'
      },
      quick: {
        description: 'Algoritmo de divide y vencerás que selecciona un elemento \'pivote\' y particiona el array alrededor del pivote, ordenando recursivamente los sub-arrays.'
      },
      merge: {
        description: 'Algoritmo de divide y vencerás que divide el array en dos mitades, las ordena por separado y luego fusiona las mitades ordenadas.'
      },
      radix: {
        description: 'Algoritmo de ordenamiento no comparativo que ordena datos con claves enteras agrupando las claves por dígitos individuales que comparten la misma posición y valor.'
      },
      heap: {
        description: 'Algoritmo de ordenamiento basado en comparaciones que usa una estructura de datos de montículo binario para ordenar elementos. Construye un montículo máximo y extrae repetidamente el elemento máximo.'
      },
      bucket: {
        description: 'Ordenamiento de distribución que funciona distribuyendo elementos en varios cubos, ordenando cada cubo individualmente y luego concatenando los cubos.'
      }
    },
    // Metrics
    metrics: {
      currentRunMetrics: 'métricas de ejecución actual',
      swaps: 'INTERCAMBIOS',
      memoryOperations: 'Operaciones de memoria',
      comparisons: 'COMPARACIONES',
      cpuOperations: 'Operaciones de CPU',
      timeMs: 'TIEMPO (MS)',
      executionDuration: 'Duración de ejecución',
      swapRatio: 'RELACIÓN DE INTERCAMBIO',
      swapsComp: 'intercambios/comp',
      timeElement: 'TIEMPO/ELEMENTO',
      msElem: 'ms/elem',
      opsMs: 'OPS/MS',
      opsMsUnit: 'ops/ms',
      score: 'PUNTUACIÓN',
      points: 'puntos',
      performanceBreakdown: 'DESGLOSE DE RENDIMIENTO',
      time: 'Tiempo',
      potentialImprovement: 'Mejora potencial:',
      algorithmComparison: 'comparación de algoritmos',
      testingAlgorithm: 'Probando algoritmo',
      runningTests: 'Ejecutando pruebas...',
      noComparisonData: 'No hay datos de comparación disponibles',
      runTestAll: 'Ejecuta test_all() para comparar el rendimiento de los algoritmos',
      testAll: 'test_all()',
      stopTest: 'detener_prueba()'
    },
    // Chat
    chat: {
      askAboutSorting: 'Preguntar sobre ordenamiento'
    },
    // Feedback
    feedback: {
      sendFeedback: 'Enviar Comentarios'
    },
    // Details page
    details: {
      basicSorts: 'ORDENAMIENTOS BÁSICOS',
      efficientSorts: 'ORDENAMIENTOS EFICIENTES',
      specialSorts: 'ORDENAMIENTOS ESPECIALES',
      algorithmDetails: 'detalles de {algorithm}_sort()',
      algorithmImplementation: 'IMPLEMENTACIÓN DE {algorithm}',
      loadingImplementation: 'Cargando implementación de {algorithm}',
      relatedAlgorithms: 'Algoritmos Relacionados',
      historicalContext: 'Contexto Histórico',
      inventedBy: 'Inventado por',
      year: 'Año',
      proTip: 'CONSEJO PROFESIONAL',
      funFact: 'DATOS CURIOSOS',
      tips: {
        bubble: '¡Intenta aumentar el tamaño del array para ver cómo el rendimiento del bubble sort se degrada cuadráticamente!',
        insertion: 'Observa cómo el insertion sort funciona excepcionalmente bien en arrays casi ordenados.',
        selection: 'Nota cómo el selection sort siempre toma el mismo tiempo independientemente del orden inicial.',
        quick: 'Observa cómo la selección del pivote afecta el proceso de partición.',
        merge: 'Ve cómo el merge sort divide el array en subarrays más pequeños recursivamente.',
        radix: '¡Observa cómo el radix sort procesa cada posición de dígito independientemente!',
        heap: '¡Nota cómo el heap sort construye un montículo binario y extrae repetidamente el elemento máximo!',
        bucket: '¡Observa cómo el bucket sort distribuye elementos en cubos y los ordena individualmente!'
      },
      facts: {
        bubble: 'El Bubble Sort recibe su nombre por la forma en que los elementos más pequeños "burbujean" hacia la parte superior de la lista a través de intercambios.',
        insertion: 'El Insertion Sort es similar a cómo muchas personas ordenan las cartas en sus manos.',
        selection: 'El Selection Sort hace el número mínimo de intercambios posible (n-1 en el peor caso).',
        quick: 'El Quick Sort fue desarrollado por Tony Hoare en 1959 mientras era estudiante de intercambio en la Universidad Estatal de Moscú.',
        merge: 'El Merge Sort fue inventado por John von Neumann en 1945, uno de los primeros algoritmos de divide y vencerás descritos.',
        radix: 'El Radix Sort precede a las computadoras modernas y se usó con máquinas de clasificación de tarjetas perforadas a principios del siglo XX.',
        heap: 'El Heap Sort fue inventado por J. W. J. Williams en 1964 y es la base para muchas implementaciones de colas de prioridad.',
        bucket: 'El Bucket Sort es particularmente eficiente cuando la entrada está distribuida uniformemente en un rango.'
      }
    },
    // SEO
    seo: {
      title: 'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento',
      description: 'Visualización interactiva de algoritmos de ordenamiento incluyendo bubble sort, merge sort, quick sort y más. Aprende estructuras de datos y algoritmos con métricas de rendimiento en tiempo real y contenido educativo.',
      keywords: 'visualizador de algoritmos de ordenamiento, aprendizaje de DSA, estructuras de datos algoritmos, preparación para entrevistas de programación, merge sort, quick sort, heap sort, bubble sort, educación en ciencias de la computación, animación de algoritmos, aprendizaje interactivo, tutorial de programación, ingeniería de software',
      algorithmTitle: 'Visualizador de {algorithm} Sort - SortVision',
      algorithmDescription: 'Domina el algoritmo {algorithm} sort con el visualizador interactivo de SortVision. Animaciones paso a paso, análisis de rendimiento y aprendizaje integral de DSA para entrevistas de programación.',
      ogTitle: 'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento para Aprendizaje de DSA',
      ogDescription: 'Domina los algoritmos de ordenamiento con visualizaciones interactivas. Perfecto para entrevistas de programación, educación en ciencias de la computación y aprendizaje de DSA.',
      twitterTitle: 'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento',
      twitterDescription: 'Aprende algoritmos de ordenamiento con visualizaciones paso a paso. Esencial para entrevistas de programación y educación en ciencias de la computación.'
    },
    // Common
    common: {
      close: 'Cerrar',
      settings: 'Configuración',
      select: 'Seleccionar',
      enabled: 'Activado',
      disabled: 'Desactivado'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check URL first for language
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh'];
      
      // Check if first segment is a language code
      const pathSegments = path.split('/').filter(Boolean);
      if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
        return pathSegments[0];
      }
      
      // Check URL search params as fallback
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam && supportedLanguages.includes(langParam)) {
        return langParam;
      }
    }
    
    // Check localStorage
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    // Auto-detect language from browser
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Map browser languages to supported languages
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('hi')) return 'hi';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
    
    // Default to English for unsupported languages
    return 'en';
  });

  const [currentTranslations, setCurrentTranslations] = useState(translations[language]);

  useEffect(() => {
    setCurrentTranslations(translations[language]);
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      }
    }
    
    // Handle interpolation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }
    
    return value;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    
    // Update URL to reflect language change
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      
      // Remove existing language from path if present
      let newPath = currentPath;
      const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh'];
      
      // Check if first segment is a language code and remove it
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
        // Remove the language segment and reconstruct path
        pathSegments.shift();
        newPath = '/' + pathSegments.join('/');
      }
      
      // Ensure path starts with /
      if (!newPath.startsWith('/')) {
        newPath = '/' + newPath;
      }
      
      // Add new language to path (except for English)
      if (newLanguage !== 'en') {
        newPath = `/${newLanguage}${newPath}`;
      }
      
      // Update URL without page reload
      const newUrl = `${newPath}${currentSearch}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: currentTranslations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
