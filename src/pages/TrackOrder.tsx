
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Package, Search, Truck, CheckCircle, Clock, ArrowLeft,
  ExternalLink, MapPin, ShoppingCart
} from 'lucide-react';

interface LocalOrder {
  id: string;
  date: string;
  product_title: string;
  total: number;
  currency: string;
  status: string;
}

interface OrderDetail {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  customer_address: string;
  items: any;
  subtotal: number;
  shipping_cost: number;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  tracking_url: string | null;
  estimated_delivery: string | null;
  created_at: string;
  notes: string | null;
}

const ORDERS_KEY = 'ma_tailor_orders';
const getSavedOrders = (): LocalOrder[] => {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); } catch { return []; }
};

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  pending: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: <Clock className="w-4 h-4" />, label: 'Pending' },
  confirmed: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: <CheckCircle className="w-4 h-4" />, label: 'Confirmed' },
  processing: { color: 'text-purple-400 bg-purple-400/10 border-purple-400/30', icon: <Package className="w-4 h-4" />, label: 'Processing' },
  shipped: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', icon: <Truck className="w-4 h-4" />, label: 'Shipped' },
  delivered: { color: 'text-green-500 bg-green-500/10 border-green-500/30', icon: <CheckCircle className="w-4 h-4" />, label: 'Delivered' },
  cancelled: { color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: <Package className="w-4 h-4" />, label: 'Cancelled' },
};

const STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const TrackOrder = () => {
  const navigate = useNavigate();
  const [savedOrders, setSavedOrders] = useState<LocalOrder[]>([]);
  const [searchId, setSearchId] = useState('');
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    setSavedOrders(getSavedOrders());
  }, []);

  const searchOrder = async (orderId: string) => {
    if (!orderId.trim()) return;
    setSearching(true);
    setSearchError('');
    setOrderDetail(null);

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId.trim())
      .single();

    setSearching(false);
    if (error || !data) {
      setSearchError('Order not found. Please check your Order ID.');
      return;
    }
    setOrderDetail(data as OrderDetail);
  };

  const statusCfg = (s: string) => STATUS_CONFIG[s] || STATUS_CONFIG.pending;
  const activeStepIdx = orderDetail ? STEPS.indexOf(orderDetail.status) : -1;

  return (
    <>
      <Helmet>
        <title>Track Your Order - Ma Tailor Pakistan</title>
        <meta name="description" content="Track your Ma Tailor order status and parcel delivery." />
        <link rel="canonical" href="https://matailor.lovable.app/track-order" />
        <meta property="og:title" content="Track Your Order – Ma Tailor" />
        <meta property="og:description" content="Track your Ma Tailor stitching order and parcel delivery status." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/track-order" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gold hover:text-gold/80 text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-center mb-8">
            <Package className="w-12 h-12 text-gold mx-auto mb-3" />
            <h1 className="text-3xl font-playfair font-bold">Track Your Order</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your Order ID or select from your recent orders</p>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-8">
            <Input
              placeholder="Enter Order ID (e.g. a1b2c3d4-...)"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchOrder(searchId)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 flex-1"
            />
            <Button onClick={() => searchOrder(searchId)} disabled={searching} className="bg-gold hover:bg-gold/90 text-black h-12 px-6">
              <Search className="w-4 h-4 mr-2" /> {searching ? '...' : 'Track'}
            </Button>
          </div>

          {searchError && <p className="text-red-400 text-sm text-center mb-6">{searchError}</p>}

          {/* Order Detail */}
          {orderDetail && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-gold font-mono text-sm">{orderDetail.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${statusCfg(orderDetail.status).color}`}>
                  {statusCfg(orderDetail.status).icon}
                  {statusCfg(orderDetail.status).label}
                </div>
              </div>

              {/* Progress Steps */}
              {orderDetail.status !== 'cancelled' && (
                <div className="flex items-center justify-between mb-6 px-2">
                  {STEPS.map((step, idx) => {
                    const isActive = idx <= activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    return (
                      <div key={step} className="flex flex-col items-center flex-1 relative">
                        {idx > 0 && (
                          <div className={`absolute top-3 -left-1/2 w-full h-0.5 ${idx <= activeStepIdx ? 'bg-gold' : 'bg-gray-700'}`} />
                        )}
                        <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCurrent ? 'bg-gold text-black ring-2 ring-gold/40' : isActive ? 'bg-gold/80 text-black' : 'bg-gray-700 text-gray-500'}`}>
                          {isActive ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[10px] mt-1.5 capitalize ${isActive ? 'text-gold' : 'text-gray-600'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tracking Info */}
              {(orderDetail as any).tracking_number && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Tracking Information</span>
                  </div>
                  <p className="text-white text-sm mb-1">Tracking #: <span className="font-mono text-gold">{(orderDetail as any).tracking_number}</span></p>
                  {(orderDetail as any).estimated_delivery && (
                    <p className="text-gray-400 text-xs">Estimated delivery: {(orderDetail as any).estimated_delivery}</p>
                  )}
                  {(orderDetail as any).tracking_url && (
                    <a href={(orderDetail as any).tracking_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 underline mt-2">
                      <ExternalLink className="w-3 h-3" /> Track on carrier website
                    </a>
                  )}
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-2 text-sm mb-4">
                <h3 className="text-white font-medium">Items</h3>
                {Array.isArray(orderDetail.items) && orderDetail.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between bg-gray-800/50 rounded-lg px-3 py-2">
                    <span className="text-gray-300 truncate max-w-[70%]">{item.title} x{item.quantity}</span>
                    <span className="text-gold">₨{(item.unit_price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500">Customer</span>
                  <p className="text-white">{orderDetail.customer_name}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500">City</span>
                  <p className="text-white flex items-center gap-1"><MapPin className="w-3 h-3" /> {orderDetail.customer_city}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500">Total</span>
                  <p className="text-gold font-bold">₨{orderDetail.total_amount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500">Placed on</span>
                  <p className="text-white">{new Date(orderDetail.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Saved Orders */}
          {savedOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-playfair font-bold text-white mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gold" /> Your Recent Orders
              </h2>
              <div className="space-y-3">
                {savedOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => { setSearchId(order.id); searchOrder(order.id); }}
                    className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white font-medium truncate max-w-[200px]">{order.product_title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">ID: {order.id.slice(0, 8).toUpperCase()} · {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-bold text-sm">₨{order.total.toLocaleString()}</p>
                        <div className={`text-xs mt-0.5 ${statusCfg(order.status).color} px-2 py-0.5 rounded-full inline-flex items-center gap-1`}>
                          {statusCfg(order.status).label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {savedOrders.length === 0 && !orderDetail && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet. Place an order to track it here.</p>
              <Button onClick={() => navigate('/')} className="mt-4 bg-gold hover:bg-gold/90 text-black">
                Browse Products
              </Button>
            </div>
          )}
        </div>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
};

export default TrackOrder;
