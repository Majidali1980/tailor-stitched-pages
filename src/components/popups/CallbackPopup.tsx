import { useState, useEffect } from 'react';
import { BasePopup } from './BasePopup';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CallbackPopupProps {
  onClose: () => void;
}

export const CallbackPopup = ({ onClose }: CallbackPopupProps) => {
  const [content, setContent] = useState({
    heading: "Need Help?",
    message: "Let our expert tailors assist you with your perfect outfit!",
    primaryCTA: "Request Call",
    secondaryCTA: "Chat Now"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-popup', {
          body: { popupType: 'callback', context: 'Idle visitor' }
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

  const handleCall = () => {
    window.open('tel:03070125273', '_self');
    onClose();
  };

  const handleChat = () => {
    window.open('https://wa.me/923070125273', '_blank');
    onClose();
  };

  return (
    <BasePopup isOpen={true} onClose={onClose}>
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-gold rounded-full mb-4">
          <Phone className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
          {content.heading}
        </h2>
        
        <p className="text-muted-foreground text-lg">
          {content.message}
        </p>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleCall}
            className="flex-1 bg-gradient-to-r from-primary to-gold hover:opacity-90"
          >
            {content.primaryCTA}
          </Button>
          <Button 
            onClick={handleChat}
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
