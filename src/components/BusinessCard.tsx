
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Phone } from 'lucide-react';

const BusinessCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = "https://wa.me/923070125273";
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="font-montserrat text-sm hover:text-gold transition-colors">
        Visiting Card
      </SheetTrigger>
      <SheetContent side="right" className="bg-black border-gold border">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-black p-6 rounded-lg border-2 border-gold max-w-xs w-full">
            <div className="flex flex-col items-center text-center mb-6">
              <img 
                src="https://github.com/Majidali1980/lmages/blob/main/Black%20Gold%20Elegant%20Jewelry%20Logo.png?raw=true" 
                alt="MA Tailor Logo" 
                className="h-16 w-auto mb-2"
              />
              <h2 className="text-2xl font-playfair font-bold text-gold">MA TAILOR</h2>
              <p className="text-sm font-montserrat text-gray-400">LADIES ONLINE STITCHING SHOP</p>
              <div className="border-t border-gold/30 w-full my-3"></div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gold font-medium">EXPERT IN:</span>
                <span className="text-gray-300">All types of stitching for ladies suits</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gold font-medium">CONTACT:</span>
                <a href={whatsappLink} className="text-gray-300 hover:text-gold transition-colors">
                  +92 307 0125273
                </a>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gold font-medium">SERVICES:</span>
                <span className="text-gray-300">Custom Stitching & Alterations</span>
                <span className="text-gray-300">Pick & Drop Available</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href={whatsappLink}
                className="flex items-center justify-center gap-2 w-full border border-gold text-gold hover:bg-gold/10 rounded py-2 transition-colors"
              >
                <Phone className="h-4 w-4" /> Book Appointment
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessCard;
