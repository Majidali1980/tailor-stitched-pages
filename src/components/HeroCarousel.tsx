import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  link?: string;
  display_order: number;
}

const HeroCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching carousel items:', error);
          return;
        }

        setCarouselItems(data || []);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[420px] sm:h-[480px] md:h-[540px] bg-gray-900 animate-pulse">
        <div className="w-full h-full bg-gray-800 rounded-lg"></div>
      </section>
    );
  }

  if (carouselItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-0">
      <div className="relative w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] overflow-hidden bg-black">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-contain bg-black"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
                        {item.title}
                      </h2>
                      {item.description && (
                        <p className="text-lg md:text-xl font-montserrat mb-6 opacity-90">
                          {item.description}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gold text-black px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-gold-light transition-colors duration-300"
                        >
                          Explore {item.title || 'Our Services'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroCarousel;