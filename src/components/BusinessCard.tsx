
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
          <div className="bg-black p-4 rounded-lg border-2 border-gold max-w-xs w-full">
            <img 
              src="https://github.com/Majidali1980/lmages/blob/main/visiting%20card%20updated.png?raw=true" 
              alt="MA Tailor Visiting Card" 
              className="w-full h-auto rounded mb-4"
            />
            
            <div className="mt-4">
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
