
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
      duration: 5000,
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
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
                  <p className="font-montserrat text-gray-300">Mahmoodabad No 04, Karachi</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Phone</h4>
                  <p className="font-montserrat text-gold">03070125273</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-playfair font-semibold text-white mb-2">Working Hours</h4>
                  <p className="font-montserrat text-gray-300">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="font-montserrat text-gray-300">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gold/10 rounded-lg border border-gold/20">
                <h4 className="text-lg font-playfair font-bold text-gold mb-2">Pick & Drop Service</h4>
                <p className="font-montserrat text-white">
                  We offer convenient pick and drop service for all your tailoring needs.
                  Contact us to schedule a pickup.
                </p>
              </div>
            </div>
          </div>
          
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
                    required
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
                
                <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-black font-montserrat">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
