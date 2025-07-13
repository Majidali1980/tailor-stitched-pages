
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you ship stitched dresses to the USA?",
      answer: "Yes, we offer international shipping to USA, UK, Canada, UAE, and many other countries. Delivery typically takes 15-17 days via reliable courier services."
    },
    {
      question: "How long does stitching take?",
      answer: "Our standard stitching time is 7-10 days, plus 15-17 days for international delivery. Rush orders can be accommodated with additional charges."
    },
    {
      question: "What types of Pakistani dresses do you stitch?",
      answer: "We specialize in all types of Pakistani and Indian ladies' outfits including Shalwar Kameez, Kurtis, Maxis, Party wear, Bridal wear, and traditional outfits."
    },
    {
      question: "Do you provide samples before bulk orders?",
      answer: "Yes, we offer free samples for bulk orders to ensure quality and fit before you place your main order."
    },
    {
      question: "What are your bulk order minimum quantities?",
      answer: "Our minimum bulk order is 10 pieces per size. We offer competitive rates and discounts based on order quantity and discussion."
    },
    {
      question: "How can I get my measurements taken?",
      answer: "We provide detailed measurement guides, or you can visit our local measurement partners. We also offer pick and drop services in select areas."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about our online Pakistani dress stitching and international delivery services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="fancy-border p-1">
              <Card className="bg-black border-none">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardTitle className="flex justify-between items-center text-gold font-playfair">
                    <span className="text-left">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0" />
                    )}
                  </CardTitle>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent className="pt-0">
                    <p className="font-montserrat text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
