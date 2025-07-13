
import { Package, Users, CheckCircle, Phone, Shirt } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BulkOrders = () => {
  const sizes = ["20", "22", "24", "26", "28", "30", "32"];
  const features = [
    {
      icon: <Package className="h-6 w-6 text-gold" />,
      title: "Bulk Discounts",
      description: "Special rates for orders of 10+ pieces"
    },
    {
      icon: <Shirt className="h-6 w-6 text-gold" />,
      title: "Free Samples",
      description: "Get samples before placing your bulk order"
    },
    {
      icon: <Users className="h-6 w-6 text-gold" />,
      title: "Quality Assured",
      description: "Consistent quality across all pieces"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-gold" />,
      title: "Fast Delivery",
      description: "Quick turnaround for bulk orders"
    }
  ];

  const whatsappLink = "https://wa.me/923070125273";

  return (
    <section id="bulk-orders" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Bulk <span className="text-gold">Orders</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Exclusive bulk order services for girls' clothing with competitive rates and quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Available Sizes */}
          <div className="fancy-border p-1">
            <Card className="bg-black border-none h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair font-bold text-gold flex items-center gap-3">
                  <Shirt className="h-8 w-8" />
                  Available Girls' Sizes
                </CardTitle>
                <CardDescription className="text-gray-300 font-montserrat">
                  We specialize in bulk orders for these popular girls' sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {sizes.map((size, index) => (
                    <div 
                      key={index}
                      className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center hover:bg-gold/20 transition-colors"
                    >
                      <span className="text-xl font-playfair font-bold text-gold">
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="font-montserrat text-sm text-gray-300">
                    <span className="text-gold font-semibold">Minimum Order:</span> 10 pieces per size
                  </p>
                  <p className="font-montserrat text-sm text-gray-300 mt-1">
                    <span className="text-gold font-semibold">Mix & Match:</span> Different sizes in single order allowed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-black rounded-lg border border-gold/20">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-bold text-gold mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-montserrat text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="fancy-border p-1">
          <div className="bg-black p-8 rounded-lg text-center">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-4">
              Ready for Your Bulk Order?
            </h3>
            <p className="font-montserrat text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact us for exclusive bulk pricing, free samples, and quick quotes. 
              Perfect for boutiques, retailers, and event organizers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-gray-900 rounded-lg">
                <h4 className="font-playfair font-bold text-gold mb-2">10-20 Pieces</h4>
                <p className="font-montserrat text-sm text-gray-300">15% Discount</p>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg border-2 border-gold">
                <h4 className="font-playfair font-bold text-gold mb-2">21-50 Pieces</h4>
                <p className="font-montserrat text-sm text-gray-300">25% Discount</p>
                <span className="inline-block bg-gold text-black text-xs font-bold px-2 py-1 rounded mt-1">
                  POPULAR
                </span>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <h4 className="font-playfair font-bold text-gold mb-2">50+ Pieces</h4>
                <p className="font-montserrat text-sm text-gray-300">30% Discount</p>
              </div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block">
              <div className="bg-gold text-black px-8 py-4 rounded-lg font-playfair font-bold text-lg hover:bg-gold-dark transition-colors cursor-pointer">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Get Bulk Quote & Samples
                </div>
                <p className="text-sm font-montserrat mt-1">WhatsApp for instant response</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrders;
