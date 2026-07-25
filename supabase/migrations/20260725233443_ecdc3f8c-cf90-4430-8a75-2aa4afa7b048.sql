
CREATE TABLE public.seo_coverage_snapshots (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  total integer not null default 0,
  indexed_count integer not null default 0,
  not_indexed_count integer not null default 0,
  results jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users(id) on delete set null
);
GRANT SELECT, INSERT, DELETE ON public.seo_coverage_snapshots TO authenticated;
GRANT ALL ON public.seo_coverage_snapshots TO service_role;
ALTER TABLE public.seo_coverage_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read snapshots" ON public.seo_coverage_snapshots FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert snapshots" ON public.seo_coverage_snapshots FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete snapshots" ON public.seo_coverage_snapshots FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.seo_sitemap_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sitemap_url text not null,
  status text not null,
  http_status integer,
  url_count integer,
  message text,
  submitted_by uuid references auth.users(id) on delete set null
);
GRANT SELECT, INSERT ON public.seo_sitemap_submissions TO authenticated;
GRANT ALL ON public.seo_sitemap_submissions TO service_role;
ALTER TABLE public.seo_sitemap_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read submissions" ON public.seo_sitemap_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert submissions" ON public.seo_sitemap_submissions FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
