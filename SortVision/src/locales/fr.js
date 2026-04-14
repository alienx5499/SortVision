export default {
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
      openerIntroPrefix: 'Salut 👋 Je suis ',
      openerIntroSuffix: " — j'ai créé SortVision et ",
      openerContributorsKnown:
        '{count} contributeurs géniaux ont aidé à le construire.',
      openerContributorsUnknown:
        'une communauté géniale a aidé à le construire.',
      openerOutro: ' Tout gratuit, tout open source.',
      honestLine1:
        'Pas de pubs, pas de paywall, pas de compte. Mais garder le site en ligne — domaine et outils — ',
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
      starRepoCta: "Ou étoilez le dépôt — c'est gratuit et ça aide beaucoup",
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
};
