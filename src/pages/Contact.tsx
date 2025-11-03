
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ma Tailor",
    "description": "Contact Ma Tailor for online stitching and tailoring services in Pakistan",
    "telephone": "+92-307-0125273",
    "url": "https://matailor.lovable.app",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.5204",
      "longitude": "74.3587"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "priceRange": "$$"
  };

  return (
    <>
      <Helmet>
        <title>Contact Ma Tailor – Online Stitching Shop Pakistan</title>
        <meta name="description" content="Contact Ma Tailor for online stitching and tailoring services in Pakistan. Call or WhatsApp 03070125273." />
        <meta name="keywords" content="online tailor contact Pakistan, ladies tailor near me, girls stitching services Karachi, online tailor Lahore, tailoring services Islamabad" />
        <link rel="canonical" href="https://matailor.lovable.app/contact" />
        
        <meta property="og:title" content="Contact Ma Tailor – Online Stitching Shop Pakistan" />
        <meta property="og:description" content="Contact us for online stitching services. Call or WhatsApp 03070125273." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/contact" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Contact Ma Tailor - Online Stitching Services Pakistan</h1>
        <Navbar />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
