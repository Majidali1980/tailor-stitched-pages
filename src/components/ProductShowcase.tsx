import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, ZoomIn, ChevronLeft, ChevronRight, Package, Scissors, Truck, ShoppingCart, Plus, Minus, Trash2, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

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

interface CartItem {
  product: Product;
  stitchOption: 'stitched' | 'unstitched';
  quantity: number;
  selectedSize?: string;
  shippingCost: number;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

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
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product, stitchOption: 'stitched' | 'unstitched', quantity: number, selectedSize?: string, shippingCost = 0) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.stitchOption === stitchOption && item.selectedSize === selectedSize
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].shippingCost = shippingCost;
        return updated;
      }
      return [...prev, { product, stitchOption, quantity, selectedSize, shippingCost }];
    });
  };

  const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index));

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i !== index) return item;
      const newQty = Math.max(1, item.quantity + delta);
      return { ...item, quantity: newQty };
    }));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.stitchOption === 'stitched' ? item.product.price_stitched : item.product.price_unstitched;
    return sum + (price * item.quantity) + item.shippingCost;
  }, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.stitchOption === 'stitched' ? item.product.price_stitched : item.product.price_unstitched;
    return sum + (price * item.quantity);
  }, 0);

  const cartShipping = cart.reduce((sum, item) => sum + item.shippingCost, 0);

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
          <p className="text-gray-400 max-w-xl mx-auto">
            Browse our exclusive collection with stitch & unstitch options
          </p>
        </div>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-24 right-6 z-50 bg-gold text-black rounded-full p-4 shadow-2xl hover:bg-gold/90 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </motion.button>
        )}

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

        {/* Product Detail Modal with Add to Cart */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
            />
          )}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {showCart && (
            <CartDrawer
              cart={cart}
              onClose={() => setShowCart(false)}
              onRemove={removeFromCart}
              onUpdateQty={updateQuantity}
              subtotal={cartSubtotal}
              shipping={cartShipping}
              total={cartTotal}
              onCheckout={() => { setShowCart(false); setShowOrderForm(true); }}
            />
          )}
        </AnimatePresence>

        {/* Order Form */}
        {showOrderForm && (
          <OrderFormModal
            cart={cart}
            subtotal={cartSubtotal}
            shipping={cartShipping}
            total={cartTotal}
            onClose={() => setShowOrderForm(false)}
            onConfirmed={(orderId) => {
              setShowOrderForm(false);
              setCart([]);
              setConfirmedOrderId(orderId);
              setOrderConfirmed(true);
            }}
          />
        )}

        {/* Order Confirmation */}
        {orderConfirmed && (
          <OrderConfirmation
            orderId={confirmedOrderId}
            onClose={() => setOrderConfirmed(false)}
          />
        )}
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
        <img src={thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
const ProductDetailModal = ({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, stitch: 'stitched' | 'unstitched', qty: number, size?: string, shipping?: number) => void;
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [stitchOption, setStitchOption] = useState<'unstitched' | 'stitched'>('stitched');
  const [shippingCost, setShippingCost] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.available_sizes?.[0]
  );
  const [addedFeedback, setAddedFeedback] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const images = product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const basePrice = stitchOption === 'stitched' ? product.price_stitched : product.price_unstitched;
  const shipping = parseFloat(shippingCost) || 0;
  const total = (basePrice * quantity) + shipping;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAddToCart = () => {
    onAddToCart(product, stitchOption, quantity, selectedSize, shipping);
    setAddedFeedback(true);
    toast({ title: '🛒 Added to Cart!', description: `${product.title} (${stitchOption}) x${quantity}` });
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const stitchingDetails = product.stitching_details as Record<string, string> | null;

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Gallery */}
          <div className="p-4 md:p-6">
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
                style={isZoomed ? { transform: 'scale(2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: 'transform 0.1s ease' } : { transition: 'transform 0.3s ease' }}
              />
              <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-gold" />
              </div>
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImageIdx((i) => (i - 1 + images.length) % images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 text-white">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImageIdx((i) => (i + 1) % images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImageIdx(idx)} className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${idx === activeImageIdx ? 'border-gold' : 'border-gray-700 hover:border-gray-500'}`}>
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="p-4 md:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white">{product.title}</h2>
              {product.fabric_type && (
                <span className="inline-block mt-2 text-xs bg-gold/20 text-gold px-2.5 py-1 rounded-full">{product.fabric_type}</span>
              )}
            </div>

            {product.description && <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>}

            {/* Stitch Toggle */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block font-medium">Choose Option</label>
              <div className="flex gap-3">
                <button onClick={() => setStitchOption('unstitched')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${stitchOption === 'unstitched' ? 'border-gold bg-gold/10 text-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                  <Package className="w-4 h-4" /> Unstitched — ₨{product.price_unstitched.toLocaleString()}
                </button>
                <button onClick={() => setStitchOption('stitched')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${stitchOption === 'stitched' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                  <Scissors className="w-4 h-4" /> Stitched — ₨{product.price_stitched.toLocaleString()}
                </button>
              </div>
            </div>

            {/* Sizes */}
            {product.available_sizes && product.available_sizes.length > 0 && (
              <div>
                <label className="text-sm text-gray-300 mb-2 block font-medium">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.available_sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-1.5 rounded-md text-xs border transition-all ${selectedSize === size ? 'bg-gold/20 border-gold text-gold' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-medium w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

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

            {/* International Shipping */}
            <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-white">International Shipping</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Calculate your shipping via Aramex, then enter below.</p>
              <a href="https://www.aramex.com/ae/en/ship/calculate-shipping-rates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 underline underline-offset-2 mb-2">
                <ExternalLink className="w-3.5 h-3.5" /> Open Aramex Calculator
              </a>
              <Input type="number" placeholder="Shipping cost (₨)" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-9 text-sm" />
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-gold/10 to-emerald-500/10 rounded-lg p-4 border border-gold/20">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>{stitchOption === 'stitched' ? 'Stitched' : 'Unstitched'} x{quantity}</span>
                  <span>₨{(basePrice * quantity).toLocaleString()}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span><span>₨{shipping.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-lg">
                  <span>Total</span><span className="text-gold">₨{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart + WhatsApp */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className={`flex-1 font-medium py-3 transition-all ${addedFeedback ? 'bg-emerald-500 hover:bg-emerald-500' : 'bg-gold hover:bg-gold/90 text-black'}`}>
                {addedFeedback ? <><CheckCircle className="w-4 h-4" /> Added!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
              </Button>
              <Button asChild variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                <a href={`https://wa.me/923070125273?text=${encodeURIComponent(`Hi, I'm interested in "${product.title}" (${stitchOption}) x${quantity} - ₨${total.toLocaleString()}`)}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── Cart Drawer ────────────────────────────────────────────
const CartDrawer = ({
  cart, onClose, onRemove, onUpdateQty, subtotal, shipping, total, onCheckout,
}: {
  cart: CartItem[]; onClose: () => void; onRemove: (i: number) => void; onUpdateQty: (i: number, d: number) => void;
  subtotal: number; shipping: number; total: number; onCheckout: () => void;
}) => (
  <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" onClick={onClose} />
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-950 border-l border-gray-800 z-[9999] flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h3 className="text-lg font-playfair font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gold" /> Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map((item, idx) => {
          const price = item.stitchOption === 'stitched' ? item.product.price_stitched : item.product.price_unstitched;
          return (
            <div key={idx} className="bg-gray-900 rounded-lg p-3 border border-gray-800 flex gap-3">
              <img src={item.product.images[0] || '/placeholder.svg'} alt={item.product.title} className="w-16 h-20 object-cover rounded-md shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{item.product.title}</h4>
                <p className="text-xs text-gray-400 capitalize">{item.stitchOption}{item.selectedSize ? ` · ${item.selectedSize}` : ''}</p>
                <p className="text-xs text-gold mt-1">₨{price.toLocaleString()} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQty(idx, -1)} className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-white text-xs"><Minus className="w-3 h-3" /></button>
                  <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(idx, 1)} className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-white text-xs"><Plus className="w-3 h-3" /></button>
                  <button onClick={() => onRemove(idx)} className="ml-auto text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₨{subtotal.toLocaleString()}</span></div>
          {shipping > 0 && <div className="flex justify-between text-gray-400"><span>Shipping</span><span>₨{shipping.toLocaleString()}</span></div>}
          <div className="flex justify-between text-white font-bold text-lg pt-1 border-t border-gray-700"><span>Total</span><span className="text-gold">₨{total.toLocaleString()}</span></div>
        </div>
        <Button onClick={onCheckout} className="w-full bg-gold hover:bg-gold/90 text-black font-medium py-3">
          Proceed to Checkout
        </Button>
      </div>
    </motion.div>
  </>
);

// ─── Order Form Modal ───────────────────────────────────────
const OrderFormModal = ({
  cart, subtotal, shipping, total, onClose, onConfirmed,
}: {
  cart: CartItem[]; subtotal: number; shipping: number; total: number;
  onClose: () => void; onConfirmed: (orderId: string) => void;
}) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const items = cart.map(item => ({
      product_id: item.product.id,
      title: item.product.title,
      stitch_option: item.stitchOption,
      size: item.selectedSize || null,
      quantity: item.quantity,
      unit_price: item.stitchOption === 'stitched' ? item.product.price_stitched : item.product.price_unstitched,
      shipping: item.shippingCost,
    }));

    const { data, error } = await supabase.from('orders').insert({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email || null,
      customer_address: form.address,
      customer_city: form.city,
      items,
      subtotal,
      shipping_cost: shipping,
      total_amount: total,
      notes: form.notes || null,
    }).select('id').single();

    setSubmitting(false);

    if (error) {
      toast({ title: 'Order Failed', description: 'Something went wrong. Please try again.', variant: 'destructive' });
      return;
    }

    onConfirmed(data.id);
  };

  const inputClass = "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10 text-sm";

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800">
        <h2 className="text-xl font-playfair font-bold text-white mb-4">Checkout</h2>

        {/* Order Summary */}
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 mb-4 space-y-2">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm text-gray-300">
              <span className="truncate max-w-[60%]">{item.product.title} ({item.stitchOption}) x{item.quantity}</span>
              <span>₨{((item.stitchOption === 'stitched' ? item.product.price_stitched : item.product.price_unstitched) * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          {shipping > 0 && <div className="flex justify-between text-sm text-gray-400"><span>Shipping</span><span>₨{shipping.toLocaleString()}</span></div>}
          <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-700">
            <span>Total</span><span className="text-gold">₨{total.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} required />
          <Input placeholder="Phone Number *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} required />
          <Input placeholder="Email (optional)" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
          <Input placeholder="Delivery Address *" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} required />
          <Input placeholder="City *" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className={inputClass} required />
          <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-md p-3 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gold/50" />

          <Button type="submit" disabled={submitting} className="w-full bg-gold hover:bg-gold/90 text-black font-medium py-3">
            {submitting ? 'Placing Order...' : `Confirm Order — ₨${total.toLocaleString()}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ─── Order Confirmation ─────────────────────────────────────
const OrderConfirmation = ({ orderId, onClose }: { orderId: string; onClose: () => void }) => (
  <Dialog open onOpenChange={() => onClose()}>
    <DialogContent className="max-w-sm bg-gray-950 border-gray-800 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
      </motion.div>
      <h2 className="text-2xl font-playfair font-bold text-white mb-2">Order Confirmed!</h2>
      <p className="text-gray-400 text-sm mb-1">Your order has been placed successfully.</p>
      <p className="text-xs text-gray-500 mb-4">Order ID: <span className="text-gold font-mono">{orderId.slice(0, 8).toUpperCase()}</span></p>
      <p className="text-xs text-gray-400 mb-4">We'll contact you on WhatsApp/Phone to confirm your order details.</p>
      <Button onClick={onClose} className="w-full bg-gold hover:bg-gold/90 text-black font-medium">
        Continue Shopping
      </Button>
    </DialogContent>
  </Dialog>
);

export default ProductShowcase;
