
import { useMemo } from 'react';
import { useFAQData, FAQ } from '@/hooks/useFAQData';

export interface VoiceOptimizedFAQ extends FAQ {
  conversationalAnswer: string;
  voiceSearchKeywords: string[];
  responseLength: 'short' | 'medium' | 'long';
  confidenceScore: number;
}

export const useVoiceOptimizedFAQ = () => {
  const { filteredFAQs, ...faqData } = useFAQData();

  const voiceOptimizedFAQs = useMemo(() => {
    return filteredFAQs.map((faq): VoiceOptimizedFAQ => {
      // Create conversational version of the answer
      const conversationalAnswer = faq.answer
        .replace(/\b(You should|You can|You need to)\b/g, 'I recommend')
        .replace(/\b(We|Our company)\b/g, 'DelSolPrimeHomes')
        .replace(/\b(Click here|See below)\b/g, '');

      // Extract voice search keywords
      const voiceSearchKeywords = [
        ...faq.keywords,
        ...(faq.voiceQueries || []),
        ...extractQuestionWords(faq.question)
      ];

      // Determine response length for voice optimization
      const wordCount = conversationalAnswer.split(' ').length;
      const responseLength: 'short' | 'medium' | 'long' = 
        wordCount <= 30 ? 'short' : 
        wordCount <= 60 ? 'medium' : 'long';

      // Calculate confidence score based on completeness and clarity
      const confidenceScore = calculateConfidenceScore(faq, conversationalAnswer);

      return {
        ...faq,
        conversationalAnswer,
        voiceSearchKeywords,
        responseLength,
        confidenceScore
      };
    });
  }, [filteredFAQs]);

  const getFeaturedSnippetFAQs = (limit: number = 5) => {
    return voiceOptimizedFAQs
      .filter(faq => faq.responseLength === 'short' || faq.responseLength === 'medium')
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .slice(0, limit);
  };

  const getVoiceSearchOptimizedFAQs = (query: string) => {
    const queryWords = query.toLowerCase().split(' ');
    return voiceOptimizedFAQs
      .filter(faq => 
        queryWords.some(word => 
          faq.voiceSearchKeywords.some(keyword => 
            keyword.toLowerCase().includes(word)
          )
        )
      )
      .sort((a, b) => b.confidenceScore - a.confidenceScore);
  };

  return {
    ...faqData,
    voiceOptimizedFAQs,
    getFeaturedSnippetFAQs,
    getVoiceSearchOptimizedFAQs
  };
};

function extractQuestionWords(question: string): string[] {
  const questionWords = ['how', 'what', 'when', 'where', 'why', 'who', 'which'];
  const words = question.toLowerCase().split(' ');
  return questionWords.filter(qw => words.includes(qw));
}

function calculateConfidenceScore(faq: FAQ, conversationalAnswer: string): number {
  let score = 50; // Base score
  
  // Add points for completeness
  if (faq.keywords.length > 3) score += 10;
  if (faq.voiceQueries && faq.voiceQueries.length > 0) score += 15;
  if (conversationalAnswer.length > 50 && conversationalAnswer.length < 200) score += 10;
  
  // Add points for clarity indicators
  if (conversationalAnswer.includes('€') || /\d+/.test(conversationalAnswer)) score += 5;
  if (conversationalAnswer.split('.').length > 1) score += 5;
  
  return Math.min(100, score);
}
