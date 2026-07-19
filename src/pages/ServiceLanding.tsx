import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SeoLandingPage, { type SeoLandingPageProps } from '@/components/SeoLandingPage';
import { serviceLandingPages } from '@/data/serviceLandingPages';
import { supabase } from '@/integrations/supabase/client';

type DbRow = {
  slug: string;
  service_name: string | null;
  title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  h1: string | null;
  intro: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  highlights: string[] | null;
  sections: { heading: string; body: string }[] | null;
  faqs: { q: string; a: string }[] | null;
  testimonials: SeoLandingPageProps['testimonials'] | null;
  images: SeoLandingPageProps['images'] | null;
  related_services: SeoLandingPageProps['relatedServices'] | null;
  related_reads: SeoLandingPageProps['relatedReads'] | null;
  is_active: boolean;
};

const ServiceLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const [row, setRow] = useState<DbRow | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('service_pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => setRow((data as unknown as DbRow | null) ?? null));
  }, [slug]);

  if (!slug) return <Navigate to="/services" replace />;
  const fallback = serviceLandingPages[slug];
  if (row === undefined) return null; // loading
  if (row && row.is_active === false) return <Navigate to="/services" replace />;
  if (!row && !fallback) return <Navigate to="/services" replace />;

  const merged: Omit<SeoLandingPageProps, 'slug'> = {
    title: row?.title || fallback?.title || 'Stitching Service | Ma Tailor',
    metaDescription: row?.meta_description || fallback?.metaDescription || '',
    metaKeywords: row?.meta_keywords || fallback?.metaKeywords,
    h1: row?.h1 || fallback?.h1 || row?.service_name || 'Stitching Service',
    serviceName: row?.service_name || fallback?.serviceName || 'Stitching Service',
    intro: row?.intro || fallback?.intro || '',
    highlights: row?.highlights?.length ? row.highlights : fallback?.highlights || [],
    sections: row?.sections?.length ? row.sections : fallback?.sections || [],
    faqs: row?.faqs?.length ? row.faqs : fallback?.faqs || [],
    heroImage: row?.hero_image_url
      ? { src: row.hero_image_url, alt: row.hero_image_alt || row.service_name || '' }
      : fallback?.heroImage,
    images: row?.images?.length ? row.images : fallback?.images,
    testimonials: row?.testimonials?.length ? row.testimonials : fallback?.testimonials,
    relatedServices: row?.related_services?.length ? row.related_services : fallback?.relatedServices,
    relatedReads: row?.related_reads?.length ? row.related_reads : fallback?.relatedReads,
  };

  return <SeoLandingPage slug={`services/${slug}`} {...merged} />;
};

export default ServiceLanding;
