
import { Star, Users, Award } from 'lucide-react';

const Reviews = () => {
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
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop", 
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop"
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewImages.map((image, index) => (
              <div key={index} className="fancy-border p-1">
                <div className="bg-black p-4 rounded-lg">
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden mb-4">
                    <img
                      src={image}
                      alt={`Customer review ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
    </section>
  );
};

export default Reviews;
