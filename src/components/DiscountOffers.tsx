import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Percent, Calendar, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscountOffer {
  id: string;
  slug: string;
  title: string;
  description: string;
  discount_percentage: number;
  discount_amount: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  image_url?: string | null;
}

const SITE = 'https://matailor.lovable.app';


const DiscountOffers = () => {
  const [offers, setOffers] = useState<DiscountOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('discount_offers')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: "Error",
        description: "Failed to load discount offers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold mb-4 text-white">
            Special <span className="text-gold">Discount Offers</span>
          </h2>
          <p className="text-gray-300 font-montserrat max-w-2xl mx-auto">
            Don't miss out on our exclusive deals and limited-time offers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-gray-800 border-gray-700 hover:border-gold transition-colors duration-300 overflow-hidden">
              {offer.image_url && (
                <div className="w-full aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={offer.image_url}
                    alt={offer.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="text-center">

                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gold/20 rounded-full">
                    <Gift className="h-8 w-8 text-gold" />
                  </div>
                </div>
                <CardTitle className="text-xl font-playfair text-white mb-2">
                  {offer.title}
                </CardTitle>
                <div className="flex justify-center gap-2">
                  {offer.discount_percentage && (
                    <Badge variant="secondary" className="bg-gold text-black font-bold">
                      <Percent className="h-4 w-4 mr-1" />
                      {offer.discount_percentage}% OFF
                    </Badge>
                  )}
                  {offer.discount_amount && (
                    <Badge variant="secondary" className="bg-gold text-black font-bold">
                      ${offer.discount_amount} OFF
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="text-center space-y-4">
                {offer.description && (
                  <p className="text-gray-300 font-montserrat">
                    {offer.description}
                  </p>
                )}
                
                
                {(offer.valid_from || offer.valid_until) && (
                  <div className="space-y-1 text-sm text-gray-400 font-montserrat">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Valid Period</span>
                    </div>
                    {offer.valid_from && (
                      <p>From: {new Date(offer.valid_from).toLocaleDateString()}</p>
                    )}
                    {offer.valid_until && (
                      <p>Until: {new Date(offer.valid_until).toLocaleDateString()}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountOffers;