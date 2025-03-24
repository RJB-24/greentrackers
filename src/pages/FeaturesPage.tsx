
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Truck, Shield, LineChart, Map, Box, BarChart3, Zap, Users, Server, Leaf, Smartphone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  delay: number;
  reverse?: boolean;
}

const Feature = ({ icon, title, description, benefits, delay, reverse = false }: FeatureProps) => (
  <div className="py-12 md:py-20 border-b border-gray-100 last:border-b-0">
    <div className="container mx-auto px-4 md:px-6">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-pale to-white p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-purple/10 flex items-center justify-center mb-6 text-purple">
              {icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: reverse ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="relative">
            <div className="absolute -z-10 top-0 right-0 h-64 w-64 bg-purple/10 rounded-full filter blur-3xl"></div>
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className={`bg-${reverse ? 'forest' : 'purple'}/5 aspect-video rounded-xl relative`}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const FeaturesPage = () => {
  const features = [
    {
      icon: <Truck size={32} />,
      title: 'Real-Time Tracking',
      description: 'Monitor your shipments in real-time with GPS and IoT integration for accurate location data.',
      benefits: [
        'Live GPS tracking of all vehicles',
        'Automatic status updates and notifications',
        'Estimated time of arrival predictions',
        'Detailed journey history and analytics'
      ]
    },
    {
      icon: <Shield size={32} />,
      title: 'Blockchain Transparency',
      description: 'Ensure data integrity and build trust with immutable blockchain records of each transaction.',
      benefits: [
        'Tamper-proof record of all shipment events',
        'Cryptographically verified transactions',
        'Complete chain of custody documentation',
        'Smart contracts for automated processes'
      ],
      reverse: true
    },
    {
      icon: <Leaf size={32} />,
      title: 'Sustainability Recommendations',
      description: 'Get AI-powered suggestions to reduce carbon emissions and optimize your logistics operations.',
      benefits: [
        'Carbon footprint calculation for each shipment',
        'Alternative route suggestions to reduce emissions',
        'Load optimization to minimize empty miles',
        'Monthly sustainability reports and benchmarks'
      ]
    },
    {
      icon: <Box size={32} />,
      title: 'Inventory Management',
      description: 'Optimize inventory levels with predictive analytics to meet demand without overstocking.',
      benefits: [
        'Real-time inventory visibility across locations',
        'Demand forecasting and automatic reordering',
        'Expiration date tracking and alerts',
        'Space utilization analytics and recommendations'
      ],
      reverse: true
    },
    {
      icon: <Map size={32} />,
      title: 'Route Optimization',
      description: 'Find the most efficient delivery routes to save time, fuel, and reduce environmental impact.',
      benefits: [
        'AI-powered route planning and optimization',
        'Traffic conditions and weather integration',
        'Multi-stop delivery optimization',
        'Real-time rerouting based on conditions'
      ]
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Accessibility',
      description: 'Access all features on-the-go with our mobile application, designed for logistics professionals.',
      benefits: [
        'Native iOS and Android applications',
        'Offline access to critical shipment data',
        'Push notifications for important updates',
        'Mobile scanning and documentation features'
      ],
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-pale to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Features That Transform Logistics
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our comprehensive platform combines cutting-edge technologies to make logistics more efficient, transparent, and sustainable.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Features */}
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          benefits={feature.benefits}
          delay={index * 0.1}
          reverse={feature.reverse}
        />
      ))}
      
      {/* Technology Stack */}
      <section className="py-20 bg-pale/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Powered by Advanced Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform leverages the latest technologies to deliver a seamless logistics management experience
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-14 h-14 bg-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="h-7 w-7 text-purple" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Blockchain</h3>
              <p className="text-gray-600">Immutable records and smart contracts for transparent supply chains</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-14 h-14 bg-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Server className="h-7 w-7 text-purple" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">IoT Integration</h3>
              <p className="text-gray-600">Real-time data from connected devices for complete visibility</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-14 h-14 bg-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-purple" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">AI & Machine Learning</h3>
              <p className="text-gray-600">Predictive analytics and intelligent decision support</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-14 h-14 bg-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-purple" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Collaborative Platform</h3>
              <p className="text-gray-600">Connect all stakeholders in your logistics ecosystem</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience These Features Firsthand
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              See how our platform can transform your logistics operations with a personalized demo
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button className="bg-purple hover:bg-purple/90 text-white px-8 py-6 text-lg">
                  Try Interactive Demo
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-6 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
