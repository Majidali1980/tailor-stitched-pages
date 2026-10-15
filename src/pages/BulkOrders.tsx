import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import BulkOrders from '@/components/BulkOrders';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const BulkOrdersPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>Bulk Stitching Orders in Karachi | Wholesale Tailor - MA Tailor</title>
        <meta name="description" content="Bulk stitching for boutiques, uniforms and events from 10 pieces per size. Free sample before production in Karachi. Get a bulk quote from MA Tailor today." />
        <link rel="canonical" href="https://matailor.lovable.app/bulk-orders" />
        <meta property="og:title" content="Bulk Stitching Orders – Ma Tailor" />
        <meta property="og:description" content="Wholesale tailoring and bulk stitching for boutiques, uniforms and events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/bulk-orders" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <BulkOrders />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BulkOrdersPage;
