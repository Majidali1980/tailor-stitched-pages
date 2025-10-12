-- Create ai_gallery table for carousel images
CREATE TABLE public.ai_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text NOT NULL,
  description text,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.ai_gallery ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active ai_gallery items"
ON public.ai_gallery
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admin can manage ai_gallery"
ON public.ai_gallery
FOR ALL
USING (true)
WITH CHECK (true);

-- Create design_requests table for AI generated designs
CREATE TABLE public.design_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  prompt text NOT NULL,
  dress_type text,
  fabric_type text,
  neck_design text,
  sleeve_design text,
  bottom_style text,
  additional_notes text,
  generated_image_url text,
  suggestions text,
  timestamp timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.design_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own design requests"
ON public.design_requests
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create design requests"
ON public.design_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin can manage design_requests"
ON public.design_requests
FOR ALL
USING (true);