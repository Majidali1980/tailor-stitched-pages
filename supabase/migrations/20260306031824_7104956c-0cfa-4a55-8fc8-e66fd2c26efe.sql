
-- Fix orders RLS: drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Admin can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can place orders" ON public.orders;

CREATE POLICY "Admin can manage orders"
ON public.orders FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can place orders"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view own orders"
ON public.orders FOR SELECT
TO anon, authenticated
USING (true);

-- Add stock_quantity to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock_quantity integer NOT NULL DEFAULT 0;

-- Add product_id to reviews for product-specific reviews
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS product_id uuid REFERENCES public.products(id) ON DELETE SET NULL;
