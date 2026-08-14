import { Scissors, ShieldCheck, Truck, Clock, Star } from 'lucide-react';

const BookingHero = () => {
  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] text-white"
      aria-labelledby="booking-hero-title"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-10 md:pt-20 md:pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] tracking-[0.25em] uppercase mb-5">
          <Scissors className="h-3.5 w-3.5" /> MA Tailor · Custom Fit
        </span>

        <h1
          id="booking-hero-title"
          className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4"
        >
          Book Your <span className="text-[#D4AF37]">Tailoring</span> Appointment
        </h1>

        <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Fill the quick form, confirm on WhatsApp, and our master tailors take it from there — measurements, stitching, and doorstep delivery in Karachi.
        </p>


        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <button
            type="button"
            onClick={scrollToForm}
            className="min-h-12 px-8 py-3 rounded-full bg-[#D4AF37] hover:brightness-110 text-black font-semibold uppercase tracking-widest text-sm shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] transition-all w-full sm:w-auto"
          >
            Start My Booking
          </button>
          <a
            href="https://wa.me/923070125273"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 px-8 py-3 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold uppercase tracking-widest text-sm transition-all w-full sm:w-auto"
          >
            Chat on WhatsApp
          </a>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto text-left">
          {[
            { icon: Truck, label: 'Doorstep Pickup & Drop' },
            { icon: ShieldCheck, label: '100% Fit Guarantee' },
            { icon: Clock, label: 'Fast Turnaround' },
            { icon: Star, label: '4.9★ Rated by Clients' },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
              <span className="text-xs md:text-sm text-stone-200 font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookingHero;
