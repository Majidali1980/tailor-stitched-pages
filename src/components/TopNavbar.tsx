import { Link } from "react-router-dom";
import PriceListDialog from "./PriceListDialog";

const TopNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="MA Tailor Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-playfair font-bold text-white">
                MA Tailor
              </span>
              <span className="text-xs text-gold font-montserrat">
                Premium Pakistani Dresses
              </span>
            </div>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <PriceListDialog />
            <Link
              to="/booking"
              className="bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-full font-montserrat font-semibold transition-all duration-300 hover:scale-105 text-sm"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;