-- Create multilingual FAQ tables
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language TEXT NOT NULL CHECK (language IN ('en', 'es', 'nl', 'fr', 'de', 'pl', 'se', 'dk', 'pt', 'zh', 'hi', 'ar')),
  question TEXT NOT NULL,
  answer_short TEXT NOT NULL,
  answer_long TEXT, -- Markdown support
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[], -- Array of tags
  location TEXT, -- Target area/location
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- SEO and Search Optimization
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[], -- SEO keywords array
  voice_queries TEXT[], -- Voice search queries
  target_areas TEXT[], -- Geographic targeting
  property_types TEXT[], -- Property type relevance
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Ensure unique slug per language
  UNIQUE(slug, language)
);

-- Create FAQ categories table
CREATE TABLE public.faq_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL, -- Category identifier (e.g., 'legal', 'finance')
  language TEXT NOT NULL CHECK (language IN ('en', 'es', 'nl', 'fr', 'de', 'pl', 'se', 'dk', 'pt', 'zh', 'hi', 'ar')),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(key, language)
);

-- Create FAQ relations table
CREATE TABLE public.faq_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id UUID REFERENCES public.faqs(id) ON DELETE CASCADE,
  related_faq_id UUID REFERENCES public.faqs(id) ON DELETE CASCADE,
  relation_type TEXT DEFAULT 'related', -- 'related', 'followup', 'prerequisite'
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(faq_id, related_faq_id)
);

-- Enable Row Level Security
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_relations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for faqs (public read access)
CREATE POLICY "Anyone can view FAQs" 
ON public.faqs 
FOR SELECT 
USING (true);

-- RLS Policies for faq_categories (public read access)
CREATE POLICY "Anyone can view FAQ categories" 
ON public.faq_categories 
FOR SELECT 
USING (true);

-- RLS Policies for faq_relations (public read access)
CREATE POLICY "Anyone can view FAQ relations" 
ON public.faq_relations 
FOR SELECT 
USING (true);

-- Create update triggers
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faq_categories_updated_at
BEFORE UPDATE ON public.faq_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_faqs_language ON public.faqs(language);
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_featured ON public.faqs(is_featured, language);
CREATE INDEX idx_faqs_slug ON public.faqs(slug, language);
CREATE INDEX idx_faqs_full_text ON public.faqs USING gin(to_tsvector('english', question || ' ' || answer_short));

CREATE INDEX idx_faq_categories_key ON public.faq_categories(key, language);
CREATE INDEX idx_faq_relations_faq_id ON public.faq_relations(faq_id);