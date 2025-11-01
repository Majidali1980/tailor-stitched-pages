-- Create homepage_carousel table
CREATE TABLE public.homepage_carousel (
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
ALTER TABLE public.homepage_carousel ENABLE ROW LEVEL SECURITY;

-- Create policies for homepage_carousel
CREATE POLICY "Admin can manage homepage_carousel"
ON public.homepage_carousel
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view active homepage carousel items"
ON public.homepage_carousel
FOR SELECT
USING (is_active = true);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Admin can manage notifications"
ON public.notifications
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view active notifications"
ON public.notifications
FOR SELECT
USING (is_active = true);

-- Create bulkorder_carousel table
CREATE TABLE public.bulkorder_carousel (
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
ALTER TABLE public.bulkorder_carousel ENABLE ROW LEVEL SECURITY;

-- Create policies for bulkorder_carousel
CREATE POLICY "Admin can manage bulkorder_carousel"
ON public.bulkorder_carousel
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view active bulkorder carousel items"
ON public.bulkorder_carousel
FOR SELECT
USING (is_active = true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_homepage_carousel_updated_at
BEFORE UPDATE ON public.homepage_carousel
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bulkorder_carousel_updated_at
BEFORE UPDATE ON public.bulkorder_carousel
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();