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

const HomepageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_carousel')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching homepage carousel items:', error);
          return;
        }

        setCarouselItems(data || []);
      } catch (error) {
        console.error('Error fetching homepage carousel items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  if (loading) {
    return (
      <section className="w-full h-[400px] bg-gray-900 animate-pulse">
        <div className="w-full h-full bg-gray-800 rounded-lg"></div>
      </section>
    );
  }

  if (carouselItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-6">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-6 text-gold">
          Featured Collections
        </h2>
        <div className="relative w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
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
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative group overflow-hidden rounded-lg h-[400px] bg-black">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-200 font-montserrat mb-3">
                          {item.description}
                        </p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gold text-black px-6 py-2 rounded-lg font-montserrat font-semibold hover:bg-gold-light transition-colors duration-300 w-fit"
                        >
                          View More
                        </a>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-gold/80 border-gold text-black hover:bg-gold" />
            <CarouselNext className="right-2 bg-gold/80 border-gold text-black hover:bg-gold" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HomepageCarousel;
