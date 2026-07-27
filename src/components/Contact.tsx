import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { fbTrack } from '@/lib/metaPixel';
import emailjs from 'emailjs-com';
import { Phone, Mail, Facebook, Instagram, MapPin, Star, ExternalLink } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const googleMapsLink = "https://maps.app.goo.gl/gmVRTLBE8aCzyBAX6";
  const googleReviewLink = "https://maps.app.goo.gl/yL4Jsfvqzk5gW1aX7";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database first
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject || null,
            message: formData.message,
          }
        ]);

      if (dbError) throw dbError;

      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        subject: formData.subject,
        message: formData.message
      };
      
      // Send email notification
      await emailjs.send('service_kqtecnn', 'template_tv45p3s', templateParams, 'H357zAP8V__yP5H8e');
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
        duration: 5000,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleReview = () => {
    window.open(googleReviewLink, '_blank');
    toast({
      title: "Review Page Opened",
      description: "Thank you for taking the time to review us on Google!",
      duration: 3000,
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Contact <span className="text-gold">Us</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Get in touch for appointments, inquiries, or custom tailoring needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fancy-border p-1">
            <div className="bg-black p-8 rounded-lg h-full">
              <h3 className="text-2xl font-playfair font-bold text-gold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Location</h4>
                  <p className="font-montserrat text-gray-300 mb-2">Mahmoodabad No 04, Karachi</p>
                  <a 
                    href={googleMapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-montserrat text-gold hover:text-gold-light transition-colors flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" /> View on Google Maps
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Phone</h4>
                  <a href="https://wa.me/923070125273" target="_blank" rel="noopener noreferrer" className="font-montserrat text-gold flex items-center gap-2">
                    <Phone className="h-4 w-4" /> +92 307 0125273
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Follow Us</h4>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/profile.php?id=100067160730050" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/matailor1994/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.tiktok.com/@matailor1234?_t=ZS-8y0AAbY7IOe&_r=1" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com/@matailor1234?si=AQn0ODDu1gQNCWtj" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Working Hours</h4>
                  <p className="font-montserrat text-gray-300">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="font-montserrat text-gray-300">Sunday: Closed</p>
                </div>

                {/* Google Reviews Section */}
                <div className="border-t border-gold/20 pt-6">
                  <h4 className="text-lg font-playfair font-semibold text-white mb-3">Customer Reviews</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-gold">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <span className="font-montserrat text-white">5.0 rating</span>
                  </div>
                  <Button
                    onClick={handleGoogleReview}
                    className="bg-gold hover:bg-gold-dark text-black font-montserrat flex items-center gap-2 w-full"
                  >
                    <Star className="h-4 w-4" />
                    Leave a Google Review
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gold/10 rounded-lg border border-gold/20">
                <h4 className="text-lg font-playfair font-bold text-gold mb-2">Pick & Drop Service</h4>
                <p className="font-montserrat text-white">
                  We offer convenient pick and drop service for all your tailoring needs.
                  Contact us to schedule a pickup.
                </p>
              </div>

              {/* Visitor Counter placed below Pick & Drop Service */}
              <div className="mt-6">
                <VisitorCounter />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="fancy-border p-1">
              <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-gold mb-6">Send a Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-montserrat text-sm mb-1">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-montserrat text-sm mb-1">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-montserrat text-sm mb-1">Phone</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-montserrat text-sm mb-1">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-montserrat text-sm mb-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold min-h-32"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark text-black font-montserrat"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Google Maps Embed */}
            <div className="fancy-border p-1">
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-gold mb-6">Find Us</h3>
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.991736285845!2d67.05721271547486!3d24.930107784019773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f90c5c3c6b7%3A0x1234567890abcdef!2sMahmoodabad%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href={googleMapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-montserrat"
                  >
                    <MapPin className="h-4 w-4" /> 
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
