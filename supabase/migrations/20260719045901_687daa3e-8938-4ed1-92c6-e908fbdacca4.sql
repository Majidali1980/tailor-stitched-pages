
ALTER TABLE public.discount_offers ADD COLUMN IF NOT EXISTS slug text;

-- Backfill slugs from title
UPDATE public.discount_offers
SET slug = lower(regexp_replace(regexp_replace(coalesce(title, 'offer-' || substr(id::text,1,8)), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
WHERE slug IS NULL OR slug = '';

-- Ensure uniqueness by appending id suffix on collisions
WITH d AS (
  SELECT id, slug,
    row_number() OVER (PARTITION BY slug ORDER BY created_at) AS rn
  FROM public.discount_offers
)
UPDATE public.discount_offers o
SET slug = o.slug || '-' || substr(o.id::text,1,6)
FROM d
WHERE d.id = o.id AND d.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS discount_offers_slug_key ON public.discount_offers(slug);
