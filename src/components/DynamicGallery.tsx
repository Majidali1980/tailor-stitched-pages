
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ZoomIn, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  category: string;
}

const DynamicGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Define categories for filtering
  const categories = [
    { value: "all", label: "All" },
    { value: "full-suit", label: "Full Suit" },
    { value: "shirt", label: "Shirts" },
    { value: "neck-design", label: "Neck Design" },
    { value: "shalwar-kameez", label: "Shalwar Kameez" },
    { value: "girls-suits", label: "Girls Suits" },
  ];

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching gallery items:', error);
        } else {
          console.log('Gallery items fetched:', data?.length || 0, 'items');
          setGalleryItems(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter items based on selected category
  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleImageClick = (imageUrl: string) => {
    console.log('Gallery image clicked:', imageUrl);
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
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading Gallery...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
              Our <span className="text-gold">Gallery</span>
            </h2>
            <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
              Browse through our collection of beautifully crafted Pakistani dresses and satisfied customers.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="flex justify-center mb-12 overflow-x-auto">
              <TabsList className="bg-gray-900 p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.value} 
                    value={category.value}
                    className="data-[state=active]:bg-gold data-[state=active]:text-black whitespace-nowrap"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {filteredItems.length === 0 ? (
                <div className="text-center text-gray-400">
                  <p>No designs available in this category at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="fancy-border p-1">
                      <div className="bg-gray-900 p-2 rounded-lg h-full flex flex-col">
                        <div 
                          className="aspect-[3/4] w-full rounded-lg overflow-hidden relative group cursor-pointer flex-shrink-0"
                          onClick={() => handleImageClick(item.image_url)}
                        >
                          <img
                            src={item.image_url}
                            alt={item.caption || 'Gallery item'}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <div className="bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                              <ZoomIn className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-gold text-black px-3 py-1 rounded-full text-xs font-montserrat font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to enlarge
                          </div>
                        </div>
                        {item.caption && (
                          <p className="text-center font-montserrat text-gray-300 text-sm mt-2 flex-grow">
                            {item.caption}
                          </p>
                        )}
                        <div className="text-center mt-2">
                          <span className="bg-gold text-black px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                            {categories.find(cat => cat.value === item.category)?.label || item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
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
              <h3 className="text-white font-montserrat text-xl font-semibold">Gallery Image</h3>
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
                alt="Gallery image full view"
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

export default DynamicGallery;
