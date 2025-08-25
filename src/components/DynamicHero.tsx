
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HeroData {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
}

const DynamicHero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_section')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching hero data:', error);
        } else if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section id="home" className="pt-24 min-h-[85vh] bg-black text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section id="home" className="pt-24 min-h-[85vh] bg-black text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400">Failed to load content</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="pt-24 min-h-[85vh] bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gold-gradient opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gold-gradient opacity-5 transform rotate-180"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
                <span className="gold-gradient-text">{heroData.title}</span>
              </h1>
              {heroData.description && (
                <p className="text-lg md:text-xl font-montserrat text-gray-300 mt-6">
                  {heroData.description}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {heroData.button1_text && heroData.button1_link && (
                <a href={heroData.button1_link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat text-lg py-6 px-8 flex items-center gap-2">
                    <Phone className="h-5 w-5" /> {heroData.button1_text}
                  </Button>
                </a>
              )}
              {heroData.button2_text && heroData.button2_link && (
                <a href={heroData.button2_link}>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 font-montserrat text-lg py-6 px-8">
                    {heroData.button2_text}
                  </Button>
                </a>
              )}
            </div>
            
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">15+</span>
                <span className="text-sm font-montserrat text-gray-300">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">500+</span>
                <span className="text-sm font-montserrat text-gray-300">Satisfied Clients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-playfair font-bold text-gold">15-17</span>
                <span className="text-sm font-montserrat text-gray-300">Days Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="relative fancy-border bg-black rounded-lg overflow-hidden animate-fade-in hover-scale max-w-md mx-auto h-[500px]">
            {heroData.image_url && (
              <img 
                src={heroData.image_url} 
                alt="MA Tailor Pakistani Dress Design" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default DynamicHero;
