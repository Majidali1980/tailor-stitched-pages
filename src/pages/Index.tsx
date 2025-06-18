
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Videos from '@/components/Videos';
import Reviews from '@/components/Reviews';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import Contact from '@/components/Contact';
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
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Videos />
      <Reviews />
      <AnimatedDesignPromo />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
