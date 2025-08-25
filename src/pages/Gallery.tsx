
import Navbar from '@/components/Navbar';
import DynamicGallery from '@/components/DynamicGallery';
import Footer from '@/components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <DynamicGallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
