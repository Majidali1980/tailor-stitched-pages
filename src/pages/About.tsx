import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>About MA Tailor | Online Pakistani Stitching Studio</title>
        <meta name="description" content="Learn about MA Tailor – a Pakistani stitching studio delivering custom ladies suits worldwide with perfect fit and elegant craftsmanship." />
        <link rel="canonical" href="https://matailor.lovable.app/about" />
        <meta property="og:title" content="About MA Tailor | Online Pakistani Stitching Studio" />
        <meta property="og:description" content="Pakistani stitching studio delivering custom ladies suits worldwide with perfect fit and elegant craftsmanship." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/about" />
        <meta property="og:image" content="https://matailor.lovable.app/logo.png" />
      </Helmet>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
