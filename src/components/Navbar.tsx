
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import PriceList from './PriceList';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const whatsappLink = "https://wa.me/923070125273";
  const vercelSiteLink = "https://matailor-xi.vercel.app/";
  const classesLink = "https://ma-tailorclasses.vercel.app/";

  // Function to handle scroll to section on home page or navigate to page
  const handleNavigation = (path: string, sectionId?: string) => {
    if (location.pathname === '/' && sectionId) {
      // If we're on home page and there's a section ID, scroll to it
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId && location.pathname !== '/') {
      // If we're not on home page but need to go to a section, go to home first
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-95 text-white z-50 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://github.com/Majidali1980/lmages/blob/main/Black%20Gold%20Elegant%20Jewelry%20Logo.png?raw=true" 
              alt="MA Tailor Logo" 
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gold leading-tight">
                MA <span className="text-white">TAILOR</span>
              </h1>
              <p className="text-xs md:text-sm font-montserrat text-gold-light leading-tight">
                LADIES ONLINE STITCHING SHOP
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-montserrat text-sm hover:text-gold transition-colors">Home</Link>
            <button onClick={() => handleNavigation('/', 'services')} className="font-montserrat text-sm hover:text-gold transition-colors">Services</button>
            <Link to="/about" className="font-montserrat text-sm hover:text-gold transition-colors">About</Link>
            <Link to="/gallery" className="font-montserrat text-sm hover:text-gold transition-colors">Gallery</Link>
            <Link to="/videos" className="font-montserrat text-sm hover:text-gold transition-colors">Videos</Link>
            <Link to="/contact" className="font-montserrat text-sm hover:text-gold transition-colors">Contact</Link>
            <a href={vercelSiteLink} target="_blank" rel="noopener noreferrer" className="font-montserrat text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
              <ExternalLink className="h-3 w-3" /> More Designs
            </a>
            <a href={classesLink} target="_blank" rel="noopener noreferrer" className="font-montserrat text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
              <ExternalLink className="h-3 w-3" /> Stitching Classes
            </a>
            <PriceList />
            <BusinessCard />
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat flex items-center gap-2">
                <Phone className="h-4 w-4" /> Book Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6 text-gold" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 flex flex-col items-center">
            <Link to="/" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <button onClick={() => handleNavigation('/', 'services')} className="font-montserrat text-sm hover:text-gold transition-colors">Services</button>
            <Link to="/about" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/gallery" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            <Link to="/videos" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Videos</Link>
            <Link to="/contact" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <a href={vercelSiteLink} target="_blank" rel="noopener noreferrer" className="font-montserrat text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
              <ExternalLink className="h-3 w-3" /> More Designs
            </a>
            <a href={classesLink} target="_blank" rel="noopener noreferrer" className="font-montserrat text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
              <ExternalLink className="h-3 w-3" /> Stitching Classes
            </a>
            <div onClick={() => setIsMenuOpen(false)}>
              <PriceList />
            </div>
            <div onClick={() => setIsMenuOpen(false)}>
              <BusinessCard />
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat w-full flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" /> Book Now
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
