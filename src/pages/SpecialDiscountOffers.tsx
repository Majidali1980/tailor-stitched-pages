import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DiscountOffers from '@/components/DiscountOffers';

const SpecialDiscountOffers = () => {
  return (
    <>
      <Helmet>
        <title>Special Discount Offers | MA Tailor</title>
        <meta name="description" content="Browse all current MA Tailor discount offers and seasonal promotions on custom Pakistani stitching." />
        <link rel="canonical" href="https://matailor.lovable.app/special-discount-offers" />
      </Helmet>
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="pt-32 pb-8 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold gold-gradient-text">Special Discount Offers</h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            Exclusive limited-time savings on our custom stitching services.
          </p>
        </div>
        <DiscountOffers />
        <Footer />
      </div>
    </>
  );
};

export default SpecialDiscountOffers;
