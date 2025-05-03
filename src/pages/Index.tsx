
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import AnimatedDesignPromo from '@/components/AnimatedDesignPromo';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
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
