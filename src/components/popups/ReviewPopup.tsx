import { useState } from 'react';
import { BasePopup } from './BasePopup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star, Upload, X, ExternalLink } from 'lucide-react';

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewPopup = ({ isOpen, onClose }: ReviewPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    reviewText: '',
    rating: 5
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      onClose();

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

  const openGoogleReview = () => {
    window.open('https://maps.app.goo.gl/oGtcRRMGdRDi6z2z6', '_blank');
  };

  const openFacebookReview = () => {
    window.open('https://www.facebook.com/profile.php?id=100067160730050&sk=reviews', '_blank');
  };

  return (
    <BasePopup isOpen={isOpen} onClose={onClose} autoCloseDelay={0}>
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
            <Star className="h-8 w-8 text-gold fill-gold" />
          </div>
          <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
            Share Your Experience
          </h3>
          <p className="text-muted-foreground text-sm">
            We'd love to hear about your experience with our tailoring services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Your Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-background border-border focus:border-gold"
              required
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
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
                        : 'text-gray-400 hover:text-gold'
                    }`} 
                  />
                </button>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-foreground mb-1.5">
              Your Review *
            </label>
            <Textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInputChange}
              placeholder="Tell us about your experience..."
              className="bg-background border-border focus:border-gold min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Add Photo (Optional)
            </label>
            {!photoPreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-gold transition-colors bg-background">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
                <span className="text-xs text-muted-foreground mt-1">Max 5MB</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            ) : (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={photoPreview}
                  alt="Review preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
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
            className="w-full bg-gold hover:bg-gold/90 text-black font-semibold transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>

        {/* External Review Links */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground mb-3">
            You can also leave a review on:
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openGoogleReview}
              className="flex-1 text-xs"
            >
              <Star className="h-3 w-3 mr-1" />
              Google
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openFacebookReview}
              className="flex-1 text-xs"
            >
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </BasePopup>
  );
};
