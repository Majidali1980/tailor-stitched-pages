
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Placeholder images for demonstration
  const galleryItems = [
    {
      id: 1,
      category: "party",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&h=600",
      title: "Party Wear Collection",
    },
    {
      id: 2,
      category: "casual",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=500&h=600",
      title: "Casual Outfit",
    },
    {
      id: 3,
      category: "bridal",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=500&h=600",
      title: "Bridal Collection",
    },
    {
      id: 4,
      category: "party",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&h=600",
      title: "Evening Gown",
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
          <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
