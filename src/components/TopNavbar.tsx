import { Link } from "react-router-dom";
import PriceListDialog from "./PriceListDialog";

const TopNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="relative shrink-0">
              <img 
                src="/logo.png" 
                alt="MA Tailor Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-playfair font-bold text-white truncate">
                MA Tailor
              </span>
              <span className="hidden sm:inline text-xs text-gold font-montserrat truncate">
                Premium Pakistani Dresses
              </span>
            </div>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <div className="hidden sm:block">
              <PriceListDialog />
            </div>
            <Link
              to="/booking"
              className="bg-gold hover:bg-gold-dark text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-montserrat font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm whitespace-nowrap"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;