import { supabase } from '@/integrations/supabase/client';
import enhancedFaqData from '@/data/enhancedFaqData.json';

export interface LegacyFAQ {
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

export interface LegacyFAQCategory {
  name: string;
  icon: string;
  description: string;
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

const migrateFAQCategories = async () => {
  const categories = enhancedFaqData.categories as Record<string, LegacyFAQCategory>;
  
  const categoryInserts = Object.entries(categories).map(([key, category]) => ({
    key,
    language: 'en',
    name: category.name,
    description: category.description,
    icon: category.icon,
    sort_order: 0
  }));

  const { error } = await supabase
    .from('faq_categories')
    .insert(categoryInserts);

  if (error) {
    console.error('Error migrating categories:', error);
    throw error;
  }

  console.log(`Migrated ${categoryInserts.length} categories`);
};

const migrateFAQs = async () => {
  const legacyFaqs = enhancedFaqData.faqs as LegacyFAQ[];
  
  const faqInserts = legacyFaqs.map((faq, index) => ({
    language: 'en',
    question: faq.question,
    answer_short: faq.answer,
    answer_long: faq.answer, // For now, use the same content
    slug: generateSlug(faq.question),
    category: faq.category,
    tags: faq.keywords,
    location: faq.targetAreas?.[0] || null,
    is_featured: index < 10, // Mark first 10 as featured
    sort_order: index,
    meta_title: faq.question,
    meta_description: faq.answer.substring(0, 160),
    keywords: faq.seoKeywords || faq.keywords,
    voice_queries: faq.voiceQueries || [],
    target_areas: faq.targetAreas || [],
    property_types: faq.propertyTypes || []
  }));

  // Insert in batches to avoid timeout
  const batchSize = 50;
  for (let i = 0; i < faqInserts.length; i += batchSize) {
    const batch = faqInserts.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('faqs')
      .insert(batch);

    if (error) {
      console.error(`Error migrating FAQ batch ${i / batchSize + 1}:`, error);
      throw error;
    }

    console.log(`Migrated batch ${i / batchSize + 1}/${Math.ceil(faqInserts.length / batchSize)}`);
  }

  console.log(`Migrated ${faqInserts.length} FAQs`);
};

export const migrateLegacyFAQData = async () => {
  try {
    console.log('Starting FAQ data migration...');
    
    // Check if data already exists
    const { count: existingFaqs } = await supabase
      .from('faqs')
      .select('*', { count: 'exact', head: true });

    const { count: existingCategories } = await supabase
      .from('faq_categories')
      .select('*', { count: 'exact', head: true });

    if (existingFaqs && existingFaqs > 0) {
      console.log('FAQ data already exists, skipping migration');
      return;
    }

    if (existingCategories && existingCategories > 0) {
      console.log('FAQ categories already exist, skipping category migration');
    } else {
      await migrateFAQCategories();
    }

    await migrateFAQs();
    
    console.log('FAQ data migration completed successfully!');
  } catch (error) {
    console.error('FAQ data migration failed:', error);
    throw error;
  }
};

// Function to add sample multilingual content
export const addSampleMultilingualContent = async () => {
  try {
    // Get a few existing English FAQs
    const { data: englishFaqs } = await supabase
      .from('faqs')
      .select('*')
      .eq('language', 'en')
      .limit(5);

    if (!englishFaqs || englishFaqs.length === 0) {
      console.log('No English FAQs found to translate');
      return;
    }

    // Sample translations for Spanish and Dutch
    const sampleTranslations = {
      es: {
        "What are the costs involved in buying property in Spain?": {
          question: "¿Cuáles son los costos involucrados en comprar una propiedad en España?",
          answer_short: "Los costos incluyen impuestos de transferencia, tasas notariales, registro de la propiedad y honorarios legales."
        }
      },
      nl: {
        "What are the costs involved in buying property in Spain?": {
          question: "Wat zijn de kosten voor het kopen van onroerend goed in Spanje?",
          answer_short: "De kosten omvatten overdrachtsbelastingen, notariskosten, eigendomsregistratie en juridische kosten."
        }
      }
    };

    // Add sample categories in other languages
    const { data: englishCategories } = await supabase
      .from('faq_categories')
      .select('*')
      .eq('language', 'en')
      .limit(3);

    if (englishCategories) {
      const categoryTranslations = {
        es: [
          { key: 'legal', name: 'Legal', description: 'Preguntas legales sobre bienes raíces' },
          { key: 'financial', name: 'Financiero', description: 'Aspectos financieros y fiscales' },
          { key: 'process', name: 'Proceso', description: 'Proceso de compra paso a paso' }
        ],
        nl: [
          { key: 'legal', name: 'Juridisch', description: 'Juridische vragen over onroerend goed' },
          { key: 'financial', name: 'Financieel', description: 'Financiële en fiscale aspecten' },
          { key: 'process', name: 'Proces', description: 'Stap-voor-stap aankoopproces' }
        ]
      };

      for (const [lang, translations] of Object.entries(categoryTranslations)) {
        const categoryInserts = translations.map(cat => ({
          ...cat,
          language: lang,
          icon: englishCategories.find(ec => ec.key === cat.key)?.icon || 'HelpCircle',
          sort_order: 0
        }));

        await supabase
          .from('faq_categories')
          .insert(categoryInserts);
      }
    }

    console.log('Sample multilingual content added!');
  } catch (error) {
    console.error('Error adding sample multilingual content:', error);
  }
};