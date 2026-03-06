
-- brands table
CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active brands" ON public.brands FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage brands" ON public.brands FOR ALL USING (true) WITH CHECK (true);

-- fabric_details table
CREATE TABLE public.fabric_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  composition text,
  care_instructions text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fabric_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active fabrics" ON public.fabric_details FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage fabrics" ON public.fabric_details FOR ALL USING (true) WITH CHECK (true);

-- Add new columns to products
ALTER TABLE public.products
  ADD COLUMN brand_id uuid REFERENCES public.brands(id),
  ADD COLUMN category text,
  ADD COLUMN shirt_details jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN trouser_details jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN dopatta_details jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN fabric_detail_id uuid REFERENCES public.fabric_details(id);
