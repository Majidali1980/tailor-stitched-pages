// Dynamic Reviews Component
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ZoomIn, X, ExternalLink, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

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
  const [formData, setFormData] = useState({
    name: '',
    reviewText: '',
    rating: 5
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.reviewText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('review-images')
          .upload(filePath, photoFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('review-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // Insert review
      const { error } = await supabase
        .from('reviews')
        .insert({
          name: formData.name.trim(),
          review_text: formData.reviewText.trim(),
          rating: formData.rating,
          image_url: imageUrl,
          is_active: true,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Thank you for your feedback! 🎉",
        description: "Your review has been submitted successfully and will appear after approval.",
      });

      // Reset form
      setFormData({
        name: '',
        reviewText: '',
        rating: 5
      });
      setPhotoFile(null);
      setPhotoPreview(null);

    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Submit Review Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                <Star className="h-8 w-8 text-gold fill-gold" />
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
                Share Your <span className="text-gold">Experience</span>
              </h2>
              <p className="text-lg font-montserrat text-gray-300">
                We'd love to hear about your experience with our tailoring services
              </p>
            </div>

            <div className="fancy-border p-1">
              <div className="bg-gray-900 p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="bg-black/50 border-gray-700 focus:border-gold text-white placeholder:text-gray-500"
                      required
                    />
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleRatingClick(index + 1)}
                          className="transition-all hover:scale-110 focus:outline-none"
                        >
                          <Star 
                            className={`h-8 w-8 ${
                              index < formData.rating 
                                ? 'fill-gold text-gold' 
                                : 'text-gray-600 hover:text-gold'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-sm text-gray-400 ml-2">
                        ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label htmlFor="reviewText" className="block text-sm font-medium text-white mb-2">
                      Your Review *
                    </label>
                    <Textarea
                      id="reviewText"
                      name="reviewText"
                      value={formData.reviewText}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience..."
                      className="bg-black/50 border-gray-700 focus:border-gold text-white placeholder:text-gray-500 min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Add Photo (Optional)
                    </label>
                    {!photoPreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gold transition-colors bg-black/30">
                        <Upload className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-400">Click to upload image</span>
                        <span className="text-xs text-gray-500 mt-1">Max 5MB</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    ) : (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-gray-700">
                        <img
                          src={photoPreview}
                          alt="Review preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg py-6 transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>

                {/* External Review Links */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <p className="text-sm text-center text-gray-400 mb-4">
                    You can also leave a review on:
                  </p>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open('https://maps.app.goo.gl/oGtcRRMGdRDi6z2z6', '_blank')}
                      className="flex-1"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Google Review
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open('https://www.facebook.com/profile.php?id=100067160730050&sk=reviews', '_blank')}
                      className="flex-1"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook Review
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-playfair font-bold mb-4">
              Customer <span className="text-gold">Reviews</span>
            </h3>
            <p className="text-lg font-montserrat text-gray-300">
              Read what our satisfied customers have to say
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