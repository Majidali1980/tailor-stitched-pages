import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface BasePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  autoCloseDelay?: number;
}

export const BasePopup = ({ isOpen, onClose, children, autoCloseDelay = 10000 }: BasePopupProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDelay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md"
          >
            <div className="bg-gradient-to-br from-background via-background to-accent/5 border-2 border-primary/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold to-primary animate-shimmer" />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 hover:bg-primary/10"
              >
                <X className="h-5 w-5" />
              </Button>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
