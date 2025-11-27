import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface PromotionalBannerProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  onClose?: () => void;
  dismissible?: boolean;
  variant?: 'default' | 'gradient' | 'minimal';
}

const PromotionalBanner = ({
  title,
  description,
  ctaText,
  ctaLink,
  onClose,
  dismissible = true,
  variant = 'default'
}: PromotionalBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const variantStyles = {
    default: 'bg-gold text-black',
    gradient: 'bg-gradient-to-r from-gold via-[#F0E68C] to-gold text-black',
    minimal: 'bg-black/95 text-gold border-b border-gold/20'
  };

  return (
    <div className={`w-full py-4 px-4 relative ${variantStyles[variant]}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-playfair font-bold text-lg md:text-xl">
            {title}
          </h3>
          {description && (
            <p className="font-montserrat text-sm md:text-base mt-1">
              {description}
            </p>
          )}
        </div>
        
        {ctaText && ctaLink && (
          <Link to={ctaLink}>
            <Button
              variant={variant === 'minimal' ? 'outline' : 'default'}
              className={`font-montserrat font-semibold ${
                variant === 'minimal' 
                  ? 'border-gold text-gold hover:bg-gold hover:text-black' 
                  : 'bg-black text-gold hover:bg-black/90'
              }`}
            >
              {ctaText}
            </Button>
          </Link>
        )}

        {dismissible && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PromotionalBanner;
