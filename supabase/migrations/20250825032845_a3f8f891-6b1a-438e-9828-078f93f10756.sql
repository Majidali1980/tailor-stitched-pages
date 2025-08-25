
-- Create hero_section table for dynamic hero content
CREATE TABLE public.hero_section (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  button1_text TEXT,
  button1_link TEXT,
  button2_text TEXT,
  button2_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create latest_designs table for carousel
CREATE TABLE public.latest_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table for gallery page
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table for video page
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('Instagram', 'TikTok', 'YouTube')),
  video_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table for reviews page
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table for booking system
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  service_type TEXT NOT NULL,
  design_size TEXT,
  uploaded_image_url TEXT,
  special_requirements TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.latest_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for viewing content)
CREATE POLICY "Public can view active hero content" 
  ON public.hero_section 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can view active latest designs" 
  ON public.latest_designs 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can view active gallery items" 
  ON public.gallery 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can view active videos" 
  ON public.videos 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can view active reviews" 
  ON public.reviews 
  FOR SELECT 
  USING (is_active = true);

-- Create policy for appointments - anyone can insert (book appointment)
CREATE POLICY "Anyone can book appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Insert sample data for hero section
INSERT INTO public.hero_section (title, description, image_url, button1_text, button1_link, button2_text, button2_link) VALUES
('Online Pakistani Dress Tailor For Ladies', 'MA Tailor offers online stitching of Pakistani and Indian ladies'' dresses including Shalwar Kameez, Kurtis, and Maxis. We deliver stitched outfits to customers in the USA, UK, Canada, UAE and more within 15–17 days.', '/lovable-uploads/e344a621-c848-4656-844c-f5f5548d0ab0.png', 'Book Appointment', 'https://wa.me/923070125273', 'View Services', '#services');

-- Insert sample data for latest designs
INSERT INTO public.latest_designs (title, description, image_url, display_order) VALUES
('Black Floral Shalwar Kameez', 'Elegant black floral design with intricate embroidery work', '/lovable-uploads/ccacbf2c-4ee7-4e8a-9cee-209886fcec9e.png', 1),
('Traditional Pattern Shalwar Set', 'Beautiful traditional pattern with modern styling', '/lovable-uploads/2a6f7e47-abd2-4384-8aa3-6641ef6fe3a8.png', 2),
('Navy Patterned Shalwar Kameez', 'Sophisticated navy design perfect for formal occasions', '/lovable-uploads/399354ff-9e39-4bef-aa8d-f0beb7ba4cb0.png', 3);

-- Insert sample data for reviews
INSERT INTO public.reviews (name, review_text, rating, display_order) VALUES
('Sarah Ahmed', 'Excellent work! The quality and finish of my shalwar kameez was outstanding. Highly recommend MA Tailor!', 5, 1),
('Fatima Khan', 'Perfect fitting and beautiful design. The delivery was on time as promised. Will order again!', 5, 2),
('Ayesha Ali', 'Amazing craftsmanship! The attention to detail is incredible. Best tailor for Pakistani dresses online.', 5, 3);
