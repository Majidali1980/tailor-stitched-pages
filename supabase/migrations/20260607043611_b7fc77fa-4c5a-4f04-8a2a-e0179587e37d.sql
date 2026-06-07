
-- Booking images: restrict storage.objects SELECT to admins (sensitive customer uploads)
DROP POLICY IF EXISTS "Booking images admin select" ON storage.objects;
CREATE POLICY "Booking images admin select"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'booking-images' AND public.has_role(auth.uid(), 'admin'));

-- Review images: explicit public SELECT (intentional, shown on public reviews page)
DROP POLICY IF EXISTS "Review images public select" ON storage.objects;
CREATE POLICY "Review images public select"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'review-images');
