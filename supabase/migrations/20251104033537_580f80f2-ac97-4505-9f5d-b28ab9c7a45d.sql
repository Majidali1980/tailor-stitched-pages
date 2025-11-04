
-- Add image height and width columns to hero_section_services table
ALTER TABLE hero_section_services 
ADD COLUMN image_height text DEFAULT '160px',
ADD COLUMN image_width text DEFAULT '100%';

COMMENT ON COLUMN hero_section_services.image_height IS 'CSS height value for the image (e.g., 160px, 400px, 50vh)';
COMMENT ON COLUMN hero_section_services.image_width IS 'CSS width value for the image (e.g., 100%, 1920px, auto)';
