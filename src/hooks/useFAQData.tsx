
import { useState, useMemo } from 'react';
import enhancedFaqData from '@/data/enhancedFaqData.json';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  relatedTopics: string[];
  voiceQueries?: string[];
  targetAreas?: string[];
  propertyTypes?: string[];
  seoKeywords?: string[];
  image?: string;
}

export interface FAQCategory {
  name: string;
  icon: string;
  description: string;
}

export const useFAQData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTargetArea, setSelectedTargetArea] = useState<string>("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all");

  const categories = enhancedFaqData.categories as Record<string, FAQCategory>;
  const faqs = enhancedFaqData.faqs as FAQ[];

  // Enhanced search with voice query optimization and metadata filtering
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    
    // Filter by category first (most selective)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // Filter by target area
    if (selectedTargetArea !== "all") {
      filtered = filtered.filter(faq => 
        faq.targetAreas?.some(area => area.toLowerCase().includes(selectedTargetArea.toLowerCase()))
      );
    }
    
    // Filter by property type
    if (selectedPropertyType !== "all") {
      filtered = filtered.filter(faq => 
        faq.propertyTypes?.some(type => type.toLowerCase().includes(selectedPropertyType.toLowerCase()))
      );
    }
    
    // Enhanced search with voice queries, keywords, and metadata
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchTerms = searchLower.split(' ').filter(term => term.length > 1);
      
      filtered = filtered.filter(faq => {
        const searchableText = [
          faq.question,
          faq.answer,
          ...faq.keywords,
          ...(faq.voiceQueries || []),
          ...(faq.targetAreas || []),
          ...(faq.propertyTypes || []),
          ...(faq.seoKeywords || []),
          faq.category
        ].join(' ').toLowerCase();
        
        // Enhanced matching for better AI optimization
        return searchTerms.some(term => 
          searchableText.includes(term) || 
          faq.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
          (faq.voiceQueries || []).some(query => query.toLowerCase().includes(term)) ||
          (faq.targetAreas || []).some(area => area.toLowerCase().includes(term)) ||
          (faq.propertyTypes || []).some(type => type.toLowerCase().includes(term))
        );
      });
    }
    
    return filtered;
  }, [searchTerm, selectedCategory, selectedTargetArea, selectedPropertyType, faqs]);

  const categoryNames = {
    all: 'All Questions',
    ...Object.fromEntries(
      Object.entries(categories).map(([key, category]) => [key, category.name])
    )
  };

  const getCategoryCount = (categoryKey: string) => {
    if (categoryKey === "all") return faqs.length;
    return faqs.filter(faq => faq.category === categoryKey).length;
  };

  const getRelatedFAQs = (currentFAQ: FAQ, limit: number = 3): FAQ[] => {
    return faqs
      .filter(faq => 
        faq.id !== currentFAQ.id && 
        (currentFAQ.relatedTopics.includes(faq.id) || faq.category === currentFAQ.category)
      )
      .slice(0, limit);
  };

  // Get popular/featured FAQs optimized for AI engines
  const getFeaturedFAQs = (limit: number = 10): FAQ[] => {
    const featured: FAQ[] = [];
    const categoriesUsed = new Set<string>();
    
    // Prioritize high-value questions for voice search and featured snippets
    const priorityQuestions = faqs.filter(faq => 
      faq.voiceQueries && faq.voiceQueries.length > 0
    );
    
    for (const faq of priorityQuestions) {
      if (featured.length >= limit) break;
      if (!categoriesUsed.has(faq.category) || featured.length < 6) {
        featured.push(faq);
        categoriesUsed.add(faq.category);
      }
    }
    
    // Fill remaining slots with other high-quality FAQs
    for (const faq of faqs) {
      if (featured.length >= limit) break;
      if (!featured.some(f => f.id === faq.id)) {
        featured.push(faq);
      }
    }
    
    return featured.slice(0, limit);
  };

  // Get voice search optimized FAQs
  const getVoiceSearchFAQs = (): FAQ[] => {
    return faqs.filter(faq => faq.voiceQueries && faq.voiceQueries.length > 0);
  };

  // Get FAQs by keyword for entity optimization
  const getFAQsByKeyword = (keyword: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  // Get unique target areas from all FAQs
  const getTargetAreas = (): string[] => {
    const areas = new Set<string>();
    faqs.forEach(faq => {
      faq.targetAreas?.forEach(area => areas.add(area));
    });
    return Array.from(areas).sort();
  };

  // Get unique property types from all FAQs
  const getPropertyTypes = (): string[] => {
    const types = new Set<string>();
    faqs.forEach(faq => {
      faq.propertyTypes?.forEach(type => types.add(type));
    });
    return Array.from(types).sort();
  };

  // Get FAQs by target area
  const getFAQsByTargetArea = (area: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.targetAreas?.some(a => a.toLowerCase().includes(area.toLowerCase()))
    );
  };

  // Get FAQs by property type
  const getFAQsByPropertyType = (type: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.propertyTypes?.some(t => t.toLowerCase().includes(type.toLowerCase()))
    );
  };

  return {
    categories,
    faqs,
    filteredFAQs,
    categoryNames,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTargetArea,
    setSelectedTargetArea,
    selectedPropertyType,
    setSelectedPropertyType,
    getCategoryCount,
    getRelatedFAQs,
    getFeaturedFAQs,
    getVoiceSearchFAQs,
    getFAQsByKeyword,
    getTargetAreas,
    getPropertyTypes,
    getFAQsByTargetArea,
    getFAQsByPropertyType
  };
};
