import { Facebook, Instagram } from 'lucide-react';

const SocialMediaButtons = () => {
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100067160730050', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/matailor1994/', '_blank');
  };

  return (
    <section className="py-8 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-playfair font-bold mb-4 text-white">
            Follow Us on <span className="text-gold">Social Media</span>
          </h3>
          <p className="text-gray-300 font-montserrat mb-6 max-w-md mx-auto">
            Stay connected with us for the latest designs, updates, and exclusive offers
          </p>
          
          <div className="flex justify-center gap-6">
            <button
              onClick={handleFacebookClick}
              className="group flex items-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Facebook className="h-6 w-6" />
              <span className="font-montserrat font-semibold">Like Our Page</span>
            </button>
            
            <button
              onClick={handleInstagramClick}
              className="group flex items-center gap-3 bg-gradient-to-r from-[#E4405F] via-[#F77737] to-[#F58529] hover:from-[#D73447] hover:via-[#E96125] hover:to-[#E07317] text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Instagram className="h-6 w-6" />
              <span className="font-montserrat font-semibold">Follow Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaButtons;