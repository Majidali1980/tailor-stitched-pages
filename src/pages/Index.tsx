
import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CinematicHero from '@/components/CinematicHero';
import BentoShowcase from '@/components/BentoShowcase';
import { Helmet } from 'react-helmet-async';
import DynamicPromotionalBanner from '@/components/DynamicPromotionalBanner';
import DigitalServicesBanner from '@/components/DigitalServicesBanner';
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
  
  
  const SERVICE_LIST = [
    'Custom Stitching',
    'Alterations & Repairs',
    'Formal & Occasion Wear',
    'Bridal Dress Stitching',
    'Shalwar Kameez Stitching',
    'Doorstep Measurement & Pick and Drop',
  ];

  const SERVICE_AREAS = [
    'Mahmoodabad',
    'DHA',
    'Falcon Faisal',
    'Baloch Colony',
    'Admin Society',
    'PECHS Block 6',
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://matailor.lovable.app/#localbusiness",
    "name": "MA Tailor",
    "description": "Custom-fit stitching, alterations and formal wear by expert tailors in Karachi, with easy online booking and doorstep pick and drop.",
    "url": "https://matailor.lovable.app",
    "telephone": "+92 3070125273",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mahmoodabad #04",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "addressCountry": "PK"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 24.8607, "longitude": 67.0426 },
    "areaServed": SERVICE_AREAS.map((name) => ({ "@type": "Place", "name": `${name}, Karachi` })),
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "21:00"
    }],
    "priceRange": "$$",
    "image": "https://matailor.lovable.app/og-image.jpg",
    "sameAs": ["https://www.facebook.com/matailor", "https://www.instagram.com/matailor"],
    "makesOffer": SERVICE_LIST.map((name) => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": name, "areaServed": { "@type": "City", "name": "Karachi" } }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tailoring services in Karachi",
      "itemListElement": SERVICE_LIST.map((name) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": name }
      }))
    }
  };

  const title = 'Ma Tailor — Custom Stitching & Tailoring in Karachi | Book Online';
  const description = 'Get custom-fit stitching and alterations from expert tailors in Karachi. Easy online booking, fast turnaround. Book your fitting today.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ladies tailor Karachi, best ladies tailor Karachi, online tailoring service Karachi, designer tailor Karachi, bridal stitching Karachi, home measurement tailor Karachi, custom stitching Karachi, Pakistani dress tailor" />
        <link rel="canonical" href="https://matailor.lovable.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/" />
        <meta property="og:image" content="https://matailor.lovable.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Custom Tailoring & Online Stitching Services</h1>
        <h2 className="sr-only">Online Tailor & Stitching Unit Near Me — Custom Suit Fitting with Door-to-Door Pickup</h2>
        <Navbar />
        <DynamicPromotionalBanner />
        <CinematicHero />
        <Suspense fallback={<SectionFallback />}>
          <DigitalServicesBanner variant="compact" />
          <BentoShowcase />
          <HeroCarousel />
          {orderedKeys.map((key) => {
            const Comp = SECTION_COMPONENTS[key];
            return Comp ? <Comp key={key} /> : null;
          })}
          <DigitalServicesBanner />
          <AnimatedDesignPromo />
          <SocialMediaButtons />
          <SocialMediaFeed />
          <DigitalServicesBanner variant="compact" />
          <NewsletterSubscription />
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
