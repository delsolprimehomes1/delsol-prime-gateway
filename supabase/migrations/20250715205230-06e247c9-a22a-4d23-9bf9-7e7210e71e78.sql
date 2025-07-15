-- SEO Dashboard Database Structure

-- Create enum types for better data integrity
CREATE TYPE public.keyword_intent AS ENUM ('informational', 'commercial', 'transactional', 'navigational');
CREATE TYPE public.page_type AS ENUM ('homepage', 'property', 'location', 'blog', 'service');
CREATE TYPE public.report_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- User profiles table for linking SEO data to users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Website pages for tracking SEO performance
CREATE TABLE public.seo_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  meta_description TEXT,
  page_type page_type DEFAULT 'homepage',
  target_keywords TEXT[],
  last_crawled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, url)
);

-- Keywords tracking table
CREATE TABLE public.seo_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  keyword TEXT NOT NULL,
  search_volume INTEGER,
  difficulty_score INTEGER,
  intent keyword_intent,
  current_position INTEGER,
  best_position INTEGER,
  target_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, keyword)
);

-- Daily ranking history
CREATE TABLE public.keyword_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword_id UUID NOT NULL REFERENCES public.seo_keywords(id) ON DELETE CASCADE,
  position INTEGER,
  search_volume INTEGER,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr DECIMAL(5,4) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(keyword_id, date)
);

-- Google Analytics data storage
CREATE TABLE public.analytics_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  page_path TEXT NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,4) DEFAULT 0,
  avg_session_duration INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, page_path, date)
);

-- Search Console data
CREATE TABLE public.search_console_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  query TEXT NOT NULL,
  page_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr DECIMAL(5,4) DEFAULT 0,
  position DECIMAL(6,2) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, query, page_url, date)
);

-- Backlinks tracking
CREATE TABLE public.backlinks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  anchor_text TEXT,
  domain_authority INTEGER,
  link_type TEXT DEFAULT 'dofollow',
  first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, source_url, target_url)
);

-- SEO reports and snapshots
CREATE TABLE public.seo_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_type TEXT NOT NULL,
  title TEXT NOT NULL,
  status report_status DEFAULT 'pending',
  data JSONB,
  generated_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- SEO tasks and recommendations
CREATE TABLE public.seo_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 3,
  category TEXT DEFAULT 'general',
  is_completed BOOLEAN DEFAULT false,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_console_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backlinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user data access
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own SEO pages" ON public.seo_pages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own SEO pages" ON public.seo_pages
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own keywords" ON public.seo_keywords
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own keywords" ON public.seo_keywords
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their keyword rankings" ON public.keyword_rankings
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.seo_keywords 
    WHERE id = keyword_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can insert keyword rankings" ON public.keyword_rankings
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.seo_keywords 
    WHERE id = keyword_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can view their analytics data" ON public.analytics_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their analytics data" ON public.analytics_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their search console data" ON public.search_console_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their search console data" ON public.search_console_data
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their backlinks" ON public.backlinks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their backlinks" ON public.backlinks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their SEO reports" ON public.seo_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their SEO reports" ON public.seo_reports
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their SEO tasks" ON public.seo_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their SEO tasks" ON public.seo_tasks
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_seo_pages_user_id ON public.seo_pages(user_id);
CREATE INDEX idx_seo_pages_url ON public.seo_pages(url);
CREATE INDEX idx_seo_keywords_user_id ON public.seo_keywords(user_id);
CREATE INDEX idx_seo_keywords_keyword ON public.seo_keywords(keyword);
CREATE INDEX idx_keyword_rankings_date ON public.keyword_rankings(date);
CREATE INDEX idx_analytics_data_user_date ON public.analytics_data(user_id, date);
CREATE INDEX idx_search_console_data_user_date ON public.search_console_data(user_id, date);
CREATE INDEX idx_backlinks_user_id ON public.backlinks(user_id);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_pages_updated_at
  BEFORE UPDATE ON public.seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_keywords_updated_at
  BEFORE UPDATE ON public.seo_keywords
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_tasks_updated_at
  BEFORE UPDATE ON public.seo_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();