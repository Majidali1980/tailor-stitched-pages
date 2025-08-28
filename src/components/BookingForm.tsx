
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Calendar, Clock, User, Phone, Mail, Scissors, X, Eye, FileImage, CheckCircle } from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  file: File;
}

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    designSize: '',
    specialRequirements: ''
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
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: UploadedImage[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { data, error } = await supabase.storage
          .from('booking-images')
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('booking-images')
          .getPublicUrl(filePath);

        newImages.push({
          id: Math.random().toString(),
          name: file.name,
          url: publicUrl,
          file: file
        });
      }

      setUploadedImages(prev => [...prev, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    toast.success('Image removed successfully!');
  };

  const viewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleReviewSubmit = () => {
    setShowReviewModal(false);
    handleSubmit();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      // Show review modal first
      setShowReviewModal(true);
      return;
    }

    // Actual submission
    setLoading(true);

    try {
      const imageUrls = uploadedImages.map(img => ({
        id: img.id,
        name: img.name,
        url: img.url
      }));

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
            uploaded_images: imageUrls,
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
        specialRequirements: ''
      });
      setUploadedImages([]);

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
                    Upload Design Images (Optional) - Multiple images allowed
                  </Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-black">
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <Upload className={`h-8 w-8 mx-auto mb-2 ${uploading ? 'text-gold animate-pulse' : 'text-gray-400'}`} />
                      <p className={uploading ? 'text-gold' : 'text-gray-400'}>
                        {uploading ? 'Uploading images...' : 'Click to upload design images'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">You can select multiple images at once</p>
                    </label>
                  </div>

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileImage className="h-5 w-5 text-gold" />
                        <span className="text-gold font-medium">
                          {uploadedImages.length} image(s) uploaded
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-600">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => viewImage(image.url)}
                                    className="bg-gold text-black p-2 rounded-full hover:bg-gold-dark transition-colors"
                                    title="View image"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeImage(image.id)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    title="Remove image"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 truncate" title={image.name}>
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                  disabled={loading || uploading}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-montserrat text-lg py-6"
                >
                  {loading ? 'Booking...' : uploading ? 'Uploading Images...' : 'Review & Book Appointment'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 px-6 py-4 bg-black bg-opacity-90 rounded-t-lg">
              <h3 className="text-white font-montserrat text-xl font-semibold">Design Image Preview</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-gold transition-colors bg-gray-800 hover:bg-gray-700 rounded-full p-3 z-10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-white rounded-lg shadow-2xl max-h-[80vh]">
              <img
                src={selectedImage}
                alt="Design preview"
                className="w-full h-auto object-contain min-h-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="mt-4 text-center px-6 py-4 bg-black bg-opacity-90 rounded-b-lg">
              <p className="font-montserrat text-sm text-gray-300">
                Press <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">ESC</kbd> or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Review Summary Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-gold flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Review Your Appointment Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Personal Information */}
            <div className="bg-black p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Name:</span> <span className="text-white">{formData.name}</span></p>
                <p><span className="text-gray-400">Phone:</span> <span className="text-white">{formData.phone}</span></p>
                {formData.email && <p><span className="text-gray-400">Email:</span> <span className="text-white">{formData.email}</span></p>}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-black p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Details
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Date:</span> <span className="text-white">{new Date(formData.appointmentDate).toLocaleDateString()}</span></p>
                <p><span className="text-gray-400">Time:</span> <span className="text-white">{formData.appointmentTime}</span></p>
                <p><span className="text-gray-400">Service:</span> <span className="text-white">{formData.serviceType}</span></p>
                {formData.designSize && <p><span className="text-gray-400">Size:</span> <span className="text-white">{formData.designSize}</span></p>}
              </div>
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                  <FileImage className="h-5 w-5" />
                  Design Images ({uploadedImages.length})
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-600">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => viewImage(image.url)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Requirements */}
            {formData.specialRequirements && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gold mb-3">Special Requirements</h3>
                <p className="text-sm text-gray-300">{formData.specialRequirements}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewModal(false)}
                className="flex-1 border-gray-600 text-white hover:bg-gray-800"
              >
                Edit Details
              </Button>
              <Button
                type="button"
                onClick={handleReviewSubmit}
                disabled={loading}
                className="flex-1 bg-gold hover:bg-gold-dark text-black font-semibold"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingForm;
