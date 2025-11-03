import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesComponent from '@/components/Services';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ma Tailor Services",
    "description": "Professional tailoring and stitching services for girls in Pakistan - Custom stitching, alterations, and bulk orders",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ma Tailor",
      "telephone": "+92-307-0125273",
      "url": "https://matailor.lovable.app"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Pakistan"
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Ma Tailor | Custom Girls Stitching Pakistan</title>
        <meta name="description" content="Professional tailoring and stitching services for girls in Pakistan. Custom stitching, alterations, and bulk orders with perfect fit and elegant designs." />
        <meta name="keywords" content="tailoring services Pakistan, custom stitching services, girls dress stitching, bulk orders tailoring, dress alterations Pakistan, professional tailor services" />
        <link rel="canonical" href="https://matailor.lovable.app/services" />
        
        <meta property="og:title" content="Our Services - Ma Tailor | Custom Girls Stitching Pakistan" />
        <meta property="og:description" content="Professional tailoring and stitching services with perfect fit and elegant designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/services" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Services - Custom Girls Stitching Pakistan</h1>
        <Navbar />
        <ServicesComponent />
        <Footer />
      </div>
    </>
  );
};

export default Services;
