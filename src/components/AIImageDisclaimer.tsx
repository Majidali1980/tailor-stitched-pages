import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AIImageDisclaimer = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-gray-400 hover:text-white transition-colors duration-300 underline">
          AI Image Disclaimer
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            AI-Generated Model Images Disclaimer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Please Note:</strong> All model images displayed on this website are AI-generated using Google Gemini technology. 
            These images are created solely for demonstration purposes to show how our custom-stitched suits and outfits would look when worn. 
            The actual garments we create are handcrafted by our skilled tailors according to your measurements and preferences. 
            The AI-generated models serve only as visual representations to help you envision the final product.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Real customer photos and testimonials are available in our reviews section.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIImageDisclaimer;