
# Blockchain Integration Setup Guide

This document provides step-by-step instructions for setting up the blockchain integration for the GreenTrackers logistics application.

## Prerequisites

1. Node.js (v16 or higher)
2. npm or yarn
3. MetaMask extension installed in your browser
4. An Infura account (for API access to Ethereum networks)
5. Some Sepolia test ETH in your wallet (get from a faucet)

## Environment Setup

### Step 1: Create a `.env` file

In your `smart-contracts` directory, create a `.env` file with the following variables:

```
INFURA_API_KEY=your_infura_api_key_here
PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
```

Important notes:
- Get an Infura API key by signing up at https://infura.io/
- To get your private key from MetaMask:
  - Open MetaMask → Click on the three dots → Account details → Export private key
  - Enter your password, and copy the key (without the 0x prefix)
- NEVER share your private key or commit it to version control

### Step 2: Compile the Smart Contract

```bash
cd smart-contracts
npx hardhat compile
```

### Step 3: Deploy to Sepolia Testnet

Make sure you have some Sepolia ETH in your wallet. You can get test ETH from a faucet like:
- https://www.infura.io/faucet/sepolia 
- https://sepoliafaucet.com/

Then deploy:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

This may take a few minutes. The deployment script will output the contract address when successful.

### Step 4: Update Frontend Configuration

Once deployment is successful, you need to update two values in `src/services/blockchain.ts`:

1. `contractAddress`: Set to the deployed contract address
2. `INFURA_PROJECT_ID`: Set to your Infura API key

```javascript
// Find and update these lines:
let contractAddress = "0xYourDeployedContractAddress"; // Replace with actual address
const INFURA_PROJECT_ID = "YourInfuraApiKey"; // Replace with actual API key
```

## Troubleshooting Common Issues

### Deployment Hangs or Times Out
- Check that your Infura API key is valid
- Make sure you have enough Sepolia ETH in your wallet
- The Sepolia network might be congested - try increasing the `timeout` value in hardhat.config.ts
- Try running with `--verbose` flag for more details: `npx hardhat run scripts/deploy.ts --network sepolia --verbose`

### Invalid Project ID Error
- Double check your Infura API key in the `.env` file
- Make sure the key is active in your Infura dashboard
- Try using a different network endpoint if Sepolia is having issues

### Private Key Too Long Error
- Make sure your private key in the `.env` file doesn't have the "0x" prefix
- Check for any whitespace or newline characters

### MetaMask Connection Issues
- Make sure MetaMask is installed and unlocked
- Connect to the Sepolia network in MetaMask
- Approve the connection request when prompted

## Testing the Integration

1. Start your React application:
   ```bash
   npm run dev
   ```

2. Open MetaMask and connect to the Sepolia test network
3. Navigate to the dashboard to see the blockchain connection status
4. Test the shipment tracking functionality

If everything is set up correctly, you should see "Connected to blockchain" in the BlockchainInfo component.
