const hre = require("hardhat");
//import { hre } from "hardhat";

async function main() {
  // const [deployer] = await hre.ethers.getSigners();

  // console.log("Deploying contract with account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const SmartMarketplace = await hre.ethers.getContractFactory(
    "SmartMarketplace"
  );
  const smartmarketplace = await SmartMarketplace.deploy();

  await smartmarketplace.deployed();

  console.log("SmartMarketplace deployed to:", smartmarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
