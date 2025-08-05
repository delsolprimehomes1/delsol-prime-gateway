import { VoiceOptimizedFAQ, VoiceOptimizedBlogPost, VoiceSearchOptimization } from '@/types/VoiceOptimizedContent';

/**
 * Validates that a short answer meets voice search optimization criteria
 */
export const validateShortAnswer = (shortAnswer: string): {
  isValid: boolean;
  wordCount: number;
  issues: string[];
  score: number;
} => {
  const words = shortAnswer.trim().split(/\s+/);
  const wordCount = words.length;
  const issues: string[] = [];
  let score = 100;

  // Word count validation (50-70 words is optimal)
  if (wordCount < 50) {
    issues.push(`Too short: ${wordCount} words (minimum 50 recommended)`);
    score -= 20;
  } else if (wordCount > 70) {
    issues.push(`Too long: ${wordCount} words (maximum 70 recommended)`);
    score -= 15;
  }

  // Conversational tone check
  const hasConversationalIndicators = /\b(you|your|we|our|can|will|should|here's|let's)\b/i.test(shortAnswer);
  if (!hasConversationalIndicators) {
    issues.push('Consider adding conversational elements (you, we, can, will)');
    score -= 10;
  }

  // Direct answer check (should start with key information)
  const startsWithDirectAnswer = /^(yes|no|the|it|you|there are|there is|typically|generally|usually)/i.test(shortAnswer);
  if (!startsWithDirectAnswer) {
    issues.push('Consider starting with a direct answer');
    score -= 10;
  }

  // Sentence length check (avoid overly complex sentences)
  const sentences = shortAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const hasLongSentences = sentences.some(sentence => sentence.split(/\s+/).length > 25);
  if (hasLongSentences) {
    issues.push('Some sentences are too long for voice search (>25 words)');
    score -= 10;
  }

  // Question word presence (good for FAQ-style content)
  const hasQuestionContext = /\b(what|how|why|when|where|which|who)\b/i.test(shortAnswer);
  if (hasQuestionContext) {
    score += 5; // Bonus for question context
  }

  return {
    isValid: issues.length === 0 && wordCount >= 50 && wordCount <= 70,
    wordCount,
    issues,
    score: Math.max(0, Math.min(100, score))
  };
};

/**
 * Generates voice search queries based on content
 */
export const generateVoiceQueries = (
  question: string,
  keywords: string[],
  context: { type: 'faq' | 'blog'; category?: string; location?: string }
): string[] => {
  const queries: string[] = [];
  
  // Direct question transformations
  queries.push(question);
  
  // Natural language variations
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'which', 'who'];
  const questionStart = questionWords.find(word => question.toLowerCase().startsWith(word));
  
  if (questionStart) {
    // Add "tell me" variants
    queries.push(`Tell me ${question.toLowerCase()}`);
    
    // Add "I want to know" variants
    queries.push(`I want to know ${question.toLowerCase()}`);
    
    // Add conversational variants
    if (questionStart === 'what') {
      queries.push(question.replace(/^what is/i, 'what are'));
      queries.push(question.replace(/^what/i, 'can you explain'));
    }
  }

  // Location-specific queries
  if (context.location) {
    queries.push(`${question} in ${context.location}`);
    queries.push(`${context.location} ${question.toLowerCase()}`);
  }

  // Keyword-based queries
  keywords.slice(0, 3).forEach(keyword => {
    queries.push(`${keyword} information`);
    queries.push(`Tell me about ${keyword}`);
  });

  // Context-specific patterns
  if (context.type === 'faq') {
    queries.push(`Frequently asked about ${keywords[0]}`);
    queries.push(`Common questions ${keywords[0]}`);
  }

  return [...new Set(queries)].slice(0, 8); // Remove duplicates and limit to 8
};

/**
 * Optimizes content for voice search
 */
export const optimizeForVoiceSearch = (content: {
  question?: string;
  title?: string;
  shortAnswer: string;
  keywords: string[];
  category?: string;
}): VoiceSearchOptimization => {
  const { question, title, shortAnswer, keywords, category } = content;
  
  const mainQuery = question || title || '';
  
  return {
    naturalLanguageQueries: generateVoiceQueries(
      mainQuery,
      keywords,
      { type: question ? 'faq' : 'blog', category }
    ),
    conversationalKeywords: [
      'you can',
      'you need',
      'you should',
      'typically',
      'usually',
      'generally',
      'here is',
      'this includes',
      'the main',
      'most important'
    ],
    questionPatterns: [
      'What is',
      'How do',
      'Why should',
      'When can',
      'Where is',
      'Which are'
    ],
    answerFormat: shortAnswer.includes('1.') || shortAnswer.includes('•') ? 'list' : 
                  shortAnswer.includes('first') || shortAnswer.includes('then') ? 'steps' : 'paragraph',
    targetDevices: ['smart_speaker', 'mobile', 'assistant']
  };
};

/**
 * Analyzes content for voice search readiness
 */
export const analyzeVoiceSearchReadiness = (content: {
  shortAnswer: string;
  keywords: string[];
  voiceQueries?: string[];
}): {
  score: number;
  readiness: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  recommendations: string[];
} => {
  const { shortAnswer, keywords, voiceQueries = [] } = content;
  const validation = validateShortAnswer(shortAnswer);
  
  let score = validation.score;
  const recommendations: string[] = [...validation.issues];

  // Voice queries quality
  if (voiceQueries.length < 3) {
    recommendations.push('Add more voice search query variations (aim for 4-6)');
    score -= 10;
  }

  // Keyword optimization
  const keywordPresence = keywords.some(keyword => 
    shortAnswer.toLowerCase().includes(keyword.toLowerCase())
  );
  if (!keywordPresence) {
    recommendations.push('Include main keywords naturally in the short answer');
    score -= 15;
  }

  // Conversational score
  const conversationalWords = ['you', 'your', 'we', 'our', 'can', 'will', 'should'];
  const conversationalCount = conversationalWords.filter(word =>
    shortAnswer.toLowerCase().includes(word)
  ).length;
  
  if (conversationalCount < 2) {
    recommendations.push('Use more conversational language (you, we, can, should)');
    score -= 10;
  }

  // Determine readiness level
  let readiness: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  if (score >= 90) readiness = 'excellent';
  else if (score >= 75) readiness = 'good';
  else if (score >= 60) readiness = 'needs_improvement';
  else readiness = 'poor';

  return {
    score: Math.max(0, Math.min(100, score)),
    readiness,
    recommendations
  };
};

/**
 * Converts traditional FAQ/blog content to voice-optimized format
 */
export const convertToVoiceOptimized = (
  content: {
    question?: string;
    title?: string;
    answer: string;
    keywords?: string[];
    category?: string;
  }
): {
  shortAnswer: string;
  voiceQueries: string[];
  optimization: VoiceSearchOptimization;
} => {
  const { question, title, answer, keywords = [], category } = content;
  
  // Extract first 50-70 words as short answer
  const words = answer.trim().split(/\s+/);
  let shortAnswer = words.slice(0, 65).join(' ');
  
  // Ensure it ends with a complete sentence
  const lastSentenceEnd = shortAnswer.lastIndexOf('.');
  if (lastSentenceEnd > 30) {
    shortAnswer = shortAnswer.substring(0, lastSentenceEnd + 1);
  } else {
    shortAnswer = words.slice(0, 60).join(' ') + '.';
  }

  // Make it more conversational
  shortAnswer = shortAnswer
    .replace(/^The /i, 'The ')
    .replace(/^It /i, 'It ')
    .replace(/^This /i, 'This ');

  const voiceQueries = generateVoiceQueries(
    question || title || '',
    keywords,
    { type: question ? 'faq' : 'blog', category }
  );

  const optimization = optimizeForVoiceSearch({
    question,
    title,
    shortAnswer,
    keywords,
    category
  });

  return {
    shortAnswer,
    voiceQueries,
    optimization
  };
};

/**
 * Metadata generator for voice search optimization
 */
export const generateVoiceSearchMetadata = (content: {
  type: 'faq' | 'blog';
  shortAnswer: string;
  voiceQueries: string[];
  lastModified?: string;
}): any => {
  const analysis = analyzeVoiceSearchReadiness({
    shortAnswer: content.shortAnswer,
    keywords: [],
    voiceQueries: content.voiceQueries
  });

  return {
    'voice_search': true,
    'voice_search_ready': analysis.readiness === 'excellent' || analysis.readiness === 'good',
    'voice_search_score': analysis.score,
    'short_answer_words': content.shortAnswer.split(' ').length,
    'voice_queries_count': content.voiceQueries.length,
    'content_type': content.type,
    'last_optimized': content.lastModified || new Date().toISOString(),
    'conversational_tone': true,
    'schema_type': content.type === 'faq' ? 'Question' : 'Article'
  };
};