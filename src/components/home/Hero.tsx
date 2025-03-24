
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Truck, Shield, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pale to-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-forest/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-purple/10 text-purple rounded-full font-medium text-sm mb-6">
                Blockchain-Powered Logistics
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
                Transforming Logistics for a{' '}
                <span className="text-purple">Sustainable Future</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                Track shipments in real-time, reduce carbon emissions, and optimize logistics operations with our blockchain-based solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple hover:bg-purple/90 text-white font-medium px-8 py-6 rounded-xl text-lg">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-medium px-8 py-6 rounded-xl text-lg">
                  Request Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-12"
            >
              <div className="flex items-center">
                <Truck className="text-forest mr-2 h-5 w-5" />
                <span className="text-charcoal font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-forest mr-2 h-5 w-5" />
                <span className="text-charcoal font-medium">Blockchain Security</span>
              </div>
              <div className="flex items-center">
                <BarChart className="text-forest mr-2 h-5 w-5" />
                <span className="text-charcoal font-medium">Sustainability Insights</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-panel rounded-2xl p-4 shadow-xl">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-forest/10 to-purple/10 aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-charcoal mb-2">Interactive Demo</h3>
                    <p className="text-gray-600 mb-6">Experience our platform's capabilities firsthand</p>
                    <Link to="/dashboard">
                      <Button className="bg-forest hover:bg-forest/90 text-white">
                        Launch Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
