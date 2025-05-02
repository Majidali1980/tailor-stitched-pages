import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageCircle, ZoomIn, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{image: string; title: string} | null>(null);
  
  // Updated gallery items with new kids collection images
  const galleryItems = [
    // Shalwar Kameez (keeping the existing ones)
    {
      id: 1,
      category: "shalwar",
      image: "public/lovable-uploads/ccacbf2c-4ee7-4e8a-9cee-209886fcec9e.png",
      title: "Black Floral Shalwar Kameez",
    },
    {
      id: 2,
      category: "shalwar",
      image: "public/lovable-uploads/7c6a51ba-c81f-456b-91d6-ecccfbd7b98c.png",
      title: "Black and Red Embroidered Suit",
    },
    {
      id: 3,
      category: "shalwar",
      image: "public/lovable-uploads/2a6f7e47-abd2-4384-8aa3-6641ef6fe3a8.png",
      title: "Traditional Pattern Shalwar Set",
    },
    {
      id: 4,
      category: "shalwar",
      image: "public/lovable-uploads/399354ff-9e39-4bef-aa8d-f0beb7ba4cb0.png",
      title: "Navy Patterned Shalwar Kameez",
    },
    {
      id: 5,
      category: "shalwar",
      image: "public/lovable-uploads/f5a0800b-72f9-4836-9d3e-a0906dc72984.png",
      title: "White Floral Shalwar Design",
    },
    
    // Shirts (keeping the existing ones)
    {
      id: 6,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(1).png?raw=true",
      title: "Classic Shirt Design",
    },
    {
      id: 7,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(2).png?raw=true",
      title: "Floral Pattern Shirt",
    },
    {
      id: 8,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(3).png?raw=true",
      title: "Casual Summer Shirt",
    },
    {
      id: 9,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(4).png?raw=true",
      title: "Embroidered Shirt",
    },
    {
      id: 10,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(5).png?raw=true",
      title: "Modern Pattern Shirt",
    },
    {
      id: 11,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(6).png?raw=true",
      title: "Designer Shirt Collection",
    },
    {
      id: 12,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(7).png?raw=true",
      title: "Printed Casual Shirt",
    },
    {
      id: 13,
      category: "shirts",
      image: "https://github.com/Majidali1980/lmages/blob/main/shirt1%20(8).png?raw=true",
      title: "Stylish Summer Shirt",
    },
    
    // Neck Design (keeping the existing ones)
    {
      id: 14,
      category: "neck",
      image: "public/lovable-uploads/d10a28b8-686d-4d59-983d-f77ff1b14833.png",
      title: "Floral Red Embellished Neck",
    },
    {
      id: 15,
      category: "neck",
      image: "public/lovable-uploads/0332b418-3387-4ae2-934a-87db86c854c5.png",
      title: "Magenta Button Detail Neck",
    },
    {
      id: 16,
      category: "neck",
      image: "public/lovable-uploads/8358ec5e-9b7f-494f-b895-43ee164412cd.png",
      title: "Patterned Geometric Neck Design",
    },
    {
      id: 17,
      category: "neck",
      image: "public/lovable-uploads/0a51992b-0ee6-4788-b58a-2a46624f3c47.png",
      title: "Black Snowflake Pattern Neck",
    },
    {
      id: 18,
      category: "neck",
      image: "public/lovable-uploads/ec49d525-ae3d-4c93-aeb4-428033d340d5.png",
      title: "Pink Striped Embroidered Neck",
    },
    {
      id: 19,
      category: "neck",
      image: "public/lovable-uploads/c705b7f5-fb01-4b56-b7a6-e57bf4524241.png",
      title: "Purple Beaded Elegant Neck",
    },
    {
      id: 20,
      category: "neck",
      image: "public/lovable-uploads/49c3a4ff-daa5-443a-ac54-2093a6b06713.png",
      title: "Traditional Patterned Neck Design",
    },
    {
      id: 21,
      category: "neck",
      image: "public/lovable-uploads/3d66c70c-3d5b-476c-a6df-a3ae9d21754e.png",
      title: "Mint Floral Embroidered Neck",
    },
    {
      id: 22,
      category: "neck",
      image: "public/lovable-uploads/2a3b37b4-7bf8-4eb0-9c9d-9bea838f94b8.png",
      title: "Green Geometric Pattern Neck",
    },
    
    // Kids Collection with new uploaded images
    {
      id: 23,
      category: "kids",
      image: "public/lovable-uploads/564b04ff-47b7-422f-b90e-de9f276cb32b.png",
      title: "Floral Print Kids Frock",
    },
    {
      id: 24,
      category: "kids",
      image: "public/lovable-uploads/af404edc-a28e-4fdd-ba8f-cc314303003b.png",
      title: "Pink Floral Kids Dress",
    },
    {
      id: 25,
      category: "kids",
      image: "public/lovable-uploads/0c022880-a73b-4b8b-a775-914f15d6978f.png",
      title: "Magenta Patterned Kids Set",
    },
    {
      id: 26,
      category: "kids",
      image: "public/lovable-uploads/ee6abd02-52c8-4c33-8cf8-c3359cfd160b.png",
      title: "Red Traditional Kids Outfit",
    },
    {
      id: 27,
      category: "kids",
      image: "public/lovable-uploads/c85693f8-65ae-4ba7-9505-ca462eabc455.png",
      title: "Magenta Gold Trim Kids Dress",
    },
    {
      id: 28,
      category: "kids",
      image: "public/lovable-uploads/128ef175-83c6-4201-86d6-26f65c30cfb6.png",
      title: "Pink Patterned Kids Frock",
    },
    {
      id: 29,
      category: "kids",
      image: "public/lovable-uploads/4e74ef1c-0a6c-4a06-9133-c8a563654241.png",
      title: "Orange Embroidered Kids Set",
    },
  ];

  const categories = [
    { value: "all", label: "All" },
    { value: "shalwar", label: "Shalwar Kameez" },
    { value: "shirts", label: "Shirts" },
    { value: "neck", label: "Neck Design" },
    { value: "kids", label: "Kids Collection" },
  ];

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const whatsappLink = "https://wa.me/923070125273";
  
  const shareOnWhatsApp = (title: string) => {
    const text = `Check out this amazing design: ${title} from MA Tailor`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

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
          <div className="flex justify-center mb-12 overflow-x-auto">
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
                        className="w-full h-80 object-cover cursor-pointer"
                        onClick={() => setSelectedImage(item)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="w-full p-4 bg-gradient-to-t from-black to-transparent">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-playfair font-bold text-white">{item.title}</h3>
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shareOnWhatsApp(item.title);
                                }}
                                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                              >
                                <MessageCircle className="h-4 w-4 text-white" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(item);
                                }}
                                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                              >
                                <ZoomIn className="h-4 w-4 text-white" />
                              </button>
                            </div>
                          </div>
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
      
      {/* Image Zoom Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl bg-black/95 border border-gold">
          <div className="relative">
            <DialogClose className="absolute right-2 top-2 z-10 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors">
              <X className="h-5 w-5 text-white" />
            </DialogClose>
            {selectedImage && (
              <div className="flex flex-col gap-4">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-playfair font-bold text-gold">{selectedImage.title}</h3>
                  <button 
                    onClick={() => shareOnWhatsApp(selectedImage.title)}
                    className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 text-white" />
                    <span className="text-white">Share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
