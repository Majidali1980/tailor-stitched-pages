
CREATE TABLE public.service_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  service_name TEXT,
  title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  h1 TEXT,
  intro TEXT,
  hero_image_url TEXT,
  hero_image_alt TEXT,
  highlights JSONB,
  sections JSONB,
  faqs JSONB,
  testimonials JSONB,
  images JSONB,
  related_services JSONB,
  related_reads JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.service_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_pages TO authenticated;
GRANT ALL ON public.service_pages TO service_role;

ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active service pages"
  ON public.service_pages FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage service pages"
  ON public.service_pages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_service_pages_updated_at
  BEFORE UPDATE ON public.service_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.service_pages (slug, service_name, is_active, display_order) VALUES
  ('lawn-suit-stitching', 'Lawn Suit Stitching', true, 1),
  ('bridal-dress-stitching', 'Bridal Dress Stitching', true, 2),
  ('maxi-stitching', 'Maxi Stitching', true, 3),
  ('party-wear-stitching', 'Party Wear Stitching', true, 4),
  ('sharara-stitching', 'Sharara Stitching', true, 5),
  ('gharara-stitching', 'Gharara Stitching', true, 6),
  ('abaya-stitching', 'Abaya Stitching', true, 7),
  ('blouse-stitching', 'Blouse Stitching', true, 8),
  ('formal-suit-stitching', 'Formal Suit Stitching', true, 9),
  ('custom-stitching', 'Custom Stitching', true, 10);
