
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_search_engines_on_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  target_url text;
  base_url text := 'https://matailor.lovable.app';
  fn_url text := 'https://nqbvlbtvmesjhgstznhe.supabase.co/functions/v1/notify-search-engines';
BEGIN
  -- Build the public URL for the changed row based on the source table.
  IF TG_TABLE_NAME = 'blog' THEN
    IF COALESCE(NEW.is_published, false) IS DISTINCT FROM true THEN
      RETURN NEW;
    END IF;
    target_url := base_url || '/blog/' || NEW.slug;
  ELSIF TG_TABLE_NAME = 'service_pages' THEN
    IF COALESCE(NEW.is_active, false) IS DISTINCT FROM true THEN
      RETURN NEW;
    END IF;
    target_url := base_url || '/services/' || NEW.slug;
  ELSIF TG_TABLE_NAME = 'discount_offers' THEN
    IF COALESCE(NEW.is_active, false) IS DISTINCT FROM true THEN
      RETURN NEW;
    END IF;
    target_url := base_url || '/special-discount-offers/' || NEW.slug;
  ELSIF TG_TABLE_NAME = 'gallery' THEN
    target_url := base_url || '/gallery';
  ELSIF TG_TABLE_NAME = 'hero_section' THEN
    target_url := base_url || '/';
  ELSE
    target_url := base_url || '/';
  END IF;

  PERFORM extensions.http_post(
    url := fn_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'urls', jsonb_build_array(target_url, base_url || '/sitemap.xml')
    )
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block the write if the ping fails.
  RETURN NEW;
END;
$$;

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['blog', 'gallery', 'service_pages', 'discount_offers', 'hero_section']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_notify_search_engines ON public.%I', t);
    EXECUTE format(
      'CREATE TRIGGER trg_notify_search_engines
         AFTER INSERT OR UPDATE ON public.%I
         FOR EACH ROW EXECUTE FUNCTION public.notify_search_engines_on_change()',
      t
    );
  END LOOP;
END $$;
