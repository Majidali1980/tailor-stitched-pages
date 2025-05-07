
import { Scissors, Ruler, Tag, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-10 w-10 text-gold" />,
      title: "Custom Tailoring",
      description: "Expert stitching services for all types of ladies' and girls' suits with precision and care."
    },
    {
      icon: <Ruler className="h-10 w-10 text-gold" />,
      title: "Alterations",
      description: "Professional alterations to ensure the perfect fit for your existing garments."
    },
    {
      icon: <Tag className="h-10 w-10 text-gold" />,
      title: "Pick & Drop",
      description: "Convenient pick-up and delivery service for all your tailoring needs."
    },
  ];
  
  const whatsappLink = "https://wa.me/923070125273";

  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">Our <span className="text-gold">Services</span></h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            We specialize in creating beautiful, perfectly fitted garments for ladies and girls with attention to detail and quality craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="fancy-border">
              <Card className="bg-gray-900 border-none h-full hover:bg-gray-800 transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-playfair font-bold text-gold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 font-montserrat text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-8 bg-gradient-to-r from-gray-900 to-black rounded-xl border border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-playfair font-bold text-gold mb-4">EXPERT IN ALL TYPES OF STITCHING</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Party Wear", "Casual Wear", "Bridal Wear", "Traditional Outfits", "Western Wear", "Kids Wear"].map((item, index) => (
                  <li key={index} className="flex items-center font-montserrat">
                    <span className="h-2 w-2 bg-gold rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                <div className="px-6 py-4 bg-gold text-black rounded-lg text-center cursor-pointer hover:bg-gold-dark transition-colors">
                  <p className="text-lg font-playfair font-bold">Book Your</p>
                  <p className="text-2xl font-playfair font-bold">Appointment</p>
                  <p className="font-montserrat mt-2 flex items-center justify-center gap-1">
                    <Phone className="h-4 w-4" /> WhatsApp Now
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
