import { AlertTriangle } from 'lucide-react';

const AIImageDisclaimer = () => {
  return (
    <section className="w-full py-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-t border-b border-amber-200 dark:border-amber-800">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-4 max-w-4xl mx-auto">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 font-playfair">
              AI-Generated Model Images Disclaimer
            </h3>
            <p className="text-amber-700 dark:text-amber-300 font-montserrat leading-relaxed">
              <strong>Please Note:</strong> All model images displayed on this website are AI-generated using Google Gemini technology. 
              These images are created solely for demonstration purposes to show how our custom-stitched suits and outfits would look when worn. 
              The actual garments we create are handcrafted by our skilled tailors according to your measurements and preferences. 
              The AI-generated models serve only as visual representations to help you envision the final product.
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400 font-montserrat italic">
              Real customer photos and testimonials are available in our reviews section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIImageDisclaimer;