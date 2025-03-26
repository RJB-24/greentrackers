
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

// Make sure to create a .env file with these values
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
// Remove "0x" prefix if it exists
const PRIVATE_KEY = process.env.PRIVATE_KEY?.startsWith("0x") 
  ? process.env.PRIVATE_KEY.substring(2) 
  : (process.env.PRIVATE_KEY || "");

// Trim any whitespace from the private key
const trimmedPrivateKey = PRIVATE_KEY.trim();

const config: HardhatUserConfig = {
  solidity: "0.8.19", // Use the version matching your contract
  defaultNetwork: "sepolia", // Set default network to make commands shorter
  networks: {
    // For local development/testing
    hardhat: {
      chainId: 1337,
    },
    // For testnet deployment
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: trimmedPrivateKey ? [`0x${trimmedPrivateKey}`] : [],
      timeout: 120000, // Increase timeout to 2 minutes (120 seconds)
      gas: 2100000, // Explicitly set gas limit
      gasPrice: 8000000000, // 8 gwei
    },
    // For mainnet deployment (be careful!)
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: trimmedPrivateKey ? [`0x${trimmedPrivateKey}`] : [],
    },
  },
  // Enable verbose output for debugging
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
