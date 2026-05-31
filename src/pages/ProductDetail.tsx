
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  ZoomIn, ChevronLeft, ChevronRight, Scissors, Truck, ShoppingCart,
  Plus, Minus, CheckCircle, ExternalLink, Share2, Star, ArrowLeft,
  X, Package, Percent, Heart
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price_stitched: number;
  discount_price: number | null;
  discount_percentage: number | null;
  images: string[];
  fabric_type: string | null;
  available_sizes: string[] | null;
  category: string | null;
  brand_id: string | null;
  fabric_detail_id: string | null;
  stock_quantity: number;
}

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
}

interface FabricDetail {
  id: string;
  name: string;
  description: string | null;
  composition: string | null;
  care_instructions: string | null;
}

interface Review {
  id: string;
  name: string;
  rating: number | null;
  review_text: string;
  image_url: string | null;
  created_at: string;
}

type Currency = 'PKR' | 'USD' | 'GBP';
const CURRENCY_SYMBOLS: Record<Currency, string> = { PKR: '₨', USD: '$', GBP: '£' };
const EXCHANGE_API = 'https://api.exchangerate-api.com/v4/latest/PKR';

// localStorage helpers for order tracking
const ORDERS_KEY = 'ma_tailor_orders';
const getSavedOrders = () => {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); } catch { return []; }
};
const saveOrder = (order: any) => {
  const orders = getSavedOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 50)));
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [fabricDetail, setFabricDetail] = useState<FabricDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Image gallery
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  // Cart & order
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [shippingCost, setShippingCost] = useState('');

  // Currency
  const [rates, setRates] = useState<{ USD: number; GBP: number } | null>(null);
  const [currency, setCurrency] = useState<Currency>('PKR');

  // Order form
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      if (!id) return;

      const { data: p } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (!p) { setLoading(false); return; }

      const prod: Product = {
        id: p.id,
        title: p.title,
        description: p.description,
        price_stitched: p.price_stitched,
        discount_price: (p as any).discount_price ?? null,
        discount_percentage: (p as any).discount_percentage ?? null,
        images: Array.isArray(p.images) ? p.images as string[] : [],
        fabric_type: p.fabric_type,
        available_sizes: p.available_sizes,
        category: (p as any).category,
        brand_id: (p as any).brand_id,
        fabric_detail_id: (p as any).fabric_detail_id,
        stock_quantity: (p as any).stock_quantity ?? 0,
      };
      setProduct(prod);
      if (prod.available_sizes?.[0]) setSelectedSize(prod.available_sizes[0]);

      // Fetch brand
      if (prod.brand_id) {
        const { data: b } = await supabase.from('brands').select('*').eq('id', prod.brand_id).single();
        if (b) setBrand(b as Brand);
      }

      // Fetch fabric detail
      if (prod.fabric_detail_id) {
        const { data: f } = await supabase.from('fabric_details').select('*').eq('id', prod.fabric_detail_id).single();
        if (f) setFabricDetail(f as FabricDetail);
      }

      // Fetch product-specific reviews
      const { data: r } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_active', true)
        .eq('status', 'approved')
        .eq('product_id', id)
        .order('created_at', { ascending: false })
        .limit(10);
      if (r) setReviews(r as Review[]);

      // Fetch "You May Also Like" products
      const { data: related } = await supabase
        .from('products')
        .select('id, title, price_stitched, images, fabric_type, stock_quantity, category, brand_id, fabric_detail_id, available_sizes, description, discount_price, discount_percentage')
        .eq('is_active', true)
        .neq('id', id)
        .limit(6);
      if (related) {
        setRelatedProducts(related.map((rp: any) => ({
          ...rp,
          images: Array.isArray(rp.images) ? rp.images : [],
          stock_quantity: rp.stock_quantity ?? 0,
          discount_price: rp.discount_price ?? null,
          discount_percentage: rp.discount_percentage ?? null,
        })));
      }

      setLoading(false);
    };

    fetchAll();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch exchange rates
  useEffect(() => {
    fetch(EXCHANGE_API)
      .then(r => r.json())
      .then(data => {
        if (data.rates) setRates({ USD: data.rates.USD, GBP: data.rates.GBP });
      })
      .catch(() => {});
  }, []);

  const convertPrice = (pkrAmount: number): number => {
    if (currency === 'PKR' || !rates) return pkrAmount;
    return parseFloat((pkrAmount * rates[currency]).toFixed(2));
  };

  const formatPrice = (pkrAmount: number): string => {
    const converted = convertPrice(pkrAmount);
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString()}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product?.title, text: product?.description || '', url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link Copied!', description: 'Product link copied to clipboard.' });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !form.name || !form.phone || !form.address || !form.city) {
      toast({ title: 'Missing fields', description: 'Please fill all required fields.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const shipping = parseFloat(shippingCost) || 0;
    const unitPrice = effectivePrice;
    const subtotal = unitPrice * quantity;
    const total = subtotal + shipping;

    const items = [{
      product_id: product.id,
      title: product.title,
      size: selectedSize || null,
      quantity,
      unit_price: unitPrice,
      shipping,
      currency,
    }];

    const { data, error } = await supabase.from('orders').insert({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email || null,
      customer_address: form.address,
      customer_city: form.city,
      items: items as any,
      subtotal,
      shipping_cost: shipping,
      total_amount: total,
      notes: `${form.notes || ''} [Currency: ${currency}]`.trim(),
    }).select('id').single();

    setSubmitting(false);

    if (error) {
      console.error('Order error:', error);
      toast({ title: 'Order Failed', description: error.message || 'Something went wrong.', variant: 'destructive' });
      return;
    }

    // Save to localStorage for tracking
    saveOrder({
      id: data.id,
      date: new Date().toISOString(),
      product_title: product.title,
      total,
      currency,
      status: 'pending',
    });

    setConfirmedOrderId(data.id);
    setOrderConfirmed(true);
    setShowCheckout(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-gray-400">Product not found</p>
          <Button onClick={() => navigate('/')} variant="outline" className="border-gold text-gold">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const shipping = parseFloat(shippingCost) || 0;
  const hasDiscount = product.discount_price !== null && product.discount_price > 0 && product.discount_price < product.price_stitched;
  const effectivePrice = hasDiscount ? product.discount_price! : product.price_stitched;
  const discountPct = product.discount_percentage || (hasDiscount ? Math.round(((product.price_stitched - product.discount_price!) / product.price_stitched) * 100) : 0);
  const total = (effectivePrice * quantity) + shipping;
  const inStock = product.stock_quantity > 0;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description || `Buy ${product.title} from Ma Tailor`,
    "image": images.map((img) => img.startsWith('http') ? img : `https://matailor.lovable.app${img}`),
    "url": `https://matailor.lovable.app/product/${product.id}`,
    "offers": {
      "@type": "Offer",
      "url": `https://matailor.lovable.app/product/${product.id}`,
      "priceCurrency": "USD",
      "price": effectivePrice,
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`${product.title} | Ma Tailor`.slice(0, 60)}</title>
        <meta name="description" content={(product.description || `Buy ${product.title} from Ma Tailor — custom stitched with worldwide delivery.`).slice(0, 160)} />
        <link rel="canonical" href={`https://matailor.lovable.app/product/${product.id}`} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={(product.description || `Buy ${product.title} from Ma Tailor.`).slice(0, 160)} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://matailor.lovable.app/product/${product.id}`} />
        <meta property="og:image" content={images[0]?.startsWith('http') ? images[0] : `https://matailor.lovable.app${images[0]}`} />
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Back */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gold hover:text-gold/80 text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ─── LEFT: Image Gallery ─── */}
            <div className="space-y-3">
              <div
                ref={imgRef}
                className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-900 cursor-zoom-in group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[activeImageIdx]}
                  alt={`${product.title} - Image ${activeImageIdx + 1}`}
                  className="w-full h-full object-cover"
                  style={isZoomed ? { transform: 'scale(2.5)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: 'transform 0.1s ease' } : { transition: 'transform 0.3s ease' }}
                />
                <div className="absolute top-3 right-3 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-gold" />
                </div>
                {/* Stock badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${inStock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                  {inStock ? `In Stock (${product.stock_quantity})` : 'Out of Stock'}
                </div>
                {/* Discount badge */}
                {hasDiscount && discountPct > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Percent className="w-3 h-3" /> {discountPct}% OFF
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImageIdx((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setActiveImageIdx((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImageIdx(idx)} className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImageIdx ? 'border-gold shadow-lg shadow-gold/20' : 'border-gray-700 hover:border-gray-500'}`}>
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── RIGHT: Product Info ─── */}
            <div className="space-y-5">
              {/* Brand & Category */}
              <div className="flex items-center gap-3 flex-wrap">
                {brand && (
                  <span className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full flex items-center gap-1.5">
                    {brand.logo_url && <img src={brand.logo_url} alt={brand.name} className="w-4 h-4 rounded-full object-cover" />}
                    {brand.name}
                  </span>
                )}
                {product.category && (
                  <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{product.category}</span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white">{product.title}</h1>

              {product.description && <p className="text-gray-400 leading-relaxed">{product.description}</p>}

              {product.fabric_type && (
                <span className="inline-block text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">{product.fabric_type}</span>
              )}

              {/* ─── Price Section with Discount & Currency Selector ─── */}
              <div className="bg-gradient-to-r from-gold/10 to-emerald-500/10 rounded-xl p-5 border border-gold/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-gray-300 font-medium">Price</span>
                  </div>
                  <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    {(['PKR', 'USD', 'GBP'] as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-3 py-1.5 text-xs font-medium transition-all ${currency === c ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        {c === 'PKR' ? '🇵🇰 PKR' : c === 'USD' ? '🇺🇸 USD' : '🇬🇧 GBP'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gold">{formatPrice(effectivePrice)}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 line-through">{formatPrice(product.price_stitched)}</span>
                      <span className="bg-red-500/20 text-red-400 text-sm font-bold px-2.5 py-1 rounded-full">-{discountPct}%</span>
                    </>
                  )}
                </div>
                {rates && currency === 'PKR' && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg">
                      ≈ ${(effectivePrice * rates.USD).toFixed(2)} USD
                    </span>
                    <span className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg">
                      ≈ £{(effectivePrice * rates.GBP).toFixed(2)} GBP
                    </span>
                  </div>
                )}
              </div>

              {/* Sizes */}
              {product.available_sizes && product.available_sizes.length > 0 && (
                <div>
                  <label className="text-sm text-gray-300 mb-2 block font-medium">Select Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.available_sizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-lg text-sm border transition-all ${selectedSize === size ? 'bg-gold/20 border-gold text-gold' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'}`}>
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
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-bold text-lg w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock_quantity || 99, q + 1))} className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* International Shipping */}
              <div className="bg-gray-900/80 rounded-xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium text-white">International Shipping</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Calculate your shipping via Aramex, then enter below.</p>
                <a href="https://www.aramex.com/ae/en/ship/calculate-shipping-rates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 underline underline-offset-2 mb-3">
                  <ExternalLink className="w-3.5 h-3.5" /> Open Aramex Calculator
                </a>
                <Input type="number" placeholder="Enter shipping cost (₨)" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" />
              </div>

              {/* Total Summary */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Price x{quantity}</span>
                    <span>{formatPrice(effectivePrice * quantity)}</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between text-emerald-400 text-xs">
                      <span>You save</span>
                      <span>-{formatPrice((product.price_stitched - effectivePrice) * quantity)}</span>
                    </div>
                  )}
                  {shipping > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span><span>{formatPrice(shipping)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-xl">
                    <span>Total</span><span className="text-gold">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowCheckout(true)}
                  disabled={!inStock}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black font-medium py-3 text-base disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> {inStock ? 'Buy Now' : 'Out of Stock'}
                </Button>
                <Button asChild variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                  <a href={`https://wa.me/923070125273?text=${encodeURIComponent(`Hi, I'm interested in "${product.title}" x${quantity} - ${formatPrice(total)}`)}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button onClick={handleShare} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-3">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Track Orders Link */}
              <button onClick={() => navigate('/track-order')} className="text-xs text-gold hover:text-gold/80 underline underline-offset-2 transition-colors">
                Track Your Orders →
              </button>
            </div>
          </div>

          {/* ─── DETAILS SECTIONS (Brand & Fabric only) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {brand && (
              <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-800">
                <h3 className="text-lg font-playfair font-semibold text-white mb-3">Brand</h3>
                <div className="flex items-center gap-3">
                  {brand.logo_url && <img src={brand.logo_url} alt={brand.name} className="w-12 h-12 rounded-full object-cover border border-gold/30" />}
                  <div>
                    <p className="text-white font-medium">{brand.name}</p>
                    {brand.description && <p className="text-gray-400 text-sm">{brand.description}</p>}
                  </div>
                </div>
              </div>
            )}
            {fabricDetail && (
              <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-800">
                <h3 className="text-lg font-playfair font-semibold text-white mb-3">Fabric Details</h3>
                <p className="text-white font-medium">{fabricDetail.name}</p>
                {fabricDetail.description && <p className="text-gray-400 text-sm mt-1">{fabricDetail.description}</p>}
                {fabricDetail.composition && (
                  <div className="mt-2 bg-gray-800/50 rounded-md px-3 py-2">
                    <span className="text-xs text-gray-500">Composition</span>
                    <p className="text-sm text-white">{fabricDetail.composition}</p>
                  </div>
                )}
                {fabricDetail.care_instructions && (
                  <div className="mt-2 bg-gray-800/50 rounded-md px-3 py-2">
                    <span className="text-xs text-gray-500">Care Instructions</span>
                    <p className="text-sm text-white">{fabricDetail.care_instructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── PRODUCT-SPECIFIC REVIEWS ─── */}
          {reviews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-gold fill-gold" /> Customer Reviews ({reviews.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900/60 rounded-xl p-5 border border-gray-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: review.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">{review.review_text}</p>
                    {review.image_url && (
                      <img src={review.image_url} alt="Review" className="w-full h-32 object-cover rounded-lg mb-3" />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gold font-medium">{review.name}</span>
                      <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ─── YOU MAY ALSO LIKE ─── */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-400" /> You May Also Like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => {
                  const rpHasDiscount = rp.discount_price !== null && rp.discount_price > 0 && rp.discount_price < rp.price_stitched;
                  const rpEffective = rpHasDiscount ? rp.discount_price! : rp.price_stitched;
                  const rpDiscPct = rp.discount_percentage || (rpHasDiscount ? Math.round(((rp.price_stitched - rp.discount_price!) / rp.price_stitched) * 100) : 0);
                  return (
                    <motion.div
                      key={rp.id}
                      whileHover={{ y: -4 }}
                      className="group bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-gold/40 transition-colors"
                      onClick={() => navigate(`/product/${rp.id}`)}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img src={rp.images[0] || '/placeholder.svg'} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        {rpHasDiscount && rpDiscPct > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">-{rpDiscPct}%</div>
                        )}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-playfair text-sm font-semibold text-white truncate">{rp.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-emerald-400 text-sm font-bold">{formatPrice(rpEffective)}</span>
                            {rpHasDiscount && (
                              <span className="text-gray-500 text-xs line-through">{formatPrice(rp.price_stitched)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ─── CHECKOUT OVERLAY ─── */}
        {showCheckout && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-950 border border-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-playfair font-bold text-white">Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span className="truncate max-w-[60%]">{product.title} x{quantity}</span>
                  <span>{formatPrice(effectivePrice * quantity)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-emerald-400 text-xs">
                    <span>Discount saved</span><span>-{formatPrice((product.price_stitched - effectivePrice) * quantity)}</span>
                  </div>
                )}
                {shipping > 0 && <div className="flex justify-between text-gray-400"><span>Shipping</span><span>{formatPrice(shipping)}</span></div>}
                <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-700">
                  <span>Total ({currency})</span><span className="text-gold">{formatPrice(total)}</span>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-3">
                <Input placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" required />
                <Input placeholder="Phone Number *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" required />
                <Input placeholder="Email (optional)" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" />
                <Input placeholder="Delivery Address *" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" required />
                <Input placeholder="City *" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10" required />
                <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-md p-3 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gold/50" />
                <Button type="submit" disabled={submitting} className="w-full bg-gold hover:bg-gold/90 text-black font-medium py-3">
                  {submitting ? 'Placing Order...' : `Confirm Order — ${formatPrice(total)}`}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        {/* ─── ORDER CONFIRMED ─── */}
        {orderConfirmed && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-gray-950 border border-gray-800 rounded-2xl max-w-sm w-full p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-playfair font-bold text-white mb-2">Order Confirmed!</h2>
              <p className="text-gray-400 text-sm mb-1">Your order has been placed successfully.</p>
              <p className="text-xs text-gray-500 mb-4">Order ID: <span className="text-gold font-mono">{confirmedOrderId.slice(0, 8).toUpperCase()}</span></p>
              <p className="text-xs text-gray-400 mb-4">We'll contact you on WhatsApp/Phone to confirm details.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setOrderConfirmed(false); navigate('/track-order'); }} variant="outline" className="flex-1 border-gold text-gold hover:bg-gold/10">
                  Track Order
                </Button>
                <Button onClick={() => { setOrderConfirmed(false); navigate('/'); }} className="flex-1 bg-gold hover:bg-gold/90 text-black font-medium">
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
};

export default ProductDetail;
