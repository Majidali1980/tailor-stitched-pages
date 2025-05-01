import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Updated gallery items with the uploaded designs
  const galleryItems = [
    {
      id: 1,
      category: "party",
      image: "/lovable-uploads/fa345f39-9ffe-49e0-8db2-02481f207f21.png",
      title: "Patterned Suit Set",
    },
    {
      id: 2,
      category: "casual",
      image: "/lovable-uploads/2289ae98-4c91-4c97-8db8-e0d64be8ad1c.png",
      title: "Pink Kids Outfit",
    },
    {
      id: 3,
      category: "bridal",
      image: "/lovable-uploads/f9034e3c-903a-44e5-8dad-0538f66b3d1d.png",
      title: "Floral Kurta Design",
    },
    {
      id: 4,
      category: "casual",
      image: "/lovable-uploads/93220827-794c-4d63-9bca-d25648548586.png",
      title: "Black Block Print",
    },
    {
      id: 5,
      category: "casual",
      image: "/lovable-uploads/0ce58cf7-8cd5-4fbb-b76a-9f210383e17b.png",
      title: "Solid Color Set",
    },
    {
      id: 6,
      category: "party",
      image: "/lovable-uploads/a3edc439-ccb6-4b44-9e3e-db7149e5b5b9.png",
      title: "Blue Floral Print",
    },
    {
      id: 7,
      category: "casual",
      image: "/lovable-uploads/d1b4577c-1ba8-4bcc-b2df-c9bce312eab2.png",
      title: "Mint Green Pattern",
    },
    {
      id: 8,
      category: "party",
      image: "/lovable-uploads/f890c6b4-0e51-466a-be2b-241170f492f2.png",
      title: "Yellow Stripe Set",
    },
    {
      id: 9,
      category: "party",
      image: "/lovable-uploads/58027903-d301-44f4-9473-b464c8acefdf.png",
      title: "Black & White Design",
    },
    {
      id: 10,
      category: "party",
      image: "/lovable-uploads/93b6d47b-984c-4750-a420-903230fc55f8.png",
      title: "Teal Pattern Set",
    },
    {
      id: 11,
      category: "bridal",
      image: "/lovable-uploads/fe510a4f-cd1b-4815-a92d-b3fa4fdae000.png",
      title: "Pink & Teal Design",
    },
    {
      id: 12,
      category: "casual",
      image: "/lovable-uploads/a7c44e30-0f4b-403a-a08e-919aee496313.png",
      title: "Light Blue Floral",
    },
    {
      id: 13,
      category: "casual",
      image: "/lovable-uploads/ea5d124b-d56e-48fd-a55a-90390b4e0842.png",
      title: "Black & Red Floral",
    },
    {
      id: 14,
      category: "bridal",
      image: "/lovable-uploads/bfc1884a-a116-4a37-accf-d38f9e3588ba.png",
      title: "Pink Floral Outfit",
    },
    {
      id: 15,
      category: "party",
      image: "/lovable-uploads/28b72969-255a-4ce8-9089-4ef64c3a9fe6.png",
      title: "Purple Floral Design",
    },
    {
      id: 16,
      category: "casual",
      image: "/lovable-uploads/d2adeaf8-b268-49ad-9774-52a4c38bb8b0.png",
      title: "Blue & Orange Print",
    },
  ];

  const categories = [
    { value: "all", label: "All" },
    { value: "party", label: "Party Wear" },
    { value: "casual", label: "Casual Wear" },
    { value: "bridal", label: "Bridal Wear" },
  ];

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const whatsappLink = "https://wa.me/923070125273";

  return (
    <section id="gallery" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gold">Gallery</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Explore our collection of beautifully crafted outfits for every occasion.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-900 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="data-[state=active]:bg-gold data-[state=active]:text-black"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="fancy-border">
                  <Card className="bg-gray-900 overflow-hidden border-none h-full group hover:transform hover:scale-[1.02] transition-transform duration-300">
                    <CardContent className="p-0 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="w-full p-4 bg-gradient-to-t from-black to-transparent">
                          <h3 className="text-lg font-playfair font-bold text-white">{item.title}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat flex items-center gap-2">
              <Phone className="h-4 w-4" /> Book Your Design Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
