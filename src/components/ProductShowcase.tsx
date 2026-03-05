import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, ZoomIn, ChevronLeft, ChevronRight, Package, Scissors, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price_unstitched: number;
  price_stitched: number;
  images: string[];
  fabric_type: string | null;
  available_sizes: string[] | null;
  stitching_details: Record<string, unknown> | null;
  is_active: boolean;
  display_order: number | null;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        const mapped = data.map((p: any) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images : [],
        }));
        setProducts(mapped);
        if (mapped.length > 0) setSelectedProduct(mapped[0]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
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
          <p className="text-gray-400 max-w-xl mx-auto">
            Browse our exclusive collection with stitch & unstitch options
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── Product Card ───────────────────────────────────────────
const ProductCard = ({ product, onSelect }: { product: Product; onSelect: () => void }) => {
  const thumbnail = product.images[0] || '/placeholder.svg';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-gold/40 transition-colors"
      onClick={onSelect}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-playfair text-lg font-semibold text-white truncate">{product.title}</h3>
          <div className="flex gap-3 mt-1 text-sm">
            <span className="text-gold">Unstitched: ₨{product.price_unstitched.toLocaleString()}</span>
            <span className="text-emerald-400">Stitched: ₨{product.price_stitched.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Product Detail Modal ───────────────────────────────────
const ProductDetailModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [stitchOption, setStitchOption] = useState<'unstitched' | 'stitched'>('stitched');
  const [shippingCost, setShippingCost] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  const images = product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const basePrice = stitchOption === 'stitched' ? product.price_stitched : product.price_unstitched;
  const shipping = parseFloat(shippingCost) || 0;
  const total = basePrice + shipping;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prevImage = () => setActiveImageIdx((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setActiveImageIdx((i) => (i + 1) % images.length);

  const stitchingDetails = product.stitching_details as Record<string, string> | null;

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Gallery */}
          <div className="p-4 md:p-6">
            {/* Main Image with Zoom */}
            <div
              ref={imgRef}
              className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={images[activeImageIdx]}
                alt={`${product.title} - Image ${activeImageIdx + 1}`}
                className="w-full h-full object-cover"
                style={
                  isZoomed
                    ? {
                        transform: 'scale(2)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: 'transform 0.1s ease',
                      }
                    : { transition: 'transform 0.3s ease' }
                }
              />
              <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-gold" />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      idx === activeImageIdx ? 'border-gold' : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Pricing */}
          <div className="p-4 md:p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white">{product.title}</h2>
              {product.fabric_type && (
                <span className="inline-block mt-2 text-xs bg-gold/20 text-gold px-2.5 py-1 rounded-full">
                  {product.fabric_type}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
            )}

            {/* Stitch / Unstitch Toggle */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block font-medium">Choose Option</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setStitchOption('unstitched')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                    stitchOption === 'unstitched'
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Unstitched — ₨{product.price_unstitched.toLocaleString()}
                </button>
                <button
                  onClick={() => setStitchOption('stitched')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                    stitchOption === 'stitched'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <Scissors className="w-4 h-4" />
                  Stitched — ₨{product.price_stitched.toLocaleString()}
                </button>
              </div>
            </div>

            {/* Available Sizes */}
            {product.available_sizes && product.available_sizes.length > 0 && (
              <div>
                <label className="text-sm text-gray-300 mb-2 block font-medium">Available Sizes</label>
                <div className="flex gap-2 flex-wrap">
                  {product.available_sizes.map((size) => (
                    <span key={size} className="px-3 py-1.5 rounded-md bg-gray-800 text-gray-300 text-xs border border-gray-700">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stitching Details */}
            {stitchingDetails && Object.keys(stitchingDetails).length > 0 && (
              <div>
                <label className="text-sm text-gray-300 mb-2 block font-medium">Stitching Details</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(stitchingDetails).map(([key, val]) => (
                    <div key={key} className="bg-gray-900 rounded-md px-3 py-2 border border-gray-800">
                      <span className="text-xs text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                      <p className="text-sm text-white">{String(val)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* International Shipping (Aramex) */}
            <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-white">International Shipping</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Calculate your shipping cost using Aramex, then enter the amount below.
              </p>
              <a
                href="https://www.aramex.com/ae/en/ship/calculate-shipping-rates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 underline underline-offset-2 mb-3"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Aramex Shipping Rate Calculator
              </a>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Enter shipping cost (₨)"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-9 text-sm"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-gold/10 to-emerald-500/10 rounded-lg p-4 border border-gold/20">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>{stitchOption === 'stitched' ? 'Stitched' : 'Unstitched'} Price</span>
                  <span>₨{basePrice.toLocaleString()}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping (Aramex)</span>
                    <span>₨{shipping.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold">₨{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Order CTA */}
            <Button
              asChild
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
            >
              <a
                href={`https://wa.me/923070125273?text=${encodeURIComponent(
                  `Hi, I'm interested in "${product.title}" (${stitchOption}) - ₨${total.toLocaleString()}${shipping > 0 ? ` (incl. ₨${shipping} shipping)` : ''}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductShowcase;
