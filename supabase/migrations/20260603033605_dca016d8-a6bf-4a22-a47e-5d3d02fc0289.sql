
-- Restrict admin-images bucket write operations to admin users
DROP POLICY IF EXISTS "Admin can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload images" ON storage.objects;

CREATE POLICY "Admins can upload admin images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'admin-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update admin images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'admin-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete admin images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'admin-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));
