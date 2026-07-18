import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scissors, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PriceListItem {
  id: string;
  category: string;
  service_name: string;
  is_active: boolean;
  display_order: number;
}

const WHATSAPP_URL = 'https://wa.me/923070125273?text=Hello%20MA%20Tailor%2C%20I%27d%20like%20a%20stitching%20quote.';

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

      if (error) throw error;
      setPriceList(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceList();
  }, []);

  const grouped = priceList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PriceListItem[]>);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent border-gold text-gold hover:bg-gold hover:text-black font-montserrat flex items-center gap-2 transition-all duration-300">
          <Scissors className="h-4 w-4" /> Our Services
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-black border-gold">
        <DialogHeader>
          <DialogTitle className="text-gold font-playfair text-2xl flex items-center gap-3">
            <img src="/logo.png" alt="MA Tailor Logo" className="h-10 w-10 object-contain" />
            <div>
              <div className="text-gold text-xl font-playfair">MA TAILOR</div>
              <div className="text-gold text-sm font-montserrat">ONLINE STITCHING LADIES SHOP</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] w-full">
          <div className="p-6 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">OUR SERVICES</h2>
              <p className="text-gold text-lg">Bespoke Stitching • 2025 - 2026</p>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                Every outfit is quoted individually based on fabric, design, and finishing. Contact us on WhatsApp for a personalized quote.
              </p>
            </div>

            {loading ? (
              <div className="text-center text-white">Loading...</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-8">
                  <div className="bg-gold text-black p-4 mb-4 rounded-lg">
                    <h3 className="text-xl font-bold font-montserrat uppercase tracking-wide">{category}</h3>
                  </div>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                        <span className="text-white font-montserrat">{item.service_name}</span>
                        <span className="text-gold/70 text-xs font-montserrat uppercase tracking-widest">Quote on Request</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="mt-8 text-center space-y-4">
              <div className="text-white">
                <p className="mb-2">Fancy Cloth, Garara, Party & Wedding Wear</p>
                <p className="mb-4">Bulk orders welcome</p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#128C7E] text-black font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Request Quote on WhatsApp
              </a>

              <div className="bg-gold text-black p-4 rounded-lg mt-4">
                <h3 className="text-xl font-bold mb-2">PICK AND DROP AVAILABLE</h3>
                <p className="text-sm">Delivery charges apply</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-gold mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">📱</span>
                  <span>+92 307 0125273</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">📍</span>
                  <span>Mahmoodabad, Karachi</span>
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
