-- Create enum for discount_type
CREATE TYPE discount_type_enum AS ENUM ('flat', 'percent', 'free_item');

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_type discount_type_enum NOT NULL,
  discount_value NUMERIC NOT NULL DEFAULT 0,
  valid_days TEXT[],
  min_order NUMERIC NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create policies for coupons
CREATE POLICY "Admin can manage coupons" 
ON public.coupons 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view active coupons" 
ON public.coupons 
FOR SELECT 
USING (active = true);

-- Create stitching_services table
CREATE TABLE public.stitching_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  service_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for stitching_services
ALTER TABLE public.stitching_services ENABLE ROW LEVEL SECURITY;

-- Create policies for stitching_services
CREATE POLICY "Admin can manage stitching services" 
ON public.stitching_services 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can view stitching services" 
ON public.stitching_services 
FOR SELECT 
USING (true);

-- Update appointments table
ALTER TABLE public.appointments 
DROP COLUMN IF EXISTS design_size;

ALTER TABLE public.appointments 
ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1,
ADD COLUMN price NUMERIC NOT NULL DEFAULT 0,
ADD COLUMN dc_charges NUMERIC NOT NULL DEFAULT 0,
ADD COLUMN amount_summary NUMERIC NOT NULL DEFAULT 0;

-- Insert coupons
INSERT INTO public.coupons (title, description, discount_type, discount_value, valid_days, min_order) VALUES
('Free Dopatta Dori Piping or Lace', 'Get Stitch 3 Lining With Dori Piping Suit & Get 1 Dopatta Dori Piping Or Lace Free', 'free_item', 0, NULL, 3),
('Weekend Offer', 'Saturday & Sunday only – Flat 15% OFF on all ladies Simple suits stitching', 'percent', 15, ARRAY['Saturday', 'Sunday'], 0),
('First Order Discount', 'On 1st Order of all the Stitching', 'percent', 10, NULL, 0);

-- Insert stitching services
INSERT INTO public.stitching_services (category, service_name, price) VALUES
-- Ladies Suits
('Ladies Suits', 'SIMPLE SUIT', 1200),
('Ladies Suits', 'DORI PIPING', 1500),
('Ladies Suits', 'FINISHING / PALTAWA', 1500),
('Ladies Suits', 'LACE WITH FINISHING', 1800),
('Ladies Suits', 'LINING SUIT', 2500),
('Ladies Suits', 'LINING WITH DORI PIPING', 3000),

-- Shirt, Dopatta & Trouser
('Shirt, Dopatta & Trouser', 'SIMPLE SHIRT', 800),
('Shirt, Dopatta & Trouser', 'DORI PIPING SHIRT', 1000),
('Shirt, Dopatta & Trouser', 'DOPATTA PALLU', 100),
('Shirt, Dopatta & Trouser', 'DOPATTA DORI PIPING OR LACE', 600),
('Shirt, Dopatta & Trouser', 'SIMPLE TROUSER / SHALWAR', 600),

-- Kids
('Kids', 'SIMPLE SUIT', 800),
('Kids', 'DORI PIPING SUIT', 1000);