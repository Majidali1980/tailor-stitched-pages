// Dynamic Reviews Component
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ZoomIn, X } from 'lucide-react';
import ReviewSubmissionForm from './ReviewSubmissionForm';

interface ReviewItem {
  id: string;
  name: string;
  review_text: string;
  image_url: string | null;
  rating: number;
  display_order: number;
}

const DynamicReviews = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching reviews:', error);
        } else {
          setReviews(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'fill-current text-gold' : 'text-gray-400'}`} 
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading Reviews...</div>
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
              Customer <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
              Read what our satisfied customers have to say about our premium tailoring services.
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No reviews available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="fancy-border p-1">
                  <div className="bg-gray-900 p-6 rounded-lg h-full flex flex-col">
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                     {/* Review Image */}
                    {review.image_url && (
                      <div 
                        className="aspect-[4/3] w-full rounded-lg overflow-hidden mb-4 relative group cursor-pointer"
                        onClick={() => handleImageClick(review.image_url!)}
                      >
                        <img
                          src={review.image_url}
                          alt={`Review by ${review.name}`}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                            <ZoomIn className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Review Text */}
                    <div className="flex-grow">
                      <p className="font-montserrat text-gray-300 text-sm mb-4 leading-relaxed">
                        "{review.review_text}"
                      </p>
                    </div>

                    {/* Customer Name */}
                    <div className="mt-auto">
                      <p className="font-playfair font-semibold text-gold text-lg">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Review Submission Form */}
      <ReviewSubmissionForm />

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full h-full max-w-7xl max-h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 px-6 py-4 bg-black bg-opacity-90 rounded-t-lg">
              <h3 className="text-white font-montserrat text-xl font-semibold">Customer Review</h3>
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
                alt="Customer review full view"
                className="w-full h-auto object-contain min-h-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="mt-4 text-center px-6 py-4 bg-black bg-opacity-90 rounded-b-lg">
              <p className="font-montserrat text-sm text-gray-300">
                Scroll to read the full review • Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">ESC</kbd> or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicReviews;