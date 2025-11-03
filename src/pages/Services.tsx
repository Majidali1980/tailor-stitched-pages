import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesComponent from '@/components/Services';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>Our Services - MA Tailor | Expert Tailoring Services</title>
        <meta 
          name="description" 
          content="Explore our expert tailoring services including custom stitching, alterations, and bulk orders. Quality craftsmanship for all types of garments." 
        />
      </Helmet>
      
      <Navbar />
      <ServicesComponent />
      <Footer />
    </div>
  );
};

export default Services;
