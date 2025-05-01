
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-95 text-white z-50 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded-full border-2 border-gold flex items-center justify-center">
              <span className="text-xl font-playfair font-bold text-gold">MA</span>
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-gold">MA <span className="text-white">TAILOR</span></h1>
              <p className="text-xs font-montserrat text-gold-light">LADIES ONLINE STITCHING SHOP</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="font-montserrat text-sm hover:text-gold transition-colors">Home</a>
            <a href="#services" className="font-montserrat text-sm hover:text-gold transition-colors">Services</a>
            <a href="#about" className="font-montserrat text-sm hover:text-gold transition-colors">About</a>
            <a href="#gallery" className="font-montserrat text-sm hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="font-montserrat text-sm hover:text-gold transition-colors">Contact</a>
            <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat">Book Now</Button>
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
            <a href="#home" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#services" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#about" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#gallery" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Gallery</a>
            <a href="#contact" className="font-montserrat text-sm hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <Button className="bg-gold hover:bg-gold-dark text-black font-montserrat w-full">Book Now</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
