import { useState } from 'react';
import { Package, Users, CheckCircle, Phone, Shirt, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import BulkOrderCarousel from './BulkOrderCarousel';

const BulkOrders = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sizes = ["22", "24", "26", "28", "30", "32"];
  
  const sizeDetails = {
    "22": {
      shirt: {
        length: '22"',
        shoulder: '10"',
        armHole: '6"',
        sleevesL: '10"',
        chest: '12.5"',
        waist: '11.5"',
        hip: '13.5"',
        cuff: '4"'
      },
      trouser: {
        length: '22"',
        waist: '19"',
        hip: '20"',
        aasan: '10"',
        pauncha: '4.5"',
        elastic: '15" / 15.5"'
      }
    },
    "24": {
      shirt: {
        length: '24"',
        shoulder: '11"',
        armHole: '6"',
        sleevesL: '11"',
        chest: '13"',
        waist: '12"',
        hip: '14"',
        cuff: '4"',
        neckLength: '',
        chalk: ''
      },
      trouser: {
        length: '24"',
        waist: '20"',
        hip: '20"',
        aasan: '10"',
        pauncha: '5"',
        elastic: '16" / 18"'
      }
    },
    "26": {
      shirt: {
        length: '26"',
        shoulder: '11.5"',
        armHole: '6.25"',
        sleevesL: '13"',
        chest: '12.5"',
        waist: '11.5"',
        hip: '14.5"'
      },
      trouser: {
        length: '26"',
        waist: '21"',
        hip: '22"',
        aasan: '10"',
        pauncha: '5"'
      }
    },
    "28": {
      shirt: {
        length: '28"',
        shoulder: '12"',
        armHole: '6.5"',
        sleeves: '13.5"',
        chest: '14"',
        waist: '13"',
        hip: '15"',
        cuff: '4"',
        neckLength: '4"',
        chalk: '12'
      },
      trouser: {
        length: '28"',
        waist: '22"',
        hip: '23"',
        aasan: '11"',
        pauncha: '5.5"',
        elastic: '19.5"'
      }
    },
    "30": {
      shirt: {
        length: '30"',
        shoulder: '12.5"',
        armHole: '6.75"',
        sleevesL: '14" + 1/2"',
        chest: '14" + 1"',
        waist: '13" + 1"',
        hip: '15" + 1"',
        cuff: '4.5"'
      },
      trouser: {
        length: '30"',
        waist: '22" + 1/2"',
        hip: '23" + 1/2"',
        aasan: '10" + 1/2"',
        pauncha: '6"',
        elastic: '19" / 19.5"'
      }
    },
    "32": {
      shirt: {
        length: '32"',
        shoulder: '13"',
        armHole: '7"',
        sleevesL: '15" + 1/2"',
        chest: '15" + 1"',
        waist: '14" + 1"',
        hip: '16" + 1"',
        cuff: '5"'
      },
      trouser: {
        length: '32"',
        waist: '23" + 1/2"',
        hip: '24" + 1/2"',
        aasan: '11" + 1/2"',
        pauncha: '6.5"',
        elastic: '21" / 21.5"'
      }
    }
  };

  const features = [
    {
      icon: <Package className="h-6 w-6 text-gold" />,
      title: "Bulk Discounts",
      description: "Special rates for orders of 10+ pieces"
    },
    {
      icon: <Shirt className="h-6 w-6 text-gold" />,
      title: "Sampling Available",
      description: "Samples available at nominal charge. Delivery charges (DC) apply."
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

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setIsDialogOpen(true);
  };

  const renderMeasurementRow = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-gray-700">
        <span className="font-montserrat text-gray-300 capitalize">{label.replace(/([A-Z])/g, ' $1').trim()}:</span>
        <span className="font-playfair font-bold text-gold">{value}</span>
      </div>
    );
  };

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

        {/* Bulk Order Carousel */}
        <BulkOrderCarousel />

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
                  Click on any size to view detailed measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((size, index) => (
                    <div 
                      key={index}
                      className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center hover:bg-gold/20 transition-colors cursor-pointer"
                      onClick={() => handleSizeClick(size)}
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
            <p className="font-montserrat text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us for exclusive bulk pricing, sampling options, and quick quotes. 
              Perfect for boutiques, retailers, and event organizers. Discounts available based on order quantity and discussion.
            </p>

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

        {/* Size Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-black border-gold/30 text-white max-w-2xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-playfair font-bold text-gold flex items-center justify-between">
                Size {selectedSize} Measurements
                <DialogClose asChild>
                  <button className="text-gold hover:text-gold-dark">
                    <X className="h-6 w-6" />
                  </button>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>
            
            {selectedSize && sizeDetails[selectedSize as keyof typeof sizeDetails] && (
              <div className="space-y-6">
                {/* Shirt Measurements */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl font-playfair font-bold text-gold mb-4 flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    SHIRT
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(sizeDetails[selectedSize as keyof typeof sizeDetails].shirt).map(([key, value]) => 
                      renderMeasurementRow(key, value)
                    )}
                  </div>
                </div>

                {/* Trouser Measurements */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl font-playfair font-bold text-gold mb-4">
                    TROUSER
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(sizeDetails[selectedSize as keyof typeof sizeDetails].trouser).map(([key, value]) => 
                      renderMeasurementRow(key, value)
                    )}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <div className="bg-gold text-black px-6 py-3 rounded-lg font-playfair font-bold hover:bg-gold-dark transition-colors cursor-pointer">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                        Order Size {selectedSize}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BulkOrders;
