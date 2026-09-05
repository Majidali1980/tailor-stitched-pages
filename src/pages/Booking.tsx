
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import BookingHero from '@/components/BookingHero';
import Footer from '@/components/Footer';
import TailorAssistant from '@/components/TailorAssistant';

const BookingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Online Stitching Appointment",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ma Tailor",
      "telephone": "+92-307-0125273",
      "url": "https://matailor.lovable.app"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Pakistan"
    },
    "description": "Book your online stitching appointment with Ma Tailor. Custom tailoring for girls with fast delivery and expert fitting."
  };

  return (
    <>
      <Helmet>
        <title>Book a Tailoring Appointment Online | Ma Tailor Karachi</title>
        <meta name="description" content="Schedule your stitching order in minutes from Karachi or abroad. Choose your service, send measurements, and Ma Tailor delivers worldwide." />
        <meta name="keywords" content="book stitching appointment online, online tailor Pakistan, custom tailoring service booking, ladies tailor appointment, girls stitching booking" />
        <link rel="canonical" href="https://matailor.lovable.app/booking" />
        
        <meta property="og:title" content="Book a Tailoring Appointment Online | Ma Tailor Karachi" />
        <meta property="og:description" content="Schedule your stitching order in minutes from Karachi or abroad. Choose your service, send measurements, and Ma Tailor delivers worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/booking" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book a Tailoring Appointment Online | Ma Tailor Karachi" />
        <meta name="twitter:description" content="Schedule your stitching order in minutes from Karachi or abroad. Choose your service, send measurements, and Ma Tailor delivers worldwide." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <BookingHero />
        <BookingForm />
        <TailorAssistant />
        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
