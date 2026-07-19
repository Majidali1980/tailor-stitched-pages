
CREATE TABLE public.gallery_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_categories TO authenticated;
GRANT ALL ON public.gallery_categories TO service_role;

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active gallery categories"
ON public.gallery_categories FOR SELECT
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage gallery categories"
ON public.gallery_categories FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_gallery_categories_updated_at
BEFORE UPDATE ON public.gallery_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.gallery_categories (slug, label, description, display_order) VALUES
  ('shalwar-kameez', 'Shalwar Kameez', 'Traditional stitched sets', 1),
  ('shirt', 'Shirts', 'Kurtas & tailored shirts', 2),
  ('bottom', 'Bottoms', 'Trousers, shalwars & palazzos', 3),
  ('full-suit', 'Full Suit', '3-piece bespoke suits', 4),
  ('neck-design', 'Neck Designs', 'Signature neckline details', 5),
  ('girls-suits', 'Girls Suits', 'Elegant girls collection', 6)
ON CONFLICT (slug) DO NOTHING;
