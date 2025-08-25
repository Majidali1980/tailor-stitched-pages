
import Navbar from '@/components/Navbar';
import DynamicReviews from '@/components/DynamicReviews';
import Footer from '@/components/Footer';

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <DynamicReviews />
      <Footer />
    </div>
  );
};

export default ReviewsPage;
