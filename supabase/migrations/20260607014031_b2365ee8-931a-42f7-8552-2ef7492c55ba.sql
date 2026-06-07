
-- 1) Restrict Realtime subscriptions to admins
DROP POLICY IF EXISTS "Admins can receive realtime broadcasts" ON realtime.messages;
CREATE POLICY "Admins can receive realtime broadcasts"
ON realtime.messages
FOR SELECT
TO authenticated
USING ( public.has_role((SELECT auth.uid()), 'admin'::public.app_role) );

-- 2) Remove broad public listing on user-uploaded buckets.
--    Public file URLs continue to work because they bypass RLS on public buckets.
DROP POLICY IF EXISTS "Anyone can view booking images" ON storage.objects;
DROP POLICY IF EXISTS "Review images are publicly accessible" ON storage.objects;
