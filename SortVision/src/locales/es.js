export default {
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
      starRepoCta: 'O solo da una estrella al repo — es gratis y ayuda mucho',
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
    emailLabel: 'Correo',
    optional: 'Opcional',
    emailPlaceholder: 'tu@ejemplo.com',
    emailHint: 'Solo si quieres respuesta — no lo usamos para marketing.',
    namePlaceholder: 'Tu nombre',
    ratingHint:
      'Pasa el cursor para previsualizar y haz clic para elegir (obligatorio).',
    ratingAriaGroup: 'Valora tu experiencia de 1 a 5 estrellas',
    ratingStarLabel: 'Valorar {n} de 5 estrellas',
    ratingCta: 'Pasa el cursor y haz clic en una estrella para valorar.',
    ratingSaved: 'Guardado',
    clearRating: 'Borrar',
    ratingPrompt: '¿Cómo valorarías tu experiencia general con SortVision?',
    devCalloutTitle: '¿Desarrollador? Contribuye en GitHub',
    devCalloutBody:
      'SortVision es código abierto. Dale una estrella, reporta errores o patrocina el proyecto.',
    starOnGithub: 'Estrella en GitHub',
    sponsorOnGithub: 'Patrocinar',
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
  },
  // Common
  common: {
    close: 'Cerrar',
    settings: 'Configuración',
    select: 'Seleccionar',
    enabled: 'Activado',
    disabled: 'Desactivado',
  },
};
