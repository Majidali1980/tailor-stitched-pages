
import { Facebook, Instagram, Phone, Mail, ExternalLink } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full border-2 border-gold flex items-center justify-center">
                <span className="text-lg font-playfair font-bold text-gold">MA</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-gold">MA TAILOR</h3>
            </div>
            <p className="font-montserrat text-gray-400 mb-6">
              Expertly stitched with care - Your trusted tailoring service for all ladies' and girls' suits.
            </p>
            <a href="https://wa.me/923070125273" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gold flex items-center gap-2 hover:text-gold-light transition-colors">
              <Phone className="h-4 w-4" />
              WhatsApp: 03070125273
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Home</a></li>
              <li><a href="#services" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Services</a></li>
              <li><a href="#about" className="font-montserrat text-gray-400 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#gallery" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Gallery</a></li>
              <li><a href="#contact" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Contact</a></li>
              <li>
                <a href="https://matailor-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gray-400 hover:text-gold transition-colors flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> More Designs
                </a>
              </li>
              <li>
                <a href="https://ma-tailorclasses.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gray-400 hover:text-gold transition-colors flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> Stitching Classes
                </a>
              </li>
            </ul>
            
            <h3 className="text-lg font-playfair font-bold text-gold mb-2 mt-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100067160730050" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/matailor1994/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-gold mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="font-montserrat text-gray-400">Monday - Friday: 10:00 AM - 8:00 PM</li>
              <li className="font-montserrat text-gray-400">Saturday: 10:00 AM - 6:00 PM</li>
              <li className="font-montserrat text-gray-400">Sunday: Closed</li>
            </ul>
            <div className="mt-6">
              <p className="font-montserrat text-gray-400 italic">
                "Quality is remembered long after the price is forgotten."
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Counter Section */}
        <div className="mt-12 flex justify-center">
          <VisitorCounter />
        </div>
        
        <div className="border-t border-gold/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="font-montserrat text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} MA Tailor. All rights reserved.
          </p>
          <div>
            <p className="font-montserrat text-sm text-gray-500">
              Address: Mahmoodabad No 04, Karachi
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Made with ♥ by{' '}
            <a href="https://www.facebook.com/share/16TyxwjKRy/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Facebook</a> | {' '}
            <a href="https://www.fiverr.com/users/alimajid0302198" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Fiverr</a> | {' '}
            <a href="https://preview--ma-digital-hub-portfolio.lovable.app/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">MA Digital Hub</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
