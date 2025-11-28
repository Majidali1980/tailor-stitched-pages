import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PromotionalBanner from './PromotionalBanner';

interface BannerData {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  variant: 'default' | 'gradient' | 'minimal';
  dismissible: boolean;
  start_date: string | null;
  end_date: string | null;
}

const DynamicPromotionalBanner = () => {
  const [selectedBanner, setSelectedBanner] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndSelectBanner();
  }, []);

  const fetchAndSelectBanner = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('promotional_banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching banners:', error);
        return;
      }

      // Filter banners based on date range and map to correct types
      const activeBanners = (data || [])
        .filter(banner => {
          const startValid = !banner.start_date || banner.start_date <= today;
          const endValid = !banner.end_date || banner.end_date >= today;
          return startValid && endValid;
        })
        .map(banner => ({
          ...banner,
          variant: (banner.variant === 'gradient' || banner.variant === 'minimal' 
            ? banner.variant 
            : 'default') as 'default' | 'gradient' | 'minimal'
        }));

      // A/B Testing: Randomly select one banner from active banners
      if (activeBanners.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeBanners.length);
        setSelectedBanner(activeBanners[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !selectedBanner) {
    return null;
  }

  return (
    <PromotionalBanner
      bannerId={selectedBanner.id}
      title={selectedBanner.title}
      description={selectedBanner.description || undefined}
      ctaText={selectedBanner.cta_text || undefined}
      ctaLink={selectedBanner.cta_link || undefined}
      variant={selectedBanner.variant}
      dismissible={selectedBanner.dismissible}
    />
  );
};

export default DynamicPromotionalBanner;
