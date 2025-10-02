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
    // Contributions
    contributions: {
      stats: {
        contributors: 'Contributors',
        amazingDevelopers: 'Amazing developers',
        totalCommits: 'Total Commits',
        linesOfImpact: 'Lines of impact',
        githubStars: 'GitHub Stars',
        communityLove: 'Community love',
        forks: 'Forks',
        projectCopies: 'Project copies',
        contributorMetrics: 'contributor metrics'
      },
      list: {
        filterByType: 'filter by type',
        allContributors: 'All Contributors',
        searchContributors: 'search contributors',
        typeUsername: 'Type username...',
        contributorsFound: 'contributors found',
        noContributorsFound: 'No contributors found',
        loadingContributors: 'Loading contributors...',
        projectAdmins: 'Project Admins',
        community: 'Community',
        bots: 'Bots',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'commits',
        developer: 'Developer',
        profile: 'Profile',
        details: 'Details',
        contributions: 'contributions'
      },
      health: {
        issues: 'Issues',
        open: 'Open',
        closed: 'Closed',
        recent: 'Recent',
        pullRequests: 'Pull Requests',
        merged: 'Merged',
        repository: 'Repository',
        size: 'Size',
        language: 'Language',
        stars: 'Stars'
      },
        contributorDetail: {
          loading: 'Loading contributor data...',
          progress: 'Progress',
          profileDetails: 'Profile Details',
          publicRepos: 'Public Repos',
          followers: 'Followers',
          following: 'Following',
          repoCommits: 'Repo Commits',
          pullRequests: 'Pull Requests',
          issues: 'Issues',
          linesAdded: 'Lines Added',
          linesDeleted: 'Lines Deleted',
          total: 'Total',
          merged: 'merged',
          open: 'open',
          closed: 'closed',
          totalInsertions: 'Total insertions (complete history)',
          totalInsertionsPartial: 'Total insertions (partial data - cached stats not available)',
          totalDeletions: 'Total deletions (complete history)',
          totalDeletionsPartial: 'Total deletions (partial data - cached stats not available)',
          noPullRequests: 'No pull requests found',
          noIssues: 'No issues found',
          noCommits: 'No commits found',
          updated: 'Updated',
          files: 'files',
          modifiedFiles: 'Modified files',
          andMore: 'and {count} more files',
          commit: 'commit'
        },
        guide: {
          contributionGuide: 'contribution guide',
          phase: 'Phase',
          gettingStarted: 'Getting Started',
          development: 'Development',
          submission: 'Submission',
          forkRepository: 'Fork the Repository',
          createCopy: 'Create your own copy of SortVision',
          setupEnvironment: 'Set Up Development Environment',
          installDependencies: 'Install dependencies and run locally',
          createBranch: 'Create Feature Branch',
          createNewBranch: 'Create a new branch for your changes',
          makeChanges: 'Make Your Changes',
          implementFeature: 'Implement your feature or fix',
          commitPush: 'Commit & Push',
          commitChanges: 'Commit your changes with clear messages',
          createPR: 'Create Pull Request',
          submitChanges: 'Submit your changes for review',
          previous: '← Previous',
          nextPhase: 'Next Phase →',
          phaseComplete: 'Phase {phase} Complete!',
          greatWork: 'Great work! You\'ve completed all steps in this phase.',
          continueTo: 'Continue to {phase} →',
          bestPractices: 'best practices',
          codeQuality: 'Code Quality',
          codeQualityDesc: 'Clean, readable, and maintainable code practices',
          reactPractices: 'React Best Practices',
          reactPracticesDesc: 'Modern React patterns and hooks usage',
          performanceTips: 'Performance Tips',
          performanceTipsDesc: 'Optimization techniques for better app performance',
          quickGuidelines: '📋 Quick Guidelines',
          followPatterns: '• Follow existing patterns',
          clearCommits: '• Write clear commit messages',
          testChanges: '• Test your changes',
          keepFocused: '• Keep components focused',
          do: 'DO:',
          dont: 'DON\'T:',
          useDescriptiveNames: 'Use descriptive variable names',
          keepFunctionsSmall: 'Keep functions small and focused',
          avoidMagicNumbers: 'Avoid magic numbers',
          useFunctionalComponents: 'Use functional components with hooks',
          includeDependencies: 'Include proper useEffect dependencies',
          avoidInlineStyles: 'Avoid inline styles, use Tailwind classes',
          memoizeCalculations: 'Memoize expensive calculations',
          useCallback: 'Use useCallback for event handlers',
          importSpecific: 'Import entire libraries when not needed',
          quickReferences: 'quick references',
          contributionGuidelines: 'Contribution Guidelines',
          detailedRules: 'Detailed contribution rules',
          githubIssues: 'GitHub Issues',
          findIssues: 'Find issues to work on',
          codeOfConduct: 'Code of Conduct',
          communityGuidelines: 'Community guidelines'
        }
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
    // Contributions
    contributions: {
      stats: {
        contributors: 'Contribuidores',
        amazingDevelopers: 'Desarrolladores increíbles',
        totalCommits: 'Commits Totales',
        linesOfImpact: 'Líneas de impacto',
        githubStars: 'Estrellas de GitHub',
        communityLove: 'Amor de la comunidad',
        forks: 'Forks',
        projectCopies: 'Copias del proyecto',
        contributorMetrics: 'métricas de contribuidores'
      },
      list: {
        filterByType: 'filtrar por tipo',
        allContributors: 'Todos los Contribuidores',
        searchContributors: 'buscar contribuidores',
        typeUsername: 'Escribir nombre de usuario...',
        contributorsFound: 'contribuidores encontrados',
        noContributorsFound: 'No se encontraron contribuidores',
        loadingContributors: 'Cargando contribuidores...',
        projectAdmins: 'Administradores del Proyecto',
        community: 'Comunidad',
        bots: 'Bots',
        admin: 'ADMIN',
        communityBadge: 'COMUNIDAD',
        bot: 'BOT',
        commits: 'commits',
        developer: 'Desarrollador',
        profile: 'Perfil',
        details: 'Detalles',
        contributions: 'contribuciones'
      },
      health: {
        issues: 'Problemas',
        open: 'Abiertos',
        closed: 'Cerrados',
        recent: 'Recientes',
        pullRequests: 'Pull Requests',
        merged: 'Fusionados',
        repository: 'Repositorio',
        size: 'Tamaño',
        language: 'Lenguaje',
        stars: 'Estrellas'
      },
      contributorDetail: {
        loading: 'Cargando datos del contribuidor...',
        progress: 'Progreso',
        profileDetails: 'Detalles del Perfil',
        publicRepos: 'Repos Públicos',
        followers: 'Seguidores',
        following: 'Siguiendo',
        repoCommits: 'Commits del Repo',
        pullRequests: 'Pull Requests',
        issues: 'Problemas',
        linesAdded: 'Líneas Agregadas',
        linesDeleted: 'Líneas Eliminadas',
        total: 'Total',
        merged: 'fusionado',
        open: 'abierto',
        closed: 'cerrado',
        totalInsertions: 'Total de inserciones (historial completo)',
        totalInsertionsPartial: 'Total de inserciones (datos parciales - estadísticas en caché no disponibles)',
        totalDeletions: 'Total de eliminaciones (historial completo)',
        totalDeletionsPartial: 'Total de eliminaciones (datos parciales - estadísticas en caché no disponibles)',
        noPullRequests: 'No se encontraron pull requests',
        noIssues: 'No se encontraron problemas',
        noCommits: 'No se encontraron commits',
        updated: 'Actualizado',
        files: 'archivos',
        modifiedFiles: 'Archivos modificados',
        andMore: 'y {count} archivos más',
        commit: 'commit'
      },
      guide: {
        contributionGuide: 'guía de contribución',
        phase: 'Fase',
        gettingStarted: 'Comenzar',
        development: 'Desarrollo',
        submission: 'Envío',
        forkRepository: 'Hacer Fork del Repositorio',
        createCopy: 'Crea tu propia copia de SortVision',
        setupEnvironment: 'Configurar Entorno de Desarrollo',
        installDependencies: 'Instalar dependencias y ejecutar localmente',
        createBranch: 'Crear Rama de Característica',
        createNewBranch: 'Crear una nueva rama para tus cambios',
        makeChanges: 'Hacer Tus Cambios',
        implementFeature: 'Implementa tu característica o corrección',
        commitPush: 'Commit y Push',
        commitChanges: 'Haz commit de tus cambios con mensajes claros',
        createPR: 'Crear Pull Request',
        submitChanges: 'Envía tus cambios para revisión',
        previous: '← Anterior',
        nextPhase: 'Siguiente Fase →',
        phaseComplete: '¡Fase {phase} Completada!',
        greatWork: '¡Excelente trabajo! Has completado todos los pasos en esta fase.',
        continueTo: 'Continuar a {phase} →',
        bestPractices: 'mejores prácticas',
        codeQuality: 'Calidad del Código',
        codeQualityDesc: 'Prácticas de código limpio, legible y mantenible',
        reactPractices: 'Mejores Prácticas de React',
        reactPracticesDesc: 'Patrones modernos de React y uso de hooks',
        performanceTips: 'Consejos de Rendimiento',
        performanceTipsDesc: 'Técnicas de optimización para mejor rendimiento de la app',
        quickGuidelines: '📋 Guías Rápidas',
        followPatterns: '• Sigue los patrones existentes',
        clearCommits: '• Escribe mensajes de commit claros',
        testChanges: '• Prueba tus cambios',
        keepFocused: '• Mantén los componentes enfocados',
        do: 'HACER:',
        dont: 'NO HACER:',
        useDescriptiveNames: 'Usa nombres de variables descriptivos',
        keepFunctionsSmall: 'Mantén las funciones pequeñas y enfocadas',
        avoidMagicNumbers: 'Evita números mágicos',
        useFunctionalComponents: 'Usa componentes funcionales con hooks',
        includeDependencies: 'Incluye dependencias correctas de useEffect',
        avoidInlineStyles: 'Evita estilos inline, usa clases de Tailwind',
        memoizeCalculations: 'Memoriza cálculos costosos',
        useCallback: 'Usa useCallback para manejadores de eventos',
        importSpecific: 'Importa bibliotecas enteras cuando no se necesiten',
        quickReferences: 'referencias rápidas',
        contributionGuidelines: 'Guías de Contribución',
        detailedRules: 'Reglas detalladas de contribución',
        githubIssues: 'Issues de GitHub',
        findIssues: 'Encuentra issues en los que trabajar',
        codeOfConduct: 'Código de Conducta',
        communityGuidelines: 'Guías de la comunidad'
      }
    },
    // Common
    common: {
      close: 'Cerrar',
      settings: 'Configuración',
      select: 'Seleccionar',
      enabled: 'Activado',
      disabled: 'Desactivado'
    }
  },
  hi: {
    // Settings Modal
    settings: {
      title: 'सॉर्ट सेटिंग्स',
      description: 'अपनी विज़ुअलाइज़ेशन प्राथमिकताएं कस्टमाइज़ करें',
      description2: 'अपने अनुभव को बेहतर बनाने के लिए ध्वनि, थीम और भाषा सेटिंग्स समायोजित करें',
      sound: {
        title: 'ध्वनि',
        description: 'ध्वनि प्रभाव सक्षम या अक्षम करें',
        enabled: 'ध्वनि सक्षम',
        disabled: 'ध्वनि अक्षम',
        enableDescription: 'ध्वनि प्रभाव सक्षम करने के लिए क्लिक करें',
        disableDescription: 'ध्वनि प्रभाव अक्षम करने के लिए क्लिक करें'
      },
      voiceControl: {
        title: 'वॉइस कंट्रोल',
        description: 'वॉइस कंट्रोल सक्षम या अक्षम करें',
        enabled: 'वॉइस कंट्रोल सक्षम',
        disabled: 'वॉइस कंट्रोल अक्षम',
        enableDescription: 'वॉइस कंट्रोल सक्षम करने के लिए क्लिक करें',
        disableDescription: 'वॉइस कंट्रोल अक्षम करने के लिए क्लिक करें',
        denied: 'माइक्रोफोन एक्सेस अस्वीकृत। कृपया ब्राउज़र सेटिंग्स जांचें।'
      },
      theme: {
        title: 'थीम',
        description: 'अपना पसंदीदा रंग थीम चुनें'
      },
      language: {
        title: 'भाषा',
        description: 'अपनी भाषा चुनें'
      },
      keyboardShortcuts: {
        title: 'कीबोर्ड शॉर्टकट',
        navigation: 'नेविगेशन',
        algorithmControl: 'एल्गोरिदम नियंत्रण',
        speedControl: 'गति नियंत्रण',
        arrayManipulation: 'एरे मैनिपुलेशन',
        modalsOverlays: 'मोडल और ओवरले',
        cycleFocus: 'फोकस चक्र',
        navigatePanels: 'पैनल/चरण नेविगेट करें',
        playPause: 'प्ले/पॉज़ एनीमेशन',
        resetArray: 'एरे रीसेट करें',
        increaseSpeed: 'गति बढ़ाएं',
        decreaseSpeed: 'गति कम करें',
        newArray: 'नया एरे',
        shuffleArray: 'एरे मिलाएं',
        showShortcutHelp: 'शॉर्टकट सहायता दिखाएं/छुपाएं',
        toggleChatAssistant: 'चैट असिस्टेंट टॉगल करें',
        toggleFeedbackForm: 'फीडबैक फॉर्म टॉगल करें',
        toggleSettingsPanel: 'सेटिंग्स पैनल टॉगल करें',
        showHelp: 'इस सहायता को दिखाएं'
      }
    },
    // Main page
    main: {
      subtitle: 'लोकप्रिय सॉर्टिंग एल्गोरिदम की इंटरैक्टिव विज़ुअलाइज़ेशन',
      algorithmVisualization: 'विज़ुअलाइज़ेशन',
      sortingAlgorithmVisualizer: 'सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      builtWith: 'के साथ बनाया गया',
      by: 'द्वारा',
      contributors: 'योगदानकर्ता',
      sortVision: 'सॉर्टविज़न',
      github: 'गिटहब',
      linkedin: 'लिंक्डइन',
      sponsor: 'प्रायोजक',
      buyMeACoffee: 'मुझे कॉफी खरीदें',
      twitter: 'ट्विटर'
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'एल्गोरिदम विज़ुअलाइज़र'
      },
      tabs: {
        config: 'कॉन्फ़िग',
        metrics: 'मेट्रिक्स',
        details: 'विवरण',
        overview: 'अवलोकन',
        guide: 'गाइड'
      },
      controls: {
        selectAlgorithm: 'एल्गोरिदम चुनें',
        algorithm: 'एल्गोरिदम',
        arraySize: 'एरे का आकार',
        animationDelay: 'एनीमेशन देरी',
        elements: 'तत्व',
        delay: 'देरी',
        newArray: 'नया_एरे()',
        start: 'शुरू()',
        stop: 'रोक()',
        mergeSort: 'मर्ज_सॉर्ट()',
        ready: 'तैयार',
        small: 'छोटा',
        medium: 'मध्यम',
        large: 'बड़ा',
        fast: 'तेज़',
        slow: 'धीमा',
        goodForLearning: 'सीखने के लिए अच्छा',
        balanced: 'संतुलित',
        performanceTest: 'प्रदर्शन परीक्षण',
        visualizePatterns: 'पैटर्न विज़ुअलाइज़ करें',
        elementsCount: 'तत्व'
      },
      complexity: {
        efficiencyRating: 'दक्षता रेटिंग',
        timeComplexity: 'समय जटिलता',
        spaceComplexity: 'स्थान जटिलता',
        bestCase: 'सबसे अच्छा मामला',
        average: 'औसत',
        worstCase: 'सबसे खराब मामला',
        high: 'उच्च',
        algorithmComplexity: 'एल्गोरिदम जटिलता'
      }
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description: 'सरल तुलना-आधारित एल्गोरिदम जो सूची के माध्यम से बार-बार चलता है, आसन्न तत्वों की तुलना करता है, और यदि वे गलत क्रम में हैं तो उन्हें स्वैप करता है।'
      },
      insertion: {
        description: 'एक समय में एक आइटम द्वारा सॉर्ट किए गए एरे का निर्माण करता है, प्रत्येक नए तत्व की पहले से सॉर्ट किए गए तत्वों के साथ तुलना करके और इसे सही स्थिति में सम्मिलित करके।'
      },
      selection: {
        description: 'बार-बार असंगठित भाग से न्यूनतम तत्व ढूंढता है और इसे असंगठित भाग की शुरुआत में रखता है।'
      },
      quick: {
        description: 'डिवाइड-एंड-कॉन्कर एल्गोरिदम जो एक \'पिवोट\' तत्व चुनता है और पिवोट के आसपास एरे को विभाजित करता है, सब-एरे को पुनरावर्ती रूप से सॉर्ट करता है।'
      },
      merge: {
        description: 'डिवाइड-एंड-कॉन्कर एल्गोरिदम जो एरे को दो हिस्सों में विभाजित करता है, उन्हें अलग-अलग सॉर्ट करता है, और फिर सॉर्ट किए गए हिस्सों को मर्ज करता है।'
      },
      radix: {
        description: 'गैर-तुलनात्मक सॉर्टिंग एल्गोरिदम जो पूर्णांक कुंजियों वाले डेटा को व्यक्तिगत अंकों द्वारा कुंजियों को समूहीकृत करके सॉर्ट करता है जो समान स्थिति और मूल्य साझा करते हैं।'
      },
      heap: {
        description: 'तुलना-आधारित सॉर्टिंग एल्गोरिदम जो तत्वों को सॉर्ट करने के लिए बाइनरी हीप डेटा स्ट्रक्चर का उपयोग करता है। यह एक मैक्स हीप बनाता है और बार-बार अधिकतम तत्व निकालता है।'
      },
      bucket: {
        description: 'डिस्ट्रीब्यूशन सॉर्ट जो तत्वों को कई बकेट में वितरित करके, प्रत्येक बकेट को अलग-अलग सॉर्ट करके, और फिर बकेट को जोड़कर काम करता है।'
      }
    },
    // Metrics
    metrics: {
      currentRunMetrics: 'वर्तमान रन मेट्रिक्स',
      swaps: 'स्वैप',
      memoryOperations: 'मेमोरी ऑपरेशन',
      comparisons: 'तुलना',
      cpuOperations: 'सीपीयू ऑपरेशन',
      timeMs: 'समय (एमएस)',
      executionDuration: 'निष्पादन अवधि',
      swapRatio: 'स्वैप अनुपात',
      swapsComp: 'स्वैप/तुलना',
      timeElement: 'समय/तत्व',
      msElem: 'एमएस/तत्व',
      opsMs: 'ऑप्स/एमएस',
      opsMsUnit: 'ऑप्स/एमएस',
      score: 'स्कोर',
      points: 'अंक',
      performanceBreakdown: 'प्रदर्शन विभाजन',
      time: 'समय',
      potentialImprovement: 'संभावित सुधार:',
      algorithmComparison: 'एल्गोरिदम तुलना',
      testingAlgorithm: 'एल्गोरिदम का परीक्षण',
      runningTests: 'परीक्षण चल रहे हैं...',
      noComparisonData: 'कोई तुलना डेटा उपलब्ध नहीं',
      runTestAll: 'एल्गोरिदम प्रदर्शन की तुलना करने के लिए test_all() चलाएं',
      testAll: 'test_all()',
      stopTest: 'stop_test()'
    },
    // Chat
    chat: {
      askAboutSorting: 'सॉर्टिंग के बारे में पूछें'
    },
    // Feedback
    feedback: {
      sendFeedback: 'फीडबैक भेजें'
    },
    // Details page
    details: {
      basicSorts: 'बेसिक सॉर्ट्स',
      efficientSorts: 'कुशल सॉर्ट्स',
      specialSorts: 'विशेष सॉर्ट्स',
      algorithmDetails: '{algorithm}_sort() विवरण',
      algorithmImplementation: '{algorithm} कार्यान्वयन',
      loadingImplementation: '{algorithm} कार्यान्वयन लोड हो रहा है',
      relatedAlgorithms: 'संबंधित एल्गोरिदम',
      historicalContext: 'ऐतिहासिक संदर्भ',
      inventedBy: 'आविष्कारक',
      year: 'वर्ष',
      proTip: 'प्रो टिप',
      funFact: 'मजेदार तथ्य',
      tips: {
        bubble: 'बबल सॉर्ट के प्रदर्शन में कैसे चतुर्भुजीय गिरावट आती है, इसे देखने के लिए एरे का आकार बढ़ाने की कोशिश करें!',
        insertion: 'देखें कि कैसे इंसर्शन सॉर्ट लगभग सॉर्ट किए गए एरे पर असाधारण रूप से अच्छा प्रदर्शन करता है।',
        selection: 'ध्यान दें कि कैसे सिलेक्शन सॉर्ट हमेशा प्रारंभिक क्रम की परवाह किए बिना समान समय लेता है।',
        quick: 'देखें कि कैसे पिवोट चयन विभाजन प्रक्रिया को प्रभावित करता है।',
        merge: 'देखें कि कैसे मर्ज सॉर्ट एरे को पुनरावर्ती रूप से छोटे सब-एरे में विभाजित करता है।',
        radix: 'देखें कि कैसे रेडिक्स सॉर्ट प्रत्येक अंक स्थिति को स्वतंत्र रूप से संसाधित करता है!',
        heap: 'ध्यान दें कि कैसे हीप सॉर्ट एक बाइनरी हीप बनाता है और बार-बार अधिकतम तत्व निकालता है!',
        bucket: 'देखें कि कैसे बकेट सॉर्ट तत्वों को बकेट में वितरित करता है और उन्हें अलग-अलग सॉर्ट करता है!'
      },
      facts: {
        bubble: 'बबल सॉर्ट का नाम इस तरीके से पड़ा है कि छोटे तत्व एक्सचेंज के माध्यम से सूची के शीर्ष पर "बबल" करते हैं।',
        insertion: 'इंसर्शन सॉर्ट कई लोगों के हाथों में प्लेइंग कार्ड्स को सॉर्ट करने के तरीके के समान है।',
        selection: 'सिलेक्शन सॉर्ट संभव न्यूनतम संख्या में स्वैप करता है (सबसे खराब मामले में n-1)।',
        quick: 'क्विक सॉर्ट को 1959 में टोनी होरे द्वारा विकसित किया गया था जब वे मॉस्को स्टेट यूनिवर्सिटी में एक्सचेंज छात्र थे।',
        merge: 'मर्ज सॉर्ट का आविष्कार 1945 में जॉन वॉन न्यूमैन ने किया था, यह वर्णित सबसे पुराने डिवाइड-एंड-कॉन्कर एल्गोरिदम में से एक है।',
        radix: 'रेडिक्स सॉर्ट आधुनिक कंप्यूटरों से पहले का है और 20वीं सदी की शुरुआत में पंच कार्ड सॉर्टिंग मशीनों के साथ उपयोग किया जाता था।',
        heap: 'हीप सॉर्ट का आविष्कार 1964 में जे. डब्ल्यू. जे. विलियम्स ने किया था और यह कई प्राथमिकता कतार कार्यान्वयन का आधार है।',
        bucket: 'बकेट सॉर्ट विशेष रूप से कुशल होता है जब इनपुट एक सीमा में समान रूप से वितरित होता है।'
      }
    },
    // SEO
    seo: {
      title: 'सॉर्टविज़न - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      description: 'बबल सॉर्ट, मर्ज सॉर्ट, क्विक सॉर्ट और अधिक सहित सॉर्टिंग एल्गोरिदम की इंटरैक्टिव विज़ुअलाइज़ेशन। रियल-टाइम प्रदर्शन मेट्रिक्स और शैक्षिक सामग्री के साथ डेटा स्ट्रक्चर और एल्गोरिदम सीखें।',
      keywords: 'सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, डेटा स्ट्रक्चर एल्गोरिदम, कोडिंग इंटरव्यू तैयारी, मर्ज सॉर्ट, क्विक सॉर्ट, हीप सॉर्ट, बबल सॉर्ट, कंप्यूटर साइंस शिक्षा, एल्गोरिदम एनीमेशन, इंटरैक्टिव सीखना, प्रोग्रामिंग ट्यूटोरियल, सॉफ्टवेयर इंजीनियरिंग',
      algorithmTitle: '{algorithm} सॉर्ट विज़ुअलाइज़र - सॉर्टविज़न',
      algorithmDescription: 'सॉर्टविज़न के इंटरैक्टिव विज़ुअलाइज़र के साथ {algorithm} सॉर्ट एल्गोरिदम में महारत हासिल करें। स्टेप-बाय-स्टेप एनीमेशन, प्रदर्शन विश्लेषण, और कोडिंग इंटरव्यू के लिए व्यापक DSA सीखना।',
      ogTitle: 'सॉर्टविज़न - DSA सीखने के लिए इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      ogDescription: 'इंटरैक्टिव विज़ुअलाइज़ेशन के साथ सॉर्टिंग एल्गोरिदम में महारत हासिल करें। कोडिंग इंटरव्यू, कंप्यूटर साइंस शिक्षा और DSA सीखने के लिए परफेक्ट।',
      twitterTitle: 'सॉर्टविज़न - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      twitterDescription: 'स्टेप-बाय-स्टेप विज़ुअलाइज़ेशन के साथ सॉर्टिंग एल्गोरिदम सीखें। कोडिंग इंटरव्यू और कंप्यूटर साइंस शिक्षा के लिए आवश्यक।'
    },
    // Contributions
    contributions: {
      stats: {
        contributors: 'योगदानकर्ता',
        amazingDevelopers: 'अद्भुत डेवलपर्स',
        totalCommits: 'कुल कमिट्स',
        linesOfImpact: 'प्रभाव की लाइनें',
        githubStars: 'GitHub सितारे',
        communityLove: 'समुदाय का प्यार',
        forks: 'Forks',
        projectCopies: 'प्रोजेक्ट की कॉपी',
        contributorMetrics: 'योगदानकर्ता मेट्रिक्स'
      },
      list: {
        filterByType: 'प्रकार के अनुसार फिल्टर करें',
        allContributors: 'सभी योगदानकर्ता',
        searchContributors: 'योगदानकर्ता खोजें',
        typeUsername: 'उपयोगकर्ता नाम टाइप करें...',
        contributorsFound: 'योगदानकर्ता मिले',
        noContributorsFound: 'कोई योगदानकर्ता नहीं मिले',
        loadingContributors: 'योगदानकर्ता लोड हो रहे हैं...',
        projectAdmins: 'प्रोजेक्ट एडमिन',
        community: 'कम्युनिटी',
        bots: 'बॉट्स',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'कमिट्स',
        developer: 'डेवलपर',
        profile: 'प्रोफाइल',
        details: 'विवरण',
        contributions: 'योगदान'
      },
      health: {
        issues: 'समस्याएं',
        open: 'खुले',
        closed: 'बंद',
        recent: 'हाल के',
        pullRequests: 'Pull Requests',
        merged: 'मर्ज किए गए',
        repository: 'रिपॉजिटरी',
        size: 'आकार',
        language: 'भाषा',
        stars: 'सितारे'
      },
      contributorDetail: {
        loading: 'योगदानकर्ता डेटा लोड हो रहा है...',
        progress: 'प्रगति',
        profileDetails: 'प्रोफ़ाइल विवरण',
        publicRepos: 'सार्वजनिक रिपॉजिटरी',
        followers: 'फॉलोअर्स',
        following: 'फॉलो कर रहे',
        repoCommits: 'रिपो कमिट्स',
        pullRequests: 'Pull Requests',
        issues: 'समस्याएं',
        linesAdded: 'लाइनें जोड़ी गईं',
        linesDeleted: 'लाइनें हटाई गईं',
        total: 'कुल',
        merged: 'मर्ज किया गया',
        open: 'खुला',
        closed: 'बंद',
        totalInsertions: 'कुल सम्मिलन (पूरा इतिहास)',
        totalInsertionsPartial: 'कुल सम्मिलन (आंशिक डेटा - कैश्ड स्टैट्स उपलब्ध नहीं)',
        totalDeletions: 'कुल विलोपन (पूरा इतिहास)',
        totalDeletionsPartial: 'कुल विलोपन (आंशिक डेटा - कैश्ड स्टैट्स उपलब्ध नहीं)',
        noPullRequests: 'कोई pull request नहीं मिला',
        noIssues: 'कोई समस्या नहीं मिली',
        noCommits: 'कोई commit नहीं मिला',
        updated: 'अपडेट किया गया',
        files: 'फाइलें',
        modifiedFiles: 'संशोधित फाइलें',
        andMore: 'और {count} फाइलें',
        commit: 'commit'
      },
      guide: {
        contributionGuide: 'योगदान गाइड',
        phase: 'चरण',
        gettingStarted: 'शुरुआत करें',
        development: 'विकास',
        submission: 'जमा करना',
        forkRepository: 'रिपॉजिटरी को फोर्क करें',
        createCopy: 'SortVision की अपनी कॉपी बनाएं',
        setupEnvironment: 'डेवलपमेंट एनवायरनमेंट सेटअप करें',
        installDependencies: 'डिपेंडेंसी इंस्टॉल करें और लोकली चलाएं',
        createBranch: 'फीचर ब्रांच बनाएं',
        createNewBranch: 'अपने बदलावों के लिए नई ब्रांच बनाएं',
        makeChanges: 'अपने बदलाव करें',
        implementFeature: 'अपनी फीचर या फिक्स इम्प्लीमेंट करें',
        commitPush: 'कमिट और पुश',
        commitChanges: 'स्पष्ट संदेशों के साथ अपने बदलाव कमिट करें',
        createPR: 'Pull Request बनाएं',
        submitChanges: 'रिव्यू के लिए अपने बदलाव जमा करें',
        previous: '← पिछला',
        nextPhase: 'अगला चरण →',
        phaseComplete: 'चरण {phase} पूरा!',
        greatWork: 'बहुत बढ़िया! आपने इस चरण के सभी स्टेप्स पूरे कर लिए हैं।',
        continueTo: '{phase} पर जारी रखें →',
        bestPractices: 'सर्वोत्तम अभ्यास',
        codeQuality: 'कोड गुणवत्ता',
        codeQualityDesc: 'साफ, पठनीय और रखरखाव योग्य कोड प्रथाएं',
        reactPractices: 'React सर्वोत्तम अभ्यास',
        reactPracticesDesc: 'आधुनिक React पैटर्न और hooks का उपयोग',
        performanceTips: 'प्रदर्शन सुझाव',
        performanceTipsDesc: 'बेहतर ऐप प्रदर्शन के लिए अनुकूलन तकनीकें',
        quickGuidelines: '📋 त्वरित दिशानिर्देश',
        followPatterns: '• मौजूदा पैटर्न का पालन करें',
        clearCommits: '• स्पष्ट कमिट संदेश लिखें',
        testChanges: '• अपने बदलावों का परीक्षण करें',
        keepFocused: '• कंपोनेंट्स को केंद्रित रखें',
        do: 'करें:',
        dont: 'न करें:',
        useDescriptiveNames: 'वर्णनात्मक वेरिएबल नामों का उपयोग करें',
        keepFunctionsSmall: 'फंक्शन्स को छोटा और केंद्रित रखें',
        avoidMagicNumbers: 'मैजिक नंबरों से बचें',
        useFunctionalComponents: 'hooks के साथ फंक्शनल कंपोनेंट्स का उपयोग करें',
        includeDependencies: 'सही useEffect dependencies शामिल करें',
        avoidInlineStyles: 'इनलाइन स्टाइल्स से बचें, Tailwind classes का उपयोग करें',
        memoizeCalculations: 'महंगी गणनाओं को मेमोइज़ करें',
        useCallback: 'इवेंट हैंडलर्स के लिए useCallback का उपयोग करें',
        importSpecific: 'जरूरत न होने पर पूरी लाइब्रेरी इम्पोर्ट न करें',
        quickReferences: 'त्वरित संदर्भ',
        contributionGuidelines: 'योगदान दिशानिर्देश',
        detailedRules: 'विस्तृत योगदान नियम',
        githubIssues: 'GitHub Issues',
        findIssues: 'काम करने के लिए issues खोजें',
        codeOfConduct: 'आचार संहिता',
        communityGuidelines: 'समुदाय दिशानिर्देश'
      }
    },
    // Common
    common: {
      close: 'बंद करें',
      settings: 'सेटिंग्स',
      select: 'चुनें',
      enabled: 'सक्षम',
      disabled: 'अक्षम'
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

  // Utility function to generate localized URLs
  const getLocalizedUrl = (path) => {
    if (typeof window === 'undefined') return path;
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Add language prefix for non-English languages
    if (language !== 'en') {
      return `/${language}/${cleanPath}`;
    }
    
    return `/${cleanPath}`;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: currentTranslations,
    getLocalizedUrl
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
