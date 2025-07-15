
import { useState, useMemo } from 'react';
import faqData from '@/data/faqData.json';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  relatedTopics: string[];
}

export interface FAQCategory {
  name: string;
  icon: string;
  description: string;
}

export const useFAQData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = faqData.categories as Record<string, FAQCategory>;
  const faqs = faqData.faqs as FAQ[];

  // Enhanced search with better performance for large datasets
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    
    // Filter by category first (most selective)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      // Split search terms for better matching
      const searchTerms = searchLower.split(' ').filter(term => term.length > 1);
      
      filtered = filtered.filter(faq => {
        const searchableText = [
          faq.question,
          faq.answer,
          ...faq.keywords,
          faq.category
        ].join(' ').toLowerCase();
        
        // Match if any search term is found
        return searchTerms.some(term => searchableText.includes(term));
      });
    }
    
    return filtered;
  }, [searchTerm, selectedCategory, faqs]);

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

  // Get popular/featured FAQs (first 5 from each category)
  const getFeaturedFAQs = (limit: number = 10): FAQ[] => {
    const featured: FAQ[] = [];
    const categoriesUsed = new Set<string>();
    
    for (const faq of faqs) {
      if (featured.length >= limit) break;
      if (!categoriesUsed.has(faq.category) || featured.length < 6) {
        featured.push(faq);
        categoriesUsed.add(faq.category);
      }
    }
    
    return featured;
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
    getCategoryCount,
    getRelatedFAQs,
    getFeaturedFAQs
  };
};
