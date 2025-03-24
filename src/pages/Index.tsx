
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Leaf, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Stats Section */}
      <section className="bg-forest py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">30%</p>
              <p className="text-lg">Reduced Carbon Emissions</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">45%</p>
              <p className="text-lg">Improved Delivery Time</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">100%</p>
              <p className="text-lg">Shipment Transparency</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">60+</p>
              <p className="text-lg">Global Partners</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            >
              <span className="inline-block px-3 py-1 bg-pale text-forest rounded-full font-medium text-sm mb-6">
                Sustainable Logistics
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                Reducing Environmental Impact Without Compromising Efficiency
              </h2>
              <p className="text-gray-600 mb-8">
                Our platform utilizes AI and data analytics to suggest eco-friendly routes, optimize loading capacity, and reduce empty miles. By implementing our recommendations, companies can reduce their carbon footprint while improving operational efficiency.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 bg-pale rounded-lg p-2 mr-4">
                    <Leaf className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Carbon Tracking</h3>
                    <p className="text-sm text-gray-600">Real-time monitoring of CO₂ emissions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-pale rounded-lg p-2 mr-4">
                    <Globe className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Sustainable Packaging</h3>
                    <p className="text-sm text-gray-600">Recommendations for eco-friendly materials</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-pale rounded-lg p-2 mr-4">
                    <ArrowRight className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Route Optimization</h3>
                    <p className="text-sm text-gray-600">Minimize distance and fuel consumption</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-pale rounded-lg p-2 mr-4">
                    <BarChart3 className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Impact Reporting</h3>
                    <p className="text-sm text-gray-600">Detailed sustainability metrics</p>
                  </div>
                </div>
              </div>
              
              <Link to="/features">
                <Button className="bg-forest hover:bg-forest/90 text-white">
                  Learn More About Sustainability
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -z-10 top-0 right-0 h-64 w-64 bg-purple/10 rounded-full filter blur-3xl"></div>
                <div className="glass-panel rounded-xl overflow-hidden">
                  <div className="bg-pale/30 aspect-video rounded-xl relative"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/90 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Logistics Operations?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Join the hundreds of companies already using our platform to make their supply chains more efficient, transparent, and sustainable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-purple hover:bg-purple/90 text-white px-8 py-6 text-lg">
                Get Started Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-6 text-lg">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
