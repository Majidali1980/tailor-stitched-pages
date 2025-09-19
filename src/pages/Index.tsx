
import Navbar from '@/components/Navbar';
import DynamicHero from '@/components/DynamicHero';
import HeroCarousel from '@/components/HeroCarousel';
import LatestDesignsCarousel from '@/components/LatestDesignsCarousel';
import Services from '@/components/Services';
import DiscountOffers from '@/components/DiscountOffers';

import StitchedDressCarousel from '@/components/StitchedDressCarousel';
import LittleStitch from '@/components/LittleStitch';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import SocialMediaFeed from '@/components/SocialMediaFeed';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AIImageDisclaimer from '@/components/AIImageDisclaimer';
import { useEffect } from 'react';

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
  
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <DynamicHero />
      <DiscountOffers />
      <HeroCarousel />
      <AIImageDisclaimer />
      <LatestDesignsCarousel />
      <Services />
      <StitchedDressCarousel />
      
      <LittleStitch />
      <AnimatedDesignPromo />
      <SocialMediaButtons />
      <SocialMediaFeed />
      <NewsletterSubscription />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
