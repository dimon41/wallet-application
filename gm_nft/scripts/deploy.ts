import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
//import { sepolia } from "viem/chains";
import { polygonAmoy } from "viem/chains"; 
import { privateKeyToAccount} from "viem/accounts";

async function main() {
  // Create clients directly with viem
  //const rpcUrl = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9cfdb8835d3542caaacb6f2f20b229a4";
  const rpcUrl = process.env.AMOY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/_D0YF2NfuWojfgwP3MEF5";

  
  const publicClient = createPublicClient({
    //chain: sepolia,
    chain: polygonAmoy,
    transport: http(rpcUrl),
  });

  const privateKey = process.env.PRIVATE_KEY || "";
  

  // Create account from private key
  const account = privateKeyToAccount(
    privateKey.startsWith("0x") ? (privateKey as `0x${string}`) : (`0x${privateKey}` as `0x${string}`)
  );

  const walletClient = createWalletClient({
    chain: polygonAmoy,
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
  chain: polygonAmoy,
  kzg: undefined,
} as any);

  console.log("MyNFT deploy transaction hash:", hash);
  
  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("MyNFT deployed to:", receipt.contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});