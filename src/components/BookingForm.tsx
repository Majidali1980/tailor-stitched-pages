import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Calendar, Clock, User, Phone, Mail, Scissors, X, Eye, FileImage, CheckCircle, ShoppingCart } from 'lucide-react';
import emailjs from 'emailjs-com';

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  file: File;
}

interface ServiceItem {
  id: string;
  category: string;
  service_name: string;
  price: number;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service_type: string;
  quantity: number;
  price: number;
  dc_charges: number;
  amount_summary: number;
  appointment_date: string;
  appointment_time: string;
  special_requirements: string;
  shirt_measurements: {
    chest: string;
    collar: string;
    sleeves: string;
    length: string;
  };
  trouser_measurements: {
    waist: string;
    hip: string;
    length: string;
    bottom: string;
  };
  pick_drop_charges: {
    pick: boolean;
    drop: boolean;
    pick_amount: number;
    drop_amount: number;
  };
}

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceCharges, setServiceCharges] = useState<any[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service_type: '',
    quantity: 1,
    price: 0,
    dc_charges: 0,
    amount_summary: 0,
    appointment_date: '',
    appointment_time: '',
    special_requirements: '',
    shirt_measurements: {
      chest: '',
      collar: '',
      sleeves: '',
      length: '',
    },
    trouser_measurements: {
      waist: '',
      hip: '',
      length: '',
      bottom: '',
    },
    pick_drop_charges: {
      pick: false,
      drop: false,
      pick_amount: 250,
      drop_amount: 250,
    },
  });

  // Fetch services and service charges on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, chargesResponse] = await Promise.all([
          supabase.from('stitching_services').select('*').order('category', { ascending: true }),
          supabase.from('service_charges').select('*').eq('is_active', true)
        ]);

        if (servicesResponse.data) setServices(servicesResponse.data);
        if (chargesResponse.data) setServiceCharges(chargesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate amount when service_type, quantity, or pick/drop charges change
  useEffect(() => {
    if (formData.service_type && formData.quantity) {
      const selectedService = services.find(service => 
        `${service.category} - ${service.service_name}` === formData.service_type
      );
      
      if (selectedService) {
        const price = selectedService.price;
        const pickCharges = formData.pick_drop_charges.pick ? formData.pick_drop_charges.pick_amount : 0;
        const dropCharges = formData.pick_drop_charges.drop ? formData.pick_drop_charges.drop_amount : 0;
        const dcCharges = pickCharges + dropCharges;
        
        setFormData(prev => ({
          ...prev,
          price: price,
          dc_charges: dcCharges,
          amount_summary: (price * formData.quantity) + dcCharges
        }));
      }
    }
  }, [formData.service_type, formData.quantity, formData.pick_drop_charges, services]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePickDropChange = (type: 'pick' | 'drop', checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      pick_drop_charges: {
        ...prev.pick_drop_charges,
        [type]: checked
      }
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

      const firstImageUrl = uploadedImages.length > 0 ? uploadedImages[0].url : null;

      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            service_type: formData.service_type,
            quantity: formData.quantity,
            price: formData.price,
            dc_charges: formData.dc_charges,
            amount_summary: formData.amount_summary,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            special_requirements: formData.special_requirements || null,
            shirt_measurements: formData.shirt_measurements,
            trouser_measurements: formData.trouser_measurements,
            pick_drop_charges: formData.pick_drop_charges,
            uploaded_images: imageUrls,
            uploaded_image_url: firstImageUrl
          }
        ]);

      if (error) {
        throw error;
      }

      // Send email notification using EmailJS
      try {
        const templateParams = {
          subject: 'New Appointment for Stitching Received',
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email || 'Not provided',
          appointment_date: new Date(formData.appointment_date).toLocaleDateString(),
          appointment_time: formData.appointment_time,
          service_type: formData.service_type,
          quantity: formData.quantity,
          total_amount: formData.amount_summary,
          special_requirements: formData.special_requirements || 'None',
          images_count: uploadedImages.length,
          to_email: 'matailors786@gmail.com',
          message_body: `
            New appointment booking details:
            
            Customer Information:
            - Full Name: ${formData.name}
            - Phone Number: ${formData.phone}
            - Email: ${formData.email || 'Not provided'}
            
            Appointment Details:
            - Date: ${new Date(formData.appointment_date).toLocaleDateString()}
            - Time: ${formData.appointment_time}
            - Service Type: ${formData.service_type}
            - Quantity: ${formData.quantity}
            - Total Amount: Rs. ${formData.amount_summary}
            - Uploaded Images: ${uploadedImages.length} file(s)
            
            Special Requirements:
            ${formData.special_requirements || 'None'}
            
            Please contact the customer to confirm the appointment.
          `
        };

        await emailjs.send(
          'service_kqtecnn',
          'template_tv45p3s',
          templateParams,
          'H357zAP8V__yP5H8e'
        );

        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      toast.success('Appointment booked successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service_type: '',
        quantity: 1,
        price: 0,
        dc_charges: 0,
        amount_summary: 0,
        appointment_date: '',
        appointment_time: '',
        special_requirements: '',
        shirt_measurements: {
          chest: '',
          collar: '',
          sleeves: '',
          length: '',
        },
        trouser_measurements: {
          waist: '',
          hip: '',
          length: '',
          bottom: '',
        },
        pick_drop_charges: {
          pick: false,
          drop: false,
          pick_amount: 250,
          drop_amount: 250,
        },
      });
      setUploadedImages([]);

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

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

        <div className="max-w-4xl mx-auto">
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-black border-gray-600 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="bg-black border-gray-600 text-white"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-black border-gray-600 text-white"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <Scissors className="h-5 w-5" />
                    Service Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white mb-2 block">
                        Service Type *
                      </Label>
                      <Select value={formData.service_type} onValueChange={(value) => handleInputChange('service_type', value)}>
                        <SelectTrigger className="bg-black border-gray-600 text-white">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(groupedServices).map(([category, categoryServices]) => (
                            <div key={category}>
                              <div className="px-2 py-1 text-sm font-semibold text-gray-400 bg-gray-100">
                                {category}
                              </div>
                              {categoryServices.map((service) => (
                                 <SelectItem key={service.id} value={`${service.category} - ${service.service_name}`}>
                                  {service.service_name} - Rs. {service.price}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-white mb-2 block">
                        Quantity *
                      </Label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                        min="1"
                        max="10"
                        className="bg-black border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Pick/Drop Charges */}
                  <div className="mt-4">
                    <Label className="text-white mb-2 block">Pick & Drop Service</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.pick_drop_charges.pick}
                          onChange={(e) => handlePickDropChange('pick', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-white">Pick-up (Rs. {formData.pick_drop_charges.pick_amount})</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.pick_drop_charges.drop}
                          onChange={(e) => handlePickDropChange('drop', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-white">Drop-off (Rs. {formData.pick_drop_charges.drop_amount})</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {formData.service_type && (
                    <div className="mt-6 bg-black p-4 rounded-lg border border-gray-600">
                      <h4 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Price Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Service Price:</span>
                          <span className="text-white">Rs. {formData.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quantity:</span>
                          <span className="text-white">{formData.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Subtotal:</span>
                          <span className="text-white">Rs. {formData.price * formData.quantity}</span>
                        </div>
                        {formData.dc_charges > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-300">Pick/Drop Charges:</span>
                            <span className="text-white">Rs. {formData.dc_charges}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-white">Total Amount:</span>
                            <span className="text-green-400">Rs. {formData.amount_summary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Appointment Date & Time */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Appointment Scheduling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appointmentDate" className="text-white mb-2 block">
                        Preferred Date *
                      </Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={formData.appointment_date}
                        onChange={(e) => handleInputChange('appointment_date', e.target.value)}
                        required
                        className="bg-black border-gray-600 text-white"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="appointmentTime" className="text-white mb-2 block">
                        Preferred Time *
                      </Label>
                      <Input
                        id="appointmentTime"
                        type="time"
                        value={formData.appointment_time}
                        onChange={(e) => handleInputChange('appointment_time', e.target.value)}
                        required
                        className="bg-black border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Design Images
                  </h3>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-black">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
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
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
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
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4">Special Requirements</h3>
                  <Textarea
                    value={formData.special_requirements}
                    onChange={(e) => handleInputChange('special_requirements', e.target.value)}
                    className="bg-black border-gray-600 text-white"
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
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

            {/* Service Details */}
            <div className="bg-black p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Service Details
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Service Type:</span> <span className="text-white">{formData.service_type}</span></p>
                <p><span className="text-gray-400">Quantity:</span> <span className="text-white">{formData.quantity}</span></p>
                <p><span className="text-gray-400">Price per item:</span> <span className="text-white">Rs. {formData.price}</span></p>
                <p><span className="text-gray-400">Total Amount:</span> <span className="text-green-400 font-semibold">Rs. {formData.amount_summary}</span></p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-black p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Details
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Date:</span> <span className="text-white">{new Date(formData.appointment_date).toLocaleDateString()}</span></p>
                <p><span className="text-gray-400">Time:</span> <span className="text-white">{formData.appointment_time}</span></p>
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
            {formData.special_requirements && (
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-gold mb-3">Special Requirements</h3>
                <p className="text-sm text-gray-300">{formData.special_requirements}</p>
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