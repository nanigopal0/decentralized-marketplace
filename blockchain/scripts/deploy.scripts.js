const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Marketplace = await hre.ethers.getContractFactory("SmartMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log("SmartMarketplace deployed to:", marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
