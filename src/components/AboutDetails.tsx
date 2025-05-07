
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AboutDetailsProps {
  open: boolean;
  onClose: () => void;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-gray-900 border-gold text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold text-gold">About MA Tailor</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6 font-montserrat">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold text-gold">Our Story</h3>
              <p className="text-gray-300">
                MA Tailor was founded by Tayaba Majid with a vision to provide high-quality tailoring services for women's garments. 
                With years of experience in the fashion industry, we have established ourselves as a premier ladies online stitching shop.
              </p>
              <p className="text-gray-300">
                Our journey began with a small workshop and has grown into a full-service online tailoring solution, catering to clients across Pakistan and beyond.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold text-gold">Our Mission</h3>
              <p className="text-gray-300">
                Our mission is to make high-quality tailoring accessible to everyone. We believe that well-fitted, beautiful garments should not be a luxury but a standard.
              </p>
              <p className="text-gray-300">
                We strive to combine traditional craftsmanship with modern designs, creating timeless pieces that make our clients feel confident and beautiful.
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-playfair font-bold text-gold mb-4">Our Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Quality</h4>
                <p className="text-sm text-gray-300">We never compromise on quality, using only the finest materials and techniques.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Customer Focus</h4>
                <p className="text-sm text-gray-300">Your satisfaction is our priority. We listen to your needs and deliver accordingly.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Innovation</h4>
                <p className="text-sm text-gray-300">We constantly innovate and improve our techniques and designs.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Timeliness</h4>
                <p className="text-sm text-gray-300">We respect your time and deliver our services promptly.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Craftsmanship</h4>
                <p className="text-sm text-gray-300">Each garment is crafted with precision and attention to detail.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-gold mb-2">Integrity</h4>
                <p className="text-sm text-gray-300">We operate with honesty and transparency in all our dealings.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800 to-black p-4 rounded-lg">
            <p className="italic text-gold text-center">
              "Our goal is not just to stitch clothes, but to create garments that reflect your personal style and enhance your confidence."
            </p>
            <p className="text-right text-sm text-gray-300 mt-2">- Tayaba Majid, Founder</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDetails;
