
import Navbar from '@/components/Navbar';
import DynamicGallery from '@/components/DynamicGallery';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const GalleryPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Ma Tailor Gallery",
    "description": "Custom girls stitching designs gallery - View premium dresses and stitching details crafted for girls in Pakistan",
    "url": "https://matailor.lovable.app/gallery"
  };

  return (
    <>
      <Helmet>
        <title>Ma Tailor Gallery – Custom Girls Stitching Designs</title>
        <meta name="description" content="Explore Ma Tailor's stitched dress gallery. View premium designs and stitching details crafted for girls in Pakistan." />
        <meta name="keywords" content="stitched dresses gallery Pakistan, custom tailoring showcase, girls stitched designs online, Pakistani dress designs, tailored outfits gallery" />
        <link rel="canonical" href="https://matailor.lovable.app/gallery" />
        
        <meta property="og:title" content="Ma Tailor Gallery – Custom Girls Stitching Designs" />
        <meta property="og:description" content="Explore our stitched dress gallery with premium designs and stitching details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/gallery" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Gallery - Custom Girls Stitching Designs</h1>
        <Navbar />
        <DynamicGallery />
        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;
