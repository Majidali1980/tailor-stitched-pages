
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  shipping_cost numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can place orders" ON public.orders
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin can manage orders" ON public.orders
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
