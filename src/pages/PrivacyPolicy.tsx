import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-8 text-gold">
          Privacy Policy
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              At MA Tailor, we are committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, store, and protect your data when you 
              use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Personal identification information (Name, phone number, email address)</li>
              <li>Order details and measurements for stitching services</li>
              <li>Appointment and booking information</li>
              <li>Review submissions and feedback</li>
              <li>Communication history through our chat or contact forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your information is used solely for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Processing and fulfilling your stitching orders</li>
              <li>Communicating with you about your orders and appointments</li>
              <li>Improving our services and customer experience</li>
              <li>Sending promotional offers and updates (only with your consent)</li>
              <li>Responding to your inquiries and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Data Storage and Security</h2>
            <p className="text-gray-300 leading-relaxed">
              All personal data is securely stored in our Supabase database with industry-standard encryption. 
              We implement appropriate technical and organizational measures to protect your information against 
              unauthorized access, alteration, disclosure, or destruction. Your data is stored only for as long 
              as necessary to fulfill the purposes outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Data Sharing</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Your data is only 
              shared with service providers who assist us in operating our website and conducting our business, 
              and they are obligated to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Cookies and Analytics</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience 
              and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Access your personal data we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or your personal data, 
              please contact us via WhatsApp at <a href="https://wa.me/923070125273" className="text-gold hover:underline">+92 307 0125273</a> or 
              through our <a href="/contact" className="text-gold hover:underline">contact page</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-playfair font-bold mb-4 text-gold">Updates to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page 
              with an updated revision date. We encourage you to review this policy periodically.
            </p>
            <p className="text-gray-400 text-sm mt-4">
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

export default PrivacyPolicy;
