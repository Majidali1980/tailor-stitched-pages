
import Navbar from '@/components/Navbar';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <Reviews />
      <Footer />
    </div>
  );
};

export default ReviewsPage;
