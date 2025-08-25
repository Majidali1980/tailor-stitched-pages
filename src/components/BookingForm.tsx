
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Calendar, Clock, User, Phone, Mail, Scissors } from 'lucide-react';

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    designSize: '',
    specialRequirements: '',
    uploadedImageUrl: ''
  });

  const serviceTypes = [
    'Shalwar Kameez',
    'Kurti',
    'Maxi Dress',
    'Formal Dress',
    'Casual Dress',
    'Alterations',
    'Custom Design'
  ];

  const designSizes = [
    'XS (Extra Small)',
    'S (Small)',
    'M (Medium)',
    'L (Large)',
    'XL (Extra Large)',
    'XXL (Double Extra Large)',
    'Custom Measurements'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For now, we'll just store the file name. In a real app, you'd upload to Supabase storage
    setFormData(prev => ({
      ...prev,
      uploadedImageUrl: file.name
    }));
    
    toast.success('Image uploaded successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            appointment_date: formData.appointmentDate,
            appointment_time: formData.appointmentTime,
            service_type: formData.serviceType,
            design_size: formData.designSize || null,
            uploaded_image_url: formData.uploadedImageUrl || null,
            special_requirements: formData.specialRequirements || null
          }
        ]);

      if (error) {
        throw error;
      }

      toast.success('Appointment booked successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: '',
        designSize: '',
        specialRequirements: '',
        uploadedImageUrl: ''
      });

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Book an <span className="text-gold">Appointment</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Schedule your consultation with MA Tailor for premium Pakistani dress stitching services.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 text-gold mb-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-black border-gray-700 text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 text-gold mb-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="bg-black border-gray-700 text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-gold mb-2">
                    <Mail className="h-4 w-4" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-black border-gray-700 text-white"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentDate" className="flex items-center gap-2 text-gold mb-2">
                      <Calendar className="h-4 w-4" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                      required
                      className="bg-black border-gray-700 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="appointmentTime" className="flex items-center gap-2 text-gold mb-2">
                      <Clock className="h-4 w-4" />
                      Preferred Time *
                    </Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                      required
                      className="bg-black border-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2 text-gold mb-2">
                      <Scissors className="h-4 w-4" />
                      Service Type *
                    </Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-gold mb-2 block">
                      Design Size
                    </Label>
                    <Select value={formData.designSize} onValueChange={(value) => handleInputChange('designSize', value)}>
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {designSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="imageUpload" className="flex items-center gap-2 text-gold mb-2">
                    <Upload className="h-4 w-4" />
                    Upload Design Image (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-black">
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-400">Click to upload design image</p>
                      {formData.uploadedImageUrl && (
                        <p className="text-gold mt-2">Uploaded: {formData.uploadedImageUrl}</p>
                      )}
                    </label>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <Label htmlFor="specialRequirements" className="text-gold mb-2 block">
                    Special Requirements (Optional)
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    className="bg-black border-gray-700 text-white"
                    placeholder="Any special requirements or notes..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-montserrat text-lg py-6"
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
