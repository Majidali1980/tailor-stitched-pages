import { useState, useEffect } from 'react';
import { BasePopup } from './popups/BasePopup';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export const SubscribePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenSubscribePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenSubscribePopup', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ email, name: name || null });

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our latest design updates."
      });
      setIsOpen(false);
      setEmail('');
      setName('');
    }
  };

  return (
    <BasePopup isOpen={isOpen} onClose={() => setIsOpen(false)} autoCloseDelay={0}>
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h2 className="text-2xl font-playfair font-bold mb-2">
            Get Latest Design Updates
          </h2>
          <p className="text-muted-foreground">
            Subscribe to receive our newest designs and exclusive offers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <Label htmlFor="popup-name">Name (Optional)</Label>
            <Input
              id="popup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="text-left">
            <Label htmlFor="popup-email">Email *</Label>
            <Input
              id="popup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </BasePopup>
  );
};
