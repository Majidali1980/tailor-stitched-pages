-- Create carousel table for homepage carousel
CREATE TABLE public.carousel (
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

-- Enable RLS
ALTER TABLE public.carousel ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage carousel" 
ON public.carousel 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view active carousel items" 
ON public.carousel 
FOR SELECT 
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_carousel_updated_at
BEFORE UPDATE ON public.carousel
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample carousel items
INSERT INTO public.carousel (title, description, image_url, display_order) VALUES
('Premium Collection', 'Discover our latest premium designs', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop', 1),
('Custom Tailoring', 'Expert craftsmanship for every occasion', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&h=1080&fit=crop', 2),
('Wedding Collection', 'Special designs for your special day', 'https://images.unsplash.com/photo-1583846112692-4ad78e57c98a?w=1920&h=1080&fit=crop', 3);