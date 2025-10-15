-- Add photo upload support and approval status to reviews table
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Update existing reviews to be approved
UPDATE public.reviews 
SET status = 'approved', approved_at = NOW()
WHERE is_active = true;

-- Create storage bucket for review photos if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for review images
CREATE POLICY "Anyone can upload review images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'review-images');

CREATE POLICY "Review images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'review-images');

-- Update RLS policy for viewing reviews to check approved status
DROP POLICY IF EXISTS "Public can view active reviews" ON public.reviews;

CREATE POLICY "Public can view approved reviews"
ON public.reviews FOR SELECT
TO public
USING (is_active = true AND status = 'approved');

-- Allow anyone to insert reviews (will be pending by default)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews FOR INSERT
TO public
WITH CHECK (true);