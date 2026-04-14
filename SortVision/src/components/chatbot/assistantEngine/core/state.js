const messageHistory = [];

const conversationContext = {
  lastAlgorithm: null,
  lastQuestion: null,
  abuseCount: 0,
  forceLocalOnly: false,
  userPreferences: {
    detailLevel: 'medium', // 'brief', 'medium', 'detailed'
    showExamples: true,
    showComplexity: true,
  },
  sessionStats: {
    questionsAsked: 0,
    algorithmsDiscussed: new Set(),
    topicsCovered: new Set(),
  },
};

const responseCache = new Map();

export { messageHistory, conversationContext, responseCache };
