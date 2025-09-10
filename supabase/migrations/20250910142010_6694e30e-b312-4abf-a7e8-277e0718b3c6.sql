-- Create price_list table
CREATE TABLE public.price_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  service_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.price_list ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to view active items
CREATE POLICY "Public can view active price list items" 
ON public.price_list 
FOR SELECT 
USING (is_active = true);

-- Create policy for admin to manage all price list items
CREATE POLICY "Admin can manage price list" 
ON public.price_list 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_price_list_updated_at
BEFORE UPDATE ON public.price_list
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data based on the image
INSERT INTO public.price_list (category, service_name, price, display_order) VALUES
-- Ladies Suits
('Ladies Suits', 'Simple Suit', 1200, 1),
('Ladies Suits', 'Dori Piping', 1500, 2),
('Ladies Suits', 'Finishing / Pattawa', 1500, 3),
('Ladies Suits', 'Lace With Finishing', 1800, 4),
('Ladies Suits', 'Lining Suit', 2500, 5),
('Ladies Suits', 'Lining With Dori Piping', 2800, 6),

-- Shirt - Dopatta - Trouser
('Shirt - Dopatta - Trouser', 'Simple Shirt', 800, 7),
('Shirt - Dopatta - Trouser', 'Dori Piping Shirt', 1000, 8),
('Shirt - Dopatta - Trouser', 'Dopatta Pallu', 100, 9),
('Shirt - Dopatta - Trouser', 'Dopatta Dori Piping / Lace', 600, 10),
('Shirt - Dopatta - Trouser', 'Simple Trouser / Shalwar', 600, 11),

-- Kids Suits
('Kids Suits', 'Simple Suit', 800, 12),
('Kids Suits', 'Dori Piping Suit', 1000, 13);