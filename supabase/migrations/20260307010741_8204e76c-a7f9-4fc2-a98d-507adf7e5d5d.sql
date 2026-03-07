
-- Add discount columns to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS discount_price numeric DEFAULT NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT NULL;

-- Add tracking columns to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number text DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_url text DEFAULT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS estimated_delivery text DEFAULT NULL;
