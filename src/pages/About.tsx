import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>About MA Tailor | Ladies Tailor Studio in Karachi</title>
        <meta name="description" content="Meet MA Tailor, a ladies stitching studio in Mahmoodabad, Karachi. Custom suits, bridal wear and alterations with a perfect fit. See how we work and book." />
        <link rel="canonical" href="https://matailor.lovable.app/about" />
        <meta property="og:title" content="About MA Tailor | Ladies Tailor Studio in Karachi" />
        <meta property="og:description" content="Pakistani stitching studio delivering custom ladies suits worldwide with perfect fit and elegant craftsmanship." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/about" />
        <meta property="og:image" content="https://matailor.lovable.app/logo.png" />
      </Helmet>
      <Navbar />
      <h1 className="sr-only">About MA Tailor</h1>
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
