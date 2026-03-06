
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
  Shirt, Info, X
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price_stitched: number;
  images: string[];
  fabric_type: string | null;
  available_sizes: string[] | null;
  stitching_details: Record<string, unknown> | null;
  category: string | null;
  shirt_details: Record<string, unknown> | null;
  trouser_details: Record<string, unknown> | null;
  dopatta_details: Record<string, unknown> | null;
  brand_id: string | null;
  fabric_detail_id: string | null;
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

const EXCHANGE_API = 'https://api.exchangerate-api.com/v4/latest/PKR';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [fabricDetail, setFabricDetail] = useState<FabricDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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
        ...p,
        images: Array.isArray(p.images) ? p.images as string[] : [],
        stitching_details: p.stitching_details as Record<string, unknown> | null,
        shirt_details: (p as any).shirt_details as Record<string, unknown> | null,
        trouser_details: (p as any).trouser_details as Record<string, unknown> | null,
        dopatta_details: (p as any).dopatta_details as Record<string, unknown> | null,
        brand_id: (p as any).brand_id,
        fabric_detail_id: (p as any).fabric_detail_id,
        category: (p as any).category,
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

      // Fetch reviews
      const { data: r } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_active', true)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(10);
      if (r) setReviews(r as Review[]);

      setLoading(false);
    };

    fetchAll();
  }, [id]);

  // Fetch exchange rates
  useEffect(() => {
    fetch(EXCHANGE_API)
      .then(r => r.json())
      .then(data => {
        if (data.rates) {
          setRates({ USD: data.rates.USD, GBP: data.rates.GBP });
        }
      })
      .catch(() => {});
  }, []);

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
      try {
        await navigator.share({ title: product?.title, text: product?.description || '', url });
      } catch {}
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
    const unitPrice = product.price_stitched;
    const subtotal = unitPrice * quantity;
    const total = subtotal + shipping;

    const items = [{
      product_id: product.id,
      title: product.title,
      stitch_option: 'stitched',
      size: selectedSize || null,
      quantity,
      unit_price: unitPrice,
      shipping,
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
      notes: form.notes || null,
    }).select('id').single();

    setSubmitting(false);

    if (error) {
      console.error('Order error:', error);
      toast({ title: 'Order Failed', description: error.message || 'Something went wrong.', variant: 'destructive' });
      return;
    }

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
  const basePrice = product.price_stitched;
  const total = (basePrice * quantity) + shipping;

  const renderDetails = (label: string, details: Record<string, unknown> | null, icon: React.ReactNode) => {
    if (!details || Object.keys(details).length === 0) return null;
    return (
      <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-800">
        <h3 className="text-lg font-playfair font-semibold text-white mb-3 flex items-center gap-2">{icon} {label}</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(details).map(([key, val]) => (
            <div key={key} className="bg-gray-800/50 rounded-md px-3 py-2">
              <span className="text-xs text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
              <p className="text-sm text-white">{String(val)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{product.title} - Ma Tailor Pakistan</title>
        <meta name="description" content={product.description || `Buy ${product.title} from Ma Tailor`} />
        <link rel="canonical" href={`https://matailor.lovable.app/product/${product.id}`} />
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

              {/* Fabric Type */}
              {product.fabric_type && (
                <span className="inline-block text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">{product.fabric_type}</span>
              )}

              {/* ─── Price Section with Currency Converter ─── */}
              <div className="bg-gradient-to-r from-gold/10 to-emerald-500/10 rounded-xl p-5 border border-gold/20">
                <div className="flex items-center gap-2 mb-3">
                  <Scissors className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300 font-medium">Stitched Price</span>
                </div>
                <div className="text-3xl font-bold text-gold mb-3">₨{basePrice.toLocaleString()}</div>
                {rates && (
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg">
                      🇺🇸 ${(basePrice * rates.USD).toFixed(2)} USD
                    </span>
                    <span className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg">
                      🇬🇧 £{(basePrice * rates.GBP).toFixed(2)} GBP
                    </span>
                    <span className="text-sm bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg">
                      🇵🇰 ₨{basePrice.toLocaleString()} PKR
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
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700">
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
                    <span>Stitched x{quantity}</span>
                    <span>₨{(basePrice * quantity).toLocaleString()}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span><span>₨{shipping.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-xl">
                    <span>Total</span><span className="text-gold">₨{total.toLocaleString()}</span>
                  </div>
                  {rates && (
                    <div className="flex gap-3 text-xs text-gray-500 pt-1">
                      <span>≈ ${(total * rates.USD).toFixed(2)}</span>
                      <span>≈ £{(total * rates.GBP).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={() => setShowCheckout(true)} className="flex-1 bg-gold hover:bg-gold/90 text-black font-medium py-3 text-base">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
                </Button>
                <Button asChild variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                  <a href={`https://wa.me/923070125273?text=${encodeURIComponent(`Hi, I'm interested in "${product.title}" (Stitched) x${quantity} - ₨${total.toLocaleString()}`)}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button onClick={handleShare} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-3">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* ─── DETAILS SECTIONS ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {renderDetails('Shirt Details', product.shirt_details, <Shirt className="w-5 h-5 text-gold" />)}
            {renderDetails('Trouser Details', product.trouser_details, <Info className="w-5 h-5 text-emerald-400" />)}
            {renderDetails('Dopatta Details', product.dopatta_details, <Info className="w-5 h-5 text-pink-400" />)}
            {renderDetails('Stitching Details', product.stitching_details as Record<string, unknown> | null, <Scissors className="w-5 h-5 text-blue-400" />)}

            {/* Brand Info */}
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

            {/* Fabric Info */}
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

          {/* ─── REVIEWS ─── */}
          {reviews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-gold fill-gold" /> Customer Reviews
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

              {/* Summary */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span className="truncate max-w-[60%]">{product.title} (Stitched) x{quantity}</span>
                  <span>₨{(basePrice * quantity).toLocaleString()}</span>
                </div>
                {shipping > 0 && <div className="flex justify-between text-gray-400"><span>Shipping</span><span>₨{shipping.toLocaleString()}</span></div>}
                <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-700">
                  <span>Total</span><span className="text-gold">₨{total.toLocaleString()}</span>
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
                  {submitting ? 'Placing Order...' : `Confirm Order — ₨${total.toLocaleString()}`}
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
              <Button onClick={() => { setOrderConfirmed(false); navigate('/'); }} className="w-full bg-gold hover:bg-gold/90 text-black font-medium">
                Continue Shopping
              </Button>
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
