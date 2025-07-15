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

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // Filter by search term (search in question, answer, keywords)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
        faq.category.toLowerCase().includes(searchLower)
      );
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
    getRelatedFAQs
  };
};