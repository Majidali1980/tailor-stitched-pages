
import { Facebook, Instagram, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIImageDisclaimer from './AIImageDisclaimer';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="MA Tailor - Professional Ladies Stitching Studio Karachi logo"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-playfair font-bold text-gold">MA TAILOR</h3>
            </div>
            <p className="font-montserrat text-gray-400 mb-6">
              Expertly stitched with care - Your trusted tailoring service for all ladies' and girls' suits.
            </p>
            <a href="https://wa.me/923070125273" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gold flex items-center gap-2 hover:text-gold-light transition-colors mb-4">
              <Phone className="h-4 w-4" />
              WhatsApp: +92 307 0125273
            </a>
            
            <h4 className="text-md font-playfair font-semibold text-gold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100067160730050" target="_blank" rel="noopener noreferrer" aria-label="Follow MA Tailor on Facebook" className="text-gold hover:text-gold-light transition-colors">
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/matailor1994/" target="_blank" rel="noopener noreferrer" aria-label="Follow MA Tailor on Instagram" className="text-gold hover:text-gold-light transition-colors">
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@matailor1234?_t=ZS-8y0AAbY7IOe&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Follow MA Tailor on TikTok" className="text-gold hover:text-gold-light transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@matailor1234?si=AQn0ODDu1gQNCWtj" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to MA Tailor on YouTube" className="text-gold hover:text-gold-light transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-playfair font-bold text-gold mb-4">Quick Links</h3>
            <div className="grid grid-cols-3 gap-4">
              <ul className="space-y-2">
                <li><Link to="/" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Home</Link></li>
                <li><Link to="/services" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Services</Link></li>
                <li><Link to="/about" className="font-montserrat text-gray-400 hover:text-gold transition-colors">About Us</Link></li>
                <li><Link to="/booking" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Booking</Link></li>
                <li><Link to="/blog" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Blog</Link></li>
                <li><Link to="/track-order" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Track Order</Link></li>
              </ul>

              <ul className="space-y-2">
                <li><Link to="/contact" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
                <li><Link to="/reviews" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Reviews</Link></li>
                <li><Link to="/faq" className="font-montserrat text-gray-400 hover:text-gold transition-colors">FAQ</Link></li>
                <li><Link to="/career" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Join Our Team</Link></li>
                <li><Link to="/digital-services" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Digital Services</Link></li>
                <li><Link to="/special-discount-offers" className="font-montserrat text-gold hover:text-gold-light transition-colors">Special Offers</Link></li>
              </ul>

              <ul className="space-y-2">
                <li><Link to="/gallery" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Gallery</Link></li>
                <li><Link to="/videos" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Videos</Link></li>
                <li><Link to="/bulk-orders" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Bulk Orders</Link></li>
                <li><Link to="/tailor-near-me" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Tailor Near Me</Link></li>
                <li><Link to="/tailor-near-me/saddar" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Tailor in Saddar</Link></li>
                <li><Link to="/tailor-near-me/bahadurabad" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Tailor in Bahadurabad</Link></li>
                <li>
                  <a href="https://ma-tailor.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gray-400 hover:text-gold transition-colors flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Website
                  </a>
                </li>
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
            </div>

            <h3 className="text-lg font-playfair font-bold text-gold mt-6 mb-3">Order From Abroad</h3>
            <ul className="space-y-2">
              <li><Link to="/online-tailor-uk" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Online Tailor UK</Link></li>
              <li><Link to="/online-tailor-usa" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Online Tailor USA</Link></li>
              <li><Link to="/online-tailor-canada" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Online Tailor Canada</Link></li>
              <li><Link to="/online-tailor-karachi" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Online Tailor Karachi</Link></li>
              <li><Link to="/pakistani-tailor-online" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Pakistani Tailor Online</Link></li>
            </ul>
          </div>



          <div>
            <h3 className="text-lg font-playfair font-bold text-gold mb-4">Business Hours</h3>
            <ul className="space-y-2 mb-6">
              <li className="font-montserrat text-gray-400">Monday - Sunday: 10:00 AM - 9:00 PM</li>
              <li className="font-montserrat text-gray-400">Open 7 days a week</li>
            </ul>
            <div className="mb-6">
              <p className="font-montserrat text-gray-400 italic">
                "Quality is remembered long after the price is forgotten."
              </p>
            </div>
            <div>
              <h4 className="text-md font-playfair font-semibold text-gold mb-2">Address</h4>
              <p className="font-montserrat text-sm text-gray-400">
                Mahmoodabad No 04, Karachi
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gold/10 mt-12 pt-6">
          <div className="bg-gray-900/50 border border-gold/20 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-playfair font-bold text-gold mb-3 text-center">Disclaimer</h3>
            <p className="font-montserrat text-sm text-gray-400 text-center max-w-3xl mx-auto">
              All model images displayed on this website are AI-generated and used only to showcase outfit designs and stitching concepts. 
              The actual garments we create are handcrafted by our skilled tailors according to your measurements and preferences.
            </p>
          </div>
          
          <div className="text-center">
            <p className="font-montserrat text-sm text-gray-500 mb-4">
              © {new Date().getFullYear()} MA Tailor. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-sm">
              <Link to="/privacy-policy" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Privacy Policy</Link>
              <span className="text-gray-600">|</span>
              <Link to="/terms-of-use" className="font-montserrat text-gray-400 hover:text-gold transition-colors">Terms of Use</Link>
              <span className="text-gray-600">|</span>
              <AIImageDisclaimer />
            </div>
            <p className="text-xs text-gray-600">
              Made with ♥ by{' '}
              <a href="https://www.facebook.com/share/16TyxwjKRy/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Facebook</a> | {' '}
              <a href="https://www.fiverr.com/users/alimajid0302198" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Fiverr</a> | {' '}
              <a href="https://preview--ma-digital-hub-portfolio.lovable.app/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">MA Digital Hub</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
