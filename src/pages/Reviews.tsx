
import Navbar from '@/components/Navbar';
import DynamicReviews from '@/components/DynamicReviews';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const ReviewsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ma Tailor",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100"
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews - Ma Tailor | Real Testimonials Pakistan</title>
        <meta name="description" content="Read real customer reviews and testimonials for Ma Tailor. See why Pakistani girls love our custom stitching and tailoring services." />
        <meta name="keywords" content="Ma Tailor reviews, customer testimonials Pakistan, tailoring reviews, stitching service reviews, dress making testimonials" />
        <link rel="canonical" href="https://matailor.lovable.app/reviews" />
        
        <meta property="og:title" content="Customer Reviews - Ma Tailor" />
        <meta property="og:description" content="Read real customer reviews and testimonials for Ma Tailor services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/reviews" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Customer Reviews and Testimonials</h1>
        <Navbar />
        <DynamicReviews />
        <Footer />
      </div>
    </>
  );
};

export default ReviewsPage;
