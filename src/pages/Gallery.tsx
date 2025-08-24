
import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
