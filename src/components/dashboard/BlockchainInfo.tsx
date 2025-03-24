
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, AlertCircle, ExternalLink, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/Card';

interface Transaction {
  id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  shipmentId: string;
  status: string;
  hash: string;
  verified: boolean;
}

const transactions: Transaction[] = [
  {
    id: 'TXN-67890',
    timestamp: 'July 9, 2023 14:32 UTC',
    sender: '0x3F8e5678...9abc',
    receiver: '0x7B2d1234...5def',
    shipmentId: 'SHP-24680',
    status: 'Location Update',
    hash: '0x7f4e3d2c1b0a9f8e7d6c5b4a3210fedcba9876543210abcdef1234567890abcd',
    verified: true
  },
  {
    id: 'TXN-54321',
    timestamp: 'July 8, 2023 09:15 UTC',
    sender: '0x2A1b9876...3cde',
    receiver: '0x5C8f4321...7bac',
    shipmentId: 'SHP-13579',
    status: 'Delivery Confirmation',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    verified: true
  },
  {
    id: 'TXN-12345',
    timestamp: 'July 5, 2023 11:47 UTC',
    sender: '0x9E8d5432...1fgb',
    receiver: '0x1D7c6543...8hij',
    shipmentId: 'SHP-97531',
    status: 'Shipment Registration',
    hash: '0x8a7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s9t8u7v6w5x4y3z2a1b2c3d4e',
    verified: true
  }
];

const BlockchainInfo = () => {
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedTx === id) {
      setExpandedTx(null);
    } else {
      setExpandedTx(id);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here if desired
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">Blockchain Verification</h2>
          <p className="text-gray-600">View immutable records of all shipment transactions</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">All Records Verified</span>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-12 w-12 bg-purple/10 rounded-lg flex items-center justify-center">
            <Lock className="h-6 w-6 text-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal">Blockchain Security</h3>
            <p className="text-gray-600">All shipment data is securely stored on the blockchain</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-pale/50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-charcoal mb-1">100%</p>
            <p className="text-sm text-gray-600">Verification Rate</p>
          </div>
          <div className="bg-pale/50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-charcoal mb-1">87</p>
            <p className="text-sm text-gray-600">Transactions Today</p>
          </div>
          <div className="bg-pale/50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-charcoal mb-1">5,347</p>
            <p className="text-sm text-gray-600">Total Records</p>
          </div>
        </div>
      </Card>

      <h3 className="text-xl font-semibold text-charcoal mb-4">Recent Transactions</h3>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx.id} className="p-0 overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50" 
              onClick={() => toggleExpand(tx.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple/10 p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-charcoal">{tx.id}</span>
                      {tx.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {tx.status} • {tx.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {tx.shipmentId}
                  </span>
                  {expandedTx === tx.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Expanded Transaction Details */}
            {expandedTx === tx.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">From</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-charcoal">{tx.sender}</p>
                      <button onClick={() => copyToClipboard(tx.sender)}>
                        <Copy className="h-4 w-4 text-gray-400 hover:text-purple" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">To</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-charcoal">{tx.receiver}</p>
                      <button onClick={() => copyToClipboard(tx.receiver)}>
                        <Copy className="h-4 w-4 text-gray-400 hover:text-purple" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Transaction Hash</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-xs text-charcoal truncate">{tx.hash}</p>
                    <button onClick={() => copyToClipboard(tx.hash)}>
                      <Copy className="h-4 w-4 text-gray-400 hover:text-purple" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockchainInfo;
