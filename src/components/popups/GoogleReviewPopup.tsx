import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BasePopup } from './BasePopup';

interface GoogleReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleReviewPopup = ({ isOpen, onClose }: GoogleReviewPopupProps) => {
  const googleReviewLink = "https://maps.app.goo.gl/oGtcRRMGdRDi6z2z6";

  const handleReviewClick = () => {
    window.open(googleReviewLink, '_blank');
    onClose();
  };

  return (
    <BasePopup isOpen={isOpen} onClose={onClose} autoCloseDelay={0}>
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <Star className="h-12 w-12 text-primary fill-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Thank You! 🎉
          </h3>
          <p className="text-muted-foreground">
            Your appointment has been booked successfully!
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-foreground">
            We'd love to hear about your experience. Would you mind leaving us a Google review?
          </p>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleReviewClick}
              className="bg-primary hover:bg-primary/90"
            >
              Leave a Review
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </BasePopup>
  );
};
