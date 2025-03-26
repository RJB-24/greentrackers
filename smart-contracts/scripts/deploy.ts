
import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment process...");
  console.log("Network information:", await ethers.provider.getNetwork());
  
  try {
    console.log("Deploying LogisticsTracker contract...");
    console.log("Getting contract factory...");
    
    const LogisticsTracker = await ethers.getContractFactory("LogisticsTracker");
    
    console.log("Deploying contract...");
    console.log("This may take a while. Please be patient.");
    
    const tracker = await LogisticsTracker.deploy();
    
    console.log("Waiting for deployment transaction to be mined...");
    await tracker.waitForDeployment();
    
    const address = await tracker.getAddress();
    console.log(`LogisticsTracker deployed successfully to: ${address}`);
    console.log("You can now update your blockchain.ts file with this address.");
    
    // Log transaction details
    const deploymentTransaction = tracker.deploymentTransaction();
    if (deploymentTransaction) {
      console.log("Deployment transaction hash:", deploymentTransaction.hash);
    }
    
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
