ALTER TABLE public.hero_section
  ADD COLUMN IF NOT EXISTS image_width integer,
  ADD COLUMN IF NOT EXISTS image_height integer,
  ADD COLUMN IF NOT EXISTS object_fit text DEFAULT 'cover',
  ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;