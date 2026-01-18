import hre from "hardhat";

async function main() {
  // Get wallet and public clients from viem.
  const [deployer] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();

  // Log for confirmation.
  console.log("Deploying MyNFT from:", deployer.account.address);

  // Load artifact (ABI and bytecode)—Hardhat auto-compiles.
  const artifact = await hre.artifacts.getArtifact("MyNFT");  // If 'hre' not recognized, see note below.

  // Deploy the contract.
  const myNFT = await publicClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode as `0x${string}`,
    args: [deployer.account.address],  // Your address as initialOwner.
    account: deployer.account,
  });

  // Wait and log.
  await myNFT.waitForDeployment();
  console.log("MyNFT deployed to:", myNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});