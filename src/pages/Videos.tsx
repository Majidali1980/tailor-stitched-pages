
import Navbar from '@/components/Navbar';
import DynamicVideos from '@/components/DynamicVideos';
import Footer from '@/components/Footer';

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <DynamicVideos />
      <Footer />
    </div>
  );
};

export default VideosPage;
