
import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment process...");
  
  try {
    // Get network information
    const network = await ethers.provider.getNetwork();
    console.log("Network information:", {
      name: network.name,
      chainId: network.chainId.toString(),
    });
    
    // Check if connected to network
    console.log("Checking connection to network...");
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`Successfully connected to network. Current block number: ${blockNumber}`);
    
    // Get signers
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);
    console.log(`Account balance: ${ethers.formatEther(await deployer.getBalance())} ETH`);
    
    if ((await deployer.getBalance()) < ethers.parseEther("0.01")) {
      console.error("WARNING: Deployer account has very low balance. You might not have enough ETH to deploy.");
    }
    
    console.log("Getting contract factory for LogisticsTracker...");
    const LogisticsTracker = await ethers.getContractFactory("LogisticsTracker");
    
    console.log("Deploying contract (this may take several minutes)...");
    const tracker = await LogisticsTracker.deploy();
    
    console.log(`Transaction hash: ${tracker.deploymentTransaction()?.hash || "unknown"}`);
    console.log("Waiting for deployment transaction to be mined...");
    
    await tracker.waitForDeployment();
    
    const address = await tracker.getAddress();
    console.log(`LogisticsTracker deployed successfully to: ${address}`);
    console.log("\n-----------------------");
    console.log("IMPORTANT: Update your blockchain.ts file with this address and your Infura API key.");
    console.log(`Contract address: ${address}`);
    console.log("-----------------------\n");
    
    return address;
  } catch (error) {
    console.error("Error during deployment:", error);
    throw error;
  }
}

main()
  .then((address) => {
    console.log("Contract address for your .env file:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
