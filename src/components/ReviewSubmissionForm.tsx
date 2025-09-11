import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';

const ReviewSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    reviewText: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.reviewText.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          name: formData.name.trim(),
          review_text: formData.reviewText.trim(),
          rating: formData.rating,
          is_active: true
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Review Submitted!",
        description: "Thank you for your review. It will be visible once approved.",
      });

      // Reset form
      setFormData({
        name: '',
        reviewText: '',
        rating: 5
      });

      // Reload the page to show the new review
      window.location.reload();

    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleRatingChange(index + 1)}
            className="transition-colors hover:scale-110"
          >
            <Star 
              className={`h-6 w-6 ${
                index < formData.rating ? 'fill-current text-gold' : 'text-gray-400 hover:text-gold'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-4">
              Share Your <span className="text-gold">Experience</span>
            </h3>
            <p className="text-gray-300 font-montserrat">
              We'd love to hear about your experience with our tailoring services
            </p>
          </div>

          <div className="fancy-border p-1">
            <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-montserrat mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-montserrat mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {renderStarRating()}
                  <span className="text-gray-300 ml-2">({formData.rating} star{formData.rating !== 1 ? 's' : ''})</span>
                </div>
              </div>

              <div>
                <label htmlFor="reviewText" className="block text-white font-montserrat mb-2">
                  Your Review *
                </label>
                <Textarea
                  id="reviewText"
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  placeholder="Share your experience with our tailoring services..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gold min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold/90 text-black font-montserrat font-semibold py-3 transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSubmissionForm;