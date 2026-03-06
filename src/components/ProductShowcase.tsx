import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Scissors } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  price_stitched: number;
  images: string[];
  fabric_type: string | null;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price_stitched, images, fabric_type')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setProducts(data.map((p: any) => ({ ...p, images: Array.isArray(p.images) ? p.images : [] })));
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-3">
            <span className="gold-gradient-text">Our Products</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Browse our exclusive stitched collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="group bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-gold/40 transition-colors"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={product.images[0] || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-playfair text-lg font-semibold text-white truncate">{product.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-sm">
                    <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">₨{product.price_stitched.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
