
-- Add category column to the gallery table
ALTER TABLE public.gallery 
ADD COLUMN category text DEFAULT 'uncategorized';

-- Update existing records with some sample categories
UPDATE public.gallery 
SET category = 'full-suit' 
WHERE id IN (
  SELECT id FROM public.gallery 
  ORDER BY created_at 
  LIMIT 5
);

UPDATE public.gallery 
SET category = 'shirt' 
WHERE category = 'uncategorized' 
AND id IN (
  SELECT id FROM public.gallery 
  WHERE category = 'uncategorized'
  ORDER BY created_at 
  LIMIT 3
);

UPDATE public.gallery 
SET category = 'neck-design' 
WHERE category = 'uncategorized' 
AND id IN (
  SELECT id FROM public.gallery 
  WHERE category = 'uncategorized'
  ORDER BY created_at 
  LIMIT 3
);

UPDATE public.gallery 
SET category = 'shalwar-kameez' 
WHERE category = 'uncategorized' 
AND id IN (
  SELECT id FROM public.gallery 
  WHERE category = 'uncategorized'
  ORDER BY created_at 
  LIMIT 3
);

UPDATE public.gallery 
SET category = 'girls-suits' 
WHERE category = 'uncategorized';
