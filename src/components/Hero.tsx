
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Hero = () => {
  const whatsappLink = "https://wa.me/923070125273";

  return (
    <section id="home" className="pt-24 min-h-[85vh] bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gold-gradient opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gold-gradient opacity-5 transform rotate-180"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
                <span className="block">Expert</span>
                <span className="gold-gradient-text">Stitching Services</span>
                <span className="block">For Ladies</span>
              </h1>
              <p className="text-lg md:text-xl font-montserrat text-gray-300 mt-6">
                <a href={whatsappLink} className="hover:text-gold transition-colors">
                  EXPERT IN ALL TYPES OF STITCHING
                </a> with care for all your tailoring needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat text-lg py-6 px-8 flex items-center gap-2">
                  <Phone className="h-5 w-5" /> Book Appointment
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 font-montserrat text-lg py-6 px-8">
                  View Services
                </Button>
              </a>
            </div>
            
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">15+</span>
                <span className="text-sm font-montserrat text-gray-300">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">500+</span>
                <span className="text-sm font-montserrat text-gray-300">Satisfied Clients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">100%</span>
                <span className="text-sm font-montserrat text-gray-300">Quality Guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="relative fancy-border bg-black rounded-lg overflow-hidden animate-fade-in hover-scale max-w-md mx-auto">
            <img 
              src="https://github.com/Majidali1980/lmages/blob/main/WhatsApp%20Image%202025-05-01%20at%209.10.08%20AM.jpeg?raw=true" 
              alt="MA Tailor Design" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="text-center p-6 bg-black bg-opacity-70 rounded-lg">
                <h2 className="text-xl font-playfair font-bold text-gold mb-1">Expertly Stitched With Care</h2>
                <p className="text-md font-montserrat text-white">Elegant & Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
