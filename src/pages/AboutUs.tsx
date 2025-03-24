
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Users, Target, Sparkles } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  delay: number;
}

const TeamMember = ({ name, role, bio, delay }: TeamMemberProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-md overflow-hidden"
  >
    <div className="bg-gradient-to-r from-forest/10 to-purple/10 h-32"></div>
    <div className="px-6 py-8">
      <div className="h-24 w-24 bg-charcoal rounded-full mx-auto -mt-20 mb-6 border-4 border-white"></div>
      <h3 className="text-xl font-bold text-charcoal text-center mb-1">{name}</h3>
      <p className="text-purple text-center mb-4">{role}</p>
      <p className="text-gray-600 text-center">{bio}</p>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former logistics executive with 15+ years of experience transforming supply chains for Fortune 500 companies.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Blockchain expert and software architect with a passion for building scalable, sustainable tech solutions.'
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Sustainability',
      bio: 'Environmental scientist turned tech innovator, focused on reducing the carbon footprint of global supply chains.'
    },
    {
      name: 'Priya Sharma',
      role: 'VP of Product',
      bio: 'Product leader with expertise in IoT and analytics platforms, committed to creating intuitive user experiences.'
    }
  ];

  const partners = [
    { name: 'Global Logistics Association' },
    { name: 'Sustainable Supply Chain Initiative' },
    { name: 'Blockchain Transport Alliance' },
    { name: 'EcoShipping Consortium' },
    { name: 'Digital Freight Network' },
    { name: 'Future of Transportation Council' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-pale to-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              About TrackLogistics
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              We're on a mission to make logistics more sustainable, efficient, and transparent using cutting-edge technology
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-pale/30 p-8 rounded-xl"
            >
              <div className="w-14 h-14 rounded-lg bg-forest flex items-center justify-center mb-6 text-white">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To transform the logistics industry by creating technology that enables more sustainable, efficient, and transparent supply chains worldwide.
              </p>
              <p className="text-gray-700">
                We believe that by combining blockchain, IoT, and AI technologies, we can help companies reduce their environmental impact while improving operational performance.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-purple/5 p-8 rounded-xl"
            >
              <div className="w-14 h-14 rounded-lg bg-purple flex items-center justify-center mb-6 text-white">
                <Sparkles size={28} />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                A world where every shipment is traceable, optimized for minimal environmental impact, and part of a fully transparent global supply chain.
              </p>
              <p className="text-gray-700">
                We envision a future where logistics decisions are data-driven, carbon-conscious, and create value for all stakeholders from manufacturers to end consumers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 bg-pale/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-charcoal mb-4">Sustainability First</h3>
              <p className="text-gray-600">
                We believe that sustainable logistics is not just good for the planet, but also good for business. Environmental responsibility is at the core of our technology and decision-making.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-charcoal mb-4">Data-Driven Innovation</h3>
              <p className="text-gray-600">
                We harness the power of data to drive continuous improvement in logistics operations. Our solutions are built on rigorous analysis and cutting-edge technology.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-charcoal mb-4">Trust Through Transparency</h3>
              <p className="text-gray-600">
                We believe that transparency builds trust. Our blockchain technology ensures that every stakeholder has access to reliable, immutable records of the entire supply chain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-lg bg-charcoal flex items-center justify-center text-white">
                  <Users size={28} />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The passionate people behind TrackLogistics
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-lg bg-purple flex items-center justify-center text-white">
                  <Award size={28} />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Partners & Alliances
              </h2>
              <p className="text-lg text-gray-300">
                Collaborating with industry leaders to transform logistics
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-charcoal/50 border border-gray-700 rounded-xl p-8 flex items-center justify-center"
              >
                <p className="text-center font-semibold text-lg">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple/10 to-forest/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Join Us in Transforming Logistics
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Whether you're a logistics provider, shipper, or technology partner, we'd love to work with you
            </p>
            <Link to="/contact">
              <Button className="bg-purple hover:bg-purple/90 text-white px-8 py-6 text-lg">
                Get in Touch
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
