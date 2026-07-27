import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, X, Eye, FileImage, Truck, Plus, Scissors, MessageCircle, CheckCircle2 } from 'lucide-react';
import { GoogleReviewPopup } from './popups/GoogleReviewPopup';

const WHATSAPP_NUMBER = '923070125273';
const PICK_DROP_CHARGE = 350;

// DM Serif Display + Fira Sans (loaded once for this page)
const FONT_LINK_ID = 'ma-tailor-booking-fonts';
const ensureFonts = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(FONT_LINK_ID)) return;
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Sans:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
};

const serif = { fontFamily: "'DM Serif Display', serif" } as const;
const sans = { fontFamily: "'Fira Sans', sans-serif" } as const;

interface UploadedImage { id: string; name: string; url: string; file: File; }
interface ServiceItem { id: string; category: string; service_name: string; }
interface ServiceDetail { id: string; service_type: string; quantity: number; }
interface FormData {
  name: string; phone: string; email: string;
  services: ServiceDetail[]; special_requirements: string; pick_drop: boolean;
}

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGoogleReviewPopup, setShowGoogleReviewPopup] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '',
    services: [], special_requirements: '', pick_drop: false,
  });

  useEffect(() => {
    ensureFonts();
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
      services: [...prev.services, { id: Math.random().toString(), service_type: '', quantity: 1 }],
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

  const removeImage = (id: string) => setUploadedImages((prev) => prev.filter((i) => i.id !== id));

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push('*New Booking Request — MA Tailor*', '');
    lines.push(`*Name:* ${formData.name}`);
    lines.push(`*Phone:* ${formData.phone}`);
    if (formData.email) lines.push(`*Email:* ${formData.email}`);
    lines.push('', '*Services:*');
    formData.services.forEach((s, i) => lines.push(`${i + 1}. ${s.service_type} — Qty: ${s.quantity}`));
    if (formData.pick_drop) lines.push('', `*Pick & Drop:* Yes (Rs. ${PICK_DROP_CHARGE})`);
    if (formData.special_requirements) lines.push('', `*Special Requirements:* ${formData.special_requirements}`);
    if (uploadedImages.length > 0) {
      lines.push('', `*Design Images (${uploadedImages.length}):*`);
      uploadedImages.forEach((img) => lines.push(img.url));
    }
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) { toast.error('Please add at least one service.'); return; }
    if (formData.services.some((s) => !s.service_type)) { toast.error('Please select a service type for every added service.'); return; }

    setLoading(true);
    try {
      const imageUrls = uploadedImages.map((img) => ({ id: img.id, name: img.name, url: img.url }));
      const firstImageUrl = uploadedImages[0]?.url || null;

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

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
      toast.success('Booking confirmed! Continuing on WhatsApp…');

      const hasShown = localStorage.getItem('googleReviewPopupShown');
      if (!hasShown) {
        setShowGoogleReviewPopup(true);
        localStorage.setItem('googleReviewPopupShown', 'true');
      }
      setFormData({ name: '', phone: '', email: '', services: [], special_requirements: '', pick_drop: false });
      setUploadedImages([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupedServices = useMemo(() => services.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s); return acc;
  }, {} as Record<string, ServiceItem[]>), [services]);

  const validServicesCount = formData.services.filter(s => s.service_type).length;
  const submitDisabled = loading || uploading || formData.services.length === 0;

  // Shared classes
  const card = "bg-[#111111] border border-stone-800/80 rounded-3xl";
  const fieldInput = "w-full min-h-12 bg-stone-900/60 border border-stone-800 rounded-xl p-3 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 transition-colors";

  return (
    <section id="booking-form" className="py-16 md:py-24 bg-[#0a0a0a] text-stone-200 scroll-mt-20" style={sans}>
      <div className="max-w-6xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-min animate-fade-in">

          {/* Brand hero card */}
          <div className={`${card} md:col-span-8 p-8 md:p-10 flex flex-col justify-between overflow-hidden relative`}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-[#D4AF37]/80 text-[11px] tracking-[0.35em] uppercase mb-3">MA Tailor · Est. Craft</p>
              <h1 className="text-[#D4AF37] text-4xl md:text-6xl leading-[1.05] mb-3" style={serif}>Bespoke Concierge Booking</h1>
              <p className="text-stone-400 text-sm md:text-base font-light italic max-w-xl">
                Exquisite craftsmanship, tailored to your precise measurements. Share your details — we confirm every order personally on WhatsApp.
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-4 text-[11px] uppercase tracking-widest text-stone-500">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Hand finished</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Personal fitting</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> WhatsApp concierge</span>
            </div>
          </div>

          {/* Pick & Drop tile */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, pick_drop: !formData.pick_drop })}
            className={`md:col-span-4 rounded-3xl p-8 text-left flex flex-col justify-between transition-all group ${
              formData.pick_drop
                ? 'bg-[#D4AF37] text-black shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)]'
                : 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20'
            }`}
            aria-pressed={formData.pick_drop}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-full ${formData.pick_drop ? 'bg-black/10' : 'bg-[#D4AF37]/10'}`}>
                <Truck className="h-6 w-6" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                formData.pick_drop ? 'border-black/30' : 'border-[#D4AF37]/40'
              }`}>
                {formData.pick_drop ? 'Added' : 'Optional'}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl leading-tight" style={serif}>Doorstep Pickup & Delivery</h3>
              <p className={`mt-2 text-sm font-medium ${formData.pick_drop ? 'text-black/70' : 'text-[#D4AF37]/70'}`}>
                Rs. {PICK_DROP_CHARGE} flat rate · city-wide
              </p>
            </div>
          </button>

          {/* Personal info */}
          <div className={`${card} md:col-span-4 p-6 md:p-7 space-y-4`}>
            <h2 className="text-[#D4AF37] text-sm font-medium flex items-center gap-2 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Client Identity
            </h2>
            <input type="text" required placeholder="Full Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={fieldInput} />
            <input type="tel" required placeholder="Phone Number (03XX XXXXXXX)" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={fieldInput} />
            <input type="email" placeholder="Email (Optional)" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldInput} />
          </div>

          {/* Service builder */}
          <div className={`${card} md:col-span-8 p-6 md:p-7`}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[#D4AF37] text-sm font-medium flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Service Selection
              </h2>
              <button type="button" onClick={addService}
                className="text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40 px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all inline-flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Service
              </button>
            </div>

            {formData.services.length === 0 ? (
              <div className="border border-dashed border-stone-700 rounded-2xl py-10 text-center">
                <Scissors className="h-6 w-6 text-stone-600 mx-auto mb-3" />
                <p className="text-stone-500 text-sm mb-4">No services added yet</p>
                <button type="button" onClick={addService}
                  className="bg-[#D4AF37] hover:brightness-110 text-black text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full">
                  Add your first service
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {formData.services.map((service, index) => (
                  <div key={service.id} className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-stone-300 text-xs uppercase tracking-widest">Service {String(index + 1).padStart(2, '0')}</p>
                      <button type="button" onClick={() => removeService(service.id)}
                        className="text-stone-500 hover:text-red-400 transition-colors" aria-label="Remove service">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_110px] gap-3">
                      <Select value={service.service_type} onValueChange={(v) => updateService(service.id, 'service_type', v)}>
                        <SelectTrigger className="bg-stone-950 border-stone-800 text-stone-100 rounded-xl h-11">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(groupedServices).map(([category, list]) => (
                            <div key={category}>
                              <div className="px-2 py-1 text-[10px] font-semibold text-stone-500 uppercase tracking-widest">{category}</div>
                              {list.map((svc) => (
                                <SelectItem key={svc.id} value={`${svc.category} - ${svc.service_name}`}>{svc.service_name}</SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" min={1} max={20} value={service.quantity}
                        onChange={(e) => updateService(service.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-stone-950 border-stone-800 text-stone-100 rounded-xl h-11" required />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design details + upload */}
          <div className={`${card} md:col-span-7 p-6 md:p-7`}>
            <h2 className="text-[#D4AF37] text-sm font-medium flex items-center gap-2 uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Design Details
            </h2>
            <Textarea value={formData.special_requirements}
              onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
              placeholder="Special requirements, fabric notes, deadline, sizing adjustments…"
              className="bg-stone-900/60 border border-stone-800 rounded-2xl p-4 min-h-[120px] text-stone-100 placeholder:text-stone-600 focus:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 resize-none mb-4" />

            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="imageUpload" disabled={uploading} />
            <label htmlFor="imageUpload"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-stone-800 hover:border-[#D4AF37]/60 py-6 rounded-2xl cursor-pointer transition-all bg-stone-950/40">
              <Upload className={`h-5 w-5 ${uploading ? 'text-[#D4AF37] animate-pulse' : 'text-stone-500'}`} />
              <span className={`text-sm ${uploading ? 'text-[#D4AF37]' : 'text-stone-400'}`}>
                {uploading ? 'Uploading…' : 'Upload design references (multiple)'}
              </span>
            </label>

            {uploadedImages.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileImage className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs uppercase tracking-widest">{uploadedImages.length} image(s)</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden border border-stone-800 bg-stone-900">
                      <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button type="button" onClick={() => setSelectedImage(image.url)} className="bg-[#D4AF37] text-black p-2 rounded-full"><Eye className="h-4 w-4" /></button>
                        <button type="button" onClick={() => removeImage(image.id)} className="bg-red-500 text-white p-2 rounded-full"><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary + CTA */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/25 rounded-3xl p-8 flex flex-col">
            <h2 className="text-[#D4AF37] text-xs font-medium mb-6 uppercase tracking-[0.35em] text-center">Order Summary</h2>
            <div className="flex-1 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Client</span>
                <span className="text-stone-100 truncate max-w-[60%] text-right">{formData.name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Services</span>
                <span className="text-stone-100">{validServicesCount} item{validServicesCount === 1 ? '' : 's'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Pick & Drop</span>
                <span className="text-stone-100">{formData.pick_drop ? `Rs. ${PICK_DROP_CHARGE}` : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">References</span>
                <span className="text-stone-100">{uploadedImages.length}</span>
              </div>
              <div className="h-px bg-stone-800 my-4" />
              <div className="flex justify-between items-baseline">
                <span className="text-stone-400 font-light">Estimated Total</span>
                <span className="text-lg font-semibold text-[#D4AF37]" style={serif}>Quote on WhatsApp</span>
              </div>
            </div>

            <Button type="submit" disabled={submitDisabled}
              className="mt-6 w-full bg-[#D4AF37] hover:brightness-110 text-black font-semibold py-6 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <MessageCircle className="h-5 w-5" />
              {loading ? 'Sending…' : uploading ? 'Uploading…' : formData.services.length === 0 ? 'Add a service' : 'Confirm via WhatsApp'}
            </Button>
            <p className="text-[11px] text-stone-500 text-center mt-3 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" />
              WhatsApp opens with your details to +92 307 0125273
            </p>
          </div>
        </form>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex flex-col">
            <div className="flex justify-end mb-4">
              <button onClick={() => setSelectedImage(null)} className="text-white bg-stone-800 hover:bg-stone-700 rounded-full p-3">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-white rounded-lg">
              <img src={selectedImage} alt="Design preview" className="w-full h-auto object-contain" onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        </div>
      )}

      <GoogleReviewPopup isOpen={showGoogleReviewPopup} onClose={() => setShowGoogleReviewPopup(false)} />
    </section>
  );
};

export default BookingForm;
