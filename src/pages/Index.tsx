
import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CinematicHero from '@/components/CinematicHero';
import BentoShowcase from '@/components/BentoShowcase';
import { Helmet } from 'react-helmet-async';
import DynamicPromotionalBanner from '@/components/DynamicPromotionalBanner';
import { supabase } from '@/integrations/supabase/client';

// Lazy load below-fold components
const HeroCarousel = lazy(() => import('@/components/HeroCarousel'));
const HomepageCarousel = lazy(() => import('@/components/HomepageCarousel'));
const NotificationBar = lazy(() => import('@/components/NotificationBar'));
const LatestDesignsCarousel = lazy(() => import('@/components/LatestDesignsCarousel'));

const HeroSectionServices = lazy(() => import('@/components/HeroSectionServices').then(m => ({ default: m.HeroSectionServices })));
const StitchedDressCarousel = lazy(() => import('@/components/StitchedDressCarousel'));
const GalleryCategoriesShowcase = lazy(() => import('@/components/GalleryCategoriesShowcase'));

const HeroSectionLittleStitch = lazy(() => import('@/components/HeroSectionLittleStitch').then(m => ({ default: m.HeroSectionLittleStitch })));
const AnimatedDesignPromo = lazy(() => import('@/components/AnimatedDesignPromo'));
const ProductShowcase = lazy(() => import('@/components/ProductShowcase'));
const SocialMediaButtons = lazy(() => import('@/components/SocialMediaButtons'));
const SocialMediaFeed = lazy(() => import('@/components/SocialMediaFeed'));
const NewsletterSubscription = lazy(() => import('@/components/NewsletterSubscription'));
const Footer = lazy(() => import('@/components/Footer'));
const WhatsAppFloat = lazy(() => import('@/components/WhatsAppFloat'));
const TailorAssistant = lazy(() => import('@/components/TailorAssistant'));


const SectionFallback = () => <div className="min-h-[100px]" />;

// Map admin section_key -> rendered component
const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  notification_bar: NotificationBar,
  homepage_carousel: HomepageCarousel,
  latest_designs: LatestDesignsCarousel,
  hero_services: HeroSectionServices,
  stitched_dress: StitchedDressCarousel,
  gallery: GalleryCategoriesShowcase,
  products: ProductShowcase,
  hero_little_stitch: HeroSectionLittleStitch,
};

// Default order for keys not present in DB (or as fallback)
const DEFAULT_ORDER = [
  'notification_bar',
  'homepage_carousel',
  'latest_designs',
  'hero_services',
  'stitched_dress',
  'gallery',
  'products',
  'hero_little_stitch',
];


const Index = () => {
  const [orderedKeys, setOrderedKeys] = useState<string[]>(DEFAULT_ORDER);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/logo.png';
    link.type = 'image/png';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('homepage_sections')
        .select('section_key, display_order, is_visible')
        .order('display_order', { ascending: true });
      if (cancelled || !data) return;
      const visible = data
        .filter((s: { section_key: string; is_visible: boolean }) =>
          s.is_visible !== false && s.section_key in SECTION_COMPONENTS,
        )
        .map((s: { section_key: string }) => s.section_key);
      // Append any mapped keys missing from DB so nothing disappears silently
      for (const k of DEFAULT_ORDER) if (!visible.includes(k) && !data.some((d: { section_key: string }) => d.section_key === k)) visible.push(k);
      setOrderedKeys(visible);
    })();
    return () => { cancelled = true; };
  }, []);
  
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MA Tailor",
    "description": "Best ladies tailor in Karachi offering premium online stitching services, designer dresses, bridal wear, custom tailoring, and home measurement services.",
    "url": "https://matailor.lovable.app",
    "telephone": "+92-307-0125273",
    "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK", "addressRegion": "Sindh" },
    "areaServed": { "@type": "City", "name": "Karachi" },
    "priceRange": "$$",
    "image": "https://matailor.lovable.app/og-image.jpg",
    "sameAs": ["https://www.facebook.com/matailor", "https://www.instagram.com/matailor"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ladies Tailoring Services Karachi",
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Ladies Tailor Karachi", "description": "Online ladies tailoring service in Karachi — designer dresses, bridal wear, custom stitching, and home measurement." }
      }]
    }
  };

  return (
    <>
      <Helmet>
        <title>Best Ladies Tailor in Karachi | Online Stitching Services | MA Tailor</title>
        <meta name="description" content="Looking for the best ladies tailor in Karachi? MA Tailor offers premium online stitching services, designer dresses, bridal wear, custom tailoring, and home measurement services." />
        <meta name="keywords" content="ladies tailor Karachi, best ladies tailor Karachi, online tailoring service Karachi, designer tailor Karachi, bridal stitching Karachi, home measurement tailor Karachi, custom stitching Karachi, Pakistani dress tailor" />
        <link rel="canonical" href="https://matailor.lovable.app/" />
        <meta property="og:title" content="Best Ladies Tailor in Karachi | Online Stitching Services | MA Tailor" />
        <meta property="og:description" content="Premium online stitching services in Karachi — designer dresses, bridal wear, custom tailoring, and home measurement services by MA Tailor." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/" />
        <meta property="og:image" content="https://matailor.lovable.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Ladies Tailor in Karachi | Online Stitching Services | MA Tailor" />
        <meta name="twitter:description" content="Premium online stitching services in Karachi — designer dresses, bridal wear, custom tailoring, and home measurement services by MA Tailor." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Online Girls Tailoring & Stitching Services in Pakistan</h1>
        <Navbar />
        <DynamicPromotionalBanner />
        <CinematicHero />
        <Suspense fallback={<SectionFallback />}>
          <BentoShowcase />
          <HeroCarousel />
          {orderedKeys.map((key) => {
            const Comp = SECTION_COMPONENTS[key];
            return Comp ? <Comp key={key} /> : null;
          })}
          <AnimatedDesignPromo />
          <SocialMediaButtons />
          <SocialMediaFeed />
          <NewsletterSubscription />
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
