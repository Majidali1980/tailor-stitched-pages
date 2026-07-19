import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import PriceListDialog from "./PriceListDialog";

const GoogleIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.4 35.6 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"/>
  </svg>
);

const TopNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-2">
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

          {/* Center: Google Review */}
          <a
            href="https://g.page/r/CQQHz-c_1UHIEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Leave a Google Review"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-black px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full font-montserrat font-semibold text-[11px] sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            <GoogleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline sm:inline">Review us</span>
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-gold text-gold" />
          </a>

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
