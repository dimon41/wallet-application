import hre from "hardhat";
import { createWalletClient, http } from "viem";
import { polygon } from "viem/chains"; 
import { privateKeyToAccount } from "viem/accounts";

async function main() {
    const contractAddress = "0x3a17dd2d21fa53276f5023c59e53b01fed5e2920";  // Replace with actual address
    
    // Create clients directly with viem
    const rpcUrl = process.env.POLYGON_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/_D0YF2NfuWojfgwP3MEF5";
    
    const privateKey = process.env.PRIVATE_KEY || "";
    
    // Create account from private key
    const account = privateKeyToAccount(
        privateKey.startsWith("0x") ? (privateKey as `0x${string}`) : (`0x${privateKey}` as `0x${string}`)
    );

    const walletClient = createWalletClient({
        chain: polygon,
        transport: http(rpcUrl),
        account,
    });

    // Get the artifact for ABI
    const artifact = await hre.artifacts.readArtifact("MyNFT");

    // Create contract instance
    // const myNFT = getContract({
    //     address: contractAddress as `0x${string}`,
    //     abi: artifact.abi,
    //     client: { public: publicClient, wallet: walletClient },
    // });

    // Replace with your wallet address - MetaMask Account 2 Sepolia
    const tx = await walletClient.writeContract({
        address: contractAddress as `0x${string}`,
        abi: artifact.abi,
        functionName: "mint",
        args: ["0xa163cf5ae716E5B663c1Cb204D0E6eD1238C45b7"],
        account,
        chain: polygon,
        type: 'eip1559',
        kzg: undefined,
    } as any);

    console.log("Transaction hash:", tx);
    console.log("NFT minted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});