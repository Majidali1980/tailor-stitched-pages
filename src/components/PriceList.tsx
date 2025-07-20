
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign } from 'lucide-react';

const PriceList = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent border-gold text-gold hover:bg-gold hover:text-black font-montserrat flex items-center gap-2">
          <DollarSign className="h-4 w-4" /> Price List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-gold">
        <DialogHeader>
          <DialogTitle className="text-gold font-playfair text-2xl">Our Price List</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] w-full">
          <div className="flex justify-center p-4">
            <img 
              src="https://i.postimg.cc/NjzcjmqR/Black-and-Green-Modern-Car-Wash-Price-List.png" 
              alt="MA Tailor Price List" 
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PriceList;
