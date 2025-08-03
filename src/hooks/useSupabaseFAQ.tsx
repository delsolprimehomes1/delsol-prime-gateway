import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export interface FAQ {
  id: string;
  language: string;
  question: string;
  answer_short: string;
  answer_long?: string;
  slug: string;
  category: string;
  tags?: string[];
  location?: string;
  is_featured: boolean;
  sort_order: number;
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  voice_queries?: string[];
  target_areas?: string[];
  property_types?: string[];
  created_at: string;
  updated_at: string;
}

export interface FAQCategory {
  id: string;
  key: string;
  language: string;
  name: string;
  description?: string;
  icon?: string;
  sort_order: number;
}

export interface FAQRelation {
  id: string;
  faq_id: string;
  related_faq_id: string;
  relation_type: string;
}

export const useSupabaseFAQ = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTargetArea, setSelectedTargetArea] = useState<string>("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQs and categories from Supabase with language-based filtering
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, try to fetch FAQs for the current language only
        let { data: faqsData, error: faqsError } = await supabase
          .from('faqs')
          .select('*')
          .eq('language', currentLanguage)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (faqsError) throw faqsError;

        // If no FAQs found for current language and it's not English, fallback to English
        if ((!faqsData || faqsData.length === 0) && currentLanguage !== 'en') {
          console.log(`No FAQs found for language: ${currentLanguage}, falling back to English`);
          
          const { data: englishFaqsData, error: englishFaqsError } = await supabase
            .from('faqs')
            .select('*')
            .eq('language', 'en')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (englishFaqsError) throw englishFaqsError;
          faqsData = englishFaqsData;
        }

        // Fetch categories for current language with fallback to English
        let { data: categoriesData, error: categoriesError } = await supabase
          .from('faq_categories')
          .select('*')
          .eq('language', currentLanguage)
          .order('sort_order', { ascending: true });

        if (categoriesError) throw categoriesError;

        // If no categories found for current language and it's not English, fallback to English
        if ((!categoriesData || categoriesData.length === 0) && currentLanguage !== 'en') {
          console.log(`No categories found for language: ${currentLanguage}, falling back to English`);
          
          const { data: englishCategoriesData, error: englishCategoriesError } = await supabase
            .from('faq_categories')
            .select('*')
            .eq('language', 'en')
            .order('sort_order', { ascending: true });

          if (englishCategoriesError) throw englishCategoriesError;
          categoriesData = englishCategoriesData;
        }

        setFaqs(faqsData || []);
        setCategories(categoriesData || []);
        
        console.log(`Loaded ${faqsData?.length || 0} FAQs and ${categoriesData?.length || 0} categories for language: ${currentLanguage}`);
      } catch (err) {
        console.error('Error fetching FAQ data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQ data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage]); // Re-run when language changes

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
        faq.target_areas?.some(area => area.toLowerCase().includes(selectedTargetArea.toLowerCase()))
      );
    }
    
    // Filter by property type
    if (selectedPropertyType !== "all") {
      filtered = filtered.filter(faq => 
        faq.property_types?.some(type => type.toLowerCase().includes(selectedPropertyType.toLowerCase()))
      );
    }
    
    // Enhanced search with voice queries, keywords, and metadata
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const searchTerms = searchLower.split(' ').filter(term => term.length > 1);
      
      filtered = filtered.filter(faq => {
        const searchableText = [
          faq.question,
          faq.answer_short,
          faq.answer_long || '',
          ...(faq.keywords || []),
          ...(faq.voice_queries || []),
          ...(faq.target_areas || []),
          ...(faq.property_types || []),
          ...(faq.tags || []),
          faq.category
        ].join(' ').toLowerCase();
        
        // Enhanced matching for better AI optimization
        return searchTerms.some(term => 
          searchableText.includes(term) || 
          (faq.keywords || []).some(keyword => keyword.toLowerCase().includes(term)) ||
          (faq.voice_queries || []).some(query => query.toLowerCase().includes(term)) ||
          (faq.target_areas || []).some(area => area.toLowerCase().includes(term)) ||
          (faq.property_types || []).some(type => type.toLowerCase().includes(term))
        );
      });
    }
    
    return filtered;
  }, [searchTerm, selectedCategory, selectedTargetArea, selectedPropertyType, faqs]);

  // Create category names mapping with translation support
  const categoryNames = useMemo(() => {
    const baseCategories = {
      all: 'All Questions'
    };
    
    // Add categories from current data  
    categories.forEach(category => {
      baseCategories[category.key] = category.name;
    });
    
    return baseCategories;
  }, [categories]);

  // Helper function to get translated category name
  const getTranslatedCategoryName = (categoryKey: string, t: (key: string) => string): string => {
    if (categoryKey === 'all') {
      return t('faq.categories.all') || 'All Questions';
    }
    
    const translationKey = `faq.categories.${categoryKey}`;
    const translated = t(translationKey);
    
    // If translation exists and is different from the key, use it
    if (translated && translated !== translationKey) {
      return translated;
    }
    
    // Fallback to database category name
    return categoryNames[categoryKey] || categoryKey;
  };

  // Get category count with memoization for performance
  const getCategoryCount = useMemo(() => {
    const counts = {};
    counts['all'] = faqs.length;
    
    faqs.forEach(faq => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    
    return (categoryKey: string) => counts[categoryKey] || 0;
  }, [faqs]);

  const getRelatedFAQs = async (currentFAQ: FAQ, limit: number = 3): Promise<FAQ[]> => {
    try {
      const { data: relations } = await supabase
        .from('faq_relations')
        .select(`
          related_faq_id,
          faqs!faq_relations_related_faq_id_fkey(*)
        `)
        .eq('faq_id', currentFAQ.id)
        .limit(limit);

      if (relations) {
        return relations.map(rel => rel.faqs).filter(Boolean) as FAQ[];
      }
    } catch (error) {
      console.error('Error fetching related FAQs:', error);
    }

    // Fallback to same category FAQs
    return faqs
      .filter(faq => 
        faq.id !== currentFAQ.id && 
        faq.category === currentFAQ.category
      )
      .slice(0, limit);
  };

  // Get popular/featured FAQs optimized for AI engines
  const getFeaturedFAQs = (limit: number = 10): FAQ[] => {
    return faqs
      .filter(faq => faq.is_featured)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, limit);
  };

  // Get voice search optimized FAQs
  const getVoiceSearchFAQs = (): FAQ[] => {
    return faqs.filter(faq => faq.voice_queries && faq.voice_queries.length > 0);
  };

  // Get FAQs by keyword for entity optimization
  const getFAQsByKeyword = (keyword: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.keywords?.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  // Get unique target areas from current language FAQs
  const getTargetAreas = useMemo((): string[] => {
    const areas = new Set<string>();
    faqs.forEach(faq => {
      faq.target_areas?.forEach(area => areas.add(area));
    });
    return Array.from(areas).sort();
  }, [faqs]);

  // Get unique property types from current language FAQs
  const getPropertyTypes = useMemo((): string[] => {
    const types = new Set<string>();
    faqs.forEach(faq => {
      faq.property_types?.forEach(type => types.add(type));
    });
    return Array.from(types).sort();
  }, [faqs]);

  // Get FAQs by target area
  const getFAQsByTargetArea = (area: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.target_areas?.some(a => a.toLowerCase().includes(area.toLowerCase()))
    );
  };

  // Get FAQs by property type
  const getFAQsByPropertyType = (type: string): FAQ[] => {
    return faqs.filter(faq => 
      faq.property_types?.some(t => t.toLowerCase().includes(type.toLowerCase()))
    );
  };

  // Language detection utility
  const getCurrentLanguageInfo = () => {
    const hasDataInCurrentLanguage = faqs.some(faq => faq.language === currentLanguage);
    const fallbackUsed = !hasDataInCurrentLanguage && currentLanguage !== 'en';
    
    return {
      currentLanguage,
      hasDataInCurrentLanguage,
      fallbackUsed,
      effectiveLanguage: hasDataInCurrentLanguage ? currentLanguage : 'en'
    };
  };

  return {
    // Core data
    categories: Object.fromEntries(categories.map(cat => [cat.key, cat])),
    faqs,
    filteredFAQs,
    categoryNames,
    
    // Search and filtering state
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTargetArea,
    setSelectedTargetArea,
    selectedPropertyType,
    setSelectedPropertyType,
    
    // Utility functions
    getCategoryCount,
    getRelatedFAQs,
    getFeaturedFAQs,
    getVoiceSearchFAQs,
    getFAQsByKeyword,
    getTargetAreas,
    getPropertyTypes,
    getFAQsByTargetArea,
    getFAQsByPropertyType,
    
    // Translation helper
    getTranslatedCategoryName,
    
    // Language info
    getCurrentLanguageInfo,
    
    // Loading states
    loading,
    error
  };
};