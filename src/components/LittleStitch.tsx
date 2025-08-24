
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

const LittleStitch = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-gold mr-3" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              Introducing <span className="text-gold">Little Stitch</span>
            </h2>
            <Sparkles className="h-8 w-8 text-gold ml-3" />
          </div>
          
          <p className="text-xl font-montserrat text-gray-300 max-w-2xl mx-auto">
            An adorable online baby girls stitched shop
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="fancy-border p-1 max-w-md mx-auto">
              <div className="bg-black p-4 rounded-lg">
                <img 
                  src="https://i.postimg.cc/C1dK0q0T/Untitled-500-x-500-px.png" 
                  alt="Little Stitch Logo - Baby Girls Clothing" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="bg-gradient-to-r from-gold/20 to-transparent p-8 rounded-lg border border-gold/30">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Heart className="h-6 w-6 text-gold mr-2" />
                <span className="text-2xl font-playfair font-bold text-gold">Now Open for Orders</span>
              </div>
              
              <h3 className="text-3xl font-playfair font-bold mb-4">
                Beautiful Stitched Outfits for Little Girls
              </h3>
              
              <p className="text-lg font-montserrat text-gray-300 mb-6">
                Get ready for our newest venture! Little Stitch will offer exquisitely crafted baby girls' clothing with the same attention to detail and quality that MA Tailor is known for.
              </p>

              <div className="mb-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <p className="text-gold font-montserrat font-semibold text-center">
                  Now accepting orders for little girls age 4 years to 15 years
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="h-1 w-6 bg-gold mr-3"></div>
                  <p className="font-montserrat text-white">Adorable Baby Girl Dresses</p>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="h-1 w-6 bg-gold mr-3"></div>
                  <p className="font-montserrat text-white">Premium Quality Fabrics</p>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="h-1 w-6 bg-gold mr-3"></div>
                  <p className="font-montserrat text-white">Safe & Comfortable Designs</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <a 
                  href="https://littlestitchpk.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gold font-montserrat font-semibold hover:text-gold-light transition-colors"
                >
                  Visit Little Stitch Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-10 right-10 h-20 w-20 bg-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 h-16 w-16 bg-gold/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default LittleStitch;
