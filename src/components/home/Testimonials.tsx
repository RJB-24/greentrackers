
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  delay: number;
}

const Testimonial = ({ quote, author, role, company, rating, delay }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass-card p-8 rounded-xl"
  >
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? "fill-purple text-purple" : "text-gray-300"}
        />
      ))}
    </div>
    <p className="text-gray-700 italic mb-6">"{quote}"</p>
    <div>
      <p className="font-semibold text-charcoal">{author}</p>
      <p className="text-gray-500 text-sm">
        {role}, {company}
      </p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TrackLogistics has revolutionized our supply chain operations. The real-time tracking and blockchain verification have increased our transparency and customer trust significantly.",
      author: "Sarah Johnson",
      role: "Supply Chain Director",
      company: "Global Retail Inc.",
      rating: 5
    },
    {
      quote: "The sustainability recommendations have helped us reduce our carbon footprint by 30% while improving delivery efficiency. It's a win-win for business and the environment.",
      author: "Michael Chen",
      role: "Operations Manager",
      company: "EcoDelivery Co.",
      rating: 5
    },
    {
      quote: "As a logistics manager, I appreciate the comprehensive analytics and route optimization. It has streamlined our processes and reduced operational costs by 25%.",
      author: "David Rodriguez",
      role: "Logistics Manager",
      company: "FastFreight Logistics",
      rating: 4
    }
  ];

  return (
    <section className="py-20 bg-pale/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Hear from logistics professionals who have transformed their operations with our platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
