import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Scissors, ShoppingCart, Zap, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  title: string;
  price_stitched: number;
  discount_price: number | null;
  discount_percentage: number | null;
  images: string[];
  fabric_type: string | null;
  stock_quantity: number;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price_stitched, images, fabric_type, stock_quantity, discount_price, discount_percentage')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setProducts(data.map((p: any) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images : [],
          stock_quantity: p.stock_quantity ?? 0,
          discount_price: p.discount_price ?? null,
          discount_percentage: p.discount_percentage ?? null,
        })));
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    toast({
      title: 'Added to Cart',
      description: `${product.title} has been added. Visit the product page to checkout.`,
    });
    navigate(`/product/${product.id}`);
  };

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
          {products.map((product) => {
            const inStock = product.stock_quantity > 0;
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                className="group bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-gold/40 transition-colors"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={product.images[0] || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Stock badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${inStock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    <Package className="w-3 h-3" />
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-playfair text-lg font-semibold text-white truncate">{product.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm">
                      <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">₨{product.price_stitched.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="p-3 flex gap-2">
                  <Button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!inStock}
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white text-xs h-9 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add to Cart
                  </Button>
                  <Button
                    onClick={(e) => handleBuyNow(e, product)}
                    disabled={!inStock}
                    className="flex-1 bg-gold hover:bg-gold/90 text-black text-xs h-9 disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1.5" /> Buy Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
