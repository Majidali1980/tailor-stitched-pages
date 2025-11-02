import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface HeroItem {
  id: string;
  image_url: string;
  link: string | null;
}

export const HeroSectionServices = () => {
  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);

  useEffect(() => {
    fetchHeroItems();
  }, []);

  const fetchHeroItems = async () => {
    const { data, error } = await supabase
      .from('hero_section_services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching hero items:', error);
    } else {
      setHeroItems(data || []);
    }
  };

  if (heroItems.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroItems.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-lg shadow-lg group">
              {item.link ? (
                <Link to={item.link} className="block">
                  <img
                    src={item.image_url}
                    alt="Hero section"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
              ) : (
                <img
                  src={item.image_url}
                  alt="Hero section"
                  className="w-full h-64 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
