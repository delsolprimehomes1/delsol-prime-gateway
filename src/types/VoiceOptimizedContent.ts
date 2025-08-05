export interface VoiceOptimizedFAQ {
  id: string;
  question: string;
  shortAnswer: string; // 50-70 words for voice search
  fullAnswer: string;
  category: string;
  keywords: string[];
  voiceQueries: string[];
  targetAreas: string[];
  propertyTypes: string[];
  featured: boolean;
  voiceSearchReady: boolean;
  lastModified: string;
  conversationalTone: boolean;
}

export interface VoiceOptimizedBlogPost {
  id: number;
  title: string;
  shortAnswer: string; // 50-70 words summary
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  lastModified: string;
  readTime: string;
  slug: string;
  voiceSearchReady: boolean;
  keywords: string[];
  voiceQueries: string[];
  targetAudience: string[];
  seoMetadata: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
  };
}

export interface ShortAnswerMetadata {
  type: 'faq' | 'blog';
  wordCount: number;
  voiceSearchReady: boolean;
  lastUpdated: string;
  conversationalScore: number; // 1-10 scale
}

export interface VoiceSearchOptimization {
  naturalLanguageQueries: string[];
  conversationalKeywords: string[];
  questionPatterns: string[];
  answerFormat: 'paragraph' | 'list' | 'steps';
  targetDevices: ('smart_speaker' | 'mobile' | 'assistant')[];
}