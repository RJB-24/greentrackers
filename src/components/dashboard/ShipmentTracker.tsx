
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, AlertCircle, CheckCircle, Clock, Calendar, User, Box, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/Card';

interface ShipmentStatus {
  id: string;
  status: 'delivered' | 'in-transit' | 'pending';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  customer: string;
  lastUpdate: string;
  trackingEvents: {
    time: string;
    location: string;
    status: string;
  }[];
}

const shipments: ShipmentStatus[] = [
  {
    id: 'SHP-24680',
    status: 'in-transit',
    origin: 'Los Angeles, CA',
    destination: 'Seattle, WA',
    estimatedDelivery: 'July 12, 2023',
    customer: 'Northwest Electronics',
    lastUpdate: '2 hours ago',
    trackingEvents: [
      { time: 'July 5, 08:30 AM', location: 'Los Angeles, CA', status: 'Shipment picked up' },
      { time: 'July 6, 10:15 AM', location: 'Sacramento, CA', status: 'In transit' },
      { time: 'July 7, 02:45 PM', location: 'Medford, OR', status: 'Arrived at facility' },
      { time: 'July 8, 07:30 AM', location: 'Medford, OR', status: 'Departed facility' },
      { time: 'July 9, 01:20 PM', location: 'Portland, OR', status: 'In transit' },
    ]
  },
  {
    id: 'SHP-13579',
    status: 'delivered',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    estimatedDelivery: 'July 8, 2023',
    customer: 'East Coast Retailers',
    lastUpdate: '1 day ago',
    trackingEvents: [
      { time: 'July 2, 09:30 AM', location: 'New York, NY', status: 'Shipment picked up' },
      { time: 'July 3, 11:45 AM', location: 'New Haven, CT', status: 'In transit' },
      { time: 'July 4, 01:30 PM', location: 'Providence, RI', status: 'Arrived at facility' },
      { time: 'July 5, 08:15 AM', location: 'Providence, RI', status: 'Departed facility' },
      { time: 'July 6, 02:40 PM', location: 'Boston, MA', status: 'Out for delivery' },
      { time: 'July 7, 10:20 AM', location: 'Boston, MA', status: 'Delivered' },
    ]
  },
  {
    id: 'SHP-97531',
    status: 'pending',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    estimatedDelivery: 'July 15, 2023',
    customer: 'Midwest Auto Supply',
    lastUpdate: '3 days ago',
    trackingEvents: [
      { time: 'July 5, 11:30 AM', location: 'Chicago, IL', status: 'Shipment registered' },
      { time: 'July 5, 02:15 PM', location: 'Chicago, IL', status: 'Pending pickup' },
    ]
  }
];

const statusIcons = {
  'delivered': <CheckCircle className="h-5 w-5 text-green-500" />,
  'in-transit': <Truck className="h-5 w-5 text-purple" />,
  'pending': <Clock className="h-5 w-5 text-amber-500" />
};

const statusLabels = {
  'delivered': 'Delivered',
  'in-transit': 'In Transit',
  'pending': 'Pending'
};

const statusColors = {
  'delivered': 'bg-green-100 text-green-800',
  'in-transit': 'bg-purple-100 text-purple-800',
  'pending': 'bg-amber-100 text-amber-800'
};

const ShipmentTracker = () => {
  const [selectedShipment, setSelectedShipment] = useState<ShipmentStatus | null>(shipments[0]);
  const [showCompleteJourney, setShowCompleteJourney] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Shipment List */}
      <Card className="lg:col-span-1 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-charcoal">Recent Shipments</h3>
          <Button variant="outline" className="text-sm" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedShipment?.id === shipment.id
                  ? 'bg-purple/10 border border-purple/30'
                  : 'bg-white hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    {statusIcons[shipment.status]}
                    <span className="font-medium text-charcoal">{shipment.id}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusColors[shipment.status]}`}
                    >
                      {statusLabels[shipment.status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">From:</span> {shipment.origin}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">To:</span> {shipment.destination}
                  </p>
                </div>
                <p className="text-xs text-gray-500">Updated {shipment.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Shipment Details */}
      {selectedShipment && (
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-charcoal">{selectedShipment.id}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColors[selectedShipment.status]
                  }`}
                >
                  {statusLabels[selectedShipment.status]}
                </span>
              </div>
              <p className="text-gray-600 mt-1">Last update: {selectedShipment.lastUpdate}</p>
            </div>
            <Button variant="outline" size="sm" className="text-sm">
              <Map className="h-4 w-4 mr-2" /> View Map
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-start">
                <Box className="h-5 w-5 text-purple mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Origin</p>
                  <p className="font-medium text-charcoal">{selectedShipment.origin}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Map className="h-5 w-5 text-purple mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium text-charcoal">{selectedShipment.destination}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-purple mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium text-charcoal">{selectedShipment.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-5 w-5 text-purple mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium text-charcoal">{selectedShipment.customer}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-charcoal">Tracking History</h4>
              <button
                onClick={() => setShowCompleteJourney(!showCompleteJourney)}
                className="text-sm text-purple hover:text-purple/80"
              >
                {showCompleteJourney ? "Show Recent" : "Show Complete Journey"}
              </button>
            </div>

            <div className="relative">
              {/* Journey line */}
              <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-gray-200 z-0"></div>

              {/* Events */}
              <div className="space-y-6">
                {(showCompleteJourney 
                  ? selectedShipment.trackingEvents 
                  : selectedShipment.trackingEvents.slice(0, 3)).map((event, index) => (
                  <div key={index} className="flex items-start relative z-10">
                    <div className="bg-white rounded-full h-5 w-5 border-2 border-purple mt-1.5 flex-shrink-0"></div>
                    <div className="ml-4">
                      <p className="font-medium text-charcoal">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ShipmentTracker;
