
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { isConnectedToBlockchain, getCurrentAccount } from '@/services/blockchain';
import { ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';
import Card from '@/components/ui/Card';

const BlockchainInfo = () => {
  const { data: isConnected, isLoading: isBlockchainLoading } = useQuery({
    queryKey: ['blockchainConnection'],
    queryFn: isConnectedToBlockchain
  });

  const { data: currentAccount, isLoading: isAccountLoading } = useQuery({
    queryKey: ['currentAccount'],
    queryFn: getCurrentAccount,
    enabled: !!isConnected,
  });

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Blockchain Status</h2>
      {isBlockchainLoading ? (
        <p>Checking blockchain connection...</p>
      ) : isConnected ? (
        <>
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            <p>Connected to blockchain</p>
          </div>
          {isAccountLoading ? (
            <p>Fetching current account...</p>
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Current Account:</strong> {currentAccount}
              </p>
              <a
                href={`https://sepolia.etherscan.io/address/${currentAccount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1"
              >
                View on Etherscan <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <XCircle className="h-5 w-5" />
          <p>Not connected to blockchain</p>
        </div>
      )}
    </Card>
  );
};

export default BlockchainInfo;
