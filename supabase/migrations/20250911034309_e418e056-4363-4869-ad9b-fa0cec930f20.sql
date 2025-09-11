-- Create table for stitched dress items
CREATE TABLE public.stitched_dress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stitched_dress ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view active stitched dress items" 
ON public.stitched_dress 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin can manage stitched dress" 
ON public.stitched_dress 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stitched_dress_updated_at
BEFORE UPDATE ON public.stitched_dress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.stitched_dress (title, description, image_url, link, display_order) VALUES
('Elegant Evening Gown', 'A stunning evening gown crafted with precision and attention to detail', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', '#', 1),
('Custom Wedding Dress', 'Bespoke wedding dress tailored to perfection for your special day', 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800', '#', 2),
('Business Suit Collection', 'Professional business suits for the modern executive', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', '#', 3),
('Traditional Formal Wear', 'Classic formal wear with traditional craftsmanship', 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800', '#', 4),
('Party Dress Special', 'Vibrant party dresses for special occasions', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800', '#', 5);