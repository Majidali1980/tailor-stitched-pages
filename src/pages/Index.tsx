import Navbar from '@/components/Navbar';
import DynamicHero from '@/components/DynamicHero';
import HeroCarousel from '@/components/HeroCarousel';
import HomepageCarousel from '@/components/HomepageCarousel';
import NotificationBar from '@/components/NotificationBar';
import LatestDesignsCarousel from '@/components/LatestDesignsCarousel';
import DiscountOffers from '@/components/DiscountOffers';
import { HeroSectionServices } from '@/components/HeroSectionServices';
import StitchedDressCarousel from '@/components/StitchedDressCarousel';
import LittleStitch from '@/components/LittleStitch';
import { HeroSectionLittleStitch } from '@/components/HeroSectionLittleStitch';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import SocialMediaFeed from '@/components/SocialMediaFeed';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import TailorAssistant from '@/components/TailorAssistant';
import { LatestJobListings } from '@/components/LatestJobListings';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // Add favicon dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://github.com/Majidali1980/lmages/blob/main/Black%20Gold%20Elegant%20Jewelry%20Logo.png?raw=true';
    link.type = 'image/png';
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ma Tailor",
    "description": "Online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery.",
    "url": "https://matailor.lovable.app",
    "telephone": "+92-307-0125273",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK",
      "addressRegion": "Punjab"
    },
    "priceRange": "$$",
    "image": "https://matailor.lovable.app/og-image.jpg",
    "sameAs": [
      "https://www.facebook.com/matailor",
      "https://www.instagram.com/matailor"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tailoring Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Girls Stitching",
            "description": "Premium custom tailoring services for girls with perfect fit"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Ma Tailor – Online Girls Stitching Shop in Pakistan</title>
        <meta name="description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery by Ma Tailor." />
        <meta name="keywords" content="online girls tailoring Pakistan, custom stitching for girls, ladies tailor online, Ma Tailor Pakistan, girls stitched dresses, online tailor Karachi, online tailor Lahore, online tailor Islamabad" />
        <link rel="canonical" href="https://matailor.lovable.app/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Ma Tailor – Online Girls Stitching Shop in Pakistan" />
        <meta property="og:description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/" />
        <meta property="og:image" content="https://matailor.lovable.app/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ma Tailor – Online Girls Stitching Shop in Pakistan" />
        <meta name="twitter:description" content="Order online custom stitching for girls in Pakistan. Perfect fit, elegant designs, fast delivery." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Online Girls Tailoring & Stitching Services in Pakistan</h1>
        <Navbar />
        <DynamicHero />
        <DiscountOffers />
        <HeroCarousel />
        <HomepageCarousel />
        <NotificationBar />
        <LatestDesignsCarousel />
        <HeroSectionServices />
        <StitchedDressCarousel />
        
        <LittleStitch />
        <HeroSectionLittleStitch />
        <LatestJobListings />
        <AnimatedDesignPromo />
        <SocialMediaButtons />
        <SocialMediaFeed />
        <NewsletterSubscription />
        <Footer />
        <WhatsAppFloat />
        <TailorAssistant />
      </div>
    </>
  );
};

export default Index;
