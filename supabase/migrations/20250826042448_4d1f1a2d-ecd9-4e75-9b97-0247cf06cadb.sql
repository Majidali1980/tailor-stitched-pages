
-- Add the missing link column to the latest_designs table
ALTER TABLE public.latest_designs ADD COLUMN IF NOT EXISTS link text;
