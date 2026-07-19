
WITH candidates AS (
  SELECT id, slug,
    substring(
      trim(both '-' from regexp_replace(
        regexp_replace(lower(title), '[^a-z0-9\s\-]', '', 'g'),
        '[\s_\-]+', '-', 'g'
      ))
      from 1 for 70
    ) AS base_slug
  FROM public.blog
  WHERE slug ~ '^design_' OR slug IN ('plazo','deep_neck','girls_kurta')
),
numbered AS (
  SELECT id, base_slug,
    row_number() OVER (PARTITION BY base_slug ORDER BY id) AS rn
  FROM candidates
)
UPDATE public.blog b
SET slug = CASE WHEN n.rn = 1 THEN n.base_slug ELSE n.base_slug || '-' || n.rn END
FROM numbered n
WHERE b.id = n.id;
