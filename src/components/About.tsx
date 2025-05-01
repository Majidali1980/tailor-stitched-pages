
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="fancy-border p-1">
              <div className="bg-black p-6 rounded-lg relative overflow-hidden">
                <img 
                  src="/lovable-uploads/b4b5b7a6-0749-4067-8cc8-1fbb7ea04d6d.png" 
                  alt="MA Tailor Business Card" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-gold rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6">
              About <span className="text-gold">MA Tailor</span>
            </h2>
            
            <p className="text-lg font-montserrat text-gray-300 mb-6">
              MA Tailor is a premier ladies online stitching shop specializing in all types of stitching for ladies' and girls' suits. With years of experience in the fashion industry, we take pride in delivering exceptional quality and craftsmanship.
            </p>
            
            <p className="text-lg font-montserrat text-gray-300 mb-8">
              Led by Tayaba Majid, our skilled team is dedicated to creating perfectly fitted garments tailored to each client's unique style and preferences. We combine traditional techniques with modern designs to create timeless pieces that make our clients feel confident and beautiful.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="h-1 w-8 bg-gold mr-3"></div>
                <p className="font-montserrat text-white">Professional Tailoring Services</p>
              </div>
              <div className="flex items-center">
                <div className="h-1 w-8 bg-gold mr-3"></div>
                <p className="font-montserrat text-white">Attention to Detail</p>
              </div>
              <div className="flex items-center">
                <div className="h-1 w-8 bg-gold mr-3"></div>
                <p className="font-montserrat text-white">Customer Satisfaction Guaranteed</p>
              </div>
            </div>
            
            <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
