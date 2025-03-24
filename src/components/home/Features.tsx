
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Lock, LineChart, Map, Box, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass-card p-6 rounded-xl"
  >
    <div className="w-14 h-14 rounded-lg bg-purple/10 flex items-center justify-center mb-5 text-purple">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-charcoal mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: <Truck size={28} />,
      title: 'Real-Time Tracking',
      description: 'Monitor your shipments in real-time with GPS and IoT integration for accurate location data.',
    },
    {
      icon: <Lock size={28} />,
      title: 'Blockchain Transparency',
      description: 'Ensure data integrity and build trust with immutable blockchain records of each transaction.',
    },
    {
      icon: <LineChart size={28} />,
      title: 'Sustainability Recommendations',
      description: 'Get AI-powered suggestions to reduce carbon emissions and optimize your logistics operations.',
    },
    {
      icon: <Box size={28} />,
      title: 'Inventory Management',
      description: 'Optimize inventory levels with predictive analytics to meet demand without overstocking.',
    },
    {
      icon: <Map size={28} />,
      title: 'Route Optimization',
      description: 'Find the most efficient delivery routes to save time, fuel, and reduce environmental impact.',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Performance Analytics',
      description: 'Analyze your logistics performance with comprehensive dashboards and customizable reports.',
    },
  ];

  return (
    <section className="py-20 bg-white relative" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-charcoal mb-4"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Our platform combines blockchain, IoT, and AI technologies to revolutionize your logistics operations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/features">
            <Button className="bg-purple hover:bg-purple/90 text-white px-8 py-6 text-lg rounded-xl">
              Explore All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
