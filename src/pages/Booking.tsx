
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
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
        <title>Book Custom Tailoring Online | Tailor & Stitching Services</title>
        <meta name="description" content="Book your custom tailoring or stitching appointment online. Professional custom fits, door-to-door service, and quick turnaround." />
        <meta name="keywords" content="book stitching appointment online, online tailor Pakistan, custom tailoring service booking, ladies tailor appointment, girls stitching booking" />
        <link rel="canonical" href="https://matailor.lovable.app/booking" />
        
        <meta property="og:title" content="Book Custom Tailoring Online | Tailor & Stitching Services" />
        <meta property="og:description" content="Book your custom tailoring or stitching appointment online. Professional custom fits, door-to-door service, and quick turnaround." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/booking" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Book Your Custom Stitching Appointment Online</h1>
        <Navbar />
        <BookingForm />
        <TailorAssistant />
        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
