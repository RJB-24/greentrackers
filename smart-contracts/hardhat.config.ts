
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

// Make sure to create a .env file with these values
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
// Remove "0x" prefix if it exists
const PRIVATE_KEY = process.env.PRIVATE_KEY?.startsWith("0x") 
  ? process.env.PRIVATE_KEY.substring(2) 
  : process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.19", // Use the version matching your contract
  networks: {
    // For local development/testing
    hardhat: {
      chainId: 1337,
    },
    // For testnet deployment
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // For mainnet deployment (be careful!)
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
