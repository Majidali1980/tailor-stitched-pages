import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const whatsappNumber = "923070125273";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed left-4 z-[60] bottom-24 lg:bottom-8 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-slow"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping-slow" aria-hidden="true" />
      <MessageCircle className="relative w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform" />
    </a>
  );
};

export default WhatsAppFloat;
