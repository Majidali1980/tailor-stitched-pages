import { useState, useEffect } from 'react';
import { BasePopup } from './BasePopup';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface OccasionPopupProps {
  onClose: () => void;
}

export const OccasionPopup = ({ onClose }: OccasionPopupProps) => {
  const [content, setContent] = useState({
    heading: "Seasonal Special",
    message: "Celebrate in style with our exclusive occasion collection!",
    primaryCTA: "Shop Now",
    secondaryCTA: "View Offers"
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-popup', {
          body: { popupType: 'occasion', context: 'Seasonal promotion' }
        });
        
        if (!error && data) {
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching popup content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <BasePopup isOpen={true} onClose={onClose}>
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-gold rounded-full mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
          {content.heading}
        </h2>
        
        <p className="text-muted-foreground text-lg">
          {content.message}
        </p>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={() => { navigate('/gallery'); onClose(); }}
            className="flex-1 bg-gradient-to-r from-primary to-gold hover:opacity-90"
          >
            {content.primaryCTA}
          </Button>
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10"
          >
            {content.secondaryCTA}
          </Button>
        </div>
      </div>
    </BasePopup>
  );
};
