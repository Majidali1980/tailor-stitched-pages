
import Navbar from '@/components/Navbar';
import DynamicHero from '@/components/DynamicHero';
import LatestDesignsCarousel from '@/components/LatestDesignsCarousel';
import Services from '@/components/Services';
import BulkOrders from '@/components/BulkOrders';
import LittleStitch from '@/components/LittleStitch';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import Footer from '@/components/Footer';
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
      <LatestDesignsCarousel />
      <Services />
      <BulkOrders />
      <LittleStitch />
      <AnimatedDesignPromo />
      <Footer />
    </div>
  );
};

export default Index;
