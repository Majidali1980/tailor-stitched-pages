import Navbar from '@/components/Navbar';
import BulkOrders from '@/components/BulkOrders';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const BulkOrdersPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <BulkOrders />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BulkOrdersPage;