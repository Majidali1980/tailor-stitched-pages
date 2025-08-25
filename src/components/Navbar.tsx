
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gold rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">MT</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-playfair font-bold text-gold">MA TAILOR</h1>
              <p className="text-xs text-gray-300 font-montserrat">Ladies Online Stitching Shop</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gold transition-colors font-montserrat">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gold transition-colors font-montserrat">
              About
            </Link>
            <Link to="/gallery" className="text-white hover:text-gold transition-colors font-montserrat">
              Gallery
            </Link>
            <Link to="/videos" className="text-white hover:text-gold transition-colors font-montserrat">
              Videos
            </Link>
            <Link to="/reviews" className="text-white hover:text-gold transition-colors font-montserrat">
              Reviews
            </Link>
            <Link to="/faq" className="text-white hover:text-gold transition-colors font-montserrat">
              FAQ
            </Link>
            <Link to="/contact" className="text-white hover:text-gold transition-colors font-montserrat">
              Contact
            </Link>
            <Link 
              to="/booking" 
              className="bg-gold text-black px-4 py-2 rounded-md font-montserrat hover:bg-gold-dark transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/gallery" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/videos" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                Videos
              </Link>
              <Link 
                to="/reviews" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                to="/faq" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-gold transition-colors font-montserrat py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/booking" 
                className="bg-gold text-black px-4 py-2 rounded-md font-montserrat hover:bg-gold-dark transition-colors inline-block text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
