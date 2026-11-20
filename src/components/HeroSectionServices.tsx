import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
interface HeroItem {
  id: string;
  image_url: string;
  link: string | null;
  image_height: string;
  image_width: string;
}
export const HeroSectionServices = () => {
  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  useEffect(() => {
    fetchHeroItems();
  }, []);
  const fetchHeroItems = async () => {
    const {
      data,
      error
    } = await supabase.from('hero_section_services').select('*').eq('is_active', true).order('display_order', {
      ascending: true
    });
    if (error) {
      console.error('Error fetching hero items:', error);
    } else {
      setHeroItems(data || []);
    }
  };
  if (heroItems.length === 0) return null;
  return <section className="w-full">
      <div className="w-full">
        <div className="flex flex-col gap-0">
          {heroItems.map(item => <div key={item.id} className="relative w-full overflow-hidden group bg-black">
              {item.link ? <Link to={item.link} className="block w-full">
                  <img 
                    src={item.image_url} 
                    alt="Hero section" 
                    className="object-contain bg-black transition-transform duration-300 group-hover:scale-105" 
                    style={{ width: item.image_width, height: item.image_height }}
                  />
                </Link> : <img 
                  src={item.image_url} 
                  alt="Hero section" 
                  className="object-contain bg-black" 
                  style={{ width: item.image_width, height: item.image_height }}
                />}
            </div>)}
        </div>
      </div>
    </section>;
};