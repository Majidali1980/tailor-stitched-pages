import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, User, Scissors, X, Eye, FileImage, Truck } from 'lucide-react';
import { GoogleReviewPopup } from './popups/GoogleReviewPopup';

const WHATSAPP_NUMBER = '923070125273';
const PICK_DROP_CHARGE = 350;

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
}

interface ServiceDetail {
  id: string;
  service_type: string;
  quantity: number;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  services: ServiceDetail[];
  special_requirements: string;
  pick_drop: boolean;
}

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGoogleReviewPopup, setShowGoogleReviewPopup] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    services: [],
    special_requirements: '',
    pick_drop: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('stitching_services')
        .select('*')
        .order('category', { ascending: true });
      if (data) setServices(data as any);
    })();
  }, []);

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { id: Math.random().toString(), service_type: '', quantity: 1 },
      ],
    }));
  };

  const removeService = (id: string) => {
    setFormData((prev) => ({ ...prev, services: prev.services.filter((s) => s.id !== id) }));
  };

  const updateService = (id: string, field: keyof ServiceDetail, value: any) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
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
        const filePath = `${Math.random()}-${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from('booking-images').upload(filePath, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from('booking-images').getPublicUrl(filePath);
        newImages.push({ id: Math.random().toString(), name: file.name, url: publicUrl, file });
      }
      setUploadedImages((prev) => [...prev, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload images.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((i) => i.id !== id));
  };

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push('*New Booking Request — MA Tailor*');
    lines.push('');
    lines.push(`*Name:* ${formData.name}`);
    lines.push(`*Phone:* ${formData.phone}`);
    if (formData.email) lines.push(`*Email:* ${formData.email}`);
    lines.push('');
    lines.push('*Services:*');
    formData.services.forEach((s, i) => {
      lines.push(`${i + 1}. ${s.service_type} — Qty: ${s.quantity}`);
    });
    if (formData.pick_drop) {
      lines.push('');
      lines.push(`*Pick & Drop:* Yes (Rs. ${PICK_DROP_CHARGE})`);
    }
    if (formData.special_requirements) {
      lines.push('');
      lines.push(`*Special Requirements:* ${formData.special_requirements}`);
    }
    if (uploadedImages.length > 0) {
      lines.push('');
      lines.push(`*Design Images (${uploadedImages.length}):*`);
      uploadedImages.forEach((img) => lines.push(img.url));
    }
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      toast.error('Please add at least one service.');
      return;
    }
    if (formData.services.some((s) => !s.service_type)) {
      toast.error('Please select a service type for every added service.');
      return;
    }

    setLoading(true);
    try {
      const imageUrls = uploadedImages.map((img) => ({ id: img.id, name: img.name, url: img.url }));
      const firstImageUrl = uploadedImages[0]?.url || null;

      // Save each service as a row in appointments
      const inserts = formData.services.map((service) => ({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        service_type: service.service_type,
        quantity: service.quantity,
        price: 0,
        dc_charges: formData.pick_drop ? PICK_DROP_CHARGE / formData.services.length : 0,
        amount_summary: formData.pick_drop ? PICK_DROP_CHARGE / formData.services.length : 0,
        special_requirements: formData.special_requirements || null,
        pick_drop_charges: { pick: formData.pick_drop, drop: formData.pick_drop, pick_amount: PICK_DROP_CHARGE, drop_amount: 0 },
        uploaded_images: imageUrls,
        uploaded_image_url: firstImageUrl,
      }));

      const { error } = await supabase.from('appointments').insert(inserts as any);
      if (error) throw error;

      // Redirect to WhatsApp
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
      window.open(waUrl, '_blank');

      toast.success('Booking confirmed! Continuing on WhatsApp…');

      const hasShown = localStorage.getItem('googleReviewPopupShown');
      if (!hasShown) {
        setShowGoogleReviewPopup(true);
        localStorage.setItem('googleReviewPopupShown', 'true');
      }

      // Reset
      setFormData({ name: '', phone: '', email: '', services: [], special_requirements: '', pick_drop: false });
      setUploadedImages([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Book Your <span className="text-gold">Stitching</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Fill in the essentials — we'll confirm on WhatsApp with a personalized quote.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-6 md:p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                      <Input id="name" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black border-gray-600 text-white" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">Phone Number *</Label>
                      <Input id="phone" type="tel" required value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-black border-gray-600 text-white" placeholder="03XX XXXXXXX" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-white mb-2 block">Email (Optional)</Label>
                      <Input id="email" type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black border-gray-600 text-white" placeholder="you@email.com" />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gold flex items-center gap-2">
                      <Scissors className="h-5 w-5" /> Services
                    </h3>
                    <Button type="button" onClick={addService} className="bg-gold hover:bg-gold-dark text-black text-sm">
                      + Add Service
                    </Button>
                  </div>

                  {formData.services.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                      <p className="text-gray-400 mb-2">No services added yet</p>
                      <Button type="button" onClick={addService} className="bg-gold hover:bg-gold-dark text-black">
                        Add Your First Service
                      </Button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {formData.services.map((service, index) => (
                      <div key={service.id} className="bg-black p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-white font-medium">Service {index + 1}</h4>
                          <button type="button" onClick={() => removeService(service.id)}
                            className="text-red-400 hover:text-red-300">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-4">
                          <div>
                            <Label className="text-white mb-2 block">Service Type *</Label>
                            <Select value={service.service_type}
                              onValueChange={(v) => updateService(service.id, 'service_type', v)}>
                              <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(groupedServices).map(([category, list]) => (
                                  <div key={category}>
                                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                      {category}
                                    </div>
                                    {list.map((svc) => (
                                      <SelectItem key={svc.id} value={`${svc.category} - ${svc.service_name}`}>
                                        {svc.service_name}
                                      </SelectItem>
                                    ))}
                                  </div>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white mb-2 block">Quantity *</Label>
                            <Input type="number" min={1} max={20} value={service.quantity}
                              onChange={(e) => updateService(service.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="bg-gray-900 border-gray-600 text-white" required />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pick & Drop */}
                  <div className="mt-6 bg-black p-4 rounded-lg border border-gray-600">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.pick_drop}
                        onChange={(e) => setFormData({ ...formData, pick_drop: e.target.checked })}
                        className="mt-1 rounded" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Truck className="h-4 w-4 text-gold" /> Pick &amp; Drop Service
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          We collect and deliver your outfit — flat Rs. {PICK_DROP_CHARGE} charges.
                        </p>
                      </div>
                      <span className="text-gold font-semibold">Rs. {PICK_DROP_CHARGE}</span>
                    </label>
                  </div>
                </div>

                {/* Design images */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5" /> Design Images (Optional)
                  </h3>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-black">
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload}
                      className="hidden" id="imageUpload" disabled={uploading} />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <Upload className={`h-8 w-8 mx-auto mb-2 ${uploading ? 'text-gold animate-pulse' : 'text-gray-400'}`} />
                      <p className={uploading ? 'text-gold' : 'text-gray-400'}>
                        {uploading ? 'Uploading…' : 'Click to upload design references'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Multiple images supported</p>
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileImage className="h-5 w-5 text-gold" />
                        <span className="text-gold font-medium">{uploadedImages.length} image(s)</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
                              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                                  <button type="button" onClick={() => setSelectedImage(image.url)}
                                    className="bg-gold text-black p-2 rounded-full">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button type="button" onClick={() => removeImage(image.id)}
                                    className="bg-red-500 text-white p-2 rounded-full">
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special requirements */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-gold mb-4">Special Requirements (Optional)</h3>
                  <Textarea value={formData.special_requirements}
                    onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                    className="bg-black border-gray-600 text-white"
                    placeholder="Anything we should know — style, deadline, fabric preference…" rows={4} />
                </div>

                <Button type="submit" disabled={loading || uploading || formData.services.length === 0}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-montserrat text-lg py-6">
                  {loading ? 'Sending…' : uploading ? 'Uploading Images…'
                    : formData.services.length === 0 ? 'Add a Service to Continue'
                    : 'Confirm Booking on WhatsApp'}
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  On confirmation, WhatsApp opens with your details ready to send to +92 307 0125273.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-4"
          onClick={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex flex-col">
            <div className="flex justify-end mb-4">
              <button onClick={() => setSelectedImage(null)}
                className="text-white bg-gray-800 hover:bg-gray-700 rounded-full p-3">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-white rounded-lg">
              <img src={selectedImage} alt="Design preview" className="w-full h-auto object-contain"
                onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        </div>
      )}

      <GoogleReviewPopup isOpen={showGoogleReviewPopup} onClose={() => setShowGoogleReviewPopup(false)} />
    </section>
  );
};

export default BookingForm;
