
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

const BookingPage = () => {
  return (
    <>
      <Helmet>
        <title>Book Appointment - MA Tailor | Premium Pakistani Dress Stitching</title>
        <meta name="description" content="Schedule your consultation with MA Tailor for premium Pakistani dress stitching services. Expert tailoring for Shalwar Kameez, Kurti, Maxi Dress, and custom designs. Book your appointment today!" />
        <meta name="keywords" content="MA Tailor appointment, Pakistani dress stitching, Shalwar Kameez tailoring, Kurti stitching, custom dress design, Massachusetts tailor booking" />
        <meta property="og:title" content="Book Appointment - MA Tailor | Premium Pakistani Dress Stitching" />
        <meta property="og:description" content="Schedule your consultation with MA Tailor for premium Pakistani dress stitching services. Expert tailoring for traditional and modern Pakistani clothing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ma-tailor.com/booking" />
        <link rel="canonical" href="https://ma-tailor.com/booking" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "MA Tailor Appointment Booking",
            "description": "Premium Pakistani dress stitching and tailoring services",
            "provider": {
              "@type": "Organization",
              "name": "MA Tailor",
              "url": "https://ma-tailor.com"
            },
            "serviceType": "Tailoring and Dress Making",
            "areaServed": "Massachusetts, USA",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tailoring Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Shalwar Kameez Stitching"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Kurti Tailoring"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Maxi Dress Design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Dress Design"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <BookingForm />
        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
