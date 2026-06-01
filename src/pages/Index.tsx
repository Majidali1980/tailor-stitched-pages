
import { lazy, Suspense, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DynamicHero from '@/components/DynamicHero';
import { Helmet } from 'react-helmet-async';
import DynamicPromotionalBanner from '@/components/DynamicPromotionalBanner';

// Lazy load below-fold components
const HeroCarousel = lazy(() => import('@/components/HeroCarousel'));
const HomepageCarousel = lazy(() => import('@/components/HomepageCarousel'));
const NotificationBar = lazy(() => import('@/components/NotificationBar'));
const LatestDesignsCarousel = lazy(() => import('@/components/LatestDesignsCarousel'));
const DiscountOffers = lazy(() => import('@/components/DiscountOffers'));
const HeroSectionServices = lazy(() => import('@/components/HeroSectionServices').then(m => ({ default: m.HeroSectionServices })));
const StitchedDressCarousel = lazy(() => import('@/components/StitchedDressCarousel'));
const LittleStitch = lazy(() => import('@/components/LittleStitch'));
const HeroSectionLittleStitch = lazy(() => import('@/components/HeroSectionLittleStitch').then(m => ({ default: m.HeroSectionLittleStitch })));
const AnimatedDesignPromo = lazy(() => import('@/components/AnimatedDesignPromo'));
const ProductShowcase = lazy(() => import('@/components/ProductShowcase'));
const SocialMediaButtons = lazy(() => import('@/components/SocialMediaButtons'));
const SocialMediaFeed = lazy(() => import('@/components/SocialMediaFeed'));
const NewsletterSubscription = lazy(() => import('@/components/NewsletterSubscription'));
const Footer = lazy(() => import('@/components/Footer'));
const WhatsAppFloat = lazy(() => import('@/components/WhatsAppFloat'));
const TailorAssistant = lazy(() => import('@/components/TailorAssistant'));
const LatestJobListings = lazy(() => import('@/components/LatestJobListings').then(m => ({ default: m.LatestJobListings })));

const SectionFallback = () => <div className="min-h-[100px]" />;

const Index = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/logo.png';
    link.type = 'image/png';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ma Tailor",
    "description": "Online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery.",
    "url": "https://matailor.lovable.app",
    "telephone": "+92-307-0125273",
    "address": { "@type": "PostalAddress", "addressCountry": "PK", "addressRegion": "Punjab" },
    "priceRange": "$$",
    "image": "https://matailor.lovable.app/og-image.jpg",
    "sameAs": ["https://www.facebook.com/matailor", "https://www.instagram.com/matailor"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tailoring Services",
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Custom Girls Stitching", "description": "Premium custom tailoring services for girls with perfect fit" }
      }]
    }
  };

  return (
    <>
      <Helmet>
        <title>Ma Tailor – Online Girls Stitching Shop in Pakistan</title>
        <meta name="description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery by Ma Tailor." />
        <meta name="keywords" content="online girls tailoring Pakistan, custom stitching for girls, ladies tailor online, Ma Tailor Pakistan, girls stitched dresses, online tailor Karachi, online tailor Lahore, online tailor Islamabad" />
        <link rel="canonical" href="https://matailor.lovable.app/" />
        <meta property="og:title" content="Ma Tailor – Online Girls Stitching Shop in Pakistan" />
        <meta property="og:description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/" />
        <meta property="og:image" content="https://matailor.lovable.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ma Tailor – Online Girls Stitching Shop in Pakistan" />
        <meta name="twitter:description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Online Girls Tailoring & Stitching Services in Pakistan</h1>
        <Navbar />
        <DynamicPromotionalBanner />
        <DynamicHero />
        <Suspense fallback={<SectionFallback />}>
          <DiscountOffers />
          <HeroCarousel />
          <HomepageCarousel />
          <NotificationBar />
          <LatestDesignsCarousel />
          <HeroSectionServices />
          <StitchedDressCarousel />
          <ProductShowcase />
          <LittleStitch />
          <HeroSectionLittleStitch />
          <LatestJobListings />
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
