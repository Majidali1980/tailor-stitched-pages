
import { useState } from "react";
import { Menu, X, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import PriceListDialog from "./PriceListDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
    { name: "Reviews", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Book Appointment", href: "/booking", isButton: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="https://github.com/Majidali1980/lmages/blob/main/Black%20Gold%20Elegant%20Jewelry%20Logo.png?raw=true" 
                alt="MA Tailor Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-playfair font-bold text-white">
                MA Tailor
              </span>
              <span className="text-xs text-gold font-montserrat">
                Premium Pakistani Dresses
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={
                  item.isButton
                    ? "bg-gold hover:bg-gold-dark text-black px-6 py-2 rounded-full font-montserrat font-semibold transition-all duration-300 hover:scale-105"
                    : "text-white hover:text-gold font-montserrat font-medium transition-colors duration-300 relative group"
                }
              >
                {item.name}
                {!item.isButton && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
            <PriceListDialog />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={
                    item.isButton
                      ? "bg-gold hover:bg-gold-dark text-black px-6 py-3 rounded-full font-montserrat font-semibold text-center transition-all duration-300"
                      : "text-white hover:text-gold font-montserrat font-medium py-2 transition-colors duration-300"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex justify-center">
                <PriceListDialog />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
