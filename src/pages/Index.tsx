
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  // Add favicon dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/lovable-uploads/4c6c652a-5b93-408d-8892-2ac96138beb4.png';
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
      <AnimatedDesignPromo />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
