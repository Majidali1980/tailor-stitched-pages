import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-8 text-gold">
          Terms of Use
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using the MA Tailor website and services, you accept and agree to be bound by 
              these Terms of Use. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Services Offered</h2>
            <p className="text-gray-300 leading-relaxed">
              MA Tailor provides custom stitching services for ladies' and girls' suits. All services are 
              subject to availability and our acceptance of your order. We reserve the right to refuse service 
              to anyone for any reason at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Order Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              When placing an order with MA Tailor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>You agree to provide accurate measurements and specifications</li>
              <li>Orders are confirmed only after payment or deposit is received</li>
              <li>Delivery times are estimates and may vary based on order complexity</li>
              <li>Custom orders cannot be canceled once stitching has commenced</li>
              <li>Pick and drop services incur additional delivery charges as specified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">AI-Generated Images Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              All model images displayed on this website are AI-generated and used solely to showcase outfit 
              designs and stitching concepts. These images are for demonstration purposes only. Actual garments 
              are handcrafted by our skilled tailors according to your measurements and preferences. The 
              AI-generated models serve only as visual representations and may vary slightly from the final product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Design Variations</h2>
            <p className="text-gray-300 leading-relaxed">
              While we strive to match designs as closely as possible to the images shown, slight variations 
              may occur due to fabric availability, handcrafted nature of the work, and individual customization. 
              We will communicate any significant changes before proceeding with your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content on this website, including text, images, designs, logos, and graphics, is the property 
              of MA Tailor or its content suppliers and is protected by copyright laws. You may not reproduce, 
              distribute, or use any content without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">User Conduct</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Use the website for any unlawful purpose</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with or disrupt the website's functionality</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Post offensive, defamatory, or inappropriate content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Payment Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              All prices are in Pakistani Rupees (PKR) unless otherwise stated. Payment must be made before or 
              upon delivery, depending on the agreed terms. We accept various payment methods as communicated 
              during the order process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Liability Limitation</h2>
            <p className="text-gray-300 leading-relaxed">
              MA Tailor shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from your use of our services or website. Our total liability shall not exceed the amount 
              you paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Modifications to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Changes will be effective 
              immediately upon posting on this page. Your continued use of our services after changes are 
              posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with the laws of Pakistan. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts in Karachi, Pakistan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about these Terms of Use, please contact us via WhatsApp at{' '}
              <a href="https://wa.me/923070125273" className="text-gold hover:underline">+92 307 0125273</a> or 
              through our <a href="/contact" className="text-gold hover:underline">contact page</a>.
            </p>
          </section>

          <section>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TermsOfUse;
