
import Navbar from '@/components/Navbar';
import DynamicVideos from '@/components/DynamicVideos';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const VideosPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
    "name": "Ma Tailor Videos",
    "description": "Watch our tailoring process and dress stitching videos. See how we create perfect custom designs for girls in Pakistan."
  };

  return (
    <>
      <Helmet>
        <title>Videos - Ma Tailor | Stitching Process & Tutorials Pakistan</title>
        <meta name="description" content="Watch Ma Tailor's stitching process videos and tutorials. See how we create perfect custom designs for girls in Pakistan." />
        <meta name="keywords" content="tailoring videos Pakistan, stitching tutorials, dress making videos, custom tailoring process, Ma Tailor videos" />
        <link rel="canonical" href="https://matailor.lovable.app/videos" />
        
        <meta property="og:title" content="Videos - Ma Tailor | Stitching Process & Tutorials" />
        <meta property="og:description" content="Watch our stitching process videos and tutorials." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/videos" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Videos - Stitching Process & Tutorials</h1>
        <Navbar />
        <DynamicVideos />
        <Footer />
      </div>
    </>
  );
};

export default VideosPage;
