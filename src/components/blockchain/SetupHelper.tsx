
import React, { useState } from 'react';
import { setContractAddress } from '@/services/blockchain';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Card from '@/components/ui/Card';
import { toast } from 'sonner';

const BlockchainSetupHelper = () => {
  const [contractAddress, setAddress] = useState('');
  const [infuraProjectId, setInfuraProjectId] = useState('');

  const handleUpdate = () => {
    try {
      // Save contract address (in a real app, you would store this in localStorage or backend)
      if (contractAddress) {
        setContractAddress(contractAddress);
        toast.success('Contract address updated successfully');
      }
      
      // For Infura Project ID, in a production app you would store this securely
      if (infuraProjectId) {
        // This is just for demo/development purposes
        toast.success('Infura Project ID received');
        toast.info('In a production app, this should be stored securely server-side');
      }
      
      // Reload page to apply changes
      if (contractAddress || infuraProjectId) {
        toast.info('Reloading page to apply changes...');
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.error('Error updating blockchain settings:', error);
      toast.error('Failed to update blockchain settings');
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Blockchain Setup Helper</h3>
      <p className="text-sm text-gray-600">
        Enter your contract address and Infura Project ID to connect to the blockchain.
      </p>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1">Contract Address</label>
          <Input
            placeholder="0x..."
            value={contractAddress}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-1">Infura Project ID</label>
          <Input
            placeholder="Your Infura Project ID"
            value={infuraProjectId}
            onChange={(e) => setInfuraProjectId(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Note: In a production app, this should be stored securely server-side
          </p>
        </div>
        
        <Button 
          className="w-full bg-purple hover:bg-purple/90"
          onClick={handleUpdate}
        >
          Update Blockchain Settings
        </Button>
      </div>
    </Card>
  );
};

export default BlockchainSetupHelper;
