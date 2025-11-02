-- Create career_jobs table
CREATE TABLE public.career_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location TEXT,
  job_type TEXT, -- full-time, part-time, contract
  salary_range TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.career_jobs(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewed, shortlisted, rejected
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hero_section_services table (hero below services)
CREATE TABLE public.hero_section_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hero_section_little_stitch table (hero below little stitch)
CREATE TABLE public.hero_section_little_stitch (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.career_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section_little_stitch ENABLE ROW LEVEL SECURITY;

-- RLS Policies for career_jobs
CREATE POLICY "Public can view active jobs"
  ON public.career_jobs
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage jobs"
  ON public.career_jobs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for job_applications
CREATE POLICY "Anyone can submit applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can manage applications"
  ON public.job_applications
  FOR ALL
  USING (true);

-- RLS Policies for hero_section_services
CREATE POLICY "Public can view active hero services"
  ON public.hero_section_services
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage hero services"
  ON public.hero_section_services
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for hero_section_little_stitch
CREATE POLICY "Public can view active hero little stitch"
  ON public.hero_section_little_stitch
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage hero little stitch"
  ON public.hero_section_little_stitch
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_career_jobs_updated_at
  BEFORE UPDATE ON public.career_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hero_section_services_updated_at
  BEFORE UPDATE ON public.hero_section_services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hero_section_little_stitch_updated_at
  BEFORE UPDATE ON public.hero_section_little_stitch
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();