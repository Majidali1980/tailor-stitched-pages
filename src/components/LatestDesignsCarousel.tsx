
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ZoomIn, X, ExternalLink } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface LatestDesign {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  link: string | null;
  display_order: number;
  Disclaimer: string | null;
}

const LatestDesignsCarousel = () => {
  const [designs, setDesigns] = useState<LatestDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const { data, error } = await supabase
          .from('latest_designs')
          .select('id, title, description, image_url, link, display_order, Disclaimer')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching designs:', error);
        } else {
          setDesigns(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    console.log('Image clicked:', imageUrl);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleLinkClick = (link: string | null, e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading Latest Designs...</div>
          </div>
        </div>
      </section>
    );
  }

  if (designs.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
              Latest <span className="text-gold">Designs</span>
            </h2>
            <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
              Discover our newest collection of beautifully crafted Pakistani dresses.
            </p>
          </div>

          <Carousel 
            className="w-full"
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {designs.map((design) => (
                <CarouselItem key={design.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="fancy-border p-1 h-full">
                    <div className="bg-black p-4 rounded-lg h-full flex flex-col">
                      <div 
                        className="aspect-[3/4] w-full rounded-lg overflow-hidden mb-4 relative group cursor-pointer flex-shrink-0"
                        onClick={() => handleImageClick(design.image_url)}
                      >
                        <img
                          src={design.image_url}
                          alt={design.title}
                          className="w-full h-full object-contain bg-black transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                            <ZoomIn className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-gold text-black px-3 py-1 rounded-full text-xs font-montserrat font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to enlarge
                        </div>
                        {design.link && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => handleLinkClick(design.link, e)}
                              className="bg-black bg-opacity-80 text-gold p-2 rounded-full hover:bg-gold hover:text-black transition-colors duration-200"
                              title="Visit link"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow flex flex-col">
                        <h3 className="text-lg font-playfair font-semibold text-gold mb-2 line-clamp-2">
                          {design.title}
                        </h3>
                        {design.description && (
                          <p className="font-montserrat text-gray-300 text-sm mb-2 flex-grow line-clamp-3">
                            {design.description}
                          </p>
                        )}
                        {design.Disclaimer && (
                          <p className="font-montserrat text-gray-400 text-xs mb-2 italic line-clamp-2">
                            {design.Disclaimer}
                          </p>
                        )}
                        {design.link && (
                          <button
                            onClick={(e) => handleLinkClick(design.link, e)}
                            className="text-gold hover:text-gold-light text-sm font-montserrat underline transition-colors duration-200 flex items-center gap-1 mt-auto"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-gold border-gold hover:bg-gold hover:text-black -left-4 md:-left-12" />
            <CarouselNext className="text-gold border-gold hover:bg-gold hover:text-black -right-4 md:-right-12" />
          </Carousel>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-7xl my-8">
            <div className="flex justify-between items-center mb-4 px-6 py-4 bg-black bg-opacity-90 rounded-t-lg">
              <h3 className="text-white font-montserrat text-xl font-semibold">Design Preview</h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gold transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-3"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-2xl flex items-center justify-center min-h-[60vh] max-h-[80vh] overflow-hidden">
              <img
                src={selectedImage}
                alt="Design preview"
                className="max-w-full max-h-full object-contain w-auto h-auto"
                style={{ maxHeight: '80vh', maxWidth: '100%' }}
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

export default LatestDesignsCarousel;
