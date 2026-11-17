
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const AnimatedDesignPromo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const vercelSiteLink = "https://matailor-xi.vercel.app/";

  useEffect(() => {
    // Show the component after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`py-8 overflow-hidden relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-95 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gold p-8 rounded-lg shadow-2xl transform hover:scale-[1.01] transition-all duration-500 overflow-hidden">
            
            {/* Floating golden particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-gold/30 animate-float"
                  style={{
                    width: `${Math.random() * 12 + 5}px`,
                    height: `${Math.random() * 12 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 5 + 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left side - Animation */}
              <div className="md:w-1/3 relative">
                <div className="transform transition-transform duration-1000 hover:rotate-3 animate-pulse">
                  <img 
                    src="/logo.png"
                    alt="MA Tailor Logo" 
                    className="max-w-[200px] mx-auto"
                  />
                </div>
                
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
              </div>
              
              {/* Right side - Content */}
              <div className="md:w-2/3 space-y-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold">
                  <span className="text-white">Discover</span> <span className="text-gold animate-pulse">Hundreds More</span> <span className="text-white">Design Options</span>
                </h2>
                
                <p className="text-lg text-gray-300 font-montserrat">
                  Visit our complete design collection featuring exclusive styles, latest trends, and custom design options for all your stitching needs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a href={vercelSiteLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="bg-gradient-to-r from-gold to-gold-dark hover:opacity-90 text-black font-montserrat text-lg py-6 px-8 w-full flex items-center gap-2 shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300">
                      <ExternalLink className="h-5 w-5" /> Explore Full Collection
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedDesignPromo;
