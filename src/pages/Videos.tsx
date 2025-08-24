
import Navbar from '@/components/Navbar';
import Videos from '@/components/Videos';
import Footer from '@/components/Footer';

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <Videos />
      <Footer />
    </div>
  );
};

export default VideosPage;
