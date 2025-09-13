-- Create blog table for posting blog articles
CREATE TABLE public.blog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'Admin',
  slug TEXT NOT NULL UNIQUE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  category TEXT DEFAULT 'general',
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

-- Create policies for blog access
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admin can manage all blog posts" 
ON public.blog 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_updated_at
BEFORE UPDATE ON public.blog
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_blog_published ON public.blog(is_published, published_at DESC);
CREATE INDEX idx_blog_slug ON public.blog(slug);
CREATE INDEX idx_blog_category ON public.blog(category);
CREATE INDEX idx_blog_featured ON public.blog(is_featured, published_at DESC);