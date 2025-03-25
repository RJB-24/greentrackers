
# Blockchain Integration Setup Guide

This document provides step-by-step instructions for setting up the blockchain integration for the GreenTrackers logistics application.

## Prerequisites

1. Node.js (v16 or higher)
2. npm or yarn
3. MetaMask extension installed in your browser
4. An Infura account (for API access to Ethereum networks)
5. Basic knowledge of Ethereum and smart contracts

## Setting Up the Smart Contract Development Environment

### Step 1: Set Up Hardhat Development Environment

1. Create a separate directory for your smart contracts:
   ```bash
   mkdir smart-contracts
   cd smart-contracts
   ```

2. Initialize a new Hardhat project:
   ```bash
   npx hardhat init
   ```

3. Select "Create a TypeScript project" when prompted.
   - This will set up a TypeScript environment for your smart contracts.
   - Accept the default project structure.

4. Install OpenZeppelin Contracts (a library for secure smart contract development):
   ```bash
   npm install @openzeppelin/contracts
   ```

### Step 2: Create the LogisticsTracker Smart Contract

1. Create a new file `contracts/LogisticsTracker.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogisticsTracker {
    struct Shipment {
        string origin;
        string destination;
        uint256 timestamp;
        string status;
        bool isActive;
    }
    
    mapping(string => Shipment) private shipments;
    string[] private shipmentIds;
    
    event ShipmentAdded(string shipmentId, string origin, string destination, string status);
    event ShipmentStatusUpdated(string shipmentId, string status);
    
    function addShipment(
        string memory _shipmentId,
        string memory _origin,
        string memory _destination,
        string memory _status
    ) public {
        require(shipments[_shipmentId].isActive == false, "Shipment ID already exists");
        
        shipments[_shipmentId] = Shipment({
            origin: _origin,
            destination: _destination,
            timestamp: block.timestamp,
            status: _status,
            isActive: true
        });
        
        shipmentIds.push(_shipmentId);
        
        emit ShipmentAdded(_shipmentId, _origin, _destination, _status);
    }
    
    function updateShipmentStatus(string memory _shipmentId, string memory _status) public {
        require(shipments[_shipmentId].isActive == true, "Shipment ID does not exist");
        
        shipments[_shipmentId].status = _status;
        
        emit ShipmentStatusUpdated(_shipmentId, _status);
    }
    
    function getShipmentDetails(string memory _shipmentId) public view returns (
        string memory origin,
        string memory destination,
        uint256 timestamp,
        string memory status
    ) {
        require(shipments[_shipmentId].isActive == true, "Shipment ID does not exist");
        
        Shipment memory shipment = shipments[_shipmentId];
        
        return (
            shipment.origin,
            shipment.destination,
            shipment.timestamp,
            shipment.status
        );
    }
    
    function getShipmentCount() public view returns (uint256) {
        return shipmentIds.length;
    }
}
```

### Step 3: Create Deployment Script

1. Create a deployment script in `scripts/deploy.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LogisticsTracker contract...");

  const LogisticsTracker = await ethers.getContractFactory("LogisticsTracker");
  const tracker = await LogisticsTracker.deploy();

  await tracker.waitForDeployment();
  
  const address = await tracker.getAddress();
  console.log(`LogisticsTracker deployed to: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Step 4: Configure Hardhat for Deployment

1. Update your `hardhat.config.ts` file:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

// Make sure to create a .env file with these values
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // For local development/testing
    hardhat: {
      chainId: 1337,
    },
    // For testnet deployment
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    // For mainnet deployment (be careful!)
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
```

2. Create a `.env` file in your `smart-contracts` directory:
```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
```

### Step 5: Compile and Deploy the Contract

1. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

2. Deploy to a test network (Sepolia):
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

3. Take note of the deployed contract address. You'll need this for the frontend application.

## Integrating with the Frontend Application

### Step 1: Set Up Infura

1. Go to [Infura](https://infura.io/) and create an account
2. Create a new project
3. Copy your project ID (API key)

### Step 2: Update the Frontend Configuration

1. In `src/services/blockchain.ts`, replace:
   - `YOUR_INFURA_PROJECT_ID` with your Infura project ID
   - `0xYourDeployedContractAddressHere` with your deployed contract address

2. Update the ABI in `src/services/blockchain.ts` if you've modified the contract. You can find the ABI in:
   ```
   smart-contracts/artifacts/contracts/LogisticsTracker.sol/LogisticsTracker.json
   ```

### Step 3: Set Up MetaMask for Testing

1. Install MetaMask browser extension if you haven't already
2. Create or import a wallet
3. Connect to the appropriate network (Sepolia testnet or mainnet)
4. Fund your wallet with ETH (use a faucet for testnet ETH)

## Testing the Integration

1. Start your React application:
   ```bash
   npm run dev
   ```

2. Navigate to the dashboard
3. Check the BlockchainInfo component to see if it connects to your wallet
4. Test adding and tracking shipments to verify interaction with your smart contract

## Troubleshooting

1. **Connection Issues**:
   - Make sure MetaMask is unlocked
   - Ensure you're on the correct network in MetaMask
   - Check console for errors

2. **Transaction Errors**:
   - Verify you have enough ETH for gas fees
   - Check that your contract address is correct
   - Make sure your ABI matches your deployed contract

3. **Web3 Initialization Problems**:
   - Check that Infura API key is correct
   - Verify that your browser supports Web3

## Next Steps

1. Add more complex smart contract features:
   - Role-based permissions
   - Token rewards for sustainable shipping choices
   - Integration with carbon credit markets
   - Supply chain verification logic

2. Enhance the frontend integration:
   - Add transaction history
   - Display gas cost estimates
   - Create a more detailed blockchain explorer component
   - Add support for multiple wallets (WalletConnect, etc.)

By following this guide, you should have a fully functional blockchain-integrated logistics tracking application.
