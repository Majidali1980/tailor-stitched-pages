
import { Scissors, Star, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Custom Stitching",
      description: "Tailored Pakistani dresses crafted to your exact measurements and preferences.",
      features: ["Perfect fit guarantee", "Premium fabrics", "Custom designs"]
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Alterations",
      description: "Expert alterations to ensure your outfits fit perfectly and look stunning.",
      features: ["Size adjustments", "Style modifications", "Quick turnaround"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Express Service",
      description: "Need something urgently? Our express service delivers quality work on time.",
      features: ["24-48 hour delivery", "Rush orders", "Emergency alterations"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Bridal Specialists",
      description: "Specializing in bridal wear and formal Pakistani outfits for special occasions.",
      features: ["Wedding dresses", "Formal wear", "Special occasions"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Professional tailoring services with decades of experience in Pakistani dress stitching.
          </p>
        </div>

        {/* Expert Section */}
        <div className="text-center mb-16">
          <div className="fancy-border p-1 max-w-4xl mx-auto">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-4">
                EXPERT IN ALL TYPES OF STITCHING
              </h3>
              <p className="text-lg font-montserrat text-gray-300 mb-6">
                From traditional Pakistani dresses to modern designs, we bring your vision to life with precision and care.
              </p>
              <Link 
                to="/booking"
                className="inline-block bg-gold hover:bg-gold-dark text-black px-8 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 hover:scale-105"
              >
                Book Your Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="fancy-border p-1">
              <div className="bg-black p-6 rounded-lg h-full">
                <div className="text-gold mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold text-gold mb-3">
                  {service.title}
                </h3>
                <p className="font-montserrat text-gray-300 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="font-montserrat text-xs text-gray-400 flex items-center">
                      <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
