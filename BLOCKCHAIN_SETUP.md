
# Blockchain Integration Setup Guide

This document provides step-by-step instructions for setting up the blockchain integration for the GreenTrackers logistics application.

## Prerequisites

1. Node.js (v16 or higher)
2. npm or yarn
3. MetaMask extension installed in your browser
4. An Infura account (for API access to Ethereum networks)
5. Basic knowledge of Ethereum and smart contracts

## Setting Up the Smart Contract Development Environment

### Step 1: Create a Smart Contracts Directory

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

4. Install required dependencies:
   ```bash
   npm install dotenv @openzeppelin/contracts
   ```

### Step 2: Create the LogisticsTracker Smart Contract

1. Create a new file `contracts/LogisticsTracker.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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

### Step 4: Configure Hardhat and Environment Variables

1. Create a `.env` file in your `smart-contracts` directory:
```
INFURA_API_KEY=your_infura_api_key_here
PRIVATE_KEY=your_wallet_private_key_without_0x
```

IMPORTANT: 
- Get an Infura API key by signing up at https://infura.io/
- The wallet private key should be from your MetaMask wallet (without the 0x prefix)
- NEVER share your private key or commit it to version control

2. The hardhat.config.ts file should be configured to use these environment variables:
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY?.startsWith("0x") 
  ? process.env.PRIVATE_KEY.substring(2) 
  : process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
```

### Step 5: Compile and Deploy the Contract

1. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

2. Deploy to the Sepolia test network:
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

3. Take note of the deployed contract address printed in the console. You'll need this address to update the frontend code.

## Integrating with the Frontend Application

1. Update the contract address in `src/services/blockchain.ts`:
   - Replace the line `let contractAddress: string | null = null;` with:
   ```typescript
   let contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your actual deployed contract address
   ```

2. Update the Infura Project ID in the same file:
   - Replace all instances of `YOUR_INFURA_PROJECT_ID` with your actual Infura Project ID.

## Testing the Integration

1. Start your React application:
   ```bash
   npm run dev
   ```

2. Open MetaMask and connect to the Sepolia test network
3. Navigate to the dashboard to see the blockchain connection status
4. Test the shipment tracking functionality

## Common Issues and Solutions

1. **"Invalid project id" error**:
   - Double-check your Infura API key in the `.env` file
   - Make sure there are no spaces or quotes around the key
   - Verify the project is active on your Infura dashboard

2. **Wallet connection errors**:
   - Ensure MetaMask is installed and unlocked
   - Make sure you're connected to the correct network (Sepolia)

3. **Transaction failures**:
   - Check if your wallet has enough Sepolia ETH (use a faucet to get test ETH)
   - Verify that the contract address in the frontend is correct

4. **Smart contract errors**:
   - Check the Hardhat output for compilation errors
   - Verify the Solidity version in the contract matches the version in hardhat.config.ts
