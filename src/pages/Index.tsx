
import Navbar from '@/components/Navbar';
import DynamicHero from '@/components/DynamicHero';
import HeroCarousel from '@/components/HeroCarousel';
import HomepageCarousel from '@/components/HomepageCarousel';
import NotificationBar from '@/components/NotificationBar';
import LatestDesignsCarousel from '@/components/LatestDesignsCarousel';
import Services from '@/components/Services';
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
import { SubscribePopup } from '@/components/SubscribePopup';
import { LatestJobListings } from '@/components/LatestJobListings';
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
      <HomepageCarousel />
      <NotificationBar />
      <LatestDesignsCarousel />
      <Services />
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
      <SubscribePopup />
    </div>
  );
};

export default Index;
