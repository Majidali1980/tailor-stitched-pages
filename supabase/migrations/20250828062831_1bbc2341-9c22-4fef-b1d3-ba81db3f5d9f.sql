-- Create storage bucket for booking images
INSERT INTO storage.buckets (id, name, public) VALUES ('booking-images', 'booking-images', true);

-- Create policies for booking-images bucket
CREATE POLICY "Anyone can upload booking images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'booking-images');

CREATE POLICY "Anyone can view booking images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'booking-images');

CREATE POLICY "Anyone can update booking images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'booking-images');

CREATE POLICY "Anyone can delete booking images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'booking-images');

-- Update appointments table to handle multiple images
ALTER TABLE appointments ADD COLUMN uploaded_images JSONB DEFAULT '[]'::jsonb;