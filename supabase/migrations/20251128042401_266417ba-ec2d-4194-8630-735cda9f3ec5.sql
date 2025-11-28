-- Create table for banner analytics
CREATE TABLE IF NOT EXISTS public.banner_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  banner_id uuid NOT NULL REFERENCES public.promotional_banners(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('impression', 'click', 'dismissal', 'conversion')),
  session_id text,
  conversion_goal text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_banner_analytics_banner_id ON public.banner_analytics(banner_id);
CREATE INDEX idx_banner_analytics_event_type ON public.banner_analytics(event_type);
CREATE INDEX idx_banner_analytics_created_at ON public.banner_analytics(created_at);

-- Enable RLS
ALTER TABLE public.banner_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can insert analytics events"
  ON public.banner_analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can view analytics"
  ON public.banner_analytics
  FOR SELECT
  USING (true);

-- Add comment
COMMENT ON TABLE public.banner_analytics IS 'Stores A/B testing metrics for promotional banners including impressions, clicks, dismissals, and conversions';