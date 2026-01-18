import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount} from "viem/accounts";

async function main() {
  // Create clients directly with viem
  const rpcUrl = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9cfdb8835d3542caaacb6f2f20b229a4";
  
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });

  const privateKey = process.env.PRIVATE_KEY || "4d3f314e5f34f1f57eb91f6547b7dc8591d1a7673ee90e4477523e203f5b1d6f";
  
  // Create account from private key
  const account = privateKeyToAccount(
    privateKey.startsWith("0x") ? (privateKey as `0x${string}`) : (`0x${privateKey}` as `0x${string}`)
  );

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: http(rpcUrl),
    account,
  });

  console.log("Deploying MyNFT from:", account.address);

  // Get the artifact
  const artifact = await hre.artifacts.readArtifact("MyNFT");

  // Deploy using viem
  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode as `0x${string}`,
    args: [account.address],
  });

  console.log("MyNFT deploy transaction hash:", hash);
  
  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("MyNFT deployed to:", receipt.contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});