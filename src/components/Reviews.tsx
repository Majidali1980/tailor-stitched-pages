import { Star, Users, Award, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

const Reviews = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const bestCustomers = [
    "Defense Phase 1",
    "Defense Phase 2", 
    "Defense Phase 5",
    "Defense Phase 6",
    "Defense Phase 7",
    "Defense Phase 8",
    "Falcon Faisal",
    "KAECHS",
    "PECHS Block 6"
  ];

  const reviewImages = [
    "https://i.postimg.cc/SYd3RD7D/Whats-App-Image-2025-06-18-at-4-46-42-PM.jpg",
    "https://i.postimg.cc/5QbDfZvX/Whats-App-Image-2025-06-18-at-4-53-32-PM.jpg", 
    "https://i.postimg.cc/7GvpWCZM/Whats-App-Image-2025-06-18-at-4-53-33-PM.jpg",
    "https://i.postimg.cc/S2WwFyX0/Whats-App-Image-2025-06-18-at-4-53-33-PM-1.jpg"
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Customer <span className="text-gold">Reviews</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            See what our valued customers say about our premium tailoring services.
          </p>
        </div>

        {/* WhatsApp Reviews Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-playfair font-bold text-center mb-8 text-gold">
            WhatsApp Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviewImages.map((image, index) => (
              <div key={index} className="fancy-border p-1">
                <div className="bg-black p-4 rounded-lg">
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden mb-4 relative group cursor-pointer">
                    <img
                      src={image}
                      alt={`Customer review ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onClick={() => handleImageClick(image)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-gold text-black px-2 py-1 rounded text-xs font-montserrat font-bold">
                      Click to zoom
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <div className="flex text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="text-center font-montserrat text-gray-300 text-sm">
                    Verified WhatsApp Review
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Customers Section */}
        <div className="fancy-border p-1">
          <div className="bg-black p-8 rounded-lg">
            <div className="text-center mb-8">
              <Award className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-playfair font-bold text-gold mb-2">
                Our Valued Customers
              </h3>
              <p className="font-montserrat text-gray-300">
                Trusted by premium residential and commercial communities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bestCustomers.map((customer, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gold flex-shrink-0" />
                    <span className="font-montserrat text-white font-medium">
                      {customer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 p-6 bg-gold/10 rounded-lg border border-gold/20">
              <h4 className="text-lg font-playfair font-bold text-gold mb-2">
                Join Our Satisfied Customers
              </h4>
              <p className="font-montserrat text-white">
                Experience premium tailoring services trusted by Karachi's finest communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gold transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Zoomed review"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
              <p className="font-montserrat text-sm">Click outside to close</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
