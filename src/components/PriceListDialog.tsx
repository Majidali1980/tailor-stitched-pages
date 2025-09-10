import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PriceListItem {
  id: string;
  category: string;
  service_name: string;
  price: number;
  is_active: boolean;
  display_order: number;
}

const PriceListDialog = () => {
  const [priceList, setPriceList] = useState<PriceListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPriceList = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('price_list')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      setPriceList(data || []);
    } catch (error) {
      console.error('Error fetching price list:', error);
      toast.error('Failed to load price list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceList();
  }, []);

  // Group items by category
  const groupedPriceList = priceList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceListItem[]>);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent border-gold text-gold hover:bg-gold hover:text-black font-montserrat flex items-center gap-2 transition-all duration-300">
          <DollarSign className="h-4 w-4" /> Price List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-gold">
        <DialogHeader>
          <DialogTitle className="text-gold font-playfair text-2xl flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img 
                src="https://github.com/Majidali1980/lmages/blob/main/Black%20Gold%20Elegant%20Jewelry%20Logo.png?raw=true" 
                alt="MA Tailor Logo"
                className="h-10 w-10 object-contain"
              />
              <div>
                <div className="text-gold text-xl font-playfair">MA TAILOR</div>
                <div className="text-gold text-sm font-montserrat">ONLINE STITCHING LADIES SHOP</div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] w-full">
          <div className="p-6 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">PRICE LIST</h2>
              <p className="text-gold text-lg">2025 - 2026</p>
            </div>

            {loading ? (
              <div className="text-center text-white">Loading...</div>
            ) : (
              Object.entries(groupedPriceList).map(([category, items]) => (
                <div key={category} className="mb-8">
                  <div className="bg-gold text-black p-4 mb-4 rounded-lg">
                    <h3 className="text-xl font-bold font-montserrat uppercase tracking-wide">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-white font-montserrat">
                          {item.service_name}
                        </span>
                        <span className="text-gold font-bold font-montserrat">
                          Rs.{item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="mt-8 text-center space-y-4">
              <div className="text-white">
                <p className="mb-2">Stitch Fancy Cloth, Garara, Party & Wedding Wear</p>
                <p className="mb-4">Also Deals in Bulk Quantities</p>
              </div>
              
              <div className="bg-gold text-black p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">PICK AND DROP AVAILABLE</h3>
                <p className="text-sm">DC Apply</p>
              </div>

              <div className="flex items-center justify-center gap-6 text-gold mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">📱</span>
                  <span>03070125273</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">📍</span>
                  <span>Mahmoodabad</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PriceListDialog;