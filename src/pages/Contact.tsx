
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
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8607",
      "longitude": "67.0011"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "priceRange": "$$"
  };

  return (
    <>
      <Helmet>
        <title>Contact MA Tailor Karachi | WhatsApp & Call +92 307 0125273</title>
        <meta name="description" content="Contact MA Tailor in Mahmoodabad, Karachi. Call or WhatsApp +92 307 0125273 for stitching quotes, home pickup and order updates. Open 7 days, 10am–9pm." />
        <meta property="og:title" content="Contact MA Tailor | Custom Stitching Services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content="Contact MA Tailor in Mahmoodabad, Karachi. Call or WhatsApp +92 307 0125273 for stitching quotes and home pickup." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/contact" />
        <link rel="canonical" href="https://matailor.lovable.app/contact" />
        
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
