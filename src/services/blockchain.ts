
import Web3 from 'web3';

// Type definitions for ethereum window object
declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

// ABI (Application Binary Interface) for the smart contract
// This is a simplified example - you would use your actual contract ABI
const contractABI = [
  {
    "inputs": [],
    "name": "getShipmentCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_shipmentId", "type": "string"}],
    "name": "getShipmentDetails",
    "outputs": [
      {"internalType": "string", "name": "origin", "type": "string"},
      {"internalType": "string", "name": "destination", "type": "string"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "string", "name": "status", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_shipmentId", "type": "string"},
      {"internalType": "string", "name": "_origin", "type": "string"},
      {"internalType": "string", "name": "_destination", "type": "string"},
      {"internalType": "string", "name": "_status", "type": "string"}
    ],
    "name": "addShipment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_shipmentId", "type": "string"},
      {"internalType": "string", "name": "_status", "type": "string"}
    ],
    "name": "updateShipmentStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// This will be updated with your actual deployed contract address
// Initially set to null to avoid errors with invalid addresses
let contractAddress: string | null = null;

// Initialize Web3
let web3: Web3;
let contract: any;

// Initialize the blockchain connection
export const initBlockchain = async () => {
  try {
    // Check if we're in a browser environment with MetaMask
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
      } catch (error) {
        console.error("User denied account access");
        // Fallback to a read-only connection
        const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID"; // Replace with your actual Infura Project ID
        web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`));
      }
    } 
    // Check for older web3 browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    // Fallback to a read-only connection
    else {
      const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID"; // Replace with your actual Infura Project ID
      web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`));
    }

    // Only initialize the contract if we have a valid address
    if (contractAddress) {
      contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
      console.warn("Contract address not set. Some blockchain features will be unavailable.");
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing blockchain:", error);
    throw error;
  }
};

// Set contract address after deployment
export const setContractAddress = (address: string) => {
  contractAddress = address;
  if (web3) {
    contract = new web3.eth.Contract(contractABI, contractAddress);
  }
};

// Get total number of shipments
export const getShipmentCount = async () => {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }
    const count = await contract.methods.getShipmentCount().call();
    return parseInt(count);
  } catch (error) {
    console.error("Error getting shipment count:", error);
    throw error;
  }
};

// Get shipment details
export const getShipmentDetails = async (shipmentId: string) => {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }
    const details = await contract.methods.getShipmentDetails(shipmentId).call();
    return {
      origin: details[0],
      destination: details[1],
      timestamp: new Date(details[2] * 1000), // Convert from Unix timestamp
      status: details[3]
    };
  } catch (error) {
    console.error("Error getting shipment details:", error);
    throw error;
  }
};

// Add a new shipment
export const addShipment = async (
  shipmentId: string,
  origin: string,
  destination: string,
  status: string
) => {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addShipment(shipmentId, origin, destination, status)
      .send({ from: accounts[0] });
    return true;
  } catch (error) {
    console.error("Error adding shipment:", error);
    throw error;
  }
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId: string, newStatus: string) => {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .updateShipmentStatus(shipmentId, newStatus)
      .send({ from: accounts[0] });
    return true;
  } catch (error) {
    console.error("Error updating shipment status:", error);
    throw error;
  }
};

// Utility function to verify blockchain connection
export const isConnectedToBlockchain = async () => {
  try {
    if (!web3) {
      await initBlockchain();
    }
    const accounts = await web3.eth.getAccounts();
    return accounts.length > 0;
  } catch (error) {
    console.error("Error checking blockchain connection:", error);
    return false;
  }
};

// Get current account
export const getCurrentAccount = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (error) {
    console.error("Error getting current account:", error);
    throw error;
  }
};

// Get transaction receipt
export const getTransactionReceipt = async (txHash: string) => {
  try {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    return receipt;
  } catch (error) {
    console.error("Error getting transaction receipt:", error);
    throw error;
  }
};

// Listen for blockchain events
export const subscribeToEvents = (callback: (error: Error | null, event?: any) => void) => {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }
    return contract.events.allEvents()
      .on('data', (event: any) => callback(null, event))
      .on('error', (error: Error) => callback(error));
  } catch (error) {
    console.error("Error subscribing to events:", error);
    throw error;
  }
};
