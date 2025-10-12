import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface AIGalleryItem {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
}

export const AIGalleryCarousel = () => {
  const [items, setItems] = useState<AIGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const { data, error } = await supabase
        .from('ai_gallery')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching AI gallery:', error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };

    fetchGalleryItems();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse rounded-xl" />
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No AI designs available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 600000, // 10 minutes
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[600px] rounded-xl overflow-hidden group">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-playfair font-bold mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-lg text-white/90">{item.description}</p>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};