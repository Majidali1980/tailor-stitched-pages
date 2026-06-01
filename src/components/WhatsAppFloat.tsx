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
      className="fixed left-3 z-[60] bottom-20 lg:bottom-6 flex items-center justify-center w-11 h-11 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
};

export default WhatsAppFloat;
