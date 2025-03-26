import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Truck, BarChart3, Map, Lock, Settings, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ShipmentTracker from '@/components/dashboard/ShipmentTracker';
import BlockchainInfo from '@/components/dashboard/BlockchainInfo';
import Card from '@/components/ui/Card';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("shipments");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Dashboard Header */}
      <section className="pt-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-charcoal">Logistics Dashboard</h1>
              <p className="text-gray-600">Welcome to your logistics command center</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                />
              </div>
              
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Shipments</p>
                  <p className="text-2xl font-bold text-charcoal">24</p>
                </div>
                <div className="bg-purple/10 p-2 rounded-lg">
                  <Truck className="h-6 w-6 text-purple" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-purple font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-purple h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Delivered Today</p>
                  <p className="text-2xl font-bold text-charcoal">12</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Map className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completion</span>
                  <span className="text-green-600 font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Blockchain Verified</p>
                  <p className="text-2xl font-bold text-charcoal">87</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Success Rate</span>
                  <span className="text-blue-600 font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Carbon Saved</p>
                  <p className="text-2xl font-bold text-charcoal">2.4 tons</p>
                </div>
                <div className="bg-forest/10 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-forest" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Target</span>
                  <span className="text-forest font-medium">73%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-forest h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="shipments" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:w-[400px] mb-8">
              <TabsTrigger value="shipments">Shipment Tracking</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipments" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ShipmentTracker />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="blockchain" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BlockchainInfo />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
