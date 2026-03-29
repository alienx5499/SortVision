import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translation files
const translations = {
  en: {
    // Settings Modal
    settings: {
      title: 'SortSettings',
      description: 'Customize your visualization preferences',
      description2:
        'Adjust sound, theme, and language settings to enhance your experience',
      sound: {
        title: 'Sound',
        description: 'Enable or disable sound effects',
        enabled: 'Sound Enabled',
        disabled: 'Sound Disabled',
        enableDescription: 'Click to enable sound effects',
        disableDescription: 'Click to disable sound effects',
      },
      voiceControl: {
        title: 'Voice Control',
        description: 'Enable or disable voice control',
        enabled: 'Voice Control Enabled',
        disabled: 'Voice Control Disabled',
        enableDescription: 'Click to enable voice control',
        disableDescription: 'Click to disable voice control',
        denied: 'Microphone access denied. Please check browser settings.',
      },
      theme: {
        title: 'Theme',
        description: 'Choose your preferred color theme',
      },
      language: {
        title: 'Language',
        description: 'Select your language',
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
        showHelp: 'Show this help',
      },
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
      twitter: 'Twitter',
      sponsorModal: {
        title: 'Support SortVision',
        subtitle: 'Choose how to help',
        devLabel: '// from the developer',
        openerIntroPrefix: "Hey 👋 I'm ",
        openerIntroSuffix: ' — I created SortVision and ',
        openerContributorsKnown: '{count} amazing contributors helped build it.',
        openerContributorsUnknown: 'an amazing community helped build it.',
        openerOutro: ' All free, all open source.',
        honestLine1:
          'No ads, no paywalls, no login. But keeping the site online — domains and tools — ',
        honestLine1Emphasis: "aren't free.",
        honestLine2:
          'If SortVision helped you understand algorithms, a small sponsorship tells me ',
        honestLine2Emphasis: 'this is worth keeping alive.',
        statStars: '{count} stars',
        statContributors: '{count} contributors',
        statContributorsPending: 'contributors…',
        statStarsPending: 'stars…',
        statFree: '100% free',
        statStarsCaption: 'Stars',
        statContributorsCaption: 'Contributors',
        statForksCaption: 'Forks',
        statIssuesCaption: 'Open issues',
        statUpdatedCaption: 'Last update',
        statFreeCaption: 'Free & open',
        starRepoCta: "Or just star the repo — it's free and helps a lot",
        supportLine: 'Your support keeps SortVision free for learners',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'algorithm visualizer',
      },
      tabs: {
        config: 'config',
        metrics: 'metrics',
        details: 'details',
        overview: 'overview',
        guide: 'guide',
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
        elementsCount: 'elements',
      },
      complexity: {
        efficiencyRating: 'EFFICIENCY RATING',
        timeComplexity: 'TIME COMPLEXITY',
        spaceComplexity: 'SPACE COMPLEXITY',
        bestCase: 'BEST CASE',
        average: 'AVERAGE',
        worstCase: 'WORST CASE',
        high: 'High',
        algorithmComplexity: 'algorithm complexity',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          'Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      },
      insertion: {
        description:
          'Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it into the correct position.',
      },
      selection: {
        description:
          'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
      },
      quick: {
        description:
          "Divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around the pivot, recursively sorting the sub-arrays.",
      },
      merge: {
        description:
          'Divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges the sorted halves.',
      },
      radix: {
        description:
          'Non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.',
      },
      heap: {
        description:
          'Comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It builds a max heap and repeatedly extracts the maximum element.',
      },
      bucket: {
        description:
          'Distribution sort that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.',
      },
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
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'Ask about sorting',
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
        bubble:
          "Try increasing the array size to see how bubble sort's performance degrades quadratically!",
        insertion:
          'Watch how insertion sort performs exceptionally well on nearly sorted arrays.',
        selection:
          'Notice how selection sort always takes the same time regardless of initial order.',
        quick:
          'Observe how the pivot selection affects the partitioning process.',
        merge:
          'See how merge sort divides the array into smaller subarrays recursively.',
        radix:
          'Watch how radix sort processes each digit position independently!',
        heap: 'Notice how heap sort builds a binary heap and repeatedly extracts the maximum element!',
        bucket:
          'Watch how bucket sort distributes elements into buckets and sorts them individually!',
      },
      facts: {
        bubble:
          "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges.",
        insertion:
          'Insertion Sort is similar to how many people sort playing cards in their hands.',
        selection:
          'Selection Sort makes the minimum number of swaps possible (n-1 in the worst case).',
        quick:
          'Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University.',
        merge:
          'Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described.',
        radix:
          'Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century.',
        heap: 'Heap Sort was invented by J. W. J. Williams in 1964 and is the basis for many priority queue implementations.',
        bucket:
          'Bucket Sort is particularly efficient when the input is uniformly distributed across a range.',
      },
    },
    // SEO
    seo: {
      title: 'SortVision - Interactive Sorting Algorithm Visualizer',
      description:
        'Interactive visualization of sorting algorithms including bubble sort, merge sort, quick sort, and more. Learn data structures and algorithms with real-time performance metrics and educational content.',
      keywords:
        'sorting algorithm visualizer, DSA learning, data structures algorithms, coding interview prep, merge sort, quick sort, heap sort, bubble sort, computer science education, algorithm animation, interactive learning, programming tutorial, software engineering',
      algorithmTitle: '{algorithm} Sort Visualizer - SortVision',
      algorithmDescription:
        "Master {algorithm} sort algorithm with SortVision's interactive visualizer. Step-by-step animations, performance analysis, and comprehensive DSA learning for coding interviews.",
      ogTitle:
        'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
      ogDescription:
        'Master sorting algorithms with interactive visualizations. Perfect for coding interviews, computer science education, and DSA learning.',
      twitterTitle: 'SortVision - Interactive Sorting Algorithm Visualizer',
      twitterDescription:
        'Learn sorting algorithms with step-by-step visualizations. Essential for coding interviews and computer science education.',
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
        contributorMetrics: 'contributor metrics',
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
        contributions: 'contributions',
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
        stars: 'Stars',
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
        totalInsertionsPartial:
          'Total insertions (partial data - cached stats not available)',
        totalDeletions: 'Total deletions (complete history)',
        totalDeletionsPartial:
          'Total deletions (partial data - cached stats not available)',
        noPullRequests: 'No pull requests found',
        noIssues: 'No issues found',
        noCommits: 'No commits found',
        updated: 'Updated',
        files: 'files',
        modifiedFiles: 'Modified files',
        andMore: 'and {count} more files',
        commit: 'commit',
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
        greatWork: "Great work! You've completed all steps in this phase.",
        continueTo: 'Continue to {phase} →',
        bestPractices: 'best practices',
        codeQuality: 'Code Quality',
        codeQualityDesc: 'Clean, readable, and maintainable code practices',
        reactPractices: 'React Best Practices',
        reactPracticesDesc: 'Modern React patterns and hooks usage',
        performanceTips: 'Performance Tips',
        performanceTipsDesc:
          'Optimization techniques for better app performance',
        quickGuidelines: '📋 Quick Guidelines',
        followPatterns: '• Follow existing patterns',
        clearCommits: '• Write clear commit messages',
        testChanges: '• Test your changes',
        keepFocused: '• Keep components focused',
        do: 'DO:',
        dont: "DON'T:",
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
        communityGuidelines: 'Community guidelines',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'Send Feedback',
      title: 'User Feedback',
      description: "We'd love your feedback to improve SortVision!",
      description2:
        'Let us know if you encountered a bug, have a suggestion, or just want to share your thoughts.',
      processing: 'Processing your feedback securely...',
      name: 'Name',
      email: 'Email (Optional)',
      feedbackType: 'Feedback Type',
      detailedFeedback: 'Detailed Feedback',
      rating: 'Rating',
      region: 'Region',
      submit: 'Submit Feedback',
      submitting: 'Submitting...',
      success: 'Feedback submitted successfully!',
      error: 'Failed to submit feedback. Please try again.',
      types: {
        bug: 'Bug Report',
        feature: 'Feature Request',
        suggestion: 'Suggestion',
        general: 'General Feedback',
        performance: 'Performance Issue',
        ui: 'UI/UX Issue',
      },
      ratings: {
        poor: 'Poor',
        fair: 'Fair',
        good: 'Good',
        veryGood: 'Very Good',
        excellent: 'Excellent',
      },
      language: 'Language',
      selectLanguage: 'Select Language',
    },
    // Common
    common: {
      close: 'Close',
      settings: 'Settings',
      select: 'Select',
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
  },
  es: {
    // Settings Modal
    settings: {
      title: 'Configuración',
      description: 'Personaliza tus preferencias de visualización',
      description2:
        'Ajusta el sonido, tema e idioma para mejorar tu experiencia',
      sound: {
        title: 'Sonido',
        description: 'Activar o desactivar efectos de sonido',
        enabled: 'Sonido Activado',
        disabled: 'Sonido Desactivado',
        enableDescription: 'Haz clic para activar efectos de sonido',
        disableDescription: 'Haz clic para desactivar efectos de sonido',
      },
      voiceControl: {
        title: 'Control por Voz',
        description: 'Activar o desactivar control por voz',
        enabled: 'Control por Voz Activado',
        disabled: 'Control por Voz Desactivado',
        enableDescription: 'Haz clic para activar control por voz',
        disableDescription: 'Haz clic para desactivar control por voz',
        denied:
          'Acceso al micrófono denegado. Por favor revisa la configuración del navegador.',
      },
      theme: {
        title: 'Tema',
        description: 'Elige tu tema de color preferido',
      },
      language: {
        title: 'Idioma',
        description: 'Selecciona tu idioma',
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
        showHelp: 'Mostrar esta ayuda',
      },
    },
    // Main page
    main: {
      subtitle:
        'Visualización interactiva de algoritmos de ordenamiento populares',
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
      twitter: 'Twitter',
      sponsorModal: {
        title: 'Apoya a SortVision',
        subtitle: 'Elige cómo ayudar',
        devLabel: '// del desarrollador',
        openerIntroPrefix: 'Hola 👋 Soy ',
        openerIntroSuffix: ' — creé SortVision y ',
        openerContributorsKnown:
          '{count} colaboradores increíbles ayudaron a construirlo.',
        openerContributorsUnknown: 'una comunidad increíble ayudó a construirlo.',
        openerOutro: ' Todo gratis, todo código abierto.',
        honestLine1:
          'Sin anuncios, sin muros de pago, sin registro. Pero mantener el sitio en línea — dominio y herramientas — ',
        honestLine1Emphasis: 'no es gratis.',
        honestLine2:
          'Si SortVision te ayudó a entender algoritmos, un pequeño patrocinio me dice que ',
        honestLine2Emphasis: 'vale la pena mantenerlo vivo.',
        statStars: '{count} estrellas',
        statContributors: '{count} colaboradores',
        statContributorsPending: 'colaboradores…',
        statStarsPending: 'estrellas…',
        statFree: '100% gratis',
        statStarsCaption: 'Estrellas',
        statContributorsCaption: 'Colaboradores',
        statForksCaption: 'Forks',
        statIssuesCaption: 'Issues abiertos',
        statUpdatedCaption: 'Última actualización',
        statFreeCaption: 'Gratis y abierto',
        starRepoCta:
          'O solo da una estrella al repo — es gratis y ayuda mucho',
        supportLine: 'Tu apoyo mantiene SortVision gratis para quien aprende',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'visualizador de algoritmos',
      },
      tabs: {
        config: 'config',
        metrics: 'métricas',
        details: 'detalles',
        overview: 'resumen',
        guide: 'guía',
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
        elementsCount: 'elementos',
      },
      complexity: {
        efficiencyRating: 'CALIFICACIÓN DE EFICIENCIA',
        timeComplexity: 'COMPLEJIDAD TEMPORAL',
        spaceComplexity: 'COMPLEJIDAD ESPACIAL',
        bestCase: 'MEJOR CASO',
        average: 'PROMEDIO',
        worstCase: 'PEOR CASO',
        high: 'Alto',
        algorithmComplexity: 'complejidad del algoritmo',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          'Algoritmo simple basado en comparaciones que recorre repetidamente la lista, compara elementos adyacentes y los intercambia si están en el orden incorrecto.',
      },
      insertion: {
        description:
          'Construye el array ordenado un elemento a la vez comparando cada nuevo elemento con los elementos ya ordenados e insertándolo en la posición correcta.',
      },
      selection: {
        description:
          'Encuentra repetidamente el elemento mínimo de la parte no ordenada y lo coloca al principio de la parte no ordenada.',
      },
      quick: {
        description:
          "Algoritmo de divide y vencerás que selecciona un elemento 'pivote' y particiona el array alrededor del pivote, ordenando recursivamente los sub-arrays.",
      },
      merge: {
        description:
          'Algoritmo de divide y vencerás que divide el array en dos mitades, las ordena por separado y luego fusiona las mitades ordenadas.',
      },
      radix: {
        description:
          'Algoritmo de ordenamiento no comparativo que ordena datos con claves enteras agrupando las claves por dígitos individuales que comparten la misma posición y valor.',
      },
      heap: {
        description:
          'Algoritmo de ordenamiento basado en comparaciones que usa una estructura de datos de montículo binario para ordenar elementos. Construye un montículo máximo y extrae repetidamente el elemento máximo.',
      },
      bucket: {
        description:
          'Ordenamiento de distribución que funciona distribuyendo elementos en varios cubos, ordenando cada cubo individualmente y luego concatenando los cubos.',
      },
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
      runTestAll:
        'Ejecuta test_all() para comparar el rendimiento de los algoritmos',
      testAll: 'test_all()',
      stopTest: 'detener_prueba()',
    },
    // Chat
    chat: {
      askAboutSorting: 'Preguntar sobre ordenamiento',
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
        bubble:
          '¡Intenta aumentar el tamaño del array para ver cómo el rendimiento del bubble sort se degrada cuadráticamente!',
        insertion:
          'Observa cómo el insertion sort funciona excepcionalmente bien en arrays casi ordenados.',
        selection:
          'Nota cómo el selection sort siempre toma el mismo tiempo independientemente del orden inicial.',
        quick:
          'Observa cómo la selección del pivote afecta el proceso de partición.',
        merge:
          'Ve cómo el merge sort divide el array en subarrays más pequeños recursivamente.',
        radix:
          '¡Observa cómo el radix sort procesa cada posición de dígito independientemente!',
        heap: '¡Nota cómo el heap sort construye un montículo binario y extrae repetidamente el elemento máximo!',
        bucket:
          '¡Observa cómo el bucket sort distribuye elementos en cubos y los ordena individualmente!',
      },
      facts: {
        bubble:
          'El Bubble Sort recibe su nombre por la forma en que los elementos más pequeños "burbujean" hacia la parte superior de la lista a través de intercambios.',
        insertion:
          'El Insertion Sort es similar a cómo muchas personas ordenan las cartas en sus manos.',
        selection:
          'El Selection Sort hace el número mínimo de intercambios posible (n-1 en el peor caso).',
        quick:
          'El Quick Sort fue desarrollado por Tony Hoare en 1959 mientras era estudiante de intercambio en la Universidad Estatal de Moscú.',
        merge:
          'El Merge Sort fue inventado por John von Neumann en 1945, uno de los primeros algoritmos de divide y vencerás descritos.',
        radix:
          'El Radix Sort precede a las computadoras modernas y se usó con máquinas de clasificación de tarjetas perforadas a principios del siglo XX.',
        heap: 'El Heap Sort fue inventado por J. W. J. Williams en 1964 y es la base para muchas implementaciones de colas de prioridad.',
        bucket:
          'El Bucket Sort es particularmente eficiente cuando la entrada está distribuida uniformemente en un rango.',
      },
    },
    // SEO
    seo: {
      title:
        'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento',
      description:
        'Visualización interactiva de algoritmos de ordenamiento incluyendo bubble sort, merge sort, quick sort y más. Aprende estructuras de datos y algoritmos con métricas de rendimiento en tiempo real y contenido educativo.',
      keywords:
        'visualizador de algoritmos de ordenamiento, aprendizaje de DSA, estructuras de datos algoritmos, preparación para entrevistas de programación, merge sort, quick sort, heap sort, bubble sort, educación en ciencias de la computación, animación de algoritmos, aprendizaje interactivo, tutorial de programación, ingeniería de software',
      algorithmTitle: 'Visualizador de {algorithm} Sort - SortVision',
      algorithmDescription:
        'Domina el algoritmo {algorithm} sort con el visualizador interactivo de SortVision. Animaciones paso a paso, análisis de rendimiento y aprendizaje integral de DSA para entrevistas de programación.',
      ogTitle:
        'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento para Aprendizaje de DSA',
      ogDescription:
        'Domina los algoritmos de ordenamiento con visualizaciones interactivas. Perfecto para entrevistas de programación, educación en ciencias de la computación y aprendizaje de DSA.',
      twitterTitle:
        'SortVision - Visualizador Interactivo de Algoritmos de Ordenamiento',
      twitterDescription:
        'Aprende algoritmos de ordenamiento con visualizaciones paso a paso. Esencial para entrevistas de programación y educación en ciencias de la computación.',
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
        contributorMetrics: 'métricas de contribuidores',
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
        contributions: 'contribuciones',
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
        stars: 'Estrellas',
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
        totalInsertionsPartial:
          'Total de inserciones (datos parciales - estadísticas en caché no disponibles)',
        totalDeletions: 'Total de eliminaciones (historial completo)',
        totalDeletionsPartial:
          'Total de eliminaciones (datos parciales - estadísticas en caché no disponibles)',
        noPullRequests: 'No se encontraron pull requests',
        noIssues: 'No se encontraron problemas',
        noCommits: 'No se encontraron commits',
        updated: 'Actualizado',
        files: 'archivos',
        modifiedFiles: 'Archivos modificados',
        andMore: 'y {count} archivos más',
        commit: 'commit',
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
        greatWork:
          '¡Excelente trabajo! Has completado todos los pasos en esta fase.',
        continueTo: 'Continuar a {phase} →',
        bestPractices: 'mejores prácticas',
        codeQuality: 'Calidad del Código',
        codeQualityDesc: 'Prácticas de código limpio, legible y mantenible',
        reactPractices: 'Mejores Prácticas de React',
        reactPracticesDesc: 'Patrones modernos de React y uso de hooks',
        performanceTips: 'Consejos de Rendimiento',
        performanceTipsDesc:
          'Técnicas de optimización para mejor rendimiento de la app',
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
        communityGuidelines: 'Guías de la comunidad',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'Enviar Comentarios',
      title: 'Comentarios del Usuario',
      description:
        '¡Nos encantaría recibir tus comentarios para mejorar SortVision!',
      description2:
        'Háznoslo saber si encontraste un error, tienes una sugerencia, o simplemente quieres compartir tus pensamientos.',
      processing: 'Procesando tus comentarios de forma segura...',
      name: 'Nombre',
      email: 'Correo (Opcional)',
      feedbackType: 'Tipo de Comentario',
      detailedFeedback: 'Comentario Detallado',
      rating: 'Calificación',
      region: 'Región',
      submit: 'Enviar Comentarios',
      submitting: 'Enviando...',
      success: '¡Comentarios enviados exitosamente!',
      error: 'Error al enviar comentarios. Por favor intenta de nuevo.',
      types: {
        bug: 'Reporte de Error',
        feature: 'Solicitud de Función',
        suggestion: 'Sugerencia',
        general: 'Comentario General',
        performance: 'Problema de Rendimiento',
        ui: 'Problema de UI/UX',
      },
      ratings: {
        poor: 'Malo',
        fair: 'Regular',
        good: 'Bueno',
        veryGood: 'Muy Bueno',
        excellent: 'Excelente',
      },
      language: 'Idioma',
      selectLanguage: 'Seleccionar Idioma',
    },
    // Common
    common: {
      close: 'Cerrar',
      settings: 'Configuración',
      select: 'Seleccionar',
      enabled: 'Activado',
      disabled: 'Desactivado',
    },
  },
  fr: {
    // Settings Modal
    settings: {
      title: 'Paramètres de Tri',
      description: 'Personnalisez vos préférences de visualisation',
      description2:
        'Ajustez les paramètres son, thème et langue pour améliorer votre expérience',
      sound: {
        title: 'Son',
        description: 'Activer ou désactiver les effets sonores',
        enabled: 'Son activé',
        disabled: 'Son désactivé',
        enableDescription: 'Cliquer pour activer les effets sonores',
        disableDescription: 'Cliquer pour désactiver les effets sonores',
      },
      voiceControl: {
        title: 'Contrôle Vocal',
        description: 'Activer ou désactiver le contrôle vocal',
        enabled: 'Contrôle vocal activé',
        disabled: 'Contrôle vocal désactivé',
        enableDescription: 'Cliquer pour activer le contrôle vocal',
        disableDescription: 'Cliquer pour désactiver le contrôle vocal',
        denied:
          'Accès au microphone refusé. Veuillez vérifier les paramètres du navigateur.',
      },
      theme: {
        title: 'Thème',
        description: 'Choisissez votre schéma de couleurs préféré',
      },
      language: {
        title: 'Langue',
        description: 'Sélectionnez votre langue',
      },
      keyboardShortcuts: {
        title: 'Raccourcis Clavier',
        navigation: 'Navigation',
        algorithmControl: "Contrôle d'algorithme",
        speedControl: 'Contrôle de vitesse',
        arrayManipulation: 'Manipulation de tableau',
        modalsOverlays: 'Modales et superpositions',
        cycleFocus: 'Faire défiler le focus',
        navigatePanels: 'Naviguer dans les panneaux/étapes',
        playPause: 'Lire/pause animation',
        resetArray: 'Réinitialiser le tableau',
        increaseSpeed: 'Augmenter la vitesse',
        decreaseSpeed: 'Diminuer la vitesse',
        newArray: 'Nouveau tableau',
        shuffleArray: 'Mélanger le tableau',
        showShortcutHelp: "Afficher/masquer l'aide des raccourcis",
        toggleChatAssistant: "Basculer l'assistant de chat",
        toggleFeedbackForm: 'Basculer le formulaire de commentaires',
        toggleSettingsPanel: 'Basculer le panneau de paramètres',
        showHelp: 'Afficher cette aide',
      },
    },
    // Main page
    main: {
      subtitle: "Visualisation interactive d'algorithmes de tri populaires",
      algorithmVisualization: 'Visualisation',
      sortingAlgorithmVisualizer: "Visualiseur d'Algorithmes de Tri",
      builtWith: 'Construit avec',
      by: 'par',
      contributors: 'Contributeurs',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'Sponsor',
      buyMeACoffee: 'Offrez-moi un café',
      twitter: 'Twitter',
      sponsorModal: {
        title: 'Soutenir SortVision',
        subtitle: 'Choisissez comment aider',
        devLabel: '// du développeur',
        openerIntroPrefix: "Salut 👋 Je suis ",
        openerIntroSuffix: " — j'ai créé SortVision et ",
        openerContributorsKnown:
          '{count} contributeurs géniaux ont aidé à le construire.',
        openerContributorsUnknown:
          'une communauté géniale a aidé à le construire.',
        openerOutro: ' Tout gratuit, tout open source.',
        honestLine1:
          "Pas de pubs, pas de paywall, pas de compte. Mais garder le site en ligne — domaine et outils — ",
        honestLine1Emphasis: "ce n'est pas gratuit.",
        honestLine2:
          'Si SortVision vous a aidé à comprendre les algorithmes, un petit soutien me dit que ',
        honestLine2Emphasis: 'ça vaut le coup de le garder vivant.',
        statStars: '{count} étoiles',
        statContributors: '{count} contributeurs',
        statContributorsPending: 'contributeurs…',
        statStarsPending: 'étoiles…',
        statFree: '100% gratuit',
        statStarsCaption: 'Étoiles',
        statContributorsCaption: 'Contributeurs',
        statForksCaption: 'Forks',
        statIssuesCaption: 'Issues ouvertes',
        statUpdatedCaption: 'Dernière mise à jour',
        statFreeCaption: 'Gratuit et ouvert',
        starRepoCta:
          "Ou étoilez le dépôt — c'est gratuit et ça aide beaucoup",
        supportLine: 'Votre soutien garde SortVision gratuit pour les apprenants',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: "visualiseur d'algorithmes",
      },
      tabs: {
        config: 'config',
        metrics: 'métriques',
        details: 'détails',
        overview: 'aperçu',
        guide: 'guide',
      },
      controls: {
        selectAlgorithm: 'sélectionner algorithme',
        algorithm: 'Algorithme',
        arraySize: 'taille du tableau',
        animationDelay: "délai d'animation",
        elements: 'Éléments',
        delay: 'Délai',
        newArray: 'nouveau_tableau()',
        start: 'démarrer()',
        stop: 'arrêter()',
        mergeSort: 'tri_fusion()',
        ready: 'prêt',
        small: 'Petit',
        medium: 'Moyen',
        large: 'Grand',
        fast: 'Rapide',
        slow: 'Lent',
        goodForLearning: "Bon pour l'apprentissage",
        balanced: 'Équilibré',
        performanceTest: 'Test de performance',
        visualizePatterns: 'Visualiser les motifs',
        elementsCount: 'éléments',
      },
      complexity: {
        efficiencyRating: "ÉVALUATION D'EFFICACITÉ",
        timeComplexity: 'COMPLEXITÉ TEMPORELLE',
        spaceComplexity: 'COMPLEXITÉ SPATIALE',
        bestCase: 'MEILLEUR CAS',
        average: 'MOYENNE',
        worstCase: 'PIRE CAS',
        high: 'Élevé',
        algorithmComplexity: "complexité d'algorithme",
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          "Algorithme simple basé sur la comparaison qui parcourt répétitivement la liste, compare les éléments adjacents et les échange s'ils sont dans le mauvais ordre.",
      },
      insertion: {
        description:
          "Construit le tableau trié un élément à la fois en comparant chaque nouvel élément avec les éléments déjà triés et en l'insérant à la bonne position.",
      },
      selection: {
        description:
          "Trouve répétitivement l'élément minimum de la partie non triée et le place au début de la partie non triée.",
      },
      quick: {
        description:
          "Algorithme de division et conquête qui choisit un élément 'pivot' et partitionne le tableau autour du pivot, triant récursivement les sous-tableaux.",
      },
      merge: {
        description:
          'Algorithme de division et conquête qui divise le tableau en deux moitiés, les trie séparément, puis fusionne les moitiés triées.',
      },
      radix: {
        description:
          'Algorithme de tri non comparatif qui trie les données avec des clés entières en regroupant les clés par chiffres individuels qui partagent la même position et valeur.',
      },
      heap: {
        description:
          "Algorithme de tri basé sur la comparaison qui utilise une structure de données de tas binaire pour trier les éléments. Il construit un tas maximum et extrait répétitivement l'élément maximum.",
      },
      bucket: {
        description:
          'Tri de distribution qui fonctionne en distribuant les éléments dans un certain nombre de seaux, en triant chaque seau individuellement, puis en concaténant les seaux.',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: "métriques d'exécution actuelles",
      swaps: 'ÉCHANGES',
      memoryOperations: 'Opérations mémoire',
      comparisons: 'COMPARAISONS',
      cpuOperations: 'Opérations CPU',
      timeMs: 'TEMPS (MS)',
      executionDuration: "Durée d'exécution",
      swapRatio: "RATIO D'ÉCHANGE",
      swapsComp: 'Échanges/Comparaisons',
      timeElement: 'TEMPS/ÉLÉMENT',
      msElem: 'ms/Élem',
      opsMs: 'OPS/MS',
      opsMsUnit: 'ops/ms',
      score: 'SCORE',
      points: 'Points',
      performanceBreakdown: 'RÉPARTITION DES PERFORMANCES',
      time: 'Temps',
      potentialImprovement: 'Amélioration potentielle:',
      algorithmComparison: "Comparaison d'algorithmes",
      testingAlgorithm: "Test d'algorithme",
      runningTests: 'Tests en cours...',
      noComparisonData: 'Aucune donnée de comparaison',
      runTestAll:
        'Exécuter test_all() pour comparer les performances des algorithmes',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'Poser des questions sur le tri',
    },
    // Details page
    details: {
      basicSorts: 'TRIES DE BASE',
      efficientSorts: 'TRIES EFFICACES',
      specialSorts: 'TRIES SPÉCIAUX',
      algorithmDetails: 'Détails de {algorithm}_sort()',
      algorithmImplementation: 'Implémentation de {algorithm}',
      loadingImplementation: "Chargement de l'implémentation de {algorithm}",
      relatedAlgorithms: 'Algorithmes connexes',
      historicalContext: 'Contexte historique',
      inventedBy: 'Inventé par',
      year: 'Année',
      proTip: 'CONSEIL PRO',
      funFact: 'FAIT AMUSANT',
      tips: {
        bubble:
          "Essayez d'augmenter la taille du tableau pour voir comment les performances du tri à bulles se dégradent quadratiquement !",
        insertion:
          'Observez comment le tri par insertion fonctionne exceptionnellement bien sur des tableaux presque triés.',
        selection:
          "Remarquez comment le tri par sélection prend toujours le même temps, peu importe l'ordre initial.",
        quick:
          'Observez comment la sélection du pivot affecte le processus de partitionnement.',
        merge:
          'Voyez comment le tri par fusion divise récursivement le tableau en sous-tableaux plus petits.',
        radix:
          'Observez comment le tri par base traite chaque position de chiffre indépendamment !',
        heap: "Remarquez comment le tri par tas construit un tas binaire et extrait répétitivement l'élément maximum !",
        bucket:
          'Observez comment le tri par seaux distribue les éléments dans des seaux et les trie individuellement !',
      },
      facts: {
        bubble:
          'Le tri à bulles est nommé d\'après la façon dont les petits éléments "bouillonnent" vers le haut de la liste par échanges.',
        insertion:
          'Le tri par insertion est similaire à la façon dont beaucoup de gens trient les cartes à jouer dans leurs mains.',
        selection:
          "Le tri par sélection fait le nombre minimum possible d'échanges (n-1 dans le pire cas).",
        quick:
          "Le tri rapide a été développé par Tony Hoare en 1959 alors qu'il était étudiant d'échange à l'Université d'État de Moscou.",
        merge:
          "Le tri par fusion a été inventé par John von Neumann en 1945, l'un des premiers algorithmes de division et conquête décrits.",
        radix:
          'Le tri par base précède les ordinateurs modernes et était utilisé avec les machines de tri de cartes perforées au début du 20e siècle.',
        heap: 'Le tri par tas a été inventé par J. W. J. Williams en 1964 et est la base de nombreuses implémentations de files de priorité.',
        bucket:
          "Le tri par seaux est particulièrement efficace lorsque l'entrée est uniformément distribuée sur une plage.",
      },
    },
    // SEO
    seo: {
      title: "SortVision - Visualiseur Interactif d'Algorithmes de Tri",
      description:
        'Visualisation interactive des algorithmes de tri incluant le tri à bulles, le tri par fusion, le tri rapide et plus. Apprenez les structures de données et algorithmes avec des métriques de performance en temps réel et du contenu éducatif.',
      keywords:
        "visualiseur d'algorithmes de tri, apprentissage DSA, structures de données algorithmes, préparation entretien programmation, tri par fusion, tri rapide, tri par tas, tri à bulles, éducation informatique, animation d'algorithmes, apprentissage interactif, tutoriel programmation, ingénierie logicielle",
      algorithmTitle: 'Visualiseur de Tri {algorithm} - SortVision',
      algorithmDescription:
        "Maîtrisez l'algorithme de tri {algorithm} avec le visualiseur interactif de SortVision. Animations étape par étape, analyse de performance et apprentissage DSA complet pour les entretiens de programmation.",
      ogTitle:
        "SortVision - Visualiseur Interactif d'Algorithmes de Tri pour l'Apprentissage DSA",
      ogDescription:
        "Maîtrisez les algorithmes de tri avec des visualisations interactives. Parfait pour les entretiens de programmation, l'éducation informatique et l'apprentissage DSA.",
      twitterTitle: "SortVision - Visualiseur Interactif d'Algorithmes de Tri",
      twitterDescription:
        "Apprenez les algorithmes de tri avec des visualisations étape par étape. Essentiel pour les entretiens de programmation et l'éducation informatique.",
    },
    // Contributions
    contributions: {
      stats: {
        contributors: 'Contributeurs',
        amazingDevelopers: 'Développeurs incroyables',
        totalCommits: 'Total des commits',
        linesOfImpact: "Lignes d'impact",
        githubStars: 'Étoiles GitHub',
        communityLove: 'Amour de la communauté',
        forks: 'Forks',
        projectCopies: 'Copies de projet',
        contributorMetrics: 'métriques des contributeurs',
      },
      list: {
        filterByType: 'filtrer par type',
        allContributors: 'Tous les contributeurs',
        searchContributors: 'rechercher des contributeurs',
        typeUsername: "Taper le nom d'utilisateur...",
        contributorsFound: 'Contributeurs trouvés',
        noContributorsFound: 'Aucun contributeur trouvé',
        loadingContributors: 'Chargement des contributeurs...',
        projectAdmins: 'Admins du projet',
        community: 'Communauté',
        bots: 'Bots',
        admin: 'ADMIN',
        communityBadge: 'COMMUNAUTÉ',
        bot: 'BOT',
        commits: 'Commits',
        developer: 'Développeur',
        profile: 'Profil',
        details: 'Détails',
        contributions: 'contributions',
      },
      health: {
        issues: 'Problèmes',
        open: 'Ouvert',
        closed: 'Fermé',
        recent: 'Récent',
        pullRequests: 'Pull Requests',
        merged: 'Fusionné',
        repository: 'Dépôt',
        size: 'Taille',
        language: 'Langue',
        stars: 'Étoiles',
      },
      contributorDetail: {
        loading: 'Chargement des données du contributeur...',
        progress: 'Progrès',
        profileDetails: 'Détails du profil',
        publicRepos: 'Dépôts publics',
        followers: 'Abonnés',
        following: 'Abonnements',
        repoCommits: 'Commits du dépôt',
        pullRequests: 'Pull Requests',
        issues: 'Problèmes',
        linesAdded: 'Lignes ajoutées',
        linesDeleted: 'Lignes supprimées',
        total: 'Total',
        merged: 'fusionné',
        open: 'ouvert',
        closed: 'fermé',
        totalInsertions: 'Total des insertions (historique complet)',
        totalInsertionsPartial:
          'Total des insertions (données partielles - statistiques mises en cache non disponibles)',
        totalDeletions: 'Total des suppressions (historique complet)',
        totalDeletionsPartial:
          'Total des suppressions (données partielles - statistiques mises en cache non disponibles)',
        noPullRequests: 'Aucun pull request trouvé',
        noIssues: 'Aucun problème trouvé',
        noCommits: 'Aucun commit trouvé',
        updated: 'Mis à jour',
        files: 'Fichiers',
        modifiedFiles: 'Fichiers modifiés',
        andMore: 'et {count} autres fichiers',
        commit: 'commit',
      },
      guide: {
        contributionGuide: 'guide de contribution',
        phase: 'Phase',
        gettingStarted: 'Commencer',
        development: 'Développement',
        submission: 'Soumission',
        forkRepository: 'Forker le dépôt',
        createCopy: 'Créer votre propre copie de SortVision',
        setupEnvironment: "Configurer l'environnement de développement",
        installDependencies: 'Installer les dépendances et exécuter localement',
        createBranch: 'Créer une branche de fonctionnalité',
        createNewBranch: 'Créer une nouvelle branche pour vos changements',
        makeChanges: 'Faire vos changements',
        implementFeature: 'Implémenter votre fonctionnalité ou correction',
        commitPush: 'Commit & Push',
        commitChanges: 'Commiter vos changements avec des messages clairs',
        createPR: 'Créer une Pull Request',
        submitChanges: 'Soumettre vos changements pour révision',
        previous: '← Précédent',
        nextPhase: 'Phase suivante →',
        phaseComplete: 'Phase {phase} Terminée !',
        greatWork:
          'Excellent travail ! Vous avez terminé toutes les étapes de cette phase.',
        continueTo: 'Continuer vers {phase} →',
        bestPractices: 'Meilleures pratiques',
        codeQuality: 'Qualité du code',
        codeQualityDesc: 'Pratiques de code propres, lisibles et maintenables',
        reactPractices: 'Meilleures pratiques React',
        reactPracticesDesc: 'Utilisation de modèles React modernes et de hooks',
        performanceTips: 'Conseils de performance',
        performanceTipsDesc:
          "Techniques d'optimisation pour de meilleures performances d'application",
        quickGuidelines: '📋 Directives rapides',
        followPatterns: '• Suivre les modèles existants',
        clearCommits: '• Écrire des messages de commit clairs',
        testChanges: '• Tester vos changements',
        keepFocused: '• Garder les composants focalisés',
        do: 'À FAIRE:',
        dont: 'À NE PAS FAIRE:',
        useDescriptiveNames: 'Utiliser des noms de variables descriptifs',
        keepFunctionsSmall: 'Garder les fonctions petites et focalisées',
        avoidMagicNumbers: 'Éviter les nombres magiques',
        useFunctionalComponents:
          'Utiliser des composants fonctionnels avec des hooks',
        includeDependencies: 'Inclure les bonnes dépendances useEffect',
        avoidInlineStyles:
          'Éviter les styles inline, utiliser les classes Tailwind',
        memoizeCalculations: 'Mémoriser les calculs coûteux',
        useCallback: "Utiliser useCallback pour les gestionnaires d'événements",
        importSpecific:
          "Ne pas importer des bibliothèques entières quand ce n'est pas nécessaire",
        quickReferences: 'Références rapides',
        contributionGuidelines: 'Directives de contribution',
        detailedRules: 'Règles de contribution détaillées',
        githubIssues: 'Problèmes GitHub',
        findIssues: 'Trouver des problèmes à travailler',
        codeOfConduct: 'Code de conduite',
        communityGuidelines: 'Directives de la communauté',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'Envoyer des commentaires',
      title: 'Commentaires Utilisateur',
      description:
        'Nous aimerions recevoir vos commentaires pour améliorer SortVision !',
      description2:
        'Faites-nous savoir si vous avez rencontré un bug, avez une suggestion, ou voulez simplement partager vos pensées.',
      processing: 'Traitement de vos commentaires en toute sécurité...',
      name: 'Nom',
      email: 'Email (Optionnel)',
      feedbackType: 'Type de Commentaire',
      detailedFeedback: 'Commentaire Détaillé',
      rating: 'Note',
      region: 'Région',
      submit: 'Soumettre les Commentaires',
      submitting: 'Soumission...',
      success: 'Commentaires soumis avec succès !',
      error: 'Échec de la soumission des commentaires. Veuillez réessayer.',
      types: {
        bug: 'Rapport de Bug',
        feature: 'Demande de Fonctionnalité',
        suggestion: 'Suggestion',
        general: 'Commentaire Général',
        performance: 'Problème de Performance',
        ui: 'Problème UI/UX',
      },
      ratings: {
        poor: 'Mauvais',
        fair: 'Correct',
        good: 'Bon',
        veryGood: 'Très Bon',
        excellent: 'Excellent',
      },
      language: 'Langue',
      selectLanguage: 'Sélectionner la Langue',
    },
    // Common
    common: {
      close: 'Fermer',
      settings: 'Paramètres',
      select: 'Sélectionner',
      enabled: 'Activé',
      disabled: 'Désactivé',
    },
  },
  hi: {
    // Settings Modal
    settings: {
      title: 'सॉर्ट सेटिंग्स',
      description: 'अपनी विज़ुअलाइज़ेशन प्राथमिकताएं कस्टमाइज़ करें',
      description2:
        'अपने अनुभव को बेहतर बनाने के लिए ध्वनि, थीम और भाषा सेटिंग्स समायोजित करें',
      sound: {
        title: 'ध्वनि',
        description: 'ध्वनि प्रभाव सक्षम या अक्षम करें',
        enabled: 'ध्वनि सक्षम',
        disabled: 'ध्वनि अक्षम',
        enableDescription: 'ध्वनि प्रभाव सक्षम करने के लिए क्लिक करें',
        disableDescription: 'ध्वनि प्रभाव अक्षम करने के लिए क्लिक करें',
      },
      voiceControl: {
        title: 'वॉइस कंट्रोल',
        description: 'वॉइस कंट्रोल सक्षम या अक्षम करें',
        enabled: 'वॉइस कंट्रोल सक्षम',
        disabled: 'वॉइस कंट्रोल अक्षम',
        enableDescription: 'वॉइस कंट्रोल सक्षम करने के लिए क्लिक करें',
        disableDescription: 'वॉइस कंट्रोल अक्षम करने के लिए क्लिक करें',
        denied: 'माइक्रोफोन एक्सेस अस्वीकृत। कृपया ब्राउज़र सेटिंग्स जांचें।',
      },
      theme: {
        title: 'थीम',
        description: 'अपना पसंदीदा रंग थीम चुनें',
      },
      language: {
        title: 'भाषा',
        description: 'अपनी भाषा चुनें',
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
        showHelp: 'इस सहायता को दिखाएं',
      },
    },
    // Main page
    main: {
      subtitle: 'लोकप्रिय सॉर्टिंग एल्गोरिदम की इंटरैक्टिव विज़ुअलाइज़ेशन',
      algorithmVisualization: 'विज़ुअलाइज़ेशन',
      sortingAlgorithmVisualizer: 'सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      builtWith: 'बनाया गया',
      by: 'द्वारा',
      contributors: 'योगदानकर्ता',
      sortVision: 'सॉर्टविज़न',
      github: 'गिटहब',
      linkedin: 'लिंक्डइन',
      sponsor: 'प्रायोजक',
      buyMeACoffee: 'मुझे कॉफी दिलाएं',
      twitter: 'ट्विटर',
      sponsorModal: {
        title: 'SortVision को सहयोग दें',
        subtitle: 'मदद का तरीका चुनें',
        devLabel: '// डेवलपर की ओर से',
        openerIntroPrefix: 'नमस्ते 👋 मैं ',
        openerIntroSuffix: ' हूँ — मैंने SortVision बनाया और ',
        openerContributorsKnown:
          '{count} शानदार योगदानकर्ताओं ने इसे बनाने में मदद की।',
        openerContributorsUnknown:
          'एक शानदार समुदाय ने इसे बनाने में मदद की।',
        openerOutro: ' सब मुफ्त, सब ओपन सोर्स।',
        honestLine1:
          'कोई विज्ञापन नहीं, कोई पे-वॉल नहीं, कोई लॉगिन नहीं। लेकिन साइट ऑनलाइन रखना — डोमेन और टूल — ',
        honestLine1Emphasis: 'मुफ्त नहीं है।',
        honestLine2:
          'अगर SortVision ने एल्गोरिदम समझने में मदद की, तो छोटा सा प्रायोजन मुझे बताता है कि ',
        honestLine2Emphasis: 'इसे जीवित रखना सार्थक है।',
        statStars: '{count} स्टार',
        statContributors: '{count} योगदानकर्ता',
        statContributorsPending: 'योगदानकर्ता…',
        statStarsPending: 'स्टार…',
        statFree: '100% मुफ्त',
        statStarsCaption: 'स्टार',
        statContributorsCaption: 'योगदानकर्ता',
        statForksCaption: 'फोर्क',
        statIssuesCaption: 'खुले इश्यू',
        statUpdatedCaption: 'आखिरी अपडेट',
        statFreeCaption: 'मुफ्त व ओपन',
        starRepoCta:
          'या रिपो को स्टार दें — मुफ्त है और बहुत मदद करता है',
        supportLine: 'आपका सहयोग SortVision को सीखने वालों के लिए मुफ्त रखता है',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'एल्गोरिदम विज़ुअलाइज़र',
      },
      tabs: {
        config: 'कॉन्फ़िग',
        metrics: 'मेट्रिक्स',
        details: 'विवरण',
        overview: 'अवलोकन',
        guide: 'गाइड',
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
        elementsCount: 'तत्व',
      },
      complexity: {
        efficiencyRating: 'दक्षता रेटिंग',
        timeComplexity: 'समय जटिलता',
        spaceComplexity: 'स्थान जटिलता',
        bestCase: 'सबसे अच्छा मामला',
        average: 'औसत',
        worstCase: 'सबसे खराब मामला',
        high: 'उच्च',
        algorithmComplexity: 'एल्गोरिदम जटिलता',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          'एक सरल तुलना-आधारित एल्गोरिदम जो सूची में बार-बार जाता है, पास के तत्वों की तुलना करता है, और अगर वे गलत क्रम में हैं तो उन्हें बदल देता है।',
      },
      insertion: {
        description:
          'एक समय में एक तत्व लेकर सॉर्ट किए गए एरे बनाता है, हर नए तत्व को पहले से सॉर्ट किए गए भाग के साथ तुलना करके सही जगह पर रखता है।',
      },
      selection: {
        description:
          'बार-बार असंगठित भाग से सबसे छोटा तत्व ढूंढता है और उसे असंगठित भाग की शुरुआत में रखता है।',
      },
      quick: {
        description:
          'एक तेज़ सॉर्टिंग एल्गोरिदम जो एक पिवोट तत्व चुनकर एरे को दो भागों में बाँटता है और हर भाग को अलग से सॉर्ट करता है।',
      },
      merge: {
        description:
          'एक तेज़ सॉर्टिंग एल्गोरिदम जो एरे को दो भागों में बाँटता है, हर भाग को अलग से सॉर्ट करता है, और फिर सॉर्ट किए गए भागों को मिलाता है।',
      },
      radix: {
        description:
          'एक विशेष सॉर्टिंग एल्गोरिदम जो संख्याओं को उनके अंकों के आधार पर सॉर्ट करता है, एक बार में एक अंक की स्थिति देखकर।',
      },
      heap: {
        description:
          'एक सॉर्टिंग एल्गोरिदम जो तत्वों को सॉर्ट करने के लिए एक विशेष पेड़ जैसी डेटा संरचना का उपयोग करता है।',
      },
      bucket: {
        description:
          'एक सॉर्टिंग एल्गोरिदम जो तत्वों को अलग-अलग बाल्टियों में बाँटता है, हर बाल्टी को अलग से सॉर्ट करता है, और फिर सभी बाल्टियों को मिलाता है।',
      },
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
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'सॉर्टिंग के बारे में पूछें',
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
        bubble:
          'बबल सॉर्ट के प्रदर्शन में कैसे चतुर्भुजीय गिरावट आती है, इसे देखने के लिए एरे का आकार बढ़ाने की कोशिश करें!',
        insertion:
          'देखें कि कैसे इंसर्शन सॉर्ट लगभग सॉर्ट किए गए एरे पर असाधारण रूप से अच्छा प्रदर्शन करता है।',
        selection:
          'ध्यान दें कि कैसे सिलेक्शन सॉर्ट हमेशा प्रारंभिक क्रम की परवाह किए बिना समान समय लेता है।',
        quick: 'देखें कि कैसे पिवोट चयन विभाजन प्रक्रिया को प्रभावित करता है।',
        merge:
          'देखें कि कैसे मर्ज सॉर्ट एरे को पुनरावर्ती रूप से छोटे सब-एरे में विभाजित करता है।',
        radix:
          'देखें कि कैसे रेडिक्स सॉर्ट प्रत्येक अंक स्थिति को स्वतंत्र रूप से संसाधित करता है!',
        heap: 'ध्यान दें कि कैसे हीप सॉर्ट एक बाइनरी हीप बनाता है और बार-बार अधिकतम तत्व निकालता है!',
        bucket:
          'देखें कि कैसे बकेट सॉर्ट तत्वों को बकेट में वितरित करता है और उन्हें अलग-अलग सॉर्ट करता है!',
      },
      facts: {
        bubble:
          'बबल सॉर्ट का नाम इस तरीके से पड़ा है कि छोटे तत्व एक्सचेंज के माध्यम से सूची के शीर्ष पर "बबल" करते हैं।',
        insertion:
          'इंसर्शन सॉर्ट कई लोगों के हाथों में प्लेइंग कार्ड्स को सॉर्ट करने के तरीके के समान है।',
        selection:
          'सिलेक्शन सॉर्ट संभव न्यूनतम संख्या में स्वैप करता है (सबसे खराब मामले में n-1)।',
        quick:
          'क्विक सॉर्ट को 1959 में टोनी होरे द्वारा विकसित किया गया था जब वे मॉस्को स्टेट यूनिवर्सिटी में एक्सचेंज छात्र थे।',
        merge:
          'मर्ज सॉर्ट का आविष्कार 1945 में जॉन वॉन न्यूमैन ने किया था, यह वर्णित सबसे पुराने डिवाइड-एंड-कॉन्कर एल्गोरिदम में से एक है।',
        radix:
          'रेडिक्स सॉर्ट आधुनिक कंप्यूटरों से पहले का है और 20वीं सदी की शुरुआत में पंच कार्ड सॉर्टिंग मशीनों के साथ उपयोग किया जाता था।',
        heap: 'हीप सॉर्ट का आविष्कार 1964 में जे. डब्ल्यू. जे. विलियम्स ने किया था और यह कई प्राथमिकता कतार कार्यान्वयन का आधार है।',
        bucket:
          'बकेट सॉर्ट विशेष रूप से कुशल होता है जब इनपुट एक सीमा में समान रूप से वितरित होता है।',
      },
    },
    // SEO
    seo: {
      title: 'सॉर्टविज़न - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      description:
        'बबल सॉर्ट, मर्ज सॉर्ट, क्विक सॉर्ट और अधिक सहित सॉर्टिंग एल्गोरिदम की इंटरैक्टिव विज़ुअलाइज़ेशन। रियल-टाइम प्रदर्शन मेट्रिक्स और शैक्षिक सामग्री के साथ डेटा स्ट्रक्चर और एल्गोरिदम सीखें।',
      keywords:
        'सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र, DSA सीखना, डेटा स्ट्रक्चर एल्गोरिदम, कोडिंग इंटरव्यू तैयारी, मर्ज सॉर्ट, क्विक सॉर्ट, हीप सॉर्ट, बबल सॉर्ट, कंप्यूटर साइंस शिक्षा, एल्गोरिदम एनीमेशन, इंटरैक्टिव सीखना, प्रोग्रामिंग ट्यूटोरियल, सॉफ्टवेयर इंजीनियरिंग',
      algorithmTitle: '{algorithm} सॉर्ट विज़ुअलाइज़र - सॉर्टविज़न',
      algorithmDescription:
        'सॉर्टविज़न के इंटरैक्टिव विज़ुअलाइज़र के साथ {algorithm} सॉर्ट एल्गोरिदम में महारत हासिल करें। स्टेप-बाय-स्टेप एनीमेशन, प्रदर्शन विश्लेषण, और कोडिंग इंटरव्यू के लिए व्यापक DSA सीखना।',
      ogTitle:
        'सॉर्टविज़न - DSA सीखने के लिए इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      ogDescription:
        'इंटरैक्टिव विज़ुअलाइज़ेशन के साथ सॉर्टिंग एल्गोरिदम में महारत हासिल करें। कोडिंग इंटरव्यू, कंप्यूटर साइंस शिक्षा और DSA सीखने के लिए परफेक्ट।',
      twitterTitle: 'सॉर्टविज़न - इंटरैक्टिव सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र',
      twitterDescription:
        'स्टेप-बाय-स्टेप विज़ुअलाइज़ेशन के साथ सॉर्टिंग एल्गोरिदम सीखें। कोडिंग इंटरव्यू और कंप्यूटर साइंस शिक्षा के लिए आवश्यक।',
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
        contributorMetrics: 'योगदानकर्ता मेट्रिक्स',
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
        contributions: 'योगदान',
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
        stars: 'सितारे',
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
        totalInsertionsPartial:
          'कुल सम्मिलन (आंशिक डेटा - कैश्ड स्टैट्स उपलब्ध नहीं)',
        totalDeletions: 'कुल विलोपन (पूरा इतिहास)',
        totalDeletionsPartial:
          'कुल विलोपन (आंशिक डेटा - कैश्ड स्टैट्स उपलब्ध नहीं)',
        noPullRequests: 'कोई pull request नहीं मिला',
        noIssues: 'कोई समस्या नहीं मिली',
        noCommits: 'कोई commit नहीं मिला',
        updated: 'अपडेट किया गया',
        files: 'फाइलें',
        modifiedFiles: 'संशोधित फाइलें',
        andMore: 'और {count} फाइलें',
        commit: 'commit',
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
        useFunctionalComponents:
          'hooks के साथ फंक्शनल कंपोनेंट्स का उपयोग करें',
        includeDependencies: 'सही useEffect dependencies शामिल करें',
        avoidInlineStyles:
          'इनलाइन स्टाइल्स से बचें, Tailwind classes का उपयोग करें',
        memoizeCalculations: 'महंगी गणनाओं को मेमोइज़ करें',
        useCallback: 'इवेंट हैंडलर्स के लिए useCallback का उपयोग करें',
        importSpecific: 'जरूरत न होने पर पूरी लाइब्रेरी इम्पोर्ट न करें',
        quickReferences: 'त्वरित संदर्भ',
        contributionGuidelines: 'योगदान दिशानिर्देश',
        detailedRules: 'विस्तृत योगदान नियम',
        githubIssues: 'GitHub Issues',
        findIssues: 'काम करने के लिए issues खोजें',
        codeOfConduct: 'आचार संहिता',
        communityGuidelines: 'समुदाय दिशानिर्देश',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'फीडबैक भेजें',
      title: 'उपयोगकर्ता फीडबैक',
      description:
        'SortVision को बेहतर बनाने के लिए हम आपके फीडबैक को पसंद करेंगे!',
      description2:
        'अगर आपको कोई बग मिला है, कोई सुझाव है, या बस अपने विचार साझा करना चाहते हैं तो हमें बताएं।',
      processing: 'आपका फीडबैक सुरक्षित रूप से प्रोसेस हो रहा है...',
      name: 'नाम',
      email: 'ईमेल (वैकल्पिक)',
      feedbackType: 'फीडबैक प्रकार',
      detailedFeedback: 'विस्तृत फीडबैक',
      rating: 'रेटिंग',
      region: 'क्षेत्र',
      submit: 'फीडबैक सबमिट करें',
      submitting: 'सबमिट हो रहा है...',
      success: 'फीडबैक सफलतापूर्वक सबमिट हो गया!',
      error: 'फीडबैक सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
      types: {
        bug: 'बग रिपोर्ट',
        feature: 'फीचर अनुरोध',
        suggestion: 'सुझाव',
        general: 'सामान्य फीडबैक',
        performance: 'प्रदर्शन समस्या',
        ui: 'UI/UX समस्या',
      },
      ratings: {
        poor: 'खराब',
        fair: 'ठीक',
        good: 'अच्छा',
        veryGood: 'बहुत अच्छा',
        excellent: 'उत्कृष्ट',
      },
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
    },
    // Common
    common: {
      close: 'बंद करें',
      settings: 'सेटिंग्स',
      select: 'चुनें',
      enabled: 'सक्षम',
      disabled: 'अक्षम',
    },
  },
  bn: {
    // Settings Modal
    settings: {
      title: 'সর্ট সেটিংস',
      description: 'আপনার ভিজ্যুয়ালাইজেশন পছন্দগুলি কাস্টমাইজ করুন',
      description2:
        'আপনার অভিজ্ঞতা উন্নত করতে সাউন্ড, থিম এবং ভাষা সেটিংস সামঞ্জস্য করুন',
      sound: {
        title: 'সাউন্ড',
        description: 'সাউন্ড ইফেক্ট সক্ষম বা অক্ষম করুন',
        enabled: 'সাউন্ড সক্ষম',
        disabled: 'সাউন্ড অক্ষম',
        enableDescription: 'সাউন্ড ইফেক্ট সক্ষম করতে ক্লিক করুন',
        disableDescription: 'সাউন্ড ইফেক্ট অক্ষম করতে ক্লিক করুন',
      },
      voiceControl: {
        title: 'ভয়েস কন্ট্রোল',
        description: 'ভয়েস কন্ট্রোল সক্ষম বা অক্ষম করুন',
        enabled: 'ভয়েস কন্ট্রোল সক্ষম',
        disabled: 'ভয়েস কন্ট্রোল অক্ষম',
        enableDescription: 'ভয়েস কন্ট্রোল সক্ষম করতে ক্লিক করুন',
        disableDescription: 'ভয়েস কন্ট্রোল অক্ষম করতে ক্লিক করুন',
        denied:
          'মাইক্রোফোন অ্যাক্সেস অস্বীকার করা হয়েছে। দয়া করে ব্রাউজার সেটিংস চেক করুন।',
      },
      theme: {
        title: 'থিম',
        description: 'আপনার পছন্দের রঙের থিম নির্বাচন করুন',
      },
      language: {
        title: 'ভাষা',
        description: 'আপনার ভাষা নির্বাচন করুন',
      },
      keyboardShortcuts: {
        title: 'কিবোর্ড শর্টকাট',
        navigation: 'নেভিগেশন',
        algorithmControl: 'অ্যালগরিদম নিয়ন্ত্রণ',
        speedControl: 'গতি নিয়ন্ত্রণ',
        arrayManipulation: 'অ্যারে ম্যানিপুলেশন',
        modalsOverlays: 'মডাল এবং ওভারলে',
        cycleFocus: 'ফোকাস চক্র',
        navigatePanels: 'প্যানেল/ধাপ নেভিগেট করুন',
        playPause: 'প্লে/পজ অ্যানিমেশন',
        resetArray: 'অ্যারে রিসেট করুন',
        increaseSpeed: 'গতি বাড়ান',
        decreaseSpeed: 'গতি কমান',
        newArray: 'নতুন অ্যারে',
        shuffleArray: 'অ্যারে শাফল করুন',
        showShortcutHelp: 'শর্টকাট সাহায্য দেখান/লুকান',
        toggleChatAssistant: 'চ্যাট অ্যাসিস্ট্যান্ট টগল করুন',
        toggleFeedbackForm: 'ফিডব্যাক ফর্ম টগল করুন',
        toggleSettingsPanel: 'সেটিংস প্যানেল টগল করুন',
        showHelp: 'এই সাহায্য দেখান',
      },
    },
    // Main page
    main: {
      subtitle: 'জনপ্রিয় সর্টিং অ্যালগরিদমের ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন',
      algorithmVisualization: 'ভিজ্যুয়ালাইজেশন',
      sortingAlgorithmVisualizer: 'সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার',
      builtWith: 'তৈরি হয়েছে',
      by: 'দ্বারা',
      contributors: 'অবদানকারী',
      sortVision: 'সর্টভিশন',
      github: 'গিটহাব',
      linkedin: 'লিংকডইন',
      sponsor: 'স্পনসর',
      buyMeACoffee: 'আমাকে কফি কিনে দিন',
      twitter: 'টুইটার',
      sponsorModal: {
        title: 'SortVision সমর্থন করুন',
        subtitle: 'কীভাবে সাহায্য করবেন বেছে নিন',
        devLabel: '// ডেভেলপারের পক্ষ থেকে',
        openerIntroPrefix: 'হে 👋 আমি ',
        openerIntroSuffix: ' — আমি SortVision বানিয়েছি এবং ',
        openerContributorsKnown:
          '{count} অসাধারণ অবদানকারী এটি তৈরিতে সাহায্য করেছেন।',
        openerContributorsUnknown:
          'একটি অসাধারণ কমিউনিটি এটি তৈরিতে সাহায্য করেছে।',
        openerOutro: ' সব বিনামূল্যে, সব ওপেন সোর্স।',
        honestLine1:
          'কোনো বিজ্ঞাপন নেই, পে-ওয়াল নেই, লগইন নেই। কিন্তু সাইট অনলাইন রাখা — ডোমেইন ও টুল — ',
        honestLine1Emphasis: 'বিনামূল্যে নয়।',
        honestLine2:
          'যদি SortVision অ্যালগরিদম বুঝতে সাহায্য করে, ছোট স্পনসরশিপ আমাকে বলে ',
        honestLine2Emphasis: 'এটা জীবিত রাখা মূল্যবান।',
        statStars: '{count} স্টার',
        statContributors: '{count} অবদানকারী',
        statContributorsPending: 'অবদানকারী…',
        statStarsPending: 'স্টার…',
        statFree: '১০০% বিনামূল্যে',
        statStarsCaption: 'স্টার',
        statContributorsCaption: 'অবদানকারী',
        statForksCaption: 'ফর্ক',
        statIssuesCaption: 'খোলা ইস্যু',
        statUpdatedCaption: 'সর্বশেষ আপডেট',
        statFreeCaption: 'বিনামূল্যে ও ওপেন',
        starRepoCta:
          'অথবা রিপোতে স্টার দিন — বিনামূল্যে এবং অনেক সাহায্য করে',
        supportLine: 'আপনার সমর্থন SortVision শিক্ষার্থীদের জন্য বিনামূল্যে রাখে',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'অ্যালগরিদম ভিজ্যুয়ালাইজার',
      },
      tabs: {
        config: 'কনফিগ',
        metrics: 'মেট্রিক্স',
        details: 'বিস্তারিত',
        overview: 'ওভারভিউ',
        guide: 'গাইড',
      },
      controls: {
        selectAlgorithm: 'অ্যালগরিদম নির্বাচন করুন',
        algorithm: 'অ্যালগরিদম',
        arraySize: 'অ্যারের আকার',
        animationDelay: 'অ্যানিমেশন বিলম্ব',
        elements: 'উপাদান',
        delay: 'বিলম্ব',
        newArray: 'নতুন_অ্যারে()',
        start: 'শুরু()',
        stop: 'থামান()',
        mergeSort: 'মার্জ_সর্ট()',
        ready: 'প্রস্তুত',
        small: 'ছোট',
        medium: 'মাঝারি',
        large: 'বড়',
        fast: 'দ্রুত',
        slow: 'ধীর',
        goodForLearning: 'শেখার জন্য ভাল',
        balanced: 'সুষম',
        performanceTest: 'পারফরম্যান্স টেস্ট',
        visualizePatterns: 'প্যাটার্ন ভিজ্যুয়ালাইজ করুন',
        elementsCount: 'উপাদান',
      },
      complexity: {
        efficiencyRating: 'দক্ষতা রেটিং',
        timeComplexity: 'সময় জটিলতা',
        spaceComplexity: 'স্থান জটিলতা',
        bestCase: 'সেরা কেস',
        average: 'গড়',
        worstCase: 'সবচেয়ে খারাপ কেস',
        high: 'উচ্চ',
        algorithmComplexity: 'অ্যালগরিদম জটিলতা',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          'একটি সহজ তুলনা-ভিত্তিক অ্যালগরিদম যা তালিকার মধ্য দিয়ে বারবার যায়, পাশাপাশি উপাদানগুলির তুলনা করে এবং সেগুলি ভুল ক্রমে থাকলে অদলবদল করে।',
      },
      insertion: {
        description:
          'একটি সময়ে একটি উপাদান নিয়ে সর্ট করা অ্যারে তৈরি করে, প্রতিটি নতুন উপাদানকে ইতিমধ্যে সর্ট করা অংশের সাথে তুলনা করে সঠিক জায়গায় বসায়।',
      },
      selection: {
        description:
          'একটি সর্টিং অ্যালগরিদম যা বারবার অসর্ট অংশ থেকে সবচেয়ে ছোট উপাদান খুঁজে বের করে অসর্ট অংশের শুরুতে রাখে।',
      },
      quick: {
        description:
          'একটি দক্ষ সর্টিং অ্যালগরিদম যা একটি পিভট উপাদান বেছে নিয়ে অ্যারে ভাগ করে এবং প্রতিটি ভাগ আলাদাভাবে সর্ট করে।',
      },
      merge: {
        description:
          'একটি দক্ষ সর্টিং অ্যালগরিদম যা অ্যারে দুটি ভাগে ভাগ করে, প্রতিটি ভাগ আলাদাভাবে সর্ট করে এবং তারপর সর্ট করা ভাগগুলিকে একসাথে জোড়া দেয়।',
      },
      radix: {
        description:
          'একটি বিশেষ সর্টিং অ্যালগরিদম যা সংখ্যাগুলিকে তাদের অঙ্ক অনুযায়ী ভাগ করে সর্ট করে, একবারে একটি অঙ্কের অবস্থান দেখে।',
      },
      heap: {
        description:
          'একটি সর্টিং অ্যালগরিদম যা একটি বিশেষ গাছের মতো ডেটা স্ট্রাকচার ব্যবহার করে উপাদানগুলিকে সর্ট করে।',
      },
      bucket: {
        description:
          'একটি সর্টিং অ্যালগরিদম যা উপাদানগুলিকে বিভিন্ন বালতিতে ভাগ করে, প্রতিটি বালতি আলাদাভাবে সর্ট করে এবং তারপর সব বালতি একসাথে জোড়া দেয়।',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: 'বর্তমান রান মেট্রিক্স',
      swaps: 'সোয়াপ',
      memoryOperations: 'মেমরি অপারেশন',
      comparisons: 'তুলনা',
      cpuOperations: 'সিপিইউ অপারেশন',
      timeMs: 'সময় (এমএস)',
      executionDuration: 'নির্বাহের সময়কাল',
      swapRatio: 'সোয়াপ অনুপাত',
      swapsComp: 'সোয়াপ/তুলনা',
      timeElement: 'সময়/উপাদান',
      msElem: 'এমএস/উপাদান',
      opsMs: 'অপ্স/এমএস',
      opsMsUnit: 'অপ্স/এমএস',
      score: 'স্কোর',
      points: 'পয়েন্ট',
      performanceBreakdown: 'পারফরম্যান্স ব্রেকডাউন',
      time: 'সময়',
      potentialImprovement: 'সম্ভাব্য উন্নতি:',
      algorithmComparison: 'অ্যালগরিদম তুলনা',
      testingAlgorithm: 'অ্যালগরিদম পরীক্ষা',
      runningTests: 'পরীক্ষা চলছে...',
      noComparisonData: 'কোন তুলনা ডেটা নেই',
      runTestAll: 'অ্যালগরিদম পারফরম্যান্স তুলনা করতে test_all() চালান',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'সর্টিং সম্পর্কে জিজ্ঞাসা করুন',
    },
    // Details page
    details: {
      basicSorts: 'বেসিক সর্টস',
      efficientSorts: 'দক্ষ সর্টস',
      specialSorts: 'বিশেষ সর্টস',
      algorithmDetails: '{algorithm}_sort() বিস্তারিত',
      algorithmImplementation: '{algorithm} বাস্তবায়ন',
      loadingImplementation: '{algorithm} বাস্তবায়ন লোড হচ্ছে',
      relatedAlgorithms: 'সম্পর্কিত অ্যালগরিদম',
      historicalContext: 'ঐতিহাসিক প্রেক্ষাপট',
      inventedBy: 'আবিষ্কারক',
      year: 'বছর',
      proTip: 'প্রো টিপ',
      funFact: 'মজার তথ্য',
      tips: {
        bubble:
          'বাবল সর্টের পারফরম্যান্স কীভাবে চতুর্ভুজীয়ভাবে হ্রাস পায় তা দেখতে অ্যারের আকার বাড়ানোর চেষ্টা করুন!',
        insertion:
          'দেখুন কীভাবে ইনসার্শন সর্ট প্রায় সর্ট করা অ্যারেতে অসাধারণভাবে ভাল পারফরম্যান্স করে।',
        selection:
          'লক্ষ্য করুন কীভাবে সিলেকশন সর্ট প্রাথমিক ক্রম নির্বিশেষে সবসময় একই সময় নেয়।',
        quick:
          'দেখুন কীভাবে পিভট নির্বাচন পার্টিশনিং প্রক্রিয়াকে প্রভাবিত করে।',
        merge:
          'দেখুন কীভাবে মার্জ সর্ট অ্যারেটিকে পুনরাবৃত্তভাবে ছোট সাব-অ্যারেতে ভাগ করে।',
        radix:
          'দেখুন কীভাবে র্যাডিক্স সর্ট প্রতিটি অঙ্কের অবস্থান স্বাধীনভাবে প্রক্রিয়া করে!',
        heap: 'লক্ষ্য করুন কীভাবে হিপ সর্ট একটি বাইনারি হিপ তৈরি করে এবং বারবার সর্বোচ্চ উপাদান বের করে!',
        bucket:
          'দেখুন কীভাবে বাকেট সর্ট উপাদানগুলিকে বাকেটে বিতরণ করে এবং সেগুলিকে আলাদাভাবে সর্ট করে!',
      },
      facts: {
        bubble:
          'বাবল সর্টের নামকরণ করা হয়েছে ছোট উপাদানগুলি কীভাবে এক্সচেঞ্জের মাধ্যমে তালিকার শীর্ষে "বাবল" করে তার জন্য।',
        insertion:
          'ইনসার্শন সর্ট অনেক লোকের হাতে প্লেয়িং কার্ড সর্ট করার পদ্ধতির মতো।',
        selection:
          'সিলেকশন সর্ট সম্ভাব্য ন্যূনতম সংখ্যক সোয়াপ করে (সবচেয়ে খারাপ ক্ষেত্রে n-1)।',
        quick:
          'কুইক সর্ট 1959 সালে টনি হোয়ার দ্বারা বিকশিত হয়েছিল যখন তিনি মস্কো স্টেট ইউনিভার্সিটিতে বিনিময় ছাত্র ছিলেন।',
        merge:
          'মার্জ সর্ট 1945 সালে জন ভন নিউম্যান দ্বারা উদ্ভাবিত হয়েছিল, বর্ণিত প্রথম ডিভাইড-অ্যান্ড-কনকার অ্যালগরিদমগুলির মধ্যে একটি।',
        radix:
          'র্যাডিক্স সর্ট আধুনিক কম্পিউটারের আগের এবং 20 শতকের শুরুতে পাঞ্চ কার্ড সর্টিং মেশিনের সাথে ব্যবহার করা হত।',
        heap: 'হিপ সর্ট 1964 সালে জে. ডব্লিউ. জে. উইলিয়ামস দ্বারা উদ্ভাবিত হয়েছিল এবং অনেক প্রাইওরিটি কিউ বাস্তবায়নের ভিত্তি।',
        bucket:
          'বাকেট সর্ট বিশেষভাবে দক্ষ যখন ইনপুট একটি পরিসরে সমানভাবে বিতরণ করা হয়।',
      },
    },
    // SEO
    seo: {
      title: 'সর্টভিশন - ইন্টারঅ্যাক্টিভ সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার',
      description:
        'বাবল সর্ট, মার্জ সর্ট, কুইক সর্ট এবং আরও সহ সর্টিং অ্যালগরিদমের ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন। রিয়েল-টাইম পারফরম্যান্স মেট্রিক্স এবং শিক্ষামূলক সামগ্রীর সাথে ডেটা স্ট্রাকচার এবং অ্যালগরিদম শিখুন।',
      keywords:
        'সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার, DSA শেখা, ডেটা স্ট্রাকচার অ্যালগরিদম, কোডিং ইন্টারভিউ প্রস্তুতি, মার্জ সর্ট, কুইক সর্ট, হিপ সর্ট, বাবল সর্ট, কম্পিউটার সায়েন্স শিক্ষা, অ্যালগরিদম অ্যানিমেশন, ইন্টারঅ্যাক্টিভ শেখা, প্রোগ্রামিং টিউটোরিয়াল, সফ্টওয়্যার ইঞ্জিনিয়ারিং',
      algorithmTitle: '{algorithm} সর্ট ভিজ্যুয়ালাইজার - সর্টভিশন',
      algorithmDescription:
        'সর্টভিশনের ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজারের সাথে {algorithm} সর্ট অ্যালগরিদমে দক্ষতা অর্জন করুন। ধাপে ধাপে অ্যানিমেশন, পারফরম্যান্স বিশ্লেষণ, এবং কোডিং ইন্টারভিউয়ের জন্য ব্যাপক DSA শেখা।',
      ogTitle:
        'সর্টভিশন - DSA শেখার জন্য ইন্টারঅ্যাক্টিভ সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার',
      ogDescription:
        'ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশনের সাথে সর্টিং অ্যালগরিদমে দক্ষতা অর্জন করুন। কোডিং ইন্টারভিউ, কম্পিউটার সায়েন্স শিক্ষা এবং DSA শেখার জন্য পারফেক্ট।',
      twitterTitle:
        'সর্টভিশন - ইন্টারঅ্যাক্টিভ সর্টিং অ্যালগরিদম ভিজ্যুয়ালাইজার',
      twitterDescription:
        'ধাপে ধাপে ভিজ্যুয়ালাইজেশনের সাথে সর্টিং অ্যালগরিদম শিখুন। কোডিং ইন্টারভিউ এবং কম্পিউটার সায়েন্স শিক্ষার জন্য অপরিহার্য।',
    },
    // Contributions
    contributions: {
      stats: {
        contributors: 'অবদানকারী',
        amazingDevelopers: 'আশ্চর্য ডেভেলপার',
        totalCommits: 'মোট কমিট',
        linesOfImpact: 'প্রভাবের লাইন',
        githubStars: 'GitHub স্টার',
        communityLove: 'কমিউনিটি ভালবাসা',
        forks: 'ফর্ক',
        projectCopies: 'প্রজেক্ট কপি',
        contributorMetrics: 'অবদানকারী মেট্রিক্স',
      },
      list: {
        filterByType: 'টাইপ অনুযায়ী ফিল্টার করুন',
        allContributors: 'সব অবদানকারী',
        searchContributors: 'অবদানকারী খুঁজুন',
        typeUsername: 'ইউজারনেম টাইপ করুন...',
        contributorsFound: 'অবদানকারী পাওয়া গেছে',
        noContributorsFound: 'কোন অবদানকারী পাওয়া যায়নি',
        loadingContributors: 'অবদানকারী লোড হচ্ছে...',
        projectAdmins: 'প্রজেক্ট অ্যাডমিন',
        community: 'কমিউনিটি',
        bots: 'বট',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'কমিট',
        developer: 'ডেভেলপার',
        profile: 'প্রোফাইল',
        details: 'বিস্তারিত',
        contributions: 'অবদান',
      },
      health: {
        issues: 'ইস্যু',
        open: 'খোলা',
        closed: 'বন্ধ',
        recent: 'সাম্প্রতিক',
        pullRequests: 'Pull Requests',
        merged: 'মার্জ করা',
        repository: 'রিপোজিটরি',
        size: 'আকার',
        language: 'ভাষা',
        stars: 'স্টার',
      },
      contributorDetail: {
        loading: 'অবদানকারী ডেটা লোড হচ্ছে...',
        progress: 'অগ্রগতি',
        profileDetails: 'প্রোফাইল বিস্তারিত',
        publicRepos: 'পাবলিক রিপো',
        followers: 'ফলোয়ার',
        following: 'ফলো করছেন',
        repoCommits: 'রিপো কমিট',
        pullRequests: 'Pull Requests',
        issues: 'ইস্যু',
        linesAdded: 'লাইন যোগ করা হয়েছে',
        linesDeleted: 'লাইন মুছে ফেলা হয়েছে',
        total: 'মোট',
        merged: 'মার্জ করা হয়েছে',
        open: 'খোলা',
        closed: 'বন্ধ',
        totalInsertions: 'মোট ইনসার্শন (সম্পূর্ণ ইতিহাস)',
        totalInsertionsPartial:
          'মোট ইনসার্শন (আংশিক ডেটা - ক্যাশড স্ট্যাটস উপলব্ধ নয়)',
        totalDeletions: 'মোট ডিলিশন (সম্পূর্ণ ইতিহাস)',
        totalDeletionsPartial:
          'মোট ডিলিশন (আংশিক ডেটা - ক্যাশড স্ট্যাটস উপলব্ধ নয়)',
        noPullRequests: 'কোন pull request পাওয়া যায়নি',
        noIssues: 'কোন ইস্যু পাওয়া যায়নি',
        noCommits: 'কোন কমিট পাওয়া যায়নি',
        updated: 'আপডেট করা হয়েছে',
        files: 'ফাইল',
        modifiedFiles: 'পরিবর্তিত ফাইল',
        andMore: 'এবং {count} আরও ফাইল',
        commit: 'কমিট',
      },
      guide: {
        contributionGuide: 'অবদান গাইড',
        phase: 'পর্যায়',
        gettingStarted: 'শুরু করা',
        development: 'ডেভেলপমেন্ট',
        submission: 'জমা দেওয়া',
        forkRepository: 'রিপোজিটরি ফর্ক করুন',
        createCopy: 'SortVision-এর আপনার নিজের কপি তৈরি করুন',
        setupEnvironment: 'ডেভেলপমেন্ট এনভায়রনমেন্ট সেটআপ করুন',
        installDependencies: 'ডিপেন্ডেন্সি ইনস্টল করুন এবং লোকালি চালান',
        createBranch: 'ফিচার ব্রাঞ্চ তৈরি করুন',
        createNewBranch: 'আপনার পরিবর্তনের জন্য একটি নতুন ব্রাঞ্চ তৈরি করুন',
        makeChanges: 'আপনার পরিবর্তন করুন',
        implementFeature: 'আপনার ফিচার বা ফিক্স ইমপ্লিমেন্ট করুন',
        commitPush: 'কমিট এবং পুশ',
        commitChanges: 'স্পষ্ট বার্তার সাথে আপনার পরিবর্তন কমিট করুন',
        createPR: 'Pull Request তৈরি করুন',
        submitChanges: 'রিভিউয়ের জন্য আপনার পরিবর্তন জমা দিন',
        previous: '← পূর্ববর্তী',
        nextPhase: 'পরবর্তী পর্যায় →',
        phaseComplete: 'পর্যায় {phase} সম্পূর্ণ!',
        greatWork: 'দুর্দান্ত কাজ! আপনি এই পর্যায়ের সব ধাপ সম্পূর্ণ করেছেন।',
        continueTo: '{phase} এ চালিয়ে যান →',
        bestPractices: 'সেরা অনুশীলন',
        codeQuality: 'কোড গুণমান',
        codeQualityDesc: 'পরিষ্কার, পাঠযোগ্য এবং বজায় রাখার যোগ্য কোড অনুশীলন',
        reactPractices: 'React সেরা অনুশীলন',
        reactPracticesDesc: 'আধুনিক React প্যাটার্ন এবং hooks ব্যবহার',
        performanceTips: 'পারফরম্যান্স টিপস',
        performanceTipsDesc: 'ভাল অ্যাপ পারফরম্যান্সের জন্য অপ্টিমাইজেশন কৌশল',
        quickGuidelines: '📋 দ্রুত নির্দেশিকা',
        followPatterns: '• বিদ্যমান প্যাটার্ন অনুসরণ করুন',
        clearCommits: '• স্পষ্ট কমিট বার্তা লিখুন',
        testChanges: '• আপনার পরিবর্তন পরীক্ষা করুন',
        keepFocused: '• কম্পোনেন্টগুলিকে ফোকাস রাখুন',
        do: 'করুন:',
        dont: 'করবেন না:',
        useDescriptiveNames: 'বর্ণনামূলক ভেরিয়েবল নাম ব্যবহার করুন',
        keepFunctionsSmall: 'ফাংশনগুলিকে ছোট এবং ফোকাস রাখুন',
        avoidMagicNumbers: 'ম্যাজিক নম্বর এড়িয়ে চলুন',
        useFunctionalComponents: 'hooks সহ ফাংশনাল কম্পোনেন্ট ব্যবহার করুন',
        includeDependencies: 'সঠিক useEffect dependencies অন্তর্ভুক্ত করুন',
        avoidInlineStyles:
          'ইনলাইন স্টাইল এড়িয়ে চলুন, Tailwind classes ব্যবহার করুন',
        memoizeCalculations: 'ব্যয়বহুল গণনা মেমোইজ করুন',
        useCallback: 'ইভেন্ট হ্যান্ডলারদের জন্য useCallback ব্যবহার করুন',
        importSpecific: 'যখন প্রয়োজন নেই তখন পুরো লাইব্রেরি ইমপোর্ট করবেন না',
        quickReferences: 'দ্রুত রেফারেন্স',
        contributionGuidelines: 'অবদান নির্দেশিকা',
        detailedRules: 'বিস্তারিত অবদান নিয়ম',
        githubIssues: 'GitHub Issues',
        findIssues: 'কাজ করার জন্য issues খুঁজুন',
        codeOfConduct: 'আচরণবিধি',
        communityGuidelines: 'কমিউনিটি নির্দেশিকা',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'ফিডব্যাক পাঠান',
      title: 'ব্যবহারকারী ফিডব্যাক',
      description: 'SortVision উন্নত করতে আমরা আপনার ফিডব্যাক পছন্দ করব!',
      description2:
        'আপনি যদি কোনো বাগ পেয়েছেন, কোনো পরামর্শ আছে, বা শুধু আপনার চিন্তা শেয়ার করতে চান তাহলে আমাদের জানান।',
      processing: 'আপনার ফিডব্যাক নিরাপদে প্রক্রিয়াকরণ হচ্ছে...',
      name: 'নাম',
      email: 'ইমেইল (ঐচ্ছিক)',
      feedbackType: 'ফিডব্যাকের ধরন',
      detailedFeedback: 'বিস্তারিত ফিডব্যাক',
      rating: 'রেটিং',
      region: 'অঞ্চল',
      submit: 'ফিডব্যাক জমা দিন',
      submitting: 'জমা দেওয়া হচ্ছে...',
      success: 'ফিডব্যাক সফলভাবে জমা দেওয়া হয়েছে!',
      error: 'ফিডব্যাক জমা দিতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
      types: {
        bug: 'বাগ রিপোর্ট',
        feature: 'ফিচার অনুরোধ',
        suggestion: 'পরামর্শ',
        general: 'সাধারণ ফিডব্যাক',
        performance: 'পারফরমেন্স সমস্যা',
        ui: 'UI/UX সমস্যা',
      },
      ratings: {
        poor: 'খারাপ',
        fair: 'ঠিক আছে',
        good: 'ভাল',
        veryGood: 'খুব ভাল',
        excellent: 'চমৎকার',
      },
      language: 'ভাষা',
      selectLanguage: 'ভাষা নির্বাচন করুন',
    },
    // Common
    common: {
      close: 'বন্ধ করুন',
      settings: 'সেটিংস',
      select: 'নির্বাচন করুন',
      enabled: 'সক্ষম',
      disabled: 'অক্ষম',
    },
  },
  de: {
    // Settings Modal
    settings: {
      title: 'Sort-Einstellungen',
      description: 'Passen Sie Ihre Visualisierungseinstellungen an',
      description2:
        'Stellen Sie Sound-, Theme- und Spracheinstellungen ein, um Ihre Erfahrung zu verbessern',
      sound: {
        title: 'Sound',
        description: 'Soundeffekte aktivieren oder deaktivieren',
        enabled: 'Sound aktiviert',
        disabled: 'Sound deaktiviert',
        enableDescription: 'Klicken Sie, um Soundeffekte zu aktivieren',
        disableDescription: 'Klicken Sie, um Soundeffekte zu deaktivieren',
      },
      voiceControl: {
        title: 'Sprachsteuerung',
        description: 'Sprachsteuerung aktivieren oder deaktivieren',
        enabled: 'Sprachsteuerung aktiviert',
        disabled: 'Sprachsteuerung deaktiviert',
        enableDescription: 'Klicken Sie, um Sprachsteuerung zu aktivieren',
        disableDescription: 'Klicken Sie, um Sprachsteuerung zu deaktivieren',
        denied:
          'Mikrofonzugriff verweigert. Bitte überprüfen Sie die Browser-Einstellungen.',
      },
      theme: {
        title: 'Theme',
        description: 'Wählen Sie Ihr bevorzugtes Farbschema',
      },
      language: {
        title: 'Sprache',
        description: 'Wählen Sie Ihre Sprache',
      },
      keyboardShortcuts: {
        title: 'Tastenkürzel',
        navigation: 'Navigation',
        algorithmControl: 'Algorithmus-Steuerung',
        speedControl: 'Geschwindigkeitssteuerung',
        arrayManipulation: 'Array-Manipulation',
        modalsOverlays: 'Modals und Overlays',
        cycleFocus: 'Fokus durchlaufen',
        navigatePanels: 'Panels/Schritte navigieren',
        playPause: 'Animation abspielen/pausieren',
        resetArray: 'Array zurücksetzen',
        increaseSpeed: 'Geschwindigkeit erhöhen',
        decreaseSpeed: 'Geschwindigkeit verringern',
        newArray: 'Neues Array',
        shuffleArray: 'Array mischen',
        showShortcutHelp: 'Tastenkürzel-Hilfe anzeigen/verstecken',
        toggleChatAssistant: 'Chat-Assistent umschalten',
        toggleFeedbackForm: 'Feedback-Formular umschalten',
        toggleSettingsPanel: 'Einstellungs-Panel umschalten',
        showHelp: 'Diese Hilfe anzeigen',
      },
    },
    // Main page
    main: {
      subtitle: 'Interaktive Visualisierung beliebter Sortieralgorithmen',
      algorithmVisualization: 'Visualisierung',
      sortingAlgorithmVisualizer: 'Sortieralgorithmus-Visualisierer',
      builtWith: 'Erstellt mit',
      by: 'von',
      contributors: 'Mitwirkende',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'Sponsor',
      buyMeACoffee: 'Kaufe mir einen Kaffee',
      twitter: 'Twitter',
      sponsorModal: {
        title: 'SortVision unterstützen',
        subtitle: 'Wähle, wie du helfen möchtest',
        devLabel: '// vom Entwickler',
        openerIntroPrefix: 'Hey 👋 Ich bin ',
        openerIntroSuffix: ' — ich habe SortVision erstellt und ',
        openerContributorsKnown:
          '{count} großartige Mitwirkende haben mitgebaut.',
        openerContributorsUnknown: 'eine großartige Community hat mitgebaut.',
        openerOutro: ' Alles kostenlos, alles Open Source.',
        honestLine1:
          'Keine Werbung, keine Paywalls, kein Login. Aber die Seite online zu halten — Domain und Tools — ',
        honestLine1Emphasis: 'ist nicht kostenlos.',
        honestLine2:
          'Wenn SortVision dir bei Algorithmen geholfen hat, sagt mir eine kleine Sponsoring-Zusage, dass ',
        honestLine2Emphasis: 'es sich lohnt, das am Leben zu halten.',
        statStars: '{count} Sterne',
        statContributors: '{count} Mitwirkende',
        statContributorsPending: 'Mitwirkende…',
        statStarsPending: 'Sterne…',
        statFree: '100% kostenlos',
        statStarsCaption: 'Sterne',
        statContributorsCaption: 'Mitwirkende',
        statForksCaption: 'Forks',
        statIssuesCaption: 'Offene Issues',
        statUpdatedCaption: 'Zuletzt aktualisiert',
        statFreeCaption: 'Kostenlos & offen',
        starRepoCta:
          'Oder stern einfach das Repo — kostenlos und hilft viel',
        supportLine: 'Deine Unterstützung hält SortVision für Lernende kostenlos',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'Algorithmus-Visualisierer',
      },
      tabs: {
        config: 'Konfig',
        metrics: 'Metriken',
        details: 'Details',
        overview: 'Übersicht',
        guide: 'Anleitung',
      },
      controls: {
        selectAlgorithm: 'Algorithmus auswählen',
        algorithm: 'Algorithmus',
        arraySize: 'Array-Größe',
        animationDelay: 'Animationsverzögerung',
        elements: 'Elemente',
        delay: 'Verzögerung',
        newArray: 'neues_Array()',
        start: 'start()',
        stop: 'stop()',
        mergeSort: 'merge_sort()',
        ready: 'bereit',
        small: 'Klein',
        medium: 'Mittel',
        large: 'Groß',
        fast: 'Schnell',
        slow: 'Langsam',
        goodForLearning: 'Gut zum Lernen',
        balanced: 'Ausgewogen',
        performanceTest: 'Leistungstest',
        visualizePatterns: 'Muster visualisieren',
        elementsCount: 'Elemente',
      },
      complexity: {
        efficiencyRating: 'EFFIZIENZ-BEWERTUNG',
        timeComplexity: 'ZEITKOMPLEXITÄT',
        spaceComplexity: 'RAUMKOMPLEXITÄT',
        bestCase: 'BESTER FALL',
        average: 'DURCHSCHNITT',
        worstCase: 'SCHLECHTESTER FALL',
        high: 'Hoch',
        algorithmComplexity: 'Algorithmus-Komplexität',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          'Ein einfacher vergleichsbasierter Algorithmus, der wiederholt durch die Liste geht, benachbarte Elemente vergleicht und sie vertauscht, wenn sie in der falschen Reihenfolge sind.',
      },
      insertion: {
        description:
          'Ein einfacher Sortieralgorithmus, der das endgültige sortierte Array ein Element nach dem anderen aufbaut, indem er wiederholt das nächste unsortierte Element nimmt und es an der richtigen Position in den bereits sortierten Teil einfügt.',
      },
      selection: {
        description:
          'Ein Sortieralgorithmus, der wiederholt das minimale Element aus dem unsortierten Teil findet und es an den Anfang des unsortierten Teils setzt.',
      },
      quick: {
        description:
          'Ein effizienter, in-place Sortieralgorithmus, der die Divide-and-Conquer-Strategie mit einem Pivot-Element verwendet, um das Array zu partitionieren.',
      },
      merge: {
        description:
          'Ein effizienter, stabiler, Divide-and-Conquer-Sortieralgorithmus, der das Eingabearray in zwei Hälften teilt, sie rekursiv sortiert und dann die sortierten Hälften zusammenführt.',
      },
      radix: {
        description:
          'Ein nicht-vergleichender Integer-Sortieralgorithmus, der Daten mit Integer-Schlüsseln sortiert, indem er Schlüssel nach einzelnen Ziffern gruppiert, die dieselbe Position und denselben Wert teilen.',
      },
      heap: {
        description:
          'Ein vergleichsbasierter Sortieralgorithmus, der eine binäre Heap-Datenstruktur verwendet, um einen Heap zu erstellen und dann wiederholt das maximale Element extrahiert.',
      },
      bucket: {
        description:
          'Ein Verteilungssortieralgorithmus, der funktioniert, indem er Elemente in eine Anzahl von Eimern verteilt, jeden Eimer einzeln sortiert und dann die Eimer verkettet.',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: 'aktuelle Lauf-Metriken',
      swaps: 'TAUSCHE',
      memoryOperations: 'Speicheroperationen',
      comparisons: 'VERGLEICHE',
      cpuOperations: 'CPU-Operationen',
      timeMs: 'ZEIT (MS)',
      executionDuration: 'Ausführungsdauer',
      swapRatio: 'TAUSCH-VERHÄLTNIS',
      swapsComp: 'Tausche/Vergleiche',
      timeElement: 'ZEIT/ELEMENT',
      msElem: 'ms/Elem',
      opsMs: 'OPS/MS',
      opsMsUnit: 'ops/ms',
      score: 'PUNKTZAHL',
      points: 'Punkte',
      performanceBreakdown: 'LEISTUNGS-AUFTEILUNG',
      time: 'Zeit',
      potentialImprovement: 'Mögliche Verbesserung:',
      algorithmComparison: 'Algorithmus-Vergleich',
      testingAlgorithm: 'Algorithmus testen',
      runningTests: 'Tests laufen...',
      noComparisonData: 'Keine Vergleichsdaten verfügbar',
      runTestAll:
        'Führen Sie test_all() aus, um die Algorithmus-Leistung zu vergleichen',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'Über Sortierung fragen',
    },
    // Details page
    details: {
      basicSorts: 'GRUNDLEGENDE SORTIERUNGEN',
      efficientSorts: 'EFFIZIENTE SORTIERUNGEN',
      specialSorts: 'SPEZIELLE SORTIERUNGEN',
      algorithmDetails: '{algorithm}_sort() Details',
      algorithmImplementation: '{algorithm} IMPLEMENTIERUNG',
      loadingImplementation: '{algorithm} Implementierung wird geladen',
      relatedAlgorithms: 'Verwandte Algorithmen',
      historicalContext: 'Historischer Kontext',
      inventedBy: 'Erfunden von',
      year: 'Jahr',
      proTip: 'PRO-TIPP',
      funFact: 'LUSTIGE TATSACHE',
      tips: {
        bubble:
          'Versuchen Sie, die Array-Größe zu erhöhen, um zu sehen, wie sich die Leistung von Bubble Sort quadratisch verschlechtert!',
        insertion:
          'Beobachten Sie, wie Insertion Sort auf fast sortierten Arrays außergewöhnlich gut funktioniert.',
        selection:
          'Beachten Sie, wie Selection Sort immer die gleiche Zeit benötigt, unabhängig von der ursprünglichen Reihenfolge.',
        quick:
          'Beobachten Sie, wie die Pivot-Auswahl den Partitionierungsprozess beeinflusst.',
        merge:
          'Sehen Sie, wie Merge Sort das Array rekursiv in kleinere Subarrays teilt.',
        radix:
          'Beobachten Sie, wie Radix Sort jede Ziffernposition unabhängig verarbeitet!',
        heap: 'Beachten Sie, wie Heap Sort einen binären Heap erstellt und wiederholt das maximale Element extrahiert!',
        bucket:
          'Beobachten Sie, wie Bucket Sort Elemente in Eimer verteilt und sie einzeln sortiert!',
      },
      facts: {
        bubble:
          'Bubble Sort ist nach der Art benannt, wie kleinere Elemente durch Austausch an die Spitze der Liste "blubbern".',
        insertion:
          'Insertion Sort ähnelt der Art, wie viele Menschen Spielkarten in ihren Händen sortieren.',
        selection:
          'Selection Sort macht die minimale Anzahl möglicher Tausche (n-1 im schlimmsten Fall).',
        quick:
          'Quick Sort wurde 1959 von Tony Hoare entwickelt, während er Austauschstudent an der Moskauer Staatsuniversität war.',
        merge:
          'Merge Sort wurde 1945 von John von Neumann erfunden, einer der ersten beschriebenen Divide-and-Conquer-Algorithmen.',
        radix:
          'Radix Sort stammt aus der Zeit vor modernen Computern und wurde mit Lochkarten-Sortiermaschinen im frühen 20. Jahrhundert verwendet.',
        heap: 'Heap Sort wurde 1964 von J. W. J. Williams erfunden und ist die Grundlage für viele Priority-Queue-Implementierungen.',
        bucket:
          'Bucket Sort ist besonders effizient, wenn die Eingabe gleichmäßig über einen Bereich verteilt ist.',
      },
    },
    // SEO
    seo: {
      title: 'SortVision - Interaktiver Sortieralgorithmus-Visualisierer',
      description:
        'Interaktive Visualisierung von Sortieralgorithmen einschließlich Bubble Sort, Merge Sort, Quick Sort und mehr. Lernen Sie Datenstrukturen und Algorithmen mit Echtzeit-Leistungsmetriken und Bildungsinhalten.',
      keywords:
        'Sortieralgorithmus-Visualisierer, DSA-Lernen, Datenstrukturen Algorithmen, Programmierinterview-Vorbereitung, Merge Sort, Quick Sort, Heap Sort, Bubble Sort, Informatik-Bildung, Algorithmus-Animation, interaktives Lernen, Programmier-Tutorial, Software-Engineering',
      algorithmTitle: '{algorithm} Sort Visualisierer - SortVision',
      algorithmDescription:
        'Meistern Sie den {algorithm} Sort-Algorithmus mit SortVisions interaktivem Visualisierer. Schritt-für-Schritt-Animationen, Leistungsanalyse und umfassendes DSA-Lernen für Programmierinterviews.',
      ogTitle:
        'SortVision - Interaktiver Sortieralgorithmus-Visualisierer für DSA-Lernen',
      ogDescription:
        'Meistern Sie Sortieralgorithmen mit interaktiven Visualisierungen. Perfekt für Programmierinterviews, Informatik-Bildung und DSA-Lernen.',
      twitterTitle:
        'SortVision - Interaktiver Sortieralgorithmus-Visualisierer',
      twitterDescription:
        'Lernen Sie Sortieralgorithmen mit Schritt-für-Schritt-Visualisierungen. Wesentlich für Programmierinterviews und Informatik-Bildung.',
    },
    // Contributions
    contributions: {
      stats: {
        contributors: 'Mitwirkende',
        amazingDevelopers: 'Erstaunliche Entwickler',
        totalCommits: 'Gesamt-Commits',
        linesOfImpact: 'Einflusslinien',
        githubStars: 'GitHub-Sterne',
        communityLove: 'Community-Liebe',
        forks: 'Forks',
        projectCopies: 'Projektkopien',
        contributorMetrics: 'Mitwirkende-Metriken',
      },
      list: {
        filterByType: 'nach Typ filtern',
        allContributors: 'Alle Mitwirkenden',
        searchContributors: 'Mitwirkende suchen',
        typeUsername: 'Benutzername eingeben...',
        contributorsFound: 'Mitwirkende gefunden',
        noContributorsFound: 'Keine Mitwirkenden gefunden',
        loadingContributors: 'Mitwirkende werden geladen...',
        projectAdmins: 'Projekt-Admins',
        community: 'Community',
        bots: 'Bots',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'Commits',
        developer: 'Entwickler',
        profile: 'Profil',
        details: 'Details',
        contributions: 'Beiträge',
      },
      health: {
        issues: 'Probleme',
        open: 'Offen',
        closed: 'Geschlossen',
        recent: 'Kürzlich',
        pullRequests: 'Pull Requests',
        merged: 'Zusammengeführt',
        repository: 'Repository',
        size: 'Größe',
        language: 'Sprache',
        stars: 'Sterne',
      },
      contributorDetail: {
        loading: 'Mitwirkende-Daten werden geladen...',
        progress: 'Fortschritt',
        profileDetails: 'Profil-Details',
        publicRepos: 'Öffentliche Repos',
        followers: 'Follower',
        following: 'Folgt',
        repoCommits: 'Repo-Commits',
        pullRequests: 'Pull Requests',
        issues: 'Probleme',
        linesAdded: 'Hinzugefügte Zeilen',
        linesDeleted: 'Gelöschte Zeilen',
        total: 'Gesamt',
        merged: 'zusammengeführt',
        open: 'offen',
        closed: 'geschlossen',
        totalInsertions: 'Gesamte Einfügungen (vollständige Historie)',
        totalInsertionsPartial:
          'Gesamte Einfügungen (Teildaten - gecachte Statistiken nicht verfügbar)',
        totalDeletions: 'Gesamte Löschungen (vollständige Historie)',
        totalDeletionsPartial:
          'Gesamte Löschungen (Teildaten - gecachte Statistiken nicht verfügbar)',
        noPullRequests: 'Keine Pull Requests gefunden',
        noIssues: 'Keine Probleme gefunden',
        noCommits: 'Keine Commits gefunden',
        updated: 'Aktualisiert',
        files: 'Dateien',
        modifiedFiles: 'Geänderte Dateien',
        andMore: 'und {count} weitere Dateien',
        commit: 'Commit',
      },
      guide: {
        contributionGuide: 'Beitrags-Leitfaden',
        phase: 'Phase',
        gettingStarted: 'Erste Schritte',
        development: 'Entwicklung',
        submission: 'Einreichung',
        forkRepository: 'Repository forken',
        createCopy: 'Erstellen Sie Ihre eigene Kopie von SortVision',
        setupEnvironment: 'Entwicklungsumgebung einrichten',
        installDependencies: 'Abhängigkeiten installieren und lokal ausführen',
        createBranch: 'Feature-Branch erstellen',
        createNewBranch: 'Erstellen Sie einen neuen Branch für Ihre Änderungen',
        makeChanges: 'Machen Sie Ihre Änderungen',
        implementFeature: 'Implementieren Sie Ihr Feature oder Ihren Fix',
        commitPush: 'Commit & Push',
        commitChanges: 'Committen Sie Ihre Änderungen mit klaren Nachrichten',
        createPR: 'Pull Request erstellen',
        submitChanges: 'Reichen Sie Ihre Änderungen zur Überprüfung ein',
        previous: '← Vorherige',
        nextPhase: 'Nächste Phase →',
        phaseComplete: 'Phase {phase} Abgeschlossen!',
        greatWork:
          'Großartige Arbeit! Sie haben alle Schritte in dieser Phase abgeschlossen.',
        continueTo: 'Weiter zu {phase} →',
        bestPractices: 'Beste Praktiken',
        codeQuality: 'Code-Qualität',
        codeQualityDesc: 'Saubere, lesbare und wartbare Code-Praktiken',
        reactPractices: 'React Best Practices',
        reactPracticesDesc: 'Moderne React-Muster und Hooks-Verwendung',
        performanceTips: 'Leistungstipps',
        performanceTipsDesc: 'Optimierungstechniken für bessere App-Leistung',
        quickGuidelines: '📋 Schnelle Richtlinien',
        followPatterns: '• Folgen Sie bestehenden Mustern',
        clearCommits: '• Schreiben Sie klare Commit-Nachrichten',
        testChanges: '• Testen Sie Ihre Änderungen',
        keepFocused: '• Halten Sie Komponenten fokussiert',
        do: 'TUN:',
        dont: 'NICHT TUN:',
        useDescriptiveNames: 'Verwenden Sie beschreibende Variablennamen',
        keepFunctionsSmall: 'Halten Sie Funktionen klein und fokussiert',
        avoidMagicNumbers: 'Vermeiden Sie magische Zahlen',
        useFunctionalComponents:
          'Verwenden Sie funktionale Komponenten mit Hooks',
        includeDependencies:
          'Fügen Sie korrekte useEffect-Abhängigkeiten hinzu',
        avoidInlineStyles:
          'Vermeiden Sie Inline-Styles, verwenden Sie Tailwind-Klassen',
        memoizeCalculations: 'Memoisieren Sie teure Berechnungen',
        useCallback: 'Verwenden Sie useCallback für Event-Handler',
        importSpecific:
          'Importieren Sie nicht ganze Bibliotheken, wenn nicht benötigt',
        quickReferences: 'Schnelle Referenzen',
        contributionGuidelines: 'Beitrags-Richtlinien',
        detailedRules: 'Detaillierte Beitragsregeln',
        githubIssues: 'GitHub Issues',
        findIssues: 'Finden Sie Issues zum Arbeiten',
        codeOfConduct: 'Verhaltenskodex',
        communityGuidelines: 'Community-Richtlinien',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'Feedback senden',
      title: 'Benutzer-Feedback',
      description:
        'Wir würden uns über Ihr Feedback freuen, um SortVision zu verbessern!',
      description2:
        'Lassen Sie uns wissen, wenn Sie einen Fehler gefunden haben, einen Vorschlag haben oder einfach Ihre Gedanken teilen möchten.',
      processing: 'Ihr Feedback wird sicher verarbeitet...',
      name: 'Name',
      email: 'E-Mail (Optional)',
      feedbackType: 'Feedback-Typ',
      detailedFeedback: 'Detailliertes Feedback',
      rating: 'Bewertung',
      region: 'Region',
      submit: 'Feedback Senden',
      submitting: 'Wird gesendet...',
      success: 'Feedback erfolgreich gesendet!',
      error: 'Fehler beim Senden des Feedbacks. Bitte versuchen Sie es erneut.',
      types: {
        bug: 'Fehlerbericht',
        feature: 'Funktionsanfrage',
        suggestion: 'Vorschlag',
        general: 'Allgemeines Feedback',
        performance: 'Leistungsproblem',
        ui: 'UI/UX-Problem',
      },
      ratings: {
        poor: 'Schlecht',
        fair: 'Ausreichend',
        good: 'Gut',
        veryGood: 'Sehr Gut',
        excellent: 'Ausgezeichnet',
      },
      language: 'Sprache',
      selectLanguage: 'Sprache Auswählen',
    },
    // Common
    common: {
      close: 'Schließen',
      settings: 'Einstellungen',
      select: 'Auswählen',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
    },
  },
  zh: {
    // Settings Modal
    settings: {
      title: '排序设置',
      description: '自定义您的可视化偏好',
      description2: '调整声音、主题和语言设置以增强您的体验',
      sound: {
        title: '声音',
        description: '启用或禁用音效',
        enabled: '声音已启用',
        disabled: '声音已禁用',
        enableDescription: '点击启用音效',
        disableDescription: '点击禁用音效',
      },
      voiceControl: {
        title: '语音控制',
        description: '启用或禁用语音控制',
        enabled: '语音控制已启用',
        disabled: '语音控制已禁用',
        enableDescription: '点击启用语音控制',
        disableDescription: '点击禁用语音控制',
        denied: '麦克风访问被拒绝。请检查浏览器设置。',
      },
      theme: {
        title: '主题',
        description: '选择您喜欢的颜色主题',
      },
      language: {
        title: '语言',
        description: '选择您的语言',
      },
      keyboardShortcuts: {
        title: '键盘快捷键',
        navigation: '导航',
        algorithmControl: '算法控制',
        speedControl: '速度控制',
        arrayManipulation: '数组操作',
        modalsOverlays: '模态框和覆盖层',
        cycleFocus: '循环焦点',
        navigatePanels: '导航面板/步骤',
        playPause: '播放/暂停动画',
        resetArray: '重置数组',
        increaseSpeed: '提高速度',
        decreaseSpeed: '降低速度',
        newArray: '新数组',
        shuffleArray: '打乱数组',
        showShortcutHelp: '显示/隐藏快捷键帮助',
        toggleChatAssistant: '切换聊天助手',
        toggleFeedbackForm: '切换反馈表单',
        toggleSettingsPanel: '切换设置面板',
        showHelp: '显示此帮助',
      },
    },
    // Main page
    main: {
      subtitle: '流行排序算法的交互式可视化',
      algorithmVisualization: '可视化',
      sortingAlgorithmVisualizer: '排序算法可视化器',
      builtWith: '使用',
      by: 'by',
      contributors: '贡献者',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: '赞助',
      buyMeACoffee: '请我喝咖啡',
      twitter: 'Twitter',
      sponsorModal: {
        title: '支持 SortVision',
        subtitle: '选择帮助方式',
        devLabel: '// 来自开发者',
        openerIntroPrefix: '嘿 👋 我是 ',
        openerIntroSuffix: ' — 我创建了 SortVision，',
        openerContributorsKnown: '{count} 位贡献者一起构建了它。',
        openerContributorsUnknown: '一个很棒的社区一起构建了它。',
        openerOutro: ' 全部免费，全部开源。',
        honestLine1:
          '无广告、无付费墙、无需登录。但维持网站在线 — 域名和工具 — ',
        honestLine1Emphasis: '不是免费的。',
        honestLine2:
          '如果 SortVision 帮你理解了算法，一点赞助会让我知道 ',
        honestLine2Emphasis: '值得继续维护下去。',
        statStars: '{count} 颗星',
        statContributors: '{count} 位贡献者',
        statContributorsPending: '贡献者…',
        statStarsPending: '星星…',
        statFree: '100% 免费',
        statStarsCaption: '星标',
        statContributorsCaption: '贡献者',
        statForksCaption: '复刻',
        statIssuesCaption: '开放议题',
        statUpdatedCaption: '最近更新',
        statFreeCaption: '免费开源',
        starRepoCta: '或者给仓库点个星 — 免费且帮助很大',
        supportLine: '您的支持让 SortVision 继续免费服务学习者',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: '算法可视化器',
      },
      tabs: {
        config: '配置',
        metrics: '指标',
        details: '详情',
        overview: '概览',
        guide: '指南',
      },
      controls: {
        selectAlgorithm: '选择算法',
        algorithm: '算法',
        arraySize: '数组大小',
        animationDelay: '动画延迟',
        elements: '元素',
        delay: '延迟',
        newArray: 'new_array()',
        start: 'start()',
        stop: 'stop()',
        mergeSort: 'merge_sort()',
        ready: '就绪',
        small: '小',
        medium: '中',
        large: '大',
        fast: '快',
        slow: '慢',
        goodForLearning: '适合学习',
        balanced: '平衡',
        performanceTest: '性能测试',
        visualizePatterns: '可视化模式',
        elementsCount: '元素',
      },
      complexity: {
        efficiencyRating: '效率评级',
        timeComplexity: '时间复杂度',
        spaceComplexity: '空间复杂度',
        bestCase: '最佳情况',
        average: '平均',
        worstCase: '最坏情况',
        high: '高',
        algorithmComplexity: '算法复杂度',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          '简单的基于比较的算法，反复遍历列表，比较相邻元素，如果顺序错误则交换它们。',
      },
      insertion: {
        description:
          '通过将每个新元素与已排序的元素进行比较并将其插入正确位置，一次构建一个排序数组。',
      },
      selection: {
        description:
          '反复从未排序部分找到最小元素，并将其放在未排序部分的开头。',
      },
      quick: {
        description:
          '分治算法，选择一个"枢轴"元素并围绕枢轴对数组进行分区，递归排序子数组。',
      },
      merge: {
        description:
          '分治算法，将数组分成两半，分别排序，然后合并排序后的两半。',
      },
      radix: {
        description:
          '非比较排序算法，通过按共享相同位置和值的单个数字对键进行分组，对具有整数键的数据进行排序。',
      },
      heap: {
        description:
          '基于比较的排序算法，使用二叉堆数据结构对元素进行排序。它构建最大堆并反复提取最大元素。',
      },
      bucket: {
        description:
          '分布排序，通过将元素分配到多个桶中，分别对每个桶进行排序，然后连接桶。',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: '当前运行指标',
      swaps: '交换次数',
      memoryOperations: '内存操作',
      comparisons: '比较次数',
      cpuOperations: 'CPU操作',
      timeMs: '时间（毫秒）',
      executionDuration: '执行持续时间',
      swapRatio: '交换比率',
      swapsComp: '交换/比较',
      timeElement: '时间/元素',
      msElem: '毫秒/元素',
      opsMs: '操作/毫秒',
      opsMsUnit: '操作/毫秒',
      score: '分数',
      points: '分',
      performanceBreakdown: '性能分解',
      time: '时间',
      potentialImprovement: '潜在改进：',
      algorithmComparison: '算法比较',
      testingAlgorithm: '测试算法',
      runningTests: '运行测试...',
      noComparisonData: '没有可用的比较数据',
      runTestAll: '运行 test_all() 以比较算法性能',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: '询问排序相关问题',
    },
    // Details page
    details: {
      basicSorts: '基础排序',
      efficientSorts: '高效排序',
      specialSorts: '特殊排序',
      algorithmDetails: '{algorithm}_sort() 详情',
      algorithmImplementation: '{algorithm} 实现',
      loadingImplementation: '加载 {algorithm} 实现',
      relatedAlgorithms: '相关算法',
      historicalContext: '历史背景',
      inventedBy: '发明者',
      year: '年份',
      proTip: '专业提示',
      funFact: '有趣事实',
      tips: {
        bubble: '尝试增加数组大小，看看冒泡排序的性能如何二次下降！',
        insertion: '观察插入排序在几乎已排序的数组上表现如何出色。',
        selection: '注意选择排序无论初始顺序如何总是花费相同的时间。',
        quick: '观察枢轴选择如何影响分区过程。',
        merge: '看看归并排序如何递归地将数组分成更小的子数组。',
        radix: '观察基数排序如何独立处理每个数字位置！',
        heap: '注意堆排序如何构建二叉堆并反复提取最大元素！',
        bucket: '观察桶排序如何将元素分配到桶中并分别排序！',
      },
      facts: {
        bubble: '冒泡排序因其较小的元素通过交换"冒泡"到列表顶部的方式而得名。',
        insertion: '插入排序类似于许多人如何整理手中的扑克牌。',
        selection: '选择排序进行最少的交换次数（最坏情况下为 n-1）。',
        quick:
          '快速排序由 Tony Hoare 于 1959 年开发，当时他是莫斯科国立大学的交换生。',
        merge:
          '归并排序由 John von Neumann 于 1945 年发明，是最早描述的分治算法之一。',
        radix: '基数排序早于现代计算机，在 20 世纪初与打孔卡排序机一起使用。',
        heap: '堆排序由 J. W. J. Williams 于 1964 年发明，是许多优先队列实现的基础。',
        bucket: '当输入在范围内均匀分布时，桶排序特别高效。',
      },
    },
    // SEO
    seo: {
      title: 'SortVision - 交互式排序算法可视化器',
      description:
        '包括冒泡排序、归并排序、快速排序等的排序算法交互式可视化。通过实时性能指标和教育内容学习数据结构和算法。',
      keywords:
        '排序算法可视化器, DSA学习, 数据结构算法, 编程面试准备, 归并排序, 快速排序, 堆排序, 冒泡排序, 计算机科学教育, 算法动画, 交互式学习, 编程教程, 软件工程',
      algorithmTitle: '{algorithm} 排序可视化器 - SortVision',
      algorithmDescription:
        '使用 SortVision 的交互式可视化器掌握 {algorithm} 排序算法。逐步动画、性能分析和全面的 DSA 学习，用于编程面试。',
      ogTitle: 'SortVision - 用于 DSA 学习的交互式排序算法可视化器',
      ogDescription:
        '通过交互式可视化掌握排序算法。非常适合编程面试、计算机科学教育和 DSA 学习。',
      twitterTitle: 'SortVision - 交互式排序算法可视化器',
      twitterDescription:
        '通过逐步可视化学习排序算法。编程面试和计算机科学教育的必备工具。',
    },
    // Contributions
    contributions: {
      stats: {
        contributors: '贡献者',
        amazingDevelopers: '优秀的开发者',
        totalCommits: '总提交数',
        linesOfImpact: '影响行数',
        githubStars: 'GitHub 星标',
        communityLove: '社区喜爱',
        forks: '分叉',
        projectCopies: '项目副本',
        contributorMetrics: '贡献者指标',
      },
      list: {
        filterByType: '按类型筛选',
        allContributors: '所有贡献者',
        searchContributors: '搜索贡献者',
        typeUsername: '输入用户名...',
        contributorsFound: '找到贡献者',
        noContributorsFound: '未找到贡献者',
        loadingContributors: '加载贡献者...',
        projectAdmins: '项目管理员',
        community: '社区',
        bots: '机器人',
        admin: '管理员',
        communityBadge: '社区',
        bot: '机器人',
        commits: '提交',
        developer: '开发者',
        profile: '个人资料',
        details: '详情',
        contributions: '贡献',
      },
      health: {
        issues: '问题',
        open: '打开',
        closed: '关闭',
        recent: '最近',
        pullRequests: '拉取请求',
        merged: '已合并',
        repository: '仓库',
        size: '大小',
        language: '语言',
        stars: '星标',
      },
      contributorDetail: {
        loading: '加载贡献者数据...',
        progress: '进度',
        profileDetails: '个人资料详情',
        publicRepos: '公开仓库',
        followers: '关注者',
        following: '正在关注',
        repoCommits: '仓库提交',
        pullRequests: '拉取请求',
        issues: '问题',
        linesAdded: '添加的行',
        linesDeleted: '删除的行',
        total: '总计',
        merged: '已合并',
        open: '打开',
        closed: '关闭',
        totalInsertions: '总插入数（完整历史）',
        totalInsertionsPartial: '总插入数（部分数据 - 缓存统计不可用）',
        totalDeletions: '总删除数（完整历史）',
        totalDeletionsPartial: '总删除数（部分数据 - 缓存统计不可用）',
        noPullRequests: '未找到拉取请求',
        noIssues: '未找到问题',
        noCommits: '未找到提交',
        updated: '更新',
        files: '文件',
        modifiedFiles: '修改的文件',
        andMore: '还有 {count} 个文件',
        commit: '提交',
      },
      guide: {
        contributionGuide: '贡献指南',
        phase: '阶段',
        gettingStarted: '开始',
        development: '开发',
        submission: '提交',
        forkRepository: '分叉仓库',
        createCopy: '创建您自己的 SortVision 副本',
        setupEnvironment: '设置开发环境',
        installDependencies: '安装依赖并在本地运行',
        createBranch: '创建功能分支',
        createNewBranch: '为您的更改创建新分支',
        makeChanges: '进行更改',
        implementFeature: '实现您的功能或修复',
        commitPush: '提交和推送',
        commitChanges: '使用清晰的消息提交您的更改',
        createPR: '创建拉取请求',
        submitChanges: '提交您的更改以供审查',
        previous: '← 上一页',
        nextPhase: '下一页 →',
        phaseComplete: '阶段 {phase} 完成！',
        greatWork: '干得好！您已完成此阶段的所有步骤。',
        continueTo: '继续到 {phase} →',
        bestPractices: '最佳实践',
        codeQuality: '代码质量',
        codeQualityDesc: '清洁、可读和可维护的代码实践',
        reactPractices: 'React 最佳实践',
        reactPracticesDesc: '现代 React 模式和钩子使用',
        performanceTips: '性能提示',
        performanceTipsDesc: '优化技术以提高应用性能',
        quickGuidelines: '📋 快速指南',
        followPatterns: '• 遵循现有模式',
        clearCommits: '• 编写清晰的提交消息',
        testChanges: '• 测试您的更改',
        keepFocused: '• 保持组件专注',
        do: '做：',
        dont: '不做：',
        useDescriptiveNames: '使用描述性变量名',
        keepFunctionsSmall: '保持函数小而专注',
        avoidMagicNumbers: '避免魔法数字',
        useFunctionalComponents: '使用带钩子的函数组件',
        includeDependencies: '包含正确的 useEffect 依赖项',
        avoidInlineStyles: '避免内联样式，使用 Tailwind 类',
        memoizeCalculations: '记忆化昂贵的计算',
        useCallback: '对事件处理程序使用 useCallback',
        importSpecific: '不需要时不要导入整个库',
        quickReferences: '快速参考',
        contributionGuidelines: '贡献指南',
        detailedRules: '详细的贡献规则',
        githubIssues: 'GitHub 问题',
        findIssues: '查找要处理的问题',
        codeOfConduct: '行为准则',
        communityGuidelines: '社区指南',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: '发送反馈',
      title: '用户反馈',
      description: '我们很乐意收到您的反馈以改进 SortVision！',
      description2: '如果您遇到错误、有建议或只是想分享您的想法，请告诉我们。',
      processing: '正在安全处理您的反馈...',
      name: '姓名',
      email: '邮箱（可选）',
      feedbackType: '反馈类型',
      detailedFeedback: '详细反馈',
      rating: '评分',
      region: '地区',
      submit: '提交反馈',
      submitting: '提交中...',
      success: '反馈提交成功！',
      error: '提交反馈失败。请重试。',
      types: {
        bug: '错误报告',
        feature: '功能请求',
        suggestion: '建议',
        general: '一般反馈',
        performance: '性能问题',
        ui: 'UI/UX 问题',
      },
      ratings: {
        poor: '差',
        fair: '一般',
        good: '好',
        veryGood: '很好',
        excellent: '优秀',
      },
      language: '语言',
      selectLanguage: '选择语言',
    },
    // Common
    common: {
      close: '关闭',
      settings: '设置',
      select: '选择',
      enabled: '已启用',
      disabled: '已禁用',
    },
  },
  ja: {
    // Settings Modal
    settings: {
      title: 'ソート設定',
      description: 'ビジュアライゼーション設定をカスタマイズ',
      description2: 'サウンド、テーマ、言語設定を調整して体験を向上',
      sound: {
        title: 'サウンド',
        description: 'サウンドエフェクトを有効/無効にする',
        enabled: 'サウンド有効',
        disabled: 'サウンド無効',
        enableDescription: 'クリックしてサウンドエフェクトを有効にする',
        disableDescription: 'クリックしてサウンドエフェクトを無効にする',
      },
      voiceControl: {
        title: '音声制御',
        description: '音声制御を有効/無効にする',
        enabled: '音声制御有効',
        disabled: '音声制御無効',
        enableDescription: 'クリックして音声制御を有効にする',
        disableDescription: 'クリックして音声制御を無効にする',
        denied:
          'マイクアクセスが拒否されました。ブラウザ設定を確認してください。',
      },
      theme: {
        title: 'テーマ',
        description: 'お好みのカラーテーマを選択',
      },
      language: {
        title: '言語',
        description: '言語を選択',
      },
      keyboardShortcuts: {
        title: 'キーボードショートカット',
        navigation: 'ナビゲーション',
        algorithmControl: 'アルゴリズム制御',
        speedControl: '速度制御',
        arrayManipulation: '配列操作',
        modalsOverlays: 'モーダルとオーバーレイ',
        cycleFocus: 'フォーカスを循環',
        navigatePanels: 'パネル/ステップをナビゲート',
        playPause: 'アニメーション再生/一時停止',
        resetArray: '配列をリセット',
        increaseSpeed: '速度を上げる',
        decreaseSpeed: '速度を下げる',
        newArray: '新しい配列',
        shuffleArray: '配列をシャッフル',
        showShortcutHelp: 'ショートカットヘルプを表示/非表示',
        toggleChatAssistant: 'チャットアシスタントを切り替え',
        toggleFeedbackForm: 'フィードバックフォームを切り替え',
        toggleSettingsPanel: '設定パネルを切り替え',
        showHelp: 'このヘルプを表示',
      },
    },
    // Main page
    main: {
      subtitle:
        '人気のソートアルゴリズムのインタラクティブビジュアライゼーション',
      algorithmVisualization: 'ビジュアライゼーション',
      sortingAlgorithmVisualizer: 'ソートアルゴリズムビジュアライザー',
      builtWith: 'で作成',
      by: 'by',
      contributors: '貢献者',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'スポンサー',
      buyMeACoffee: 'コーヒーをおごってください',
      twitter: 'Twitter',
      sponsorModal: {
        title: 'SortVision を支援',
        subtitle: '支援の方法を選ぶ',
        devLabel: '// 開発者より',
        openerIntroPrefix: 'やあ 👋 ',
        openerIntroSuffix: ' です — SortVision を作り、',
        openerContributorsKnown:
          '{count} 人の素晴らしいコントリビューターが一緒に作りました。',
        openerContributorsUnknown:
          '素晴らしいコミュニティが一緒に作りました。',
        openerOutro: ' すべて無料、すべてオープンソース。',
        honestLine1:
          '広告なし、ペイウォールなし、ログイン不要。でもサイトを維持する — ドメインやツール — ',
        honestLine1Emphasis: '無料ではありません。',
        honestLine2:
          'SortVision がアルゴリズム理解の助けになったなら、小さなスポンサーが ',
        honestLine2Emphasis: '続ける価値があると伝えてくれます。',
        statStars: 'スター {count}',
        statContributors: 'コントリビューター {count}',
        statContributorsPending: 'コントリビューター…',
        statStarsPending: 'スター…',
        statFree: '100% 無料',
        statStarsCaption: 'スター',
        statContributorsCaption: 'コントリビューター',
        statForksCaption: 'フォーク',
        statIssuesCaption: 'オープン issue',
        statUpdatedCaption: '最終更新',
        statFreeCaption: '無料・オープン',
        starRepoCta:
          'またはリポジトリにスターを — 無料でとても助かります',
        supportLine: 'あなたの支援が SortVision を学習者に無料で届け続けます',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'アルゴリズムビジュアライザー',
      },
      tabs: {
        config: '設定',
        metrics: 'メトリクス',
        details: '詳細',
        overview: '概要',
        guide: 'ガイド',
      },
      controls: {
        selectAlgorithm: 'アルゴリズムを選択',
        algorithm: 'アルゴリズム',
        arraySize: '配列サイズ',
        animationDelay: 'アニメーション遅延',
        elements: '要素',
        delay: '遅延',
        newArray: 'new_array()',
        start: 'start()',
        stop: 'stop()',
        mergeSort: 'merge_sort()',
        ready: '準備完了',
        small: '小',
        medium: '中',
        large: '大',
        fast: '高速',
        slow: '低速',
        goodForLearning: '学習に適している',
        balanced: 'バランス',
        performanceTest: 'パフォーマンステスト',
        visualizePatterns: 'パターンをビジュアライズ',
        elementsCount: '要素',
      },
      complexity: {
        efficiencyRating: '効率評価',
        timeComplexity: '時間計算量',
        spaceComplexity: '空間計算量',
        bestCase: '最良ケース',
        average: '平均',
        worstCase: '最悪ケース',
        high: '高',
        algorithmComplexity: 'アルゴリズム複雑度',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          '隣接する要素を比較し、間違った順序の場合は交換する、シンプルな比較ベースのアルゴリズムです。',
      },
      insertion: {
        description:
          '一度に一つの要素を取り、既にソートされた部分と比較して正しい位置に挿入することで、ソートされた配列を構築します。',
      },
      selection: {
        description:
          '未ソート部分から最小要素を繰り返し見つけ、未ソート部分の先頭に配置するソートアルゴリズムです。',
      },
      quick: {
        description:
          'ピボット要素を選んで配列を分割し、各部分を個別にソートする効率的なソートアルゴリズムです。',
      },
      merge: {
        description:
          '配列を二つの部分に分割し、各部分を個別にソートしてから、ソートされた部分をマージする効率的なアルゴリズムです。',
      },
      radix: {
        description:
          '数値を桁ごとに処理してソートする特殊なソートアルゴリズムで、一度に一つの桁の位置を見ます。',
      },
      heap: {
        description:
          '要素をソートするために特別な木のようなデータ構造を使用するソートアルゴリズムです。',
      },
      bucket: {
        description:
          '要素を異なるバケットに分割し、各バケットを個別にソートしてから、すべてのバケットを結合するソートアルゴリズムです。',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: '現在の実行メトリクス',
      swaps: 'スワップ',
      memoryOperations: 'メモリ操作',
      comparisons: '比較',
      cpuOperations: 'CPU操作',
      timeMs: '時間（ミリ秒）',
      executionDuration: '実行時間',
      swapRatio: 'スワップ比率',
      swapsComp: 'スワップ/比較',
      timeElement: '時間/要素',
      msElem: 'ms/要素',
      opsMs: '操作/ms',
      opsMsUnit: 'ops/ms',
      score: 'スコア',
      points: 'ポイント',
      performanceBreakdown: 'パフォーマンス内訳',
      time: '時間',
      potentialImprovement: '潜在的な改善:',
      algorithmComparison: 'アルゴリズム比較',
      testingAlgorithm: 'アルゴリズムをテスト中',
      runningTests: 'テスト実行中...',
      noComparisonData: '比較データなし',
      runTestAll: 'アルゴリズムパフォーマンスを比較するためにtest_all()を実行',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'ソートについて質問',
    },
    // Details page
    details: {
      basicSorts: '基本ソート',
      efficientSorts: '効率的ソート',
      specialSorts: '特殊ソート',
      algorithmDetails: '{algorithm}_sort() 詳細',
      algorithmImplementation: '{algorithm} 実装',
      loadingImplementation: '{algorithm} 実装を読み込み中',
      relatedAlgorithms: '関連アルゴリズム',
      historicalContext: '歴史的コンテキスト',
      inventedBy: '発明者',
      year: '年',
      proTip: 'プロのヒント',
      funFact: '面白い事実',
      tips: {
        bubble:
          '配列サイズを増やしてバブルソートの性能が二次的に悪化する様子を見てみてください！',
        insertion:
          '挿入ソートがほぼソートされた配列で例外的に良い性能を発揮する様子を観察してください。',
        selection:
          '選択ソートが初期順序に関係なく常に同じ時間を要する様子に注目してください。',
        quick: 'ピボット選択が分割プロセスに与える影響を観察してください。',
        merge:
          'マージソートが配列を再帰的に小さなサブ配列に分割する様子を見てください。',
        radix:
          '基数ソートが各桁の位置を独立して処理する様子を観察してください！',
        heap: 'ヒープソートがバイナリヒープを構築し、最大要素を繰り返し抽出する様子に注目してください！',
        bucket:
          'バケットソートが要素をバケットに分配し、個別にソートする様子を観察してください！',
      },
      facts: {
        bubble:
          'バブルソートは、小さな要素が交換を通じてリストの上部に「泡立つ」様子から名付けられました。',
        insertion:
          '挿入ソートは、多くの人が手札でトランプをソートする方法に似ています。',
        selection:
          '選択ソートは可能な最小数のスワップを行います（最悪の場合n-1）。',
        quick:
          'クイックソートは1959年にトニー・ホアによって開発されました。彼はモスクワ国立大学の交換留学生でした。',
        merge:
          'マージソートは1945年にジョン・フォン・ノイマンによって発明され、最初に記述された分割統治アルゴリズムの一つです。',
        radix:
          '基数ソートは現代のコンピュータ以前の時代に遡り、20世紀初頭のパンチカードソート機で使用されていました。',
        heap: 'ヒープソートは1964年にJ. W. J. ウィリアムスによって発明され、多くの優先度付きキュー実装の基礎となっています。',
        bucket:
          'バケットソートは、入力が範囲にわたって均等に分布している場合に特に効率的です。',
      },
    },
    // SEO
    seo: {
      title: 'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      description:
        'バブルソート、マージソート、クイックソートなどを含むソートアルゴリズムのインタラクティブビジュアライゼーション。リアルタイムパフォーマンスメトリクスと教育コンテンツでデータ構造とアルゴリズムを学習。',
      keywords:
        'ソートアルゴリズムビジュアライザー, DSA学習, データ構造アルゴリズム, コーディング面接準備, マージソート, クイックソート, ヒープソート, バブルソート, コンピュータサイエンス教育, アルゴリズムアニメーション, インタラクティブ学習, プログラミングチュートリアル, ソフトウェアエンジニアリング',
      algorithmTitle: '{algorithm} ソートビジュアライザー - SortVision',
      algorithmDescription:
        'SortVisionのインタラクティブビジュアライザーで{algorithm}ソートアルゴリズムをマスター。ステップバイステップアニメーション、パフォーマンス分析、コーディング面接のための包括的なDSA学習。',
      ogTitle:
        'SortVision - DSA学習のためのインタラクティブソートアルゴリズムビジュアライザー',
      ogDescription:
        'インタラクティブビジュアライゼーションでソートアルゴリズムをマスター。コーディング面接、コンピュータサイエンス教育、DSA学習に最適。',
      twitterTitle:
        'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      twitterDescription:
        'ステップバイステップビジュアライゼーションでソートアルゴリズムを学習。コーディング面接とコンピュータサイエンス教育に必須。',
    },
    // Contributions
    contributions: {
      stats: {
        contributors: '貢献者',
        amazingDevelopers: '素晴らしい開発者',
        totalCommits: '総コミット数',
        linesOfImpact: '影響行数',
        githubStars: 'GitHubスター',
        communityLove: 'コミュニティの愛',
        forks: 'フォーク',
        projectCopies: 'プロジェクトコピー',
        contributorMetrics: '貢献者メトリクス',
      },
      list: {
        filterByType: 'タイプでフィルター',
        allContributors: 'すべての貢献者',
        searchContributors: '貢献者を検索',
        typeUsername: 'ユーザー名を入力...',
        contributorsFound: '貢献者が見つかりました',
        noContributorsFound: '貢献者が見つかりません',
        loadingContributors: '貢献者を読み込み中...',
        projectAdmins: 'プロジェクト管理者',
        community: 'コミュニティ',
        bots: 'ボット',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'コミット',
        developer: '開発者',
        profile: 'プロフィール',
        details: '詳細',
        contributions: '貢献',
      },
      health: {
        issues: 'イシュー',
        open: 'オープン',
        closed: 'クローズ',
        recent: '最近',
        pullRequests: 'Pull Requests',
        merged: 'マージ済み',
        repository: 'リポジトリ',
        size: 'サイズ',
        language: '言語',
        stars: 'スター',
      },
      contributorDetail: {
        loading: '貢献者データを読み込み中...',
        progress: '進捗',
        profileDetails: 'プロフィール詳細',
        publicRepos: 'パブリックリポ',
        followers: 'フォロワー',
        following: 'フォロー中',
        repoCommits: 'リポコミット',
        pullRequests: 'Pull Requests',
        issues: 'イシュー',
        linesAdded: '追加された行',
        linesDeleted: '削除された行',
        total: '合計',
        merged: 'マージ済み',
        open: 'オープン',
        closed: 'クローズ',
        totalInsertions: '総挿入（完全履歴）',
        totalInsertionsPartial:
          '総挿入（部分データ - キャッシュされた統計は利用不可）',
        totalDeletions: '総削除（完全履歴）',
        totalDeletionsPartial:
          '総削除（部分データ - キャッシュされた統計は利用不可）',
        noPullRequests: 'Pull Requestが見つかりません',
        noIssues: 'イシューが見つかりません',
        noCommits: 'コミットが見つかりません',
        updated: '更新済み',
        files: 'ファイル',
        modifiedFiles: '変更されたファイル',
        andMore: 'と{count}個の追加ファイル',
        commit: 'コミット',
      },
      guide: {
        contributionGuide: '貢献ガイド',
        phase: 'フェーズ',
        gettingStarted: '開始',
        development: '開発',
        submission: '提出',
        forkRepository: 'リポジトリをフォーク',
        createCopy: 'SortVisionの独自コピーを作成',
        setupEnvironment: '開発環境をセットアップ',
        installDependencies: '依存関係をインストールしてローカルで実行',
        createBranch: '機能ブランチを作成',
        createNewBranch: '変更用の新しいブランチを作成',
        makeChanges: '変更を行う',
        implementFeature: '機能や修正を実装',
        commitPush: 'コミット＆プッシュ',
        commitChanges: '明確なメッセージで変更をコミット',
        createPR: 'Pull Requestを作成',
        submitChanges: 'レビューのために変更を提出',
        previous: '← 前へ',
        nextPhase: '次のフェーズ →',
        phaseComplete: 'フェーズ{phase}完了！',
        greatWork:
          '素晴らしい作業です！このフェーズのすべてのステップを完了しました。',
        continueTo: '{phase}に続行 →',
        bestPractices: 'ベストプラクティス',
        codeQuality: 'コード品質',
        codeQualityDesc: 'クリーンで読みやすく保守可能なコードプラクティス',
        reactPractices: 'Reactベストプラクティス',
        reactPracticesDesc: 'モダンなReactパターンとフックの使用',
        performanceTips: 'パフォーマンスのヒント',
        performanceTipsDesc:
          'より良いアプリパフォーマンスのための最適化テクニック',
        quickGuidelines: '📋 クイックガイドライン',
        followPatterns: '• 既存のパターンに従う',
        clearCommits: '• 明確なコミットメッセージを書く',
        testChanges: '• 変更をテストする',
        keepFocused: '• コンポーネントを集中させる',
        do: 'やるべきこと:',
        dont: 'やってはいけないこと:',
        useDescriptiveNames: '説明的な変数名を使用',
        keepFunctionsSmall: '関数を小さく集中させる',
        avoidMagicNumbers: 'マジックナンバーを避ける',
        useFunctionalComponents: 'フック付きの関数コンポーネントを使用',
        includeDependencies: '正しいuseEffect依存関係を含める',
        avoidInlineStyles: 'インラインスタイルを避け、Tailwindクラスを使用',
        memoizeCalculations: '高価な計算をメモ化',
        useCallback: 'イベントハンドラーのためにuseCallbackを使用',
        importSpecific: '必要でない場合はライブラリ全体をインポートしない',
        quickReferences: 'クイックリファレンス',
        contributionGuidelines: '貢献ガイドライン',
        detailedRules: '詳細な貢献ルール',
        githubIssues: 'GitHubイシュー',
        findIssues: '作業するイシューを見つける',
        codeOfConduct: '行動規範',
        communityGuidelines: 'コミュニティガイドライン',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'フィードバックを送信',
      title: 'ユーザーフィードバック',
      description:
        'SortVisionを改善するためにあなたのフィードバックをお待ちしています！',
      description2:
        'バグを見つけた、提案がある、または単にあなたの考えを共有したい場合は、お知らせください。',
      processing: 'あなたのフィードバックを安全に処理しています...',
      name: '名前',
      email: 'メール（任意）',
      feedbackType: 'フィードバックタイプ',
      detailedFeedback: '詳細フィードバック',
      rating: '評価',
      region: '地域',
      submit: 'フィードバック送信',
      submitting: '送信中...',
      success: 'フィードバックが正常に送信されました！',
      error: 'フィードバックの送信に失敗しました。再試行してください。',
      types: {
        bug: 'バグレポート',
        feature: '機能リクエスト',
        suggestion: '提案',
        general: '一般的なフィードバック',
        performance: 'パフォーマンス問題',
        ui: 'UI/UX問題',
      },
      ratings: {
        poor: '悪い',
        fair: '普通',
        good: '良い',
        veryGood: 'とても良い',
        excellent: '優秀',
      },
      language: '言語',
      selectLanguage: '言語を選択',
    },
    // Common
    common: {
      close: '閉じる',
      settings: '設定',
      select: '選択',
      enabled: '有効',
      disabled: '無効',
    },
  },
  jp: {
    // Settings Modal
    settings: {
      title: 'ソート設定',
      description: 'ビジュアライゼーション設定をカスタマイズ',
      description2: 'サウンド、テーマ、言語設定を調整して体験を向上',
      sound: {
        title: 'サウンド',
        description: 'サウンドエフェクトを有効/無効にする',
        enabled: 'サウンド有効',
        disabled: 'サウンド無効',
        enableDescription: 'クリックしてサウンドエフェクトを有効にする',
        disableDescription: 'クリックしてサウンドエフェクトを無効にする',
      },
      voiceControl: {
        title: '音声制御',
        description: '音声制御を有効/無効にする',
        enabled: '音声制御有効',
        disabled: '音声制御無効',
        enableDescription: 'クリックして音声制御を有効にする',
        disableDescription: 'クリックして音声制御を無効にする',
        denied:
          'マイクアクセスが拒否されました。ブラウザ設定を確認してください。',
      },
      theme: {
        title: 'テーマ',
        description: 'お好みのカラーテーマを選択',
      },
      language: {
        title: '言語',
        description: '言語を選択',
      },
      keyboardShortcuts: {
        title: 'キーボードショートカット',
        navigation: 'ナビゲーション',
        algorithmControl: 'アルゴリズム制御',
        speedControl: '速度制御',
        arrayManipulation: '配列操作',
        modalsOverlays: 'モーダルとオーバーレイ',
        cycleFocus: 'フォーカスを循環',
        navigatePanels: 'パネル/ステップをナビゲート',
        playPause: 'アニメーション再生/一時停止',
        resetArray: '配列をリセット',
        increaseSpeed: '速度を上げる',
        decreaseSpeed: '速度を下げる',
        newArray: '新しい配列',
        shuffleArray: '配列をシャッフル',
        showShortcutHelp: 'ショートカットヘルプを表示/非表示',
        toggleChatAssistant: 'チャットアシスタントを切り替え',
        toggleFeedbackForm: 'フィードバックフォームを切り替え',
        toggleSettingsPanel: '設定パネルを切り替え',
        showHelp: 'このヘルプを表示',
      },
    },
    // Main page
    main: {
      subtitle:
        '人気のソートアルゴリズムのインタラクティブビジュアライゼーション',
      algorithmVisualization: 'ビジュアライゼーション',
      sortingAlgorithmVisualizer: 'ソートアルゴリズムビジュアライザー',
      builtWith: 'で作成',
      by: 'by',
      contributors: '貢献者',
      sortVision: 'SortVision',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      sponsor: 'スポンサー',
      buyMeACoffee: 'コーヒーをおごってください',
      twitter: 'Twitter',
      sponsorModal: {
        title: 'SortVision を支援',
        subtitle: '支援の方法を選ぶ',
        devLabel: '// 開発者より',
        openerIntroPrefix: 'やあ 👋 ',
        openerIntroSuffix: ' です — SortVision を作り、',
        openerContributorsKnown:
          '{count} 人の素晴らしいコントリビューターが一緒に作りました。',
        openerContributorsUnknown:
          '素晴らしいコミュニティが一緒に作りました。',
        openerOutro: ' すべて無料、すべてオープンソース。',
        honestLine1:
          '広告なし、ペイウォールなし、ログイン不要。でもサイトを維持する — ドメインやツール — ',
        honestLine1Emphasis: '無料ではありません。',
        honestLine2:
          'SortVision がアルゴリズム理解の助けになったなら、小さなスポンサーが ',
        honestLine2Emphasis: '続ける価値があると伝えてくれます。',
        statStars: 'スター {count}',
        statContributors: 'コントリビューター {count}',
        statContributorsPending: 'コントリビューター…',
        statStarsPending: 'スター…',
        statFree: '100% 無料',
        statStarsCaption: 'スター',
        statContributorsCaption: 'コントリビューター',
        statForksCaption: 'フォーク',
        statIssuesCaption: 'オープン issue',
        statUpdatedCaption: '最終更新',
        statFreeCaption: '無料・オープン',
        starRepoCta:
          'またはリポジトリにスターを — 無料でとても助かります',
        supportLine: 'あなたの支援が SortVision を学習者に無料で届け続けます',
      },
    },
    // Sorting Visualizer
    visualizer: {
      header: {
        title: 'sort()',
        subtitle: 'アルゴリズムビジュアライザー',
      },
      tabs: {
        config: '設定',
        metrics: 'メトリクス',
        details: '詳細',
        overview: '概要',
        guide: 'ガイド',
      },
      controls: {
        selectAlgorithm: 'アルゴリズムを選択',
        algorithm: 'アルゴリズム',
        arraySize: '配列サイズ',
        animationDelay: 'アニメーション遅延',
        elements: '要素',
        delay: '遅延',
        newArray: 'new_array()',
        start: 'start()',
        stop: 'stop()',
        mergeSort: 'merge_sort()',
        ready: '準備完了',
        small: '小',
        medium: '中',
        large: '大',
        fast: '高速',
        slow: '低速',
        goodForLearning: '学習に適している',
        balanced: 'バランス',
        performanceTest: 'パフォーマンステスト',
        visualizePatterns: 'パターンをビジュアライズ',
        elementsCount: '要素',
      },
      complexity: {
        efficiencyRating: '効率評価',
        timeComplexity: '時間計算量',
        spaceComplexity: '空間計算量',
        bestCase: '最良ケース',
        average: '平均',
        worstCase: '最悪ケース',
        high: '高',
        algorithmComplexity: 'アルゴリズム複雑度',
      },
    },
    // Algorithm descriptions
    algorithms: {
      bubble: {
        description:
          '隣接する要素を比較し、間違った順序の場合は交換する、シンプルな比較ベースのアルゴリズムです。',
      },
      insertion: {
        description:
          '一度に一つの要素を取り、既にソートされた部分と比較して正しい位置に挿入することで、ソートされた配列を構築します。',
      },
      selection: {
        description:
          '未ソート部分から最小要素を繰り返し見つけ、未ソート部分の先頭に配置するソートアルゴリズムです。',
      },
      quick: {
        description:
          'ピボット要素を選んで配列を分割し、各部分を個別にソートする効率的なソートアルゴリズムです。',
      },
      merge: {
        description:
          '配列を二つの部分に分割し、各部分を個別にソートしてから、ソートされた部分をマージする効率的なアルゴリズムです。',
      },
      radix: {
        description:
          '数値を桁ごとに処理してソートする特殊なソートアルゴリズムで、一度に一つの桁の位置を見ます。',
      },
      heap: {
        description:
          '要素をソートするために特別な木のようなデータ構造を使用するソートアルゴリズムです。',
      },
      bucket: {
        description:
          '要素を異なるバケットに分割し、各バケットを個別にソートしてから、すべてのバケットを結合するソートアルゴリズムです。',
      },
    },
    // Metrics
    metrics: {
      currentRunMetrics: '現在の実行メトリクス',
      swaps: 'スワップ',
      memoryOperations: 'メモリ操作',
      comparisons: '比較',
      cpuOperations: 'CPU操作',
      timeMs: '時間（ミリ秒）',
      executionDuration: '実行時間',
      swapRatio: 'スワップ比率',
      swapsComp: 'スワップ/比較',
      timeElement: '時間/要素',
      msElem: 'ms/要素',
      opsMs: '操作/ms',
      opsMsUnit: 'ops/ms',
      score: 'スコア',
      points: 'ポイント',
      performanceBreakdown: 'パフォーマンス内訳',
      time: '時間',
      potentialImprovement: '潜在的な改善:',
      algorithmComparison: 'アルゴリズム比較',
      testingAlgorithm: 'アルゴリズムをテスト中',
      runningTests: 'テスト実行中...',
      noComparisonData: '比較データなし',
      runTestAll: 'アルゴリズムパフォーマンスを比較するためにtest_all()を実行',
      testAll: 'test_all()',
      stopTest: 'stop_test()',
    },
    // Chat
    chat: {
      askAboutSorting: 'ソートについて質問',
    },
    // Details page
    details: {
      basicSorts: '基本ソート',
      efficientSorts: '効率的ソート',
      specialSorts: '特殊ソート',
      algorithmDetails: '{algorithm}_sort() 詳細',
      algorithmImplementation: '{algorithm} 実装',
      loadingImplementation: '{algorithm} 実装を読み込み中',
      relatedAlgorithms: '関連アルゴリズム',
      historicalContext: '歴史的コンテキスト',
      inventedBy: '発明者',
      year: '年',
      proTip: 'プロのヒント',
      funFact: '面白い事実',
      tips: {
        bubble:
          '配列サイズを増やしてバブルソートの性能が二次的に悪化する様子を見てみてください！',
        insertion:
          '挿入ソートがほぼソートされた配列で例外的に良い性能を発揮する様子を観察してください。',
        selection:
          '選択ソートが初期順序に関係なく常に同じ時間を要する様子に注目してください。',
        quick: 'ピボット選択が分割プロセスに与える影響を観察してください。',
        merge:
          'マージソートが配列を再帰的に小さなサブ配列に分割する様子を見てください。',
        radix:
          '基数ソートが各桁の位置を独立して処理する様子を観察してください！',
        heap: 'ヒープソートがバイナリヒープを構築し、最大要素を繰り返し抽出する様子に注目してください！',
        bucket:
          'バケットソートが要素をバケットに分配し、個別にソートする様子を観察してください！',
      },
      facts: {
        bubble:
          'バブルソートは、小さな要素が交換を通じてリストの上部に「泡立つ」様子から名付けられました。',
        insertion:
          '挿入ソートは、多くの人が手札でトランプをソートする方法に似ています。',
        selection:
          '選択ソートは可能な最小数のスワップを行います（最悪の場合n-1）。',
        quick:
          'クイックソートは1959年にトニー・ホアによって開発されました。彼はモスクワ国立大学の交換留学生でした。',
        merge:
          'マージソートは1945年にジョン・フォン・ノイマンによって発明され、最初に記述された分割統治アルゴリズムの一つです。',
        radix:
          '基数ソートは現代のコンピュータ以前の時代に遡り、20世紀初頭のパンチカードソート機で使用されていました。',
        heap: 'ヒープソートは1964年にJ. W. J. ウィリアムスによって発明され、多くの優先度付きキュー実装の基礎となっています。',
        bucket:
          'バケットソートは、入力が範囲にわたって均等に分布している場合に特に効率的です。',
      },
    },
    // SEO
    seo: {
      title: 'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      description:
        'バブルソート、マージソート、クイックソートなどを含むソートアルゴリズムのインタラクティブビジュアライゼーション。リアルタイムパフォーマンスメトリクスと教育コンテンツでデータ構造とアルゴリズムを学習。',
      keywords:
        'ソートアルゴリズムビジュアライザー, DSA学習, データ構造アルゴリズム, コーディング面接準備, マージソート, クイックソート, ヒープソート, バブルソート, コンピュータサイエンス教育, アルゴリズムアニメーション, インタラクティブ学習, プログラミングチュートリアル, ソフトウェアエンジニアリング',
      algorithmTitle: '{algorithm} ソートビジュアライザー - SortVision',
      algorithmDescription:
        'SortVisionのインタラクティブビジュアライザーで{algorithm}ソートアルゴリズムをマスター。ステップバイステップアニメーション、パフォーマンス分析、コーディング面接のための包括的なDSA学習。',
      ogTitle:
        'SortVision - DSA学習のためのインタラクティブソートアルゴリズムビジュアライザー',
      ogDescription:
        'インタラクティブビジュアライゼーションでソートアルゴリズムをマスター。コーディング面接、コンピュータサイエンス教育、DSA学習に最適。',
      twitterTitle:
        'SortVision - インタラクティブソートアルゴリズムビジュアライザー',
      twitterDescription:
        'ステップバイステップビジュアライゼーションでソートアルゴリズムを学習。コーディング面接とコンピュータサイエンス教育に必須。',
    },
    // Contributions
    contributions: {
      stats: {
        contributors: '貢献者',
        amazingDevelopers: '素晴らしい開発者',
        totalCommits: '総コミット数',
        linesOfImpact: '影響行数',
        githubStars: 'GitHubスター',
        communityLove: 'コミュニティの愛',
        forks: 'フォーク',
        projectCopies: 'プロジェクトコピー',
        contributorMetrics: '貢献者メトリクス',
      },
      list: {
        filterByType: 'タイプでフィルター',
        allContributors: 'すべての貢献者',
        searchContributors: '貢献者を検索',
        typeUsername: 'ユーザー名を入力...',
        contributorsFound: '貢献者が見つかりました',
        noContributorsFound: '貢献者が見つかりません',
        loadingContributors: '貢献者を読み込み中...',
        projectAdmins: 'プロジェクト管理者',
        community: 'コミュニティ',
        bots: 'ボット',
        admin: 'ADMIN',
        communityBadge: 'COMMUNITY',
        bot: 'BOT',
        commits: 'コミット',
        developer: '開発者',
        profile: 'プロフィール',
        details: '詳細',
        contributions: '貢献',
      },
      health: {
        issues: 'イシュー',
        open: 'オープン',
        closed: 'クローズ',
        recent: '最近',
        pullRequests: 'Pull Requests',
        merged: 'マージ済み',
        repository: 'リポジトリ',
        size: 'サイズ',
        language: '言語',
        stars: 'スター',
      },
      contributorDetail: {
        loading: '貢献者データを読み込み中...',
        progress: '進捗',
        profileDetails: 'プロフィール詳細',
        publicRepos: 'パブリックリポ',
        followers: 'フォロワー',
        following: 'フォロー中',
        repoCommits: 'リポコミット',
        pullRequests: 'Pull Requests',
        issues: 'イシュー',
        linesAdded: '追加された行',
        linesDeleted: '削除された行',
        total: '合計',
        merged: 'マージ済み',
        open: 'オープン',
        closed: 'クローズ',
        totalInsertions: '総挿入（完全履歴）',
        totalInsertionsPartial:
          '総挿入（部分データ - キャッシュされた統計は利用不可）',
        totalDeletions: '総削除（完全履歴）',
        totalDeletionsPartial:
          '総削除（部分データ - キャッシュされた統計は利用不可）',
        noPullRequests: 'Pull Requestが見つかりません',
        noIssues: 'イシューが見つかりません',
        noCommits: 'コミットが見つかりません',
        updated: '更新済み',
        files: 'ファイル',
        modifiedFiles: '変更されたファイル',
        andMore: 'と{count}個の追加ファイル',
        commit: 'コミット',
      },
      guide: {
        contributionGuide: '貢献ガイド',
        phase: 'フェーズ',
        gettingStarted: '開始',
        development: '開発',
        submission: '提出',
        forkRepository: 'リポジトリをフォーク',
        createCopy: 'SortVisionの独自コピーを作成',
        setupEnvironment: '開発環境をセットアップ',
        installDependencies: '依存関係をインストールしてローカルで実行',
        createBranch: '機能ブランチを作成',
        createNewBranch: '変更用の新しいブランチを作成',
        makeChanges: '変更を行う',
        implementFeature: '機能や修正を実装',
        commitPush: 'コミット＆プッシュ',
        commitChanges: '明確なメッセージで変更をコミット',
        createPR: 'Pull Requestを作成',
        submitChanges: 'レビューのために変更を提出',
        previous: '← 前へ',
        nextPhase: '次のフェーズ →',
        phaseComplete: 'フェーズ{phase}完了！',
        greatWork:
          '素晴らしい作業です！このフェーズのすべてのステップを完了しました。',
        continueTo: '{phase}に続行 →',
        bestPractices: 'ベストプラクティス',
        codeQuality: 'コード品質',
        codeQualityDesc: 'クリーンで読みやすく保守可能なコードプラクティス',
        reactPractices: 'Reactベストプラクティス',
        reactPracticesDesc: 'モダンなReactパターンとフックの使用',
        performanceTips: 'パフォーマンスのヒント',
        performanceTipsDesc:
          'より良いアプリパフォーマンスのための最適化テクニック',
        quickGuidelines: '📋 クイックガイドライン',
        followPatterns: '• 既存のパターンに従う',
        clearCommits: '• 明確なコミットメッセージを書く',
        testChanges: '• 変更をテストする',
        keepFocused: '• コンポーネントを集中させる',
        do: 'やるべきこと:',
        dont: 'やってはいけないこと:',
        useDescriptiveNames: '説明的な変数名を使用',
        keepFunctionsSmall: '関数を小さく集中させる',
        avoidMagicNumbers: 'マジックナンバーを避ける',
        useFunctionalComponents: 'フック付きの関数コンポーネントを使用',
        includeDependencies: '正しいuseEffect依存関係を含める',
        avoidInlineStyles: 'インラインスタイルを避け、Tailwindクラスを使用',
        memoizeCalculations: '高価な計算をメモ化',
        useCallback: 'イベントハンドラーのためにuseCallbackを使用',
        importSpecific: '必要でない場合はライブラリ全体をインポートしない',
        quickReferences: 'クイックリファレンス',
        contributionGuidelines: '貢献ガイドライン',
        detailedRules: '詳細な貢献ルール',
        githubIssues: 'GitHubイシュー',
        findIssues: '作業するイシューを見つける',
        codeOfConduct: '行動規範',
        communityGuidelines: 'コミュニティガイドライン',
      },
    },
    // Feedback Modal
    feedback: {
      sendFeedback: 'フィードバックを送信',
      title: 'ユーザーフィードバック',
      description:
        'SortVisionを改善するためにあなたのフィードバックをお待ちしています！',
      description2:
        'バグを見つけた、提案がある、または単にあなたの考えを共有したい場合は、お知らせください。',
      processing: 'あなたのフィードバックを安全に処理しています...',
      name: '名前',
      email: 'メール（任意）',
      feedbackType: 'フィードバックタイプ',
      detailedFeedback: '詳細フィードバック',
      rating: '評価',
      region: '地域',
      submit: 'フィードバック送信',
      submitting: '送信中...',
      success: 'フィードバックが正常に送信されました！',
      error: 'フィードバックの送信に失敗しました。再試行してください。',
      types: {
        bug: 'バグレポート',
        feature: '機能リクエスト',
        suggestion: '提案',
        general: '一般的なフィードバック',
        performance: 'パフォーマンス問題',
        ui: 'UI/UX問題',
      },
      ratings: {
        poor: '悪い',
        fair: '普通',
        good: '良い',
        veryGood: 'とても良い',
        excellent: '優秀',
      },
      language: '言語',
      selectLanguage: '言語を選択',
    },
    // Common
    common: {
      close: '閉じる',
      settings: '設定',
      select: '選択',
      enabled: '有効',
      disabled: '無効',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check URL first for language
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const supportedLanguages = [
        'en',
        'es',
        'hi',
        'fr',
        'de',
        'zh',
        'bn',
        'ja',
        'jp',
      ];

      // Check if first segment is a language code
      const pathSegments = path.split('/').filter(Boolean);
      if (
        pathSegments.length > 0 &&
        supportedLanguages.includes(pathSegments[0])
      ) {
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
    if (browserLang.startsWith('bn')) return 'bn';
    if (browserLang.startsWith('ja') || browserLang.startsWith('jp'))
      return 'ja';
    if (browserLang.startsWith('en')) return 'en';

    // Default to English for unsupported languages
    return 'en';
  });

  const [currentTranslations, setCurrentTranslations] = useState(
    translations[language]
  );

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
        console.warn(
          `Translation key "${key}" not found for language "${language}"`
        );
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

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage);

    // Update URL to reflect language change
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;

      // Remove existing language from path if present
      let newPath = currentPath;
      const supportedLanguages = [
        'en',
        'es',
        'hi',
        'fr',
        'de',
        'zh',
        'bn',
        'ja',
        'jp',
      ];

      // Check if first segment is a language code and remove it
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (
        pathSegments.length > 0 &&
        supportedLanguages.includes(pathSegments[0])
      ) {
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
  const getLocalizedUrl = path => {
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
    getLocalizedUrl,
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
