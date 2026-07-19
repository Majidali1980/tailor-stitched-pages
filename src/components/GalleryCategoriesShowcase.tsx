import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';

interface GalleryRow {
  id: string;
  image_url: string;
  category: string;
}

const CATEGORIES: { value: string; label: string; description: string }[] = [
  { value: 'shalwar-kameez', label: 'Shalwar Kameez', description: 'Traditional stitched sets' },
  { value: 'shirt', label: 'Shirts', description: 'Kurtas & tailored shirts' },
  { value: 'bottom', label: 'Bottoms', description: 'Trousers, shalwars & palazzos' },
  { value: 'full-suit', label: 'Full Suit', description: '3-piece bespoke suits' },
  { value: 'neck-design', label: 'Neck Designs', description: 'Signature neckline details' },
  { value: 'girls-suits', label: 'Girls Suits', description: 'Elegant girls collection' },
];

const GalleryCategoriesShowcase = () => {
  const [rows, setRows] = useState<GalleryRow[]>([]);

  useEffect(() => {
    supabase
      .from('gallery')
      .select('id, image_url, category')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => setRows((data as GalleryRow[]) || []));
  }, []);

  const byCategory = (cat: string) => rows.filter((r) => r.category === cat);

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-3">
            Shop by <span className="text-gold">Category</span>
          </h2>
          <p className="text-gray-300 font-montserrat max-w-2xl mx-auto">
            Browse our stitched work by style. Tap any card to see the full collection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => {
            const items = byCategory(cat.value);
            const preview = items[0]?.image_url;
            return (
              <Link
                key={cat.value}
                to={`/gallery?category=${cat.value}`}
                className="group relative overflow-hidden rounded-xl border border-gold/30 bg-gray-900 aspect-[4/5] block"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt={cat.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-lg md:text-2xl font-playfair font-bold text-white">
                        {cat.label}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 font-montserrat mt-1">
                        {cat.description}
                      </p>
                      <span className="inline-block mt-2 text-xs text-gold font-montserrat">
                        {items.length} design{items.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryCategoriesShowcase;
