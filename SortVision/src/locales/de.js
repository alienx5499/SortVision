export default {
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
      starRepoCta: 'Oder stern einfach das Repo — kostenlos und hilft viel',
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
    twitterTitle: 'SortVision - Interaktiver Sortieralgorithmus-Visualisierer',
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
      includeDependencies: 'Fügen Sie korrekte useEffect-Abhängigkeiten hinzu',
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
};
