import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ZoomIn, ExternalLink, X } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

interface StitchedDressItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string | null;
  display_order: number;
}

const StitchedDressCarousel = () => {
  const [stitchedDresses, setStitchedDresses] = useState<StitchedDressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStitchedDresses = async () => {
      try {
        const { data, error } = await supabase
          .from('stitched_dress')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching stitched dresses:', error);
        } else {
          setStitchedDresses(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStitchedDresses();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  const handleLinkClick = (link: string | null, e: React.MouseEvent) => {
    e.stopPropagation();
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedImage]);

  if (loading) {
    return (
      <section className="py-12 bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading Stitched Dresses...</div>
          </div>
        </div>
      </section>
    );
  }

  if (stitchedDresses.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-12 bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Stitched <span className="text-gold">Dress</span>
            </h2>
            <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
              Explore our exquisite collection of carefully crafted garments
            </p>
          </div>

          <div className="relative w-full">
            <Carousel
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {stitchedDresses.map((dress) => (
                  <CarouselItem key={dress.id} className="w-full">
                    <div className="relative w-full">
                      <div 
                        className="relative w-full h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden bg-black group cursor-pointer"
                        onClick={() => handleImageClick(dress.image_url)}
                      >
                        <img
                          src={dress.image_url}
                          alt={dress.title}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="bg-gold text-black p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                              <ZoomIn className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                          <h3 className="font-playfair font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3">
                            {dress.title}
                          </h3>
                          <p className="font-montserrat text-gray-200 text-sm md:text-base mb-4 max-w-2xl">
                            {dress.description}
                          </p>
                          
                          {dress.link && dress.link !== '#' && (
                            <button
                              onClick={(e) => handleLinkClick(dress.link, e)}
                              className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors font-montserrat text-sm font-semibold"
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-gold text-black hover:bg-gold/90 h-12 w-12" />
              <CarouselNext className="right-4 bg-gold text-black hover:bg-gold/90 h-12 w-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full h-full max-w-6xl max-h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 px-6 py-4 bg-black bg-opacity-90 rounded-t-lg">
              <h3 className="text-white font-montserrat text-xl font-semibold">Stitched Dress</h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gold transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-3 z-10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-white rounded-lg shadow-2xl max-h-[80vh]">
              <img
                src={selectedImage}
                alt="Stitched dress full view"
                className="w-full h-auto object-contain min-h-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="mt-4 text-center px-6 py-4 bg-black bg-opacity-90 rounded-b-lg">
              <p className="font-montserrat text-sm text-gray-300">
                Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">ESC</kbd> or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StitchedDressCarousel;