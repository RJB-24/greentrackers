import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Card from '@/components/ui/Card'; // Import as default rather than named export

const Contact = () => {
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our platform? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Whether you have a question about our platform, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <Card delay={0.1} className="p-0 overflow-hidden">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-purple/10 p-4 flex justify-center items-center">
                      <Mail className="h-8 w-8 text-purple" />
                    </div>
                    <div className="col-span-3 p-4">
                      <h3 className="font-semibold text-charcoal mb-1">Email Us</h3>
                      <p className="text-gray-600">info@tracklogistics.com</p>
                    </div>
                  </div>
                </Card>
                
                <Card delay={0.2} className="p-0 overflow-hidden">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-forest/10 p-4 flex justify-center items-center">
                      <Phone className="h-8 w-8 text-forest" />
                    </div>
                    <div className="col-span-3 p-4">
                      <h3 className="font-semibold text-charcoal mb-1">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </Card>
                
                <Card delay={0.3} className="p-0 overflow-hidden">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-charcoal p-4 flex justify-center items-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="col-span-3 p-4">
                      <h3 className="font-semibold text-charcoal mb-1">Visit Us</h3>
                      <p className="text-gray-600">123 Logistics Way, Suite 100</p>
                      <p className="text-gray-600">Anytown, ST 12345</p>
                    </div>
                  </div>
                </Card>
                
                <Card delay={0.4} className="p-0 overflow-hidden">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 bg-purple p-4 flex justify-center items-center">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <div className="col-span-3 p-4">
                      <h3 className="font-semibold text-charcoal mb-1">Live Chat</h3>
                      <p className="text-gray-600">Available Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="Acme Inc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="Tell us about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-purple hover:bg-purple/90 text-white py-6 text-lg">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-pale/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Our Location
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our headquarters to meet our team and see our platform in action
            </p>
          </div>
          
          <Card className="p-0 overflow-hidden">
            <div className="h-96 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center p-8 text-gray-500">
                  Google Maps would be embedded here with your API key<br />
                  <span className="text-sm">(API Key not included for security reasons)</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card delay={0.1}>
              <h3 className="text-lg font-semibold text-charcoal mb-3">How does blockchain improve logistics?</h3>
              <p className="text-gray-600">
                Blockchain creates an immutable record of every transaction and event in the supply chain, ensuring data integrity and building trust among all stakeholders.
              </p>
            </Card>
            
            <Card delay={0.2}>
              <h3 className="text-lg font-semibold text-charcoal mb-3">Can I track multiple shipments at once?</h3>
              <p className="text-gray-600">
                Yes, our platform allows you to track and manage multiple shipments simultaneously through our intuitive dashboard.
              </p>
            </Card>
            
            <Card delay={0.3}>
              <h3 className="text-lg font-semibold text-charcoal mb-3">How do you calculate carbon emissions?</h3>
              <p className="text-gray-600">
                We use a combination of route data, vehicle specifications, and industry-standard emissions factors to calculate the carbon footprint of each shipment.
              </p>
            </Card>
            
            <Card delay={0.4}>
              <h3 className="text-lg font-semibold text-charcoal mb-3">Is there a mobile app available?</h3>
              <p className="text-gray-600">
                Yes, we offer both iOS and Android mobile apps that provide the same functionality as our web platform, allowing you to manage logistics on the go.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
