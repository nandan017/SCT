const hre = require("hardhat");

async function main() {
  const ProductTracker = await hre.ethers.getContractFactory("ProductTracker");
  const tracker = await ProductTracker.deploy();

  await tracker.waitForDeployment(); // replaces deprecated .deployed()

  console.log(`✅ ProductTracker deployed to: ${await tracker.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});